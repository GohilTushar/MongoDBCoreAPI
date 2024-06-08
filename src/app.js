import express from "express";
import path from "path";
import dotenv from "dotenv";
import indexRoute from "./router/index.route.js";
import ConnectDB from "./db/db.js";

const app = express();
dotenv.config({
  path: path.resolve(".env"),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT, "127.0.0.1", () => {
      console.log(`App started at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection Error", err);
  });
app.use("/api", indexRoute);
export default app;

