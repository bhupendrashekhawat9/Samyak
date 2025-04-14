import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../controllers/authController";
import { errorResponse } from "../utils/responseHandler";


export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer ")){
         res.status(401).json(errorResponse("Unauthorized"));
         return;
    }
    try {
        const tokenString = token.split(" ")[1];
        const decoded = verifyToken(tokenString);
        console.log(decoded,"token")
        req.user = decoded;
        next();
    } catch (error) {
            res.status(401).json(errorResponse("Invalid token"));
        return;
    }
}