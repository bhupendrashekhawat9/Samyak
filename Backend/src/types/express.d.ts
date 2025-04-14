import { JwtPayload } from "jsonwebtoken";
import { UserDetails } from "../controllers/authController";

declare global {
  namespace Express {
    interface Request {
      user?: UserDetails | JwtPayload; // adjust type based on your token payload
    }
  }
}