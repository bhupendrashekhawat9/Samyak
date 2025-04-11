import { Router } from "express";
import { getUserByEmail, registerUser } from "../database/models/UsersAuth";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { generateToken } from "../controllers/auth";

const router = Router();

router.post("/register", async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {
        const response = await registerUser({ userName, userEmail, userPassword });
        if (response) {
            console.log("User Registered Successfully ✅:", response);
            res.status(200).json(successResponse(response, "User Registered Successfully"));
        } else {
            console.log("User Registration Failed ❌:", response);
            res.status(500).json(errorResponse("User Registration Failed"));
        }
    } catch (error) {
        console.log("Error Registering User ❌:", error);
        res.status(500).json(errorResponse("Internal Server Error"));
    }
});

router.post("/login", async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
        console.log("User Email:", userEmail);
        console.log("User Password:", userPassword);
        const user = await getUserByEmail(userEmail);
        console.log("User:", user);
        if (!user) {
            const token = generateToken({ userEmail: userEmail, password: userPassword });
            res.status(200).json(successResponse({ token }, "User Logged In Successfully"));
        } else {
            res.status(401).json(errorResponse("Invalid User Credentials"));
        }
    } catch (error) {
        console.log("Error Logging in ❌:", error);
        res.status(500).json(errorResponse("Internal Server Error"));
    }
});

export default router;