import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

// concurrently \"npm run server\" \"cd ../frontend && npm start\"
dotenv.config();
connectDB();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is runnig...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running in  mode on port ${PORT}`));
