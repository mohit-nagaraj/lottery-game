import { Router } from "express";
import { startGame, cutNumber } from "../controller/gameController.js";

const gameRouter = Router();

gameRouter.post("/start", startGame);
gameRouter.post("/cut", cutNumber);

export default gameRouter;