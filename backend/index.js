import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, 
    msg: 'HTTP {{req.method}} {{req.url}}',
    colorize: true, 
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});