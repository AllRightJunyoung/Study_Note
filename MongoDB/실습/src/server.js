const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter, blogRouter } = require("./routes");
const { generateFakeData } = require("./faker");

const MONGO_URI =
  "mongodb+srv://moon2421:a21524679@cluster0.1zxdjlp.mongodb.net/MongoDBLecture?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    generateFakeData(30, 10, 10);
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);

    app.listen(3000, function () {
      console.log("server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
