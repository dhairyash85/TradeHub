import User from "../Models/User.js"
import jwt from 'jsonwebtoken';

export const Register=async(req, res)=>{
    const {name, phone, email, password}=req.body
    try{
        const check = await User.find({
            $or: [
              { email: email },
              { phone: phone }
            ]
          });
          if(check){
            return res.status(400).json({message: "Email or Phone already exist"})
          }
        const user = await User.create({name, email, password, phone})
        return res.send({success:true, user: user})
    }catch(err){
        return res.status(400).send({success:false, message:err.message})
    }
}

export const Login=async(req, res)=>{
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password==password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err });
  }
}