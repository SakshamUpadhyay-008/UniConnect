import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uniconnect_db';

    const options = {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoUri, options);
    console.log(
      `[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`
    );
    return conn;
  } catch (error) {
    console.warn(
      `[MongoDB Info] No local/remote MongoDB daemon responding at configured URI: ${error.message}`
    );
    console.warn(
      `[MongoDB Info] Safe fallback mode: Ensure MongoDB is started via 'mongod' or set MONGODB_URI in Backend/.env to MongoDB Atlas`
    );
    return null;
  }
};

export default connectDB;
