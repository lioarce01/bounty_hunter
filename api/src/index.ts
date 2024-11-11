import express from "express";
import { app } from "./Infrastructure/http/server";
import { config } from "./config/config";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
