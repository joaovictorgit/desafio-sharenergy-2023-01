const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const mongoString = process.env.DATABASE_URL;
mongoose.set("strictQuery", true);
mongoose.connect(mongoString, {
  useNewUrlParser: true,
});
const database = mongoose.connection;

database.once("open", () => {
  console.log("✔ Database connected!");
});

database.on("error", (error: unknown) => {
  console.log(error);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running in port: ${PORT}`);
});
