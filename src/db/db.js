import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(".env"),
});

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/BookStoreCoreAPI`
    );
    console.log(`DB connected at ${connectionInstance.connection.host}`);
  } catch (e) {
    console.log(`Connection Error : ${e}`);
    process.exit(1);
  }
};
export default ConnectDB;
