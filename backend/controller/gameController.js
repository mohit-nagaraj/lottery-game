import { User } from "../models/userModel.js";
import logger from "../utils/logger.js";

export const startGame = async (req, res) => {
    const { user1Grid, user2Grid } = req.body;
    
    const allNumbersU1 = user1Grid.flat();
    const allNumbersU2 = user2Grid.flat();

    const hasDuplicatesU1 = new Set(allNumbersU1).size !== allNumbersU1.length;
    const hasDuplicatesU2 = new Set(allNumbersU2).size !== allNumbersU2.length;

    if (!user1Grid || !user2Grid ||  
        allNumbersU1.length !== 9 || 
        !allNumbersU1.every((num) => num >= 1 && num <= 9) || 
        allNumbersU2.length !== 9 ||
        !allNumbersU2.every((num) => num >= 1 && num <= 9) ||
        hasDuplicatesU1 || hasDuplicatesU2
    ) {
        return res.status(400).json({ error: "Invalid grid" });
    }
    
    try {
        const u1 = await User.create({
            userId: "user1",
            grid: user1Grid,
        });
        const u2 = await User.create({
            userId: "user2",
            grid: user2Grid,
        });
        res.status(200).json({ message: "Game started", users:{
            user1: u1,
            user2: u2,
        }});
    } catch (error) {
        console.log("Error:", error);
        logger.error(error)
        res.status(500).json({ error: "Error starting game" });
    }
}

export const cutNumber = async (req, res) => {
    const { uid1, uid2, user1Cuts, user2Cuts } = req.body;
    if(!uid1 || !uid2 || !user2Cuts || !user1Cuts) {
        return res.status(400).json({ error: "Invalid request" });
    }

    try{
        await User.findOneAndUpdate(
            { _id: uid1 },
            {cuts: user1Cuts},
        )

        await User.findOneAndUpdate(
            { _id: uid2 },
            {cuts: user2Cuts},
        )
        
        res.status(200).json({ message: "Cuts updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}