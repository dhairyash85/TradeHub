import jwt from 'jsonwebtoken';
import Item from "../Models/Item.js";
import User from "../Models/User.js";
import Request from '../Models/Request.js';

export const RequestTradeItems = async (req, res) => {
    try {
        const { itemOne } = req.body;
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ success: false, message: 'Authorization token missing' });
        }

        let requestFrom;
        try {
            requestFrom = jwt.verify(token, 'your_jwt_secret').id;
        } catch (error) {
            return res.status(401).send({ success: false, message: 'Invalid token' });
        }

        
        const itemOneDetails = await Item.findById(itemOne._id);
        if (!itemOneDetails) {
            return res.status(404).send({ success: false, message: 'ItemOne not found' });
        }

        const requestToUser = await User.findOne({email:itemOneDetails.ownerEmail});  
        if (!requestToUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }   
        if((!req.body.cash || req.body.cash==0) && !req.body.itemTwo){
            return res.status(400).send({success:false, message:"Please select atleast one thing"})
        }
        const requestTo = requestToUser._id;

        console.log("Request From: ", requestFrom);  
        console.log("Request To: ", requestTo);      
        
        const request = await Request.create({
            requestFrom: requestFrom,
            requestTo: requestTo,
            itemOne: itemOne._id,
        });
        if(req.body.itemTwo){
            request.itemTwo=req.body.itemTwo
        }
        if(req.body.cash){
            request.cash=req.body.cash
        }
        await request.save()
        console.log(request);
        res.send({ success: true, request: request });

    } catch (err) {
        console.log("error ", err);
        return res.status(400).send({ success: false, message: err.message });
    }
};


export const approveRequest=async(req, res)=>{
    try{
        const {reqId}=req.body
        const request=await Request.findById(reqId)
        request.status="Approved"
        request.save()
        return res.send({success: true, request:request})
    }catch(err){
        console.log("error ", err)
        return res.status(400).send({success:false, message:err.message})
    }
}

export const fetchUserRequests=async(req, res)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1]
        const verify=jwt.verify(token, 'your_jwt_secret')
        const user=await User.findById(verify.id)
        console.log(user)
        const requests=await Request.find({status:"Pending"}).populate('itemOne').populate('itemTwo')
        if(requests && requests.length!=0){
            const filteredRequests=requests.filter(request=>request.itemOne.ownerEmail==user.email)
            return res.send({success:true,requests:filteredRequests})
        }
        return res.send({success:true,requests:[]})
    }catch(err){
        console.log(err)
        return res.status(400).send({success:false, message:err})
    }

}

export const fetchApprovedRequests=async(req, res)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1]
        const verify=await jwt.verify(token, 'your_jwt_secret')
        if(!verify){
            return res.status(400).send({success:false, message:'Invalid token'})
        }
        const user=await User.findById(verify.id)
        const requests=await Request.find({status:"Approved"}).populate('itemOne').populate('itemTwo')
        if(requests && requests.length!=0){
            const filteredRequests=requests.filter(request=>request.itemOne.ownerEmail==user.email || request.itemTwo.ownerEmail==user.email)
            return res.send({success:true,requests:filteredRequests})
        }
        return res.send({success:true, requests:[]})
    }catch(err){
        console.log(err)
        return res.status(200).send({success:false, message: err})
    }
}

export const completeRequest=async(req, res)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1]
        const verify=jwt.verify(token, 'your_jwt_secret')
        const {reqId}=req.body
        const request=await Request.findById(reqId)
        if(!request.completedByOne){
            request.completedByOne=verify.email
            request.save()
            return res.send({success: true, request:request})
        }
        if(request.completedByOne==verify.email){
            return res.status(201).send({success:false, message:"User already received"})
        }
        request.completedByTwo=verify.email
        request.status="Completed"
        await request.save()
        const itemOne=await Item.findById(request.itemOne._id)
        const itemTwo=await Item.findById(request.itemTwo._id)
        const emailOne=itemOne.ownerEmail
        const emailTwo=itemTwo.ownerEmail
        itemOne.ownerEmail=emailTwo
        itemTwo.ownerEmail=emailOne
        console.log(itemOne)
        console.log(itemTwo)
        await itemOne.save()
        await itemTwo.save()
        return res.send({success: true, request:request})
    }catch(err){
        console.log("error ", err)
        return res.status(400).send({success:false, message:err.message})
    }
}