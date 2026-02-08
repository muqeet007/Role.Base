import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import RefreshToken from '../models/refreshtoken.model.js';
import { ApiHandler } from '../utils/apiErrorHandler.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/config.js';

export const userLogin=async (email, password) => {
    
    const user = await User.findOne({email})
    
    //if user not found return error
    if(!user){
        throw new ApiHandler(401,"Invalid credentials.")
    }

    //compare password with hashed password in database
    const isMatch = await bcrypt.compare(password,user.password)
    

    //if password not match return error
    if(!isMatch){
       throw new ApiHandler(401,"Invalid credentials.")
    }
    //generate access token and refresh token
    if(!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET){
        throw new ApiHandler(500,"Token secrets are not defined.")
    }

    const accessToken = jwt.sign(
        {id:user._id, email:user.email, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    )

    const refreshToken = jwt.sign(
        {id:user._id, email:user.email, role:user.role},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    )

    return {user, accessToken, refreshToken}
    
}


export const saveRefreshToken=async(userId, refreshToken, ipAddress, userAgent)=>{
    const expiresAt = new Date(Date.now() + 7*24*60*60*1000) // 7 days from now
    const newToken = new RefreshToken({
        userId,
        refreshToken,
        expiresAt,
        ipAddress,
        userAgent
    })
    await newToken.save()
}


export const unSetRefreshToken=async(refreshToken)=>{
    await RefreshToken.deleteOne({refreshToken})
}

export const checkUserExists=async(email)=>{
    const user = await User.findOne({email})
    return !!user}


export const findRefreshToken=async(refreshToken)=>{
     token=await RefreshToken.findOne({refreshToken})
     return !!token
}