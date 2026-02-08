import { ApiHandler } from '../utils/apiErrorHandler.js';

const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return next(new ApiHandler(401,"Access token is missing."))
    }
    const accessToken=token.split(" ")[1]
    if(!accessToken){
        return next(new ApiHandler(401,"Access token is missing."))
    }
    try {
        const decoded=jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user=decoded //attach user info to request object
        next()
    } catch (error) {
        return next(new ApiHandler(401,"Invalid access token."))
    }
}