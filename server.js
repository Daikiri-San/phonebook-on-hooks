const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { contactsRouter } = require("./contacts/contacts.router");
const { authRouter } = require("./auth/auth.router");

const PORT = process.env.PORT || 8080;

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
    this.server.use(express.json({ extended: true }));
    this.server.use(cors());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/userContacts", contactsRouter);
    this.server.use("/auth", authRouter);

    if (process.env.NODE_ENV === "production") {
      this.server.use(
        "/",
        express.static(path.join(__dirname, "client", "build"))
      );

      this.server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }
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

const app = new Server();

app.start();
