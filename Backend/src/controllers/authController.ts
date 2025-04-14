import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";
import type { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../database/models/UsersAuthModel.js";

interface UserPayload {
    userEmail: string;
    userId?: string;
    userName:string
}
export interface UserDetails {
    userEmail:string;
    userId:string;
    userName:string;
    token:string
}

const JWT_SECRET = process.env.JWT_SECRET||"SECRET";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (user: UserPayload): string => {
    return jwt.sign(
        { 
            userEmail: user.userEmail,
            userId: user.userId,
            userName:user.userName
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
}

export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
}



