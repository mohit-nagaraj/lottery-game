import { Router } from "express";
import { startGame, cutNumber, endGame } from "../controller/gameController.js";

const gameRouter = Router();

gameRouter.post("/start", startGame);
gameRouter.post("/cut", cutNumber);
gameRouter.post("/delete", endGame);

export default gameRouter;