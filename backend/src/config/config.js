import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config({path:'./.env'});

const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const connectDatabase=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Database Connected.");
    }
    catch(error){
        console.error("Database Connection Failed.",error);
        process.exit(1);
    }
}

export { PORT, connectDatabase };
