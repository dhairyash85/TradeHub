import mongoose, {Schema} from "mongoose";
const Item=new Schema({
    name:{type:String},
    title:{type:String},
    description:{type:String},
    ownerEmail:{type:String},
    originalCost:{type:Number},
    image:[{type:String}],
    category:{type:String}
})

export default mongoose.model("Item", Item)