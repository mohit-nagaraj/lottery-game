import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import logger from "./utils/logger.js";
import { connectDB } from "./db/connect.js";
import gameRouter from "./routes/gameRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, 
    msg: 'HTTP {{req.method}} {{req.url}}',
    colorize: false, 
}));

app.get("/health", (req, res) => {
    res.status(200).send("Server is running");
});

app.use("/api/game", gameRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});