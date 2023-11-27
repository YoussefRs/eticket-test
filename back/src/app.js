import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { login, logout } from "./controllers/authController.js";
import BuyerRouter from "./routes/buyerRoutes.js";
import OrganizerRouter from "./routes/organizerRoutes.js";
import ResellerRouter from "./routes/resellerRoutes.js";
import SecurityAgentsRouter from "./routes/SecurityAgentsRoutes.js";
import AdminRouter from "./routes/adminRoutes.js";
import subscriptionPlanRouter from "./routes/subscriptionPlanRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoriesRouter from "./routes/categoriesRoutes.js";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import {
  handlePaymentSuccessWebhook,
  handlePayPalPaymentSuccessWebhook,
} from "./controllers/orderController.js";
import stripe from "stripe"; // Import the Stripe library

/* Accessing .env content */
dotenv.config();

/* Creating express app */
const app = express();
/*app.use(
  cors({
    origin: "*", // Allows requests from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //credentials: true, // Enable credentials (if required)
  })
);*/
// Your Stripe CLI webhook secret for testing your endpoint locally
const endpointSecret = process.env.ENDPOINT_SECRET;
// Initialize Stripe with your secret key
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual Stripe secret key
// Define a route for webhook events
app.post(
  "/webhook",
  express.raw({ type: "application/json", limit: "10mb", extended: true }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    try {
      // Construct the Stripe event from the request
      const event = stripeClient.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );

      // Handle the webhook event
      switch (event.type) {
        case "payment_intent.amount_capturable_updated":
          // Handle this event type
          break;
        case "payment_intent.canceled":
          // Handle this event type
          break;
        case "payment_intent.created":
          // Handle this event type
          break;
        case "payment_intent.partially_funded":
          // Handle this event type
          break;
        case "payment_intent.payment_failed":
          // Handle this event type
          break;
        case "payment_intent.processing":
          // Handle this event type
          break;
        case "payment_intent.requires_action":
          // Handle this event type
          break;
        case "payment_intent.succeeded":
          // Handle payment success event
          await handlePaymentSuccessWebhook(request, response, event);
          // Do not send a response here
          break;
        // Add more event types as needed

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Respond with a 200 OK status to acknowledge receipt of the event
      response.status(200).send("Webhook received");
    } catch (err) {
      // Respond with a 400 Bad Request status if there's an error
      //response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
/* Middleware for parsing cookies */
app.use(cookieParser());

/**ROUTES */

// Route for user login
app.post("/login", login);
// Route for user logout
app.get("/logout", logout);

// Routes based on user's role
app.use("/buyer", BuyerRouter);
app.use("/organizer", OrganizerRouter);
app.use("/admin", AdminRouter);
app.use("/reseller", ResellerRouter);
app.use("/event-staff", SecurityAgentsRouter);

// Categories routes base path
app.use("/categories", categoriesRouter);
// Subscription plan routes base path
app.use("/subscription-plan", subscriptionPlanRouter);
// Auth routes base path
app.use("/auth", authRoutes);
// User routes base path
app.use("/user", userRouter);
// Tickets routes base path
app.use("/tickets", ticketRouter);
// Events routes base path
app.use("/events", eventRouter);
// Orders routes base path
app.use("/orders", orderRouter);

app.post("/paypalwebhook", (req, res) => {
  //console.log("Incoming PayPal Webhook Request:", req);
  const event = req.body;

  // Call your function to handle the webhook event
  handlePayPalPaymentSuccessWebhook(req, res, event);
});

export default app;
