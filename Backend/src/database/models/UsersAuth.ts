import mongoose, { Model } from "mongoose";

const usersAuthSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});


const usersAuthModel = mongoose.model("UsersAuth", usersAuthSchema);


export const registerUser = async (user: {
    userName: string,
    userEmail: string,
    userPassword: string,
}) => {
    const response = await usersAuthModel.create(user)
                        .catch((error: any) => {
                            console.log("Error Registering User ❌:", error);
                            return null;
                        });
        return response
    
    
}

export const getUserByEmail = async (email: string) => {
    const response = await usersAuthModel.findOne({ email }).catch((error: any) => {
        console.log("Error Getting User by Email ❌:", error);
        return null;
    });
    return response;
}
