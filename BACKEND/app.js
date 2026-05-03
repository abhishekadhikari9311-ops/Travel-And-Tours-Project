import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/auth-route.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import connectDB from "./database/TravelAndTours.js";
import normalRouter from "./routes/normalRouter.js";

import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/admin/dashboard", dashboardRouter);
app.use("/destinations", normalRouter);

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  console.error("Stack:", err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
