import mongoose from "mongoose";

const schema = new mongoose.Schema({   //In schema we get to know the type of data which is stored
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Task = mongoose.model("Task", schema); // In model (it is like a container) data is stored of type which has been declared in schema and model is assigned to a variable User
