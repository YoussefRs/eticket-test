import emailjs from "@emailjs/nodejs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Queue from "bull";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
/* Accessing .env content */
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a Nodemailer transporter using the provided email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailQueue = new Queue("email", {
  redis: {
    port: 6379,
    host: "https://backend-production-eticket.rmsoftware.de/",
    maxRetriesPerRequest: 5,
    // Add other redis configuration as needed
  },
});

// Process the email queue
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;

  try {
    // Attempt to send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    // Log the error but do not crash the server
    console.error("Max retries reached, email not sent.");
    // Handle the error without rethrowing it
  }
});


export const sendPaymentEmail = async (data) => {
  const {
    customerEmail,
    totalAmount,
    totalQuantity,
    currency,
    email,
    transactionId,
    orderCode,
    purchaseDate,
    eventDetails,
    participantDetails,
    ticketDetails,
  } = data;

  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../public/templates/email.hbs"),
    "utf8"
  );

  const ticketTemplateSource = fs.readFileSync(
    path.join(__dirname, "../public/templates/ticket.hbs"),
    "utf8"
  );

  try {
    const ticketDetailsContent = await Promise.all(
      Array.from({ length: totalQuantity }, async (_, index) => {
        const ticketDetail = ticketDetails[index];

        const replacedTicketContent = ticketTemplateSource.replace(
          /{{\s*([\w.-]+)\s*}}/g,
          (ticketMatch, ticketPlaceholder) => {
            switch (ticketPlaceholder) {
              case "firstname":
                return participantDetails.firstname;
              case "lastname":
                return participantDetails.lastname;
              case "eventName":
                return eventDetails.eventName;
              case "startDate":
                const startDate = new Date(eventDetails.startDate);
                const formattedStartDate = `${startDate.getDate()}.${
                  startDate.getMonth() + 1
                }.${startDate.getFullYear()}`;
                return formattedStartDate;
              case "startTime":
                return eventDetails.startTime;
              case "EventendTime":
                return eventDetails.endTime;
              case "orderCode":
                return orderCode;
              case "qrcode":
                return ticketDetail.qrCode;
              case "purchaseDate":
                // Get the current date and format it as DD.MM.YYYY
                const now = new Date();
                const formattedPurchaseDate = `${now.getDate()}.${
                  now.getMonth() + 1
                }.${now.getFullYear()}`;
                return formattedPurchaseDate;
              default:
                return ticketMatch;
            }
          }
        );

        const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ] });
        const page = await browser.newPage();
        await page.setContent(replacedTicketContent);
        const ticketPdfBuffer = await page.pdf({ format: "Letter" });

        await browser.close();

        return {
          filename: `ticket_${orderCode}_${index + 1}.pdf`,
          content: ticketPdfBuffer.toString("base64"),
          encoding: "base64",
          type: "application/pdf",
        };
      })
    );

    const ticketDetail = ticketDetails.map((ticketDetail, index) => {
      return `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; background-color: #f9f9f9;">
          <p style="font-weight: bold;">Ticket #${index + 1}</p>
          <p>Ticketname: ${ticketDetail.name}</p>
          <p>Ticket Preis: ${ticketDetail.price}</p>
        </div>
      `;
    });

    const ticketDetailsHTML = ticketDetail.join("");

    const replacedEmailContent = emailTemplateSource.replace(
      /{{\s*([\w.-]+)\s*}}/g,
      (match, placeholder) => {
        switch (placeholder) {
          case "firstname":
            return participantDetails.firstname;
          case "lastname":
            return participantDetails.lastname;
          case "totalAmount":
            return totalAmount;
          case "currency":
            return currency;
          case "email":
            return email;
          case "transactionId":
            return transactionId;
          case "orderCode":
            return orderCode;
          case "eventName":
            return eventDetails.eventName;
          case "startDate":
            const startDate = new Date(eventDetails.startDate);
            const formattedStartDate = `${startDate.getDate()}.${
              startDate.getMonth() + 1
            }.${startDate.getFullYear()}`;
            return formattedStartDate;
          case "startTime":
            return eventDetails.startTime;
          case "EventendTime":
            return eventDetails.endTime;
          case "totalQuantity":
            return totalQuantity;
          case "eventLocation":
            return eventDetails.location;
          case "purchaseDate":
            return purchaseDate;
          case "ticketInfo":
            return ticketDetailsHTML;
          default:
            return match;
        }
      }
    );

    const mailOptions = {
      from: "no-reply@my-eticket.de",
      to: customerEmail,
      subject: "Bestellbestätigung per E-Mail",
      html: replacedEmailContent,
      attachments: ticketDetailsContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info.response; // Resolve with email response
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Reject with the email sending error
  }
};

// Function to generate a random verification token
export const generateRandomToken = () => {
  // Generate a random 32-byte token
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

// Function to send a verification email
export const sendVerificationEmail = async (user) => {
  try {
    // Generate a verification token and set expiration (e.g., 24 hours from now)
    const verificationToken = generateRandomToken();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2); // Set expiration to 2 hours from now

    // Save the verification token and expiration date in the user document
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = expirationDate;
    await user.save();

    // Load your email template
    let verificationTemplateSource = fs.readFileSync(
      path.join(__dirname, "../public/templates/verification.hbs"),
      "utf8"
    );

    // Create the templateParams for the email
    const templateParams = {
      firstname: user.firstname,
      lastname: user.lastname,
      verificationLink: `https://backend-production-eticket.rmsoftware.de/auth/verify/${verificationToken}`,
    };

    // Replace placeholders with dynamic data
    Object.keys(templateParams).forEach((key) => {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      verificationTemplateSource = verificationTemplateSource.replace(
        placeholder,
        templateParams[key]
      );
    });

    const mailOptions = {
      from: "no-reply@my-eticket.de",
      to: user.email,
      subject: "Verifizierungs-E-Mail",
      html: verificationTemplateSource,
    };

    // Send email using nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};


/**RESET PASSWORD EMAIL*/
export const sendPasswordResetEmail = async (user) => {
  try {
    // Generate a password reset token
    const resetToken = generateRandomToken();

    // Set an expiration date for the token (e.g., 1-2 hours from now)
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2); // Set expiration to 2 hours from now

    // Save the reset token and expiration date in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expirationDate;
    await user.save();

    // Load your email template
    let resetTemplateSource = fs.readFileSync(
      path.join(__dirname, "../public/templates/reset.hbs"),
      "utf8"
    );

    // Create the templateParams for the email
    const templateParams = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      resetLink: `https://www.my-eticket.de/auth/reset-password/${resetToken}`,
    };

    // Replace placeholders with dynamic data
    Object.keys(templateParams).forEach((key) => {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      resetTemplateSource = resetTemplateSource.replace(
        placeholder,
        templateParams[key]
      );
    });

    const mailOptions = {
      from: "no-reply@my-eticket.de",
      to: user.email,
      subject: "E-Mail zur Passwortrücksetzung",
      html: resetTemplateSource,
    };

    // Send email using nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return {
      success: true,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, message: "Internal server error." };
  }
};

// Function to send payment email and enqueue it
export const sendPaymentEmailAndEnqueue = async (data) => {
  try {
    // Send the payment email
    const mailOptions = await sendPaymentEmail(data);

    // Enqueue the email sending task
    await emailQueue.add("sendEmail", { mailOptions });

    // Return the mail options or anything needed
    return mailOptions;
  } catch (error) {
    console.error("Error sending payment email:", error);
    // Handle the error accordingly
    throw error;
  }
};
