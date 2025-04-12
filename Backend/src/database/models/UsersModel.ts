
import mongoose,{Schema, Document} from "mongoose"


interface iUsers extends Document{
    uName:string,
    uEmail:string,
    uPassword:string,
}

let userSchema = new Schema({
    uName:{
        type:String,
        required:true
    },
    uEmail:{
        type: String,
        required:true,
        unique:true
    },
    uPassword:{
        type: String,
        required:true,
    }
})
let userModel = mongoose.model<iUsers>("users",userSchema)
export default userModel;