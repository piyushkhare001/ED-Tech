// // Importing mongoose library along with Connection type from it
// import mongoose, { Connection } from "mongoose";

// // Declaring a variable to store the cached database connection
// let cachedConnection: Connection | null = null;

// // Function to establish a connection to MongoDB
// export default  async function connectToMongoDB() {
//   // If a cached connection exists, return it
//   if (cachedConnection) {
//     console.log("Using cached db connection");
//     return cachedConnection;
//   }
//   try {
//     // If no cached connection exists, establish a new connection to MongoDB
//     const cnx = await mongoose.connect(process.env.MONGODB_URI!);
//     // Cache the connection for future use
//     cachedConnection = cnx.connection;
//     // Log message indicating a new MongoDB connection is established
//     console.log("New mongodb connection established");
//     // Return the newly established connection
//     return cachedConnection;
//   } catch (error) {
//     // If an error occurs during connection, log the error and throw it
//     console.log(error);
//     throw error;
//   }
// }


import mongoose from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: mongoose.Connection | null = null;

// Function to establish a connection to MongoDB
export default async function connectToMongoDB() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }

  // Ensure that the MONGODB_URI environment variable is defined
  const mongoUri = process.env.MONGODB_URL;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  try {
    // Establish a new connection to MongoDB
    const mongooseInstance = await mongoose.connect(mongoUri);

    // Cache the connection for future use
    cachedConnection = mongooseInstance.connection;

    // Log message indicating a new MongoDB connection is established
    console.log("New MongoDB connection established");

    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // Log the error and rethrow it
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
