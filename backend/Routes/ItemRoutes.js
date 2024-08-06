import express from 'express'
const router=express.Router()
import { AddItem } from '../Controller.js/ItemController.js'
router.post('/add', AddItem)
export default router