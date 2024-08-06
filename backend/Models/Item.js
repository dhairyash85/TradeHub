import mongoose, {Schema} from "mongoose";
const Item=new Schema({
    name:{type:String,required:true},
    ownerEmail:{type:String,required:true,unique:true},
    originalCost:{type:Number,required:true},
    image:[{type:String}],
    category:{type:String}
})

export default mongoose.model("Item", Item)