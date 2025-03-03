import mongoose from "mongoose";

/** @type {typeof mongoose | undefined} */
export let dbInstance = undefined;

const connectDB = async () => {
  try {
    
    const connectionInstance= process.env.DB_LIVE_MODE?await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    ):await mongoose.connect(
      `${process.env.MONGODB_LIVE_URI}`
    )
    
    dbInstance = connectionInstance;
    console.log(`\t\t --------  Db host: ${connectionInstance.connection.host} \t\t                     ------------------`)
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
