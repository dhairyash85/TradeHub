import express from 'express'
const router=express.Router()
import { Register, Login, verifyToken } from '../Controller.js/Authentication.js'
import User from '../Models/User.js'



router.post('/register', Register)
router.post('/login', Login)
router.post('/verify', verifyToken)
export default router