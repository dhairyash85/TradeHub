import Item from "../Models/Item.js";

export const AddItem=async(req, res)=>{
    const {name, ownerEmail, originalCost, image}=req.body
    try{
       
        const item = await Item.create({name, ownerEmail, originalCost, image, category})
        return res.send({success:true, user: item})
    }catch(err){
        return res.status(400).send({success:false, message:err.message})
    }
}
