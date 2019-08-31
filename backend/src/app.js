import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    mongoose.connect(
      "mongodb+srv://omnistack:omnistack@cluster0-wvnqq.mongodb.net/omnistack?retryWrites=true&w=majority",
      {
        useNewUrlParser: true
      }
    );
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
