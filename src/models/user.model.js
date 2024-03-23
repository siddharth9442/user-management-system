import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    Age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    Address: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true
    }
},{ timestamps: true })

export const User = mongoose.model('User', userSchema)