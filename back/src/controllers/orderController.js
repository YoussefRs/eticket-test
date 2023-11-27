import crypto from "crypto";
import QRCode from "qrcode";
import cron from "node-cron";
import Event from "../models/Event.js";
import Order from "../models/Order.js";
import Ticket from "../models/Tickets.js";
import Stripe from "stripe";
import paypal from "paypal-rest-sdk";
import puppeteer from "puppeteer";
import { rimraf } from "rimraf";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import {
  sendPaymentEmail,
  sendPaymentEmailAndEnqueue,
} from "./mailerController.js";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
/* Accessing .env content */
dotenv.config();

/*Stripe client initialization */
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/*Paypal client initialization */

paypal.configure({
  mode: "live", // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

/*Generates a code for tickets */
function generateTicketCode() {
  // Define the character set for the code
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let code = "";

  // Generate 8 random characters
  for (let i = 0; i < 8; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
function generateOrderCode(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateUniqueOrderCode() {
  const minCode = 1000000000; // Define the minimum order code
  const maxCode = 9999999999; // Define the maximum order code

  while (true) {
    const generatedCode = generateOrderCode(minCode, maxCode);
    const existingOrder = await Order.findOne({ code: generatedCode });

    if (!existingOrder) {
      // The generated code is unique
      return generatedCode;
    }
  }
}

/**Create and Pay an order with Stripe: apple pay */

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const intent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
    });
    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**Create and Pay an order with Stripe: card */

// In createOrderWithStripe function
export const createOrderWithStripe = async (req, res) => {
  try {
    const { eventId, items, participantDetails, paymentMethod } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found..." });
    }

    let totalAmount = 0;
    const uniqueOrderCode = await generateUniqueOrderCode();

    const orderData = {
      event: eventId,
      isPaid: false,
      participantDetails: participantDetails,
      code: uniqueOrderCode.toString(),
      tickets: [],
    };

    if (req.user) {
      orderData.user = req.user.id;
    }

    const order = new Order(orderData);

    const qrCodes = [];
    let ticket;

    for (const item of items) {
      const {
        ticketId,
        quantity,
        validityStartDate,
        validityEndDate,
        validityStartTime,
        validityEndTime,
      } = item;
      ticket = await Ticket.findById(ticketId);

      const { minQuantity, maxQuantity } = ticket.ticketsPerOrder;

      if (quantity < minQuantity || quantity > maxQuantity) {
        return res.status(400).json({
          error: `Quantity must be between ${minQuantity} and ${maxQuantity}`,
        });
      }

      if (ticket.displayOptions.remainingTickets < quantity) {
        return res
          .status(400)
          .json({ error: "Insufficient ticket quantity available" });
      }

      const isDiscounted = ticket.priceCategory.isDiscounted;
      const ticketTotal = isDiscounted
        ? (ticket.price - ticket.priceCategory.discountAmount) * quantity
        : ticket.price * quantity;

      totalAmount += ticketTotal;

      for (let i = 0; i < quantity; i++) {
        const qrCodeData = {
          firstName: participantDetails.firstname,
          lastName: participantDetails.lastname,
          eventName: event.eventName,
          ticketCode: generateTicketCode(),
          ticketName: ticket.name,
          ticketLocation: ticket.location,
          validity: {
            startDate: validityStartDate,
            endDate: validityEndDate, // Include validity end date here
            startTime: validityStartTime,
            endTime: validityEndTime,
          },
        };

        const qrCodeDataJson = JSON.stringify(qrCodeData);
        const url = await QRCode.toDataURL(qrCodeDataJson);
        qrCodes.push(url);

        order.tickets.push({
          ticket: ticketId,
          quantity: 1,
          qrCode: url,
          isDiscounted: isDiscounted,
          purchaseDate: new Date(),
          validity: {
            startDate: validityStartDate,
            endDate: validityEndDate, // Assign validity end date here as well
            startTime: validityStartTime,
            endTime: validityEndTime,
          },
        });
      }
    }

    const currency = ticket.currency.toLowerCase();

    // Stripe payment handling similar to PayPal process
    // Create a customer in Stripe
    const customer = await stripeClient.customers.create({
      email: participantDetails.email,
      name: `${participantDetails.firstname} ${participantDetails.lastname}`,
      metadata: {
        ip_address: req.ip,
      },
    });

    // Additional metadata for the payment session if needed
       const sessionOptions = {
         payment_method_types: ["card", "klarna", "apple_pay"],
         customer: customer.id,
         payment_method: paymentMethod,
         metadata: {
           // Add your metadata here if needed
         },
         confirm: true,
         return_url: "https://www.my-eticket.de/successful",
       };

    // Create a payment intent with Stripe
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency,
      customer: customer.id,
      ...sessionOptions,
      metadata: {
        orderId: order.id,
      },
    });

    // Update order with payment details
    order.paymentDetails = {
      method: "Stripe",
      transactionId: paymentIntent.id,
      status: "Pending",
      totalAmount,
      promoCode: "",
    };

    // Save additional ticket details to the database
    await order.save();

    return res.status(201).json({
      message: "Order created successfully",
      clientSecret: paymentIntent.client_secret,
      order: order, // Optionally return the order information
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Order creation failed: ${error.message}` });
  }
};


// Function to handle successful payment webhook events

export const handlePaymentSuccessWebhook = async (request, response, event) => {
  if (event.type === "payment_intent.succeeded") {
    try {
      const orderId = event.data.object.metadata.orderId;

      // Log the initial order status
      //console.log("Initial Order Status:", await Order.findById(orderId));

      const order = await Order.findById(orderId)
        .populate("event")
        .populate("tickets.ticket");

      if (!order) {
        console.error("Order not found");
        return response.status(404).send("Order not found");
      }

      if (order.isPaid) {
        console.log("Order is already paid");
        return response.json({ received: true });
      }

      let totalAmount = 0;
      let totalQuantity = 0;

      // Your existing logic to update remainingTickets and soldOut in the database
      for (const orderTicket of order.tickets) {
        const ticketId = orderTicket.ticket._id;
        const quantity = orderTicket.quantity;

        // Find the ticket in the database
        const ticket = await Ticket.findById(ticketId);

        if (ticket) {
          ticket.displayOptions.remainingTickets -= quantity;

          if (ticket.displayOptions.remainingTickets <= 0) {
            ticket.displayOptions.remainingTickets = 0;
            ticket.displayOptions.soldOut = true;
          }

          // Save the updated ticket to the database
          await ticket.save();

          // Update totalQuantity and totalAmount
          totalQuantity += quantity;
          totalAmount += ticket.price * quantity;
        }
      }

      // Update order status asynchronously
      await Order.findByIdAndUpdate(orderId, {
        $set: {
          isPaid: true,
          paymentDetails: {
            method: "stripe",
            transactionId: event.data.object.id,
            totalAmount: totalAmount,
            status: "succeeded",
          },
        },
      });

      // Log the updated order status
      console.log("Updated Order Status:", await Order.findById(orderId));

      // Use the new function to send payment success email and enqueue the task
      await sendPaymentEmailAndEnqueue({
        customerEmail: order.participantDetails.email,
        totalAmount: totalAmount.toFixed(2),
        currency: order.tickets[0].ticket.currency,
        email: order.participantDetails.email,
        transactionId: event.data.object.id,
        totalQuantity: totalQuantity,
        orderCode: order.code,
        purchaseDate: order.createdAt,
        eventDetails: {
          eventName: order.event.eventName,
          location: order.event.location,
          startDate: order.event.startDate,
          startTime: order.event.startTime,
          endTime: order.event.endHour,
        },
        participantDetails: {
          firstname: order.participantDetails.firstname,
          lastname: order.participantDetails.lastname,
        },
        ticketDetails: order.tickets.map((orderTicket) => ({
          name: orderTicket.ticket.name,
          price: orderTicket.ticket.price.toFixed(2),
          quantity: orderTicket.quantity,
          qrCode: orderTicket.qrCode, // Include qrCode in ticketDetails
          purchaseDate: orderTicket.purchaseDate, // Include purchaseDate in ticketDetails
        })),
      });

      console.log("Order and tickets updated successfully");

      // Send a response after handling the payment success event
      return response.json({ received: true });
    } catch (error) {
      console.error("Error handling payment success:", error);
      // If there's an error, send an internal server error response
      return response.status(500).send("Internal Server Error");
    }
  }

  // If the event type is not "payment_intent.succeeded", do not send a response here
};

export const createOrderWithPayPal = async (req, res) => {
  try {
    const { eventId, items, participantDetails } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    let totalAmount = 0;
    const uniqueOrderCode = await generateUniqueOrderCode();

    const orderData = {
      event: eventId,
      isPaid: false,
      code: uniqueOrderCode.toString(),
      participantDetails: participantDetails,
      tickets: [],
    };

    if (req.user) {
      orderData.user = req.user.id;
    }

    const order = new Order(orderData);

    const qrCodes = [];
    let ticket;

    for (const item of items) {
      const {
        ticketId,
        quantity,
        validityStartDate,
        validityEndDate,
        validityStartTime,
        validityEndTime,
      } = item;
      ticket = await Ticket.findById(ticketId);

      const { minQuantity, maxQuantity } = ticket.ticketsPerOrder;

      if (quantity < minQuantity || quantity > maxQuantity) {
        return res.status(400).json({
          error: `Quantity must be between ${minQuantity} and ${maxQuantity}`,
        });
      }

      if (ticket.displayOptions.remainingTickets < quantity) {
        return res
          .status(400)
          .json({ error: "Insufficient ticket quantity available" });
      }


      const isDiscounted = ticket.priceCategory.isDiscounted;
      const ticketTotal = isDiscounted
        ? (ticket.price - ticket.priceCategory.discountAmount) * quantity
        : ticket.price * quantity;

      totalAmount += ticketTotal;

      for (let i = 0; i < quantity; i++) {
        const qrCodeData = {
          firstName: participantDetails.firstname,
          lastName: participantDetails.lastname,
          eventName: event.eventName,
          ticketCode: generateTicketCode(),
          ticketName: ticket.name,
          ticketLocation: ticket.location,
          validity: {
            startDate: validityStartDate,
            endDate: validityEndDate,
            startTime: validityStartTime,
            endTime: validityEndTime,
          },
        };

        const qrCodeDataJson = JSON.stringify(qrCodeData);
        const url = await QRCode.toDataURL(qrCodeDataJson);
        qrCodes.push(url);

        order.tickets.push({
          ticket: ticketId,
          quantity: 1,
          qrCode: url,
          isDiscounted: isDiscounted,
          purchaseDate: new Date(),
          validity: {
            startDate: validityStartDate,
            endDate: validityEndDate,
            startTime: validityStartTime,
            endTime: validityEndTime,
          },
        });
      }
    }

    const currency = ticket.currency.toUpperCase();

    const createPayment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "https://www.my-eticket.de/successful",
        cancel_url: "https://www.my-eticket.de/",
      },
      transactions: [
        {
          amount: {
            total: totalAmount.toFixed(2),
            currency,
          },
          description: "Event Tickets Purchase",
        },
      ],
    };

    paypal.payment.create(createPayment, async (error, payment) => {
      if (error) {
        console.error("PayPal payment failed:", error);
        return res
          .status(400)
          .json({ error: `PayPal payment failed: ${error.message}` });
      } else {
        for (const link of payment.links) {
          if (link.method === "REDIRECT") {
            order.paymentDetails = {
              method: "PayPal",
              transactionId: payment.id,
              status: "Pending",
              totalAmount: totalAmount,
              promoCode: "",
            };
            await order.save();

            return res.json({
              approval_url: link.href,
              //order: order, // Optionally return the order information
            });
          }
        }
        return res.status(400).json({ error: "PayPal approval URL not found" });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Order creation failed: ${error.message}` });
  }
};

// Assume you have necessary imports and dependencies

// Function to execute payment (using PayPal SDK)
const executePayment = (paymentId, payerId, totalAmount, currencyCode) => {
  const executePaymentDetails = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          total: totalAmount,
          currency: currencyCode,
        },
      },
    ],
    // Add any additional required details based on PayPal's API documentation
  };

  return new Promise((resolve, reject) => {
    // Use PayPal SDK method to execute payment
    paypal.payment.execute(
      paymentId,
      executePaymentDetails,
      (error, executedPayment) => {
        if (error) {
          console.error("PayPal payment execution failed:", error);
          reject(error);
        } else {
          console.log("PayPal payment executed:", executedPayment);
          resolve(executedPayment);
        }
      }
    );
  });
};

// Your webhook handler function with payment execution logic
export const handlePayPalPaymentSuccessWebhook = async (req, res, event) => {
  try {
    const eventType = event.event_type;

    if (!eventType) {
      console.log("Event type is undefined");
      return res.json({ received: true });
    }

    if (eventType === "PAYMENTS.PAYMENT.CREATED") {
      const paymentDetails = event.resource;

      if (!paymentDetails) {
        console.error("Invalid payment details:", event);
        return res.status(400).send("Invalid payment details");
      }

      const order = await Order.findOne({
        "paymentDetails.transactionId": paymentDetails.id,
      })
        .populate("event")
        .populate("tickets.ticket");

      if (!order) {
        console.error("Order not found");
        return res.status(404).send("Order not found");
      }

      const paymentId = paymentDetails.id;
      const payerId = paymentDetails.payer.payer_info.payer_id;
      const totalAmount = paymentDetails.transactions[0].amount.total;
      const currencyCode = paymentDetails.transactions[0].amount.currency;

      // Execute the payment using extracted details
      await executePayment(paymentId, payerId, totalAmount, currencyCode);

      // Update order status asynchronously with totalAmount
      await Order.findByIdAndUpdate(order._id, {
        $set: {
          isPaid: true,
          paymentDetails: {
            method: "PayPal",
            transactionId: paymentId,
            totalAmount: totalAmount,
            status: "Paid",
          },
        },
      });

      // Update remaining tickets for each purchased ticket
      for (const orderTicket of order.tickets) {
        const ticketId = orderTicket.ticket._id;
        const purchasedQuantity = orderTicket.quantity;

        // Update remaining tickets in the database
        await Ticket.findByIdAndUpdate(ticketId, {
          $inc: { "displayOptions.remainingTickets": -purchasedQuantity },
        });
      }

      // Prepare data for email
      const emailData = {
        customerEmail: order.participantDetails.email,
        totalAmount: totalAmount,
        totalQuantity: order.tickets.reduce(
          (total, orderTicket) => total + orderTicket.quantity,
          0
        ),
        currency: order.tickets[0].ticket.currency,
        email: order.participantDetails.email,
        transactionId: paymentId,
        orderCode: order.code,
        purchaseDate: order.createdAt,
        eventDetails: {
          eventName: order.event.eventName,
          location: order.event.location,
          startDate: order.event.startDate,
          startTime: order.event.startTime,
          endTime: order.event.endHour,
        },
        participantDetails: {
          firstname: order.participantDetails.firstname,
          lastname: order.participantDetails.lastname,
        },
        lastname: order.participantDetails.lastname,
        ticketDetails: order.tickets.map((orderTicket) => ({
          name: orderTicket.ticket.name,
          price: orderTicket.ticket.price.toFixed(2),
          quantity: orderTicket.quantity,
          qrCode: orderTicket.qrCode,
          purchaseDate: orderTicket.purchaseDate,
        })),
      };
      // Use the function to send payment success email and enqueue the task
      await sendPaymentEmailAndEnqueue(emailData);

      // Log success and send response
      console.log("Order and tickets updated successfully");
      return res.json({ received: true });
    } else if (eventType === "PAYMENT.SALE.COMPLETED") {
      const paymentDetails = event.resource;

      if (!paymentDetails) {
        console.error("Invalid payment details:", event);
        return res.status(400).send("Invalid payment details");
      }

      const order = await Order.findOne({
        "paymentDetails.transactionId": paymentDetails.id,
      });

      if (!order) {
        console.error("Order not found");
        return res.status(404).send("Order not found");
      }

      // Update order status asynchronously with totalAmount
      await Order.findByIdAndUpdate(order._id, {
        $set: {
          isPaid: true,
          paymentDetails: {
            method: "PayPal",
            transactionId: paymentId,
            totalAmount: totalAmount,
            status: "Paid",
          },
        },
      });

      // Update remaining tickets for each purchased ticket
      for (const orderTicket of order.tickets) {
        const ticketId = orderTicket.ticket._id;
        const purchasedQuantity = orderTicket.quantity;

        // Update remaining tickets in the database
        await Ticket.findByIdAndUpdate(ticketId, {
          $inc: { "displayOptions.remainingTickets": -purchasedQuantity },
        });
      }

      // Prepare data for email
      const emailData = {
        customerEmail: order.participantDetails.email,
        totalAmount: totalAmount,
        totalQuantity: order.tickets.reduce(
          (total, orderTicket) => total + orderTicket.quantity,
          0
        ),
        currency: order.tickets[0].ticket.currency,
        email: order.participantDetails.email,
        transactionId: paymentId,
        orderCode: order.code,
        purchaseDate: order.createdAt,
        eventDetails: {
          eventName: order.event.eventName,
          location: order.event.location,
          startDate: order.event.startDate,
          startTime: order.event.startTime,
          endTime: order.event.endHour,
        },
        participantDetails: {
          firstname: order.participantDetails.firstname,
          lastname: order.participantDetails.lastname,
        },
        lastname: order.participantDetails.lastname,
        ticketDetails: order.tickets.map((orderTicket) => ({
          name: orderTicket.ticket.name,
          price: orderTicket.ticket.price.toFixed(2),
          quantity: orderTicket.quantity,
          qrCode: orderTicket.qrCode,
          purchaseDate: orderTicket.purchaseDate,
        })),
      };

      // Use the function to send email for SALE COMPLETED event
      await sendPaymentEmailAndEnqueue(emailData);

      // Log success for SALE COMPLETED event and send response
      console.log("Sale completed: Updated DB and sent email");
      return res.json({ received: true });
    } else {
      console.log("Unhandled PayPal webhook event:", eventType);
      return res.json({ received: true });
    }
  } catch (error) {
    console.error("Error handling PayPal webhook event:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Define a function to handle downloading a single ticket
export const downloadTicketHandler = async (req, res) => {
  const { orderId, ticketId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("event")
      .populate("tickets.ticket");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the specified ticketId exists in the order
    const orderTicket = order.tickets.find(
      (t) => t.ticket._id.toString() === ticketId
    );

    if (!orderTicket) {
      return res.status(404).json({ error: "Ticket not found in the order" });
    }

    // Prepare data for the PDF
    const pdfData = {
      customerEmail: order.participantDetails.email,
      email: order.participantDetails.email,
      orderCode: order.code,
      eventDetails: {
        eventName: order.event.eventName,
        location: order.event.location,
        startDate: order.event.startDate,
        startTime: order.event.startTime,
        endTime: order.event.endHour,
      },
      participantDetails: {
        firstname: order.participantDetails.firstname,
        lastname: order.participantDetails.lastname,
      },
      ticketDetails: {
        qrCode: orderTicket.qrCode,
        name: orderTicket.ticket.name,
        price: orderTicket.ticket.price,
        quantity: orderTicket.quantity,
        purchaseDate: orderTicket.purchaseDate,
      },
    };

    // Read the ticket template
    const ticketTemplateSource = fs.readFileSync(
      path.join(__dirname, "../public/templates/ticket.hbs"),
      "utf8"
    );

    // Generate the PDF content using a template
    const pdfContent = ticketTemplateSource.replace(
      /{{\s*([\w.-]+)\s*}}/g,
      (match, placeholder) => {
        switch (placeholder) {
          case "firstname":
            return pdfData.participantDetails.firstname;
          case "lastname":
            return pdfData.participantDetails.lastname;
          case "email":
            return pdfData.participantDetails.email;
          case "orderCode":
            return pdfData.orderCode;
          case "eventName":
            return pdfData.eventDetails.eventName;
          case "startDate":
            const startDate = new Date(pdfData.eventDetails.startDate);
            const formattedStartDate = `${startDate.getDate()}.${
              startDate.getMonth() + 1
            }.${startDate.getFullYear()}`;
            return formattedStartDate;
          case "startTime":
            return pdfData.eventDetails.startTime;
          case "EventendTime":
            return pdfData.eventDetails.endTime;
          case "qrcode":
            return pdfData.ticketDetails.qrCode;
          default:
            return match;
        }
      }
    );

    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      args: [
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--no-zygote",
      ],
    });
    const page = await browser.newPage();
    await page.setContent(pdfContent);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();

    // Set response headers for file download
    res.setHeader("Content-Type", "application/pdf");
    const fileName = `ticket_${ticketId}_${orderId}.pdf`;
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    // Send the PDF buffer as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define a function to handle downloading all tickets

export const downloadAllTicketsHandler = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("event")
      .populate("tickets.ticket");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create a temporary directory for storing PDF files
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Generate and save each PDF file
    const pdfPaths = [];
    for (const orderTicket of order.tickets) {
      const pdfData = {
        customerEmail: order.participantDetails.email,
        email: order.participantDetails.email,
        orderCode: order.code,
        eventDetails: {
          eventName: order.event.eventName,
          location: order.event.location,
          startDate: order.event.startDate,
          startTime: order.event.startTime,
          endTime: order.event.endHour,
        },
        participantDetails: {
          firstname: order.participantDetails.firstname,
          lastname: order.participantDetails.lastname,
        },
        ticketDetails: {
          name: orderTicket.ticket.name,
          price: orderTicket.ticket.price,
          quantity: orderTicket.quantity,
          qrCode: orderTicket.qrCode,
          purchaseDate: orderTicket.purchaseDate,
        },
      };

      const ticketTemplateSource = fs.readFileSync(
        path.join(__dirname, "../public/templates/ticket.hbs"),
        "utf8"
      );

      const pdfContent = ticketTemplateSource.replace(
        /{{\s*([\w.-]+)\s*}}/g,
        (match, placeholder) => {
          switch (placeholder) {
            case "firstname":
              return pdfData.participantDetails.firstname;
            case "lastname":
              return pdfData.participantDetails.lastname;
            case "email":
              return pdfData.participantDetails.email;
            case "orderCode":
              return pdfData.orderCode;
            case "eventName":
              return pdfData.eventDetails.eventName;
            case "startDate":
              const startDate = new Date(pdfData.eventDetails.startDate);
              const formattedStartDate = `${startDate.getDate()}.${
                startDate.getMonth() + 1
              }.${startDate.getFullYear()}`;
              return formattedStartDate;
            case "startTime":
              return pdfData.eventDetails.startTime;
            case "EventendTime":
              return pdfData.eventDetails.endTime;
            case "qrcode":
              return pdfData.ticketDetails.qrCode;
            default:
              return match;
          }
        }
      );

      const pdfPath = path.join(tempDir, `ticket_${orderTicket._id}.pdf`);
      pdfPaths.push(pdfPath);

      const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        args: [
          "--disable-gpu",
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--no-zygote",
        ],
      });
      const page = await browser.newPage();
      await page.setContent(pdfContent);
      await page.pdf({ path: pdfPath, format: "A4" });
      await browser.close();
    }

    // Create a zip file and add all PDF files to it
    const zipPath = path.join(tempDir, `all_tickets_${orderId}.zip`);
    const outputZip = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level
    });

    outputZip.on("close", async () => {
      // Send the zip file as the response
      res.download(zipPath, `all_tickets_${orderId}.zip`, async (err) => {
        // Use rimraf to remove the temporary directory
        rimraf(tempDir, {}, (removeErr) => {
          if (removeErr) {
            console.error("Error removing temporary directory:", removeErr);
          }
        });
      });
    });

    archive.on("error", (err) => {
      console.error("Error creating zip file:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });

    archive.pipe(outputZip);
    pdfPaths.forEach((pdfPath) => {
      archive.append(fs.createReadStream(pdfPath), {
        name: path.basename(pdfPath),
      });
    });
    archive.finalize();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Orders for a Specific Event
export const getAllOrdersForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    // Use a query to find all orders related to the event with the given eventId
    const orders = await Order.find({ event: eventId });
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching orders: ${error.message}` });
  }
};

//Get All Orders:
export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching orders: ${error.message}` });
  }
};

//Get All Orders:
export const getAllTick = async (req, res) => {
  try {
    // Fetch all orders from the database
    const associations = await OrderTicketAssociation.find();
    return res.status(200).json(associations);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching orders: ${error.message}` });
  }
};

//Get Order by ID:
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // Use a query to find the order with the given orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching order: ${error.message}` });
  }
};

//Get All Orders for a Logged-In User:
export const getAllOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use a query to find all paid orders related to the user with the given userId
    const paidOrders = await Order.find({ user: userId, isPaid: true })
      .populate("event")
      .populate({
        path: "tickets",
        populate: { path: "ticket" }, // Populate the 'ticket' field inside each item in the 'tickets' array
      });

    return res.status(200).json(paidOrders);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching paid user orders: ${error.message}` });
  }
};

const cleanupUnpaidOrders = async () => {
  try {
    const cleanupThreshold = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago

    // Define your cleanup criteria
    const cleanupQuery = {
      isPaid: false,
      orderDate: { $lt: cleanupThreshold },
    };

    // Find orders that meet the cleanup criteria
    const unpaidOrders = await Order.find(cleanupQuery);

    // Clean up the identified unpaid orders using findByIdAndRemove
    for (const order of unpaidOrders) {
      const removedOrder = await Order.findByIdAndRemove(order._id);
      if (removedOrder) {
        console.log(`Removed order: ${removedOrder._id}`);
      }
    }

    // console.log(`Cleaned up ${unpaidOrders.length} unpaid orders.`);
  } catch (error) {
    //  console.error("Order cleanup job failed:", error);
  }
};

// Define a cron schedule to run the cleanupUnpaidOrders function every hour
cron.schedule("0 * * * *", async () => {
  //console.log("Running cleanupUnpaidOrders cron job...");
  cleanupUnpaidOrders();
});
