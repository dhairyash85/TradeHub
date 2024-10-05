import jwt from 'jsonwebtoken';
import Item from "../Models/Item.js";
import User from "../Models/User.js";
import Request from '../Models/Request.js';

export const RequestTradeItems = async (req, res) => {
    try {
        const { itemOne, itemTwo } = req.body;
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

        // Fetch itemOne details to get the owner
        const itemOneDetails = await Item.findById(itemOne._id);
        if (!itemOneDetails) {
            return res.status(404).send({ success: false, message: 'ItemOne not found' });
        }

        // Get the user associated with the itemOne's owner,,:;
        const requestToUser = await User.findOne({email:itemOneDetails.ownerEmail});  // Adjust this field as per your model
        if (!requestToUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const requestTo = requestToUser._id;

        console.log("Request From: ", requestFrom);  // Debugging log
        console.log("Request To: ", requestTo);      // Debugging log

        const request = await Request.create({
            requestFrom: requestFrom,
            requestTo: requestTo,
            itemOne: itemOne._id,
            itemTwo: itemTwo._id,
        });

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
        return res.status(400).send({success:false, message:err.message})
    }

}