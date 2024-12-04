import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import classRoute from "./routes/classRoute.js";
import dotenv from "dotenv";
import studentsRoutes from "./routes/studentsRoutes.js";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Football CMS application." });
});
//connectDB
connectDB();
app.use ("/api/student",studentsRoutes);
app.use("/api/class", classRoute);



// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
