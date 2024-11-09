import express from "express";
import cors from "cors";
import { config } from "./config/config";
import errorHandler from "./middleware/errorHandler";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", router);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
