import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { checkColumnComplete, checkRowComplete } from "../utils/validator.js";
import logger from "../utils/logger.js";

export const connectDB = async (io) => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);

        setupUserChangeStream(io);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};

const setupUserChangeStream = (io) => {
    const userCollection = mongoose.connection.collection("users");

    const changeStream = userCollection.watch();

    changeStream.on("change", async (change) => {
        if (change.operationType === "update") {
            const userId = change.documentKey._id;
            const updatedUser = await User.findById(userId);
            console.log("update user change triggered")
            if (updatedUser) {
                const { grid, cuts } = updatedUser;

                const isRowComplete = checkRowComplete(grid, cuts);
                const isColumnComplete = checkColumnComplete(grid, cuts);

                if (isRowComplete || isColumnComplete) {
                    logger.info(`User ${userId} has won!`);
                    io.emit("userWon", { user: updatedUser });
                }
            }
        }
    });

    changeStream.on("error", (error) => {
        logger.error("Change Stream Error:", error);
    });
};
