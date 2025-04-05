import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes.js";
 
dotenv.config();

const app = express();
 
app.use(cors());
app.use(express.json());
 
app.use("/api/employees", employeeRoutes);
 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(5000, () => console.log("✅ Server running on http://localhost:5000")))
.catch((error) => console.error("❌ MongoDB connection failed:", error.message));
