import express from "express";
import router from "./routes";
import connectDB from "./config/db";

connectDB();
const app = express();

app.use('/api',router);

export default app;