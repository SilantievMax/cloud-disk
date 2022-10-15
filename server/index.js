import express from "express";
import mongoose from "mongoose";
import config from "config";
import authRouter from "./routes/authRoutes.js";
import fileRouter from './routes/fileRoutes.js'
import cors from './middleware/cors.middleware.js'

const app = express();
const SERVER_PORT = config.get("SERVER_PORT");
const URL_DB = config.get("URL_DB");

app.use(cors)
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
    try {
        await mongoose.connect(URL_DB);

        app.listen(SERVER_PORT, () => {
            console.log(`Server OK - PORT ${SERVER_PORT}`);
        });
    } catch (err) {}
};

start();
