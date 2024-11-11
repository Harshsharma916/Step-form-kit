import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://vectorharsh:harsh123@form.0pmok.mongodb.net/?retryWrites=true&w=majority&appName=Form";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    return connection;
  } catch (error: any) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

export default connectToDatabase;
