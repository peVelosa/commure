import express from "express";
import { playersRouter } from "./routes/players";

export const createApp = () => {
  const app = express();

  app.use("/", playersRouter);

  return app;
};
