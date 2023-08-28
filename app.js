const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require('./routes/api/users')
const app = express();
const logger = require("morgan");
require('dotenv').config()

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use('/api/users', usersRouter)


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Incorrect data'
    })
  }
  if (err.message.includes('E11000 duplicate key ')) {
    const [ key ] = Object.keys(err.keyPattern);
    return res.status(409).json({message: `This ${key} is already in use`})
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
