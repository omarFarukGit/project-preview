import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { authRoutes } from "./app/modules/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: config.frontend_url, credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("project-submission-dashboard server runnig...");
});

app.use("/api/v1/auth", authRoutes);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
