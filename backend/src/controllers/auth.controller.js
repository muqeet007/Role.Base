import {userLogin,saveRefreshToken,unSetRefreshToken,checkUserExists,findRefreshToken} from '../services/auth.service.js'
import { ApiHandler} from '../utils/apiErrorHandler.js'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/config.js'

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new ApiHandler(401, "Invalid or expired refresh token.");
    }

    // check DB
    const exists = await findRefreshToken(token);

    if (!exists) {
      throw new ApiHandler(401, "Invalid or expired refresh token.");
    }

    // verify JWT
    let payload;
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch {
      throw new ApiHandler(401, "Invalid or expired refresh token.");
    }

    // check user
    const user = await checkUserExists(payload.id);

    if (!user) {
      throw new ApiHandler(401, "Invalid or expired refresh token.");
    }

    // generate new access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Token refreshed successfully.",
    });
  } catch (error) {
    next(error);
  }
};


export const login=async(req,res,next)=>{

    const {email,password}=req.body

    if(!email || !password){
         throw new ApiHandler(400,"Email and password are required.")
    }

    try{
    const {user,accessToken,refreshToken}=await userLogin(email,password)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    })

    await saveRefreshToken(user._id, refreshToken, req.ip , req.get('User-Agent') || '')

    return res.status(200).json({
        user:{
            id:user._id,
            email:user.email,
        },
        message:"Login Successful."})
    }
    catch(error){
     next(error)   
    }
}

export const logout=async(req,res,next)=>{

    // check if refresh token exists in cookies
    const refreshToken=req.cookies?.refreshToken

    await unSetRefreshToken(refreshToken)

    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    return res.status(200).json({message:"Logout Successful."})
}