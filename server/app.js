import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// 处理预检请求
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
