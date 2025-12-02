import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const start = async () => {
  app.set("mongo_user", "yashika9654_db_user");
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://yashika9654_db_user:yashika1234@zoom.rhnh9gq.mongodb.net/"
    );
    console.log(`mongo connected db host : ${connectionDb.connection.host}`);
  } catch (err) {
    console.log("Mongodb connection error", err);
  }

  server.listen(app.get("port"), () => {
    console.log("listening on port");
  });
};

start();
