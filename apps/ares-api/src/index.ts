import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
dotenv.config();
const corsOptions = { credentials: true };

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running, listening on: ${process.env.PORT || 5000}`);
});
