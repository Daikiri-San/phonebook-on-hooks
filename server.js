const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { contactsRouter } = require("./contacts/contacts.router");
const { authRouter } = require("./auth/auth.router");

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = "http://localhost:3000";

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.handleErrors();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: FRONTEND_URL }));
    this.server.use(morgan("tiny"));
    if (process.env.NODE_ENV === "production") {
      this.server.use(express.static("client/build"));
    }
  }

  initRoutes() {
    this.server.use("/contacts", contactsRouter);
    this.server.use("/auth", authRouter);
  }

  handleErrors() {
    this.server.use((err, req, res, next) => {
      delete err.stack;

      return res.status(err.status || 500).send(`${err.name}: ${err.message}`);
    });
  }

  async initDatabase() {
    try {
      await mongoose.connect(
        process.env.MONGODB_URI || process.env.MONGODB_DB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    } catch (err) {
      console.log("MongoDB connection error", err);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () =>
      console.log("Database connection successful on", PORT)
    );
  }
}

module.exports = {
  Server,
};
