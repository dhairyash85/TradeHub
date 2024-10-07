import mongoose, {Schema} from "mongoose";
const Request=new Schema({
    itemOne:{type: Schema.Types.ObjectId, ref: "Item"},
    itemTwo:{type: Schema.Types.ObjectId, ref: "Item"},
    RequestBy:{type: Schema.Types.ObjectId, ref: "User"},
    RequestTo:{type: Schema.Types.ObjectId, ref: "User"},
    cash:{type:Number},
    status:{type:String, default:"Pending", enum:["Pending", "Approved", "Completed"]},
    completedByOne:{type: String},
    completedByTwo:{type: String}
})

export default mongoose.model("Request", Request)