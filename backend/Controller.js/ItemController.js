import jwt from 'jsonwebtoken';
import Item from "../Models/Item.js";
import User from "../Models/User.js";
import Request from '../Models/Request.js';
import { Mongoose, Schema } from 'mongoose';

export const AddItem=async(req, res)=>{
    const {originalCost, image, title, description, category}=req.body
    try{
        const token = req.headers['authorization']?.split(' ')[1]
        const verify=jwt.verify(token, 'your_jwt_secret')
        console.log(verify)
        const user=await User.findOne({email:verify.email})
        const ownerEmail=user.email
        const name=user.name
        const location=user.location
        const item = await Item.create({"name":name, "originalCost":originalCost, "ownerEmail":ownerEmail, "title":title, "description":description, "image":image, "category":category, location: location})
        console.log(item)
        return res.send({success:true, user: item})
    }catch(err){
        console.log("error ", err)
        return res.status(400).send({success:false, message:err.message})
    }
}
export const getAllItems=async(req, res)=>{
    try{
        const token = req.headers['authorization']?.split(' ')[1]
        const verify=jwt.verify(token, 'your_jwt_secret')
        const item = await Item.find({ownerEmail:{$ne:verify.email}, })
        return res.send({success:true, item: item})
    }catch(err){
        console.log("error ", err)
        return res.status(400).send({success:false, message:err.message})
    }
}
export const getUserItems=async(req, res)=>{
    try{
        const token = req.headers['authorization']?.split(' ')[1]
        const verify=jwt.verify(token, 'your_jwt_secret')
        const item = await Item.find({ownerEmail:verify.email})
        return res.send({success:true, item: item})
    }catch(err){
        console.log("error ", err)
        return res.status(400).send({success:false, message:err.message})
    }
}

