import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./app/config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: config.frontend_url, credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("project-submission-dashboard server runnig...");
});

export default app;
