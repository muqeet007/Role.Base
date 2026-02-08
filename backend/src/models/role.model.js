import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },

    // for future
    // await Role.create({ name: 'admin', permissions: ['read','write','delete','update'] });
    // await Role.create({ name: 'staff', permissions: ['read'] });

    permissions:{
        type:[String],
        required:true,
        default:[],
    }
},{timestamps:true,})


