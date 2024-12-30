import mongoose from "mongoose";

/** @type {typeof mongoose | undefined} */
export let dbInstance = undefined;

const connectDB = async () => {
  try {
    
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    // );
     const connectionInstance = await mongoose.connect(
      `mongodb+srv://ramkeshflickinfo:chaPMdPqpY1NS2yW@cluster0.47r0j.mongodb.net/`
    );
    
    dbInstance = connectionInstance;
    console.log(
      `Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
