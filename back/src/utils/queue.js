import { Queue, Worker, QueueScheduler } from "bull";
import dotenv from "dotenv";

/* Accessing .env content */
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const paymentQueue = new Queue("paymentQueue", REDIS_URL);

const paymentQueueScheduler = new QueueScheduler("paymentQueue", REDIS_URL);

// Add a worker to process the payment tasks
new Worker("paymentQueue", async (job) => {
  const { request, response, event } = job.data;
  await processWebhookEventAsync(request, response, event);
});
