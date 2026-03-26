import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../src/app.js";

// Load test environment variables FIRST (override defaults)
dotenv.config({ path: ".env.test", override: true });

// Also ensure we have NODE_ENV set to test
process.env.NODE_ENV = "test";

// Connect to MongoDB before running tests
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Clear collections at the start of all tests
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}, 60000);

// Clean up database after tests
afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing MongoDB:", error);
  }
}, 30000);

export default app;