import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler";
import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../database/models/UsersAuth";

interface UserPayload {
    userEmail: string;
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET||"SECRET";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (user: UserPayload): string => {
    return jwt.sign(
        { 
            email: user.userEmail,
            userId: user.userId 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
}

export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer ")){
        return res.status(401).json(errorResponse("Unauthorized"));
    }
    try {
        const tokenString = token.split(" ")[1];
        const decoded = verifyToken(tokenString);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(errorResponse("Invalid token"));
    }
}