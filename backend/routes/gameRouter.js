import { Router } from "express";
import { startGame } from "../controller/gameController.js";

const gameRouter = Router();

gameRouter.post("/start", startGame);

export default gameRouter;