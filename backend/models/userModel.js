import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    grid: { 
        type: [[Number]], 
        required: true,
    },
    cuts: { 
        type: [[Boolean]], 
        default: Array(3).fill(Array(3).fill(false)),
    }
});

export const User = model("User", userSchema);