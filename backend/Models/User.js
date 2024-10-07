import mongoose, {Schema} from "mongoose";
const User=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type: String, required: true}
})

export default mongoose.model("User", User)