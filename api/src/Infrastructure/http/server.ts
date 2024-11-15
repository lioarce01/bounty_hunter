import "reflect-metadata";
import express from "express";
import cors from "cors";
import errorHandler from "../middleware/errorHandler";
import router from "../../Infrastructure/http/routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", router);

app.use(errorHandler);

export { app };
