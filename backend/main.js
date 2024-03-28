const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const logger = require('./middlewares/logger')
// const database = require('./database/database')
// const path = require('path');

require("dotenv").config();
// { path: path.resolve(__dirname, '../.env') }

const PORT = 3028;

const app = express();

// !Import di Routes

const authorRoute = require("./routes/authors");
const postRoute = require("./routes/posts");
const loginRoute = require("./routes/login");
const cloudRoute = require("./routes/cloudinary");
const authorAvatarRoute = require('./routes/authors');
const postCoverRoute = require('./routes/posts');
const emailRoute = require('./routes/emails');
const commentRoute = require('./routes/comments')

// !Sezione middleware

app.use(express.json());
app.use(cors());

// app.use(logger)
app.use("/", authorRoute);
app.use("/", postRoute);
app.use("/", loginRoute);
app.use("/", cloudRoute);
app.use('/', authorAvatarRoute);
app.use('/', postCoverRoute);
app.use('/', emailRoute);
app.use('/', commentRoute)

//! Connessione del Database

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind("Database connection error!"));
db.once("open", () => {
  console.log("Database successfully connected!");
});

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
