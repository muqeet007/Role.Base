import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    action:{
        type:String,
        required:true,
        enum:["CREATE","READ","UPDATE","DELETE"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    timeStamp:{
        type:Date,
        default:Date.now
    },
    details:{
        type:Object,
        required:true,
        oldData:{
            type:mongoose.Schema.Types.Mixed,
            default:{}
        },
        newData:{
            type:mongoose.Schema.Types.Mixed,
            default:{}
        }
    },
    ipAddress:{
        type:String,
        required:true
    }
},{timestamps:true,})