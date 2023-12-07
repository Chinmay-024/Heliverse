const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoutes");
const teamRoute = require("./Routes/teamRoutes");

const app = express();
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

// Implement CORS
app.use(cors());
app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());

//Routes
app.use("/api/users", userRoute);
app.use("/api/team", teamRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
