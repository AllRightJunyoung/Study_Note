const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://moon2421:a21524679@cluster0.1zxdjlp.mongodb.net/moonplayer?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    app.use(express.json());

    app.get("/", function (req, res) {
      return res.send("hello world!");
    });

    app.listen(3000, function () {
      console.log("server listening on port 3000");
    });
  } catch (error) {}
};

server();
