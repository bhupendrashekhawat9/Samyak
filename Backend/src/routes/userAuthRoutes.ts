import { Router } from "express";
import { checkIsUserPresent, getUserByEmail, registerUser } from "../database/models/UsersAuthModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { generateToken } from "../controllers/authController.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {

        let isUserPresent = await checkIsUserPresent(userEmail)
        console.log(isUserPresent,"isuser")
        if(isUserPresent){
            res.status(409).json({
                statusCode:0,
                message:"Email already used"
            })
            return;
        }
        const response = await registerUser({ userName, userEmail, userPassword });
        if (response) {
            console.log("User Registered Successfully ✅:", response);
            let savedUserDetailsResponse = {
                userEmail:response.email,
                userId:response._id,
                userName: response.userName,
                token:null
                }
                const token = generateToken(savedUserDetailsResponse);
                savedUserDetailsResponse.token = token
            res.status(200).json(successResponse(savedUserDetailsResponse, "User Registered Successfully"));
        } else {
            console.log("User Registration Failed ❌:", response);
            res.status(500).json(errorResponse("User Registration Failed"));
        }
    } catch (error) {
        console.log("Error Registering User ❌:", error);
        res.status(500).json(errorResponse(error?.message));
    }
});

router.post("/login", async (req, res) => {
    const { userEmail, userPassword:providedPassword } = req.body;

    try {
        console.log("User Email:", userEmail);
        console.log("User Password:", providedPassword);
        const savedUser = await getUserByEmail(userEmail);
        console.log(savedUser,"user")
        if (!savedUser) {
            res.status(400).json({
                status:400,
                message:"User not registered"
            });
        } 

        if(savedUser){
            if(savedUser.password == providedPassword){
                let savedUserDetailsResponse = {
                    userEmail:savedUser.email,
                    userId:savedUser._id,
                    userName: savedUser.userName,
                    token:null
                    }
                    const token = generateToken(savedUserDetailsResponse);
                    savedUserDetailsResponse.token = token
                    res.status(200).json({
                        status:200,
                        message:"Login Successfull",
                        data:savedUserDetailsResponse
                    });
            }else{
                throw Error("Invalid credentials")
            }
        }

    } catch (error) {
        console.log("Error Logging in ❌:", error);
        res.status(500).json({
            status:400,
            message:error.message
        });
    }
});

export default router;