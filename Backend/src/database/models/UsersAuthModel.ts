import mongoose, { Model } from "mongoose";
import Database from "..";

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
   await  Database.connect()
    const response = await usersAuthModel.insertOne({
        userName: user.userName, email: user.userEmail, password: user.userPassword
    })
        .catch((error: any) => {
            console.log("Error Registering User ❌:", error);
            return null;
        });
    return response


}
export const checkIsUserPresent = async (userEmail:string) => {
   await  Database.connect()

   let user = await usersAuthModel.findOne({email:userEmail})
   
    return user


}
export const getUserByEmail = async (email: string) => {
    await Database.connect()
    const response = await usersAuthModel.findOne({ email }).catch((error: any) => {
        console.log("Error Getting User by Email ❌:", error);
        return null;
    });
    return response;
}
