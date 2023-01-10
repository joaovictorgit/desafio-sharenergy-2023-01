const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

require("dotenv").config();

const PORT = process.env.PORT;
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString?.toString());
const database = mongoose.connection;

database.once("connected", () => {
  console.log("Database connected!");
});

database.on("error", (error: unknown) => {
  console.log(error);
});

const app = express();

app.use(express.json());
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running in port: ${PORT}`);
});
