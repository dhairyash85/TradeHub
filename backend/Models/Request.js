import mongoose, {Schema} from "mongoose";
const Request=new Schema({
    itemOne:{type: Schema.Types.ObjectId, ref: "Item"},
    itemTwo:{type: Schema.Types.ObjectId, ref: "Item"},
    RequestBy:{type: Schema.Types.ObjectId, ref: "User"},
    RequestTo:{type: Schema.Types.ObjectId, ref: "User"},
    status:{type:String, default:"Pending", enum:["Pending", "Approved", "Completed"]},
})

export default mongoose.model("Request", Request)