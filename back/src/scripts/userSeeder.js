import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Set up MongoDB connection
mongoose.connect(
  "mongodb+srv://eticket-prod:y7vLGJ6D7NrbkFMN@cluster0.ghuaa0n.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
    },
  }
);

// Check if the connection is successful
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});
db.once("open", async () => {
  try {
    // Create test users with hashed passwords
    const users = [
      {
        firstname: "Eventausstattung",
        lastname: "Richter",
        username: "EventausstattungRichter",
        password: await bcrypt.hash("EventausstattungRichter", 10), // Hashed password
        email: "EventausstattungRichter@e-ticket.com",
        role: "admin",
        birthdate: new Date("1990-01-01"),
      },
    ];

    for (const user of users) {
      await User.create(user);
    }

    console.log("Test users inserted successfully.");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error);
    mongoose.connection.close();
  }
});
