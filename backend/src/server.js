import app from './app.js';
import { connectDatabase, PORT } from './config/config.js';


console.log("Initiating the server");


const startServer=async()=>{
    await connectDatabase();
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();



