import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

import cors from "cors";

dotenv.config();

//database connect
connectDB();

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

//middleware
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>welcome to my ecom</h1>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  // console.log(`Server running on PORT ${PORT}`.bgCyan.white);
});
