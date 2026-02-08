import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:['^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$','Invalid email format.']
    },
    phone:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
        enum:["Manager","Developer","Designer","QA","HR"]
    },
    department:{
        type:String,
        required:true,
        enum:["Engineering","Design","HR","Sales","Marketing"]
    },
    salary:{
        type:Number,
        required:true,
        min:0
    },
    dateOfJoining:{ 
        type:Date,
        required:true
        },
    status:{
        type:String,
        required:true,
        enum:["Active","Inactive","On Leave"]
    }   
},{timestamps:true,})

const Employee=mongoose.model('Employee',employeeSchema);

export default Employee;