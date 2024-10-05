import express from 'express'
const router=express.Router()
import { AddItem, getAllItems, getUserItems } from '../Controller.js/ItemController.js'
router.post('/add', AddItem)
router.post('/', getAllItems)
router.post('/user', getUserItems)
export default router