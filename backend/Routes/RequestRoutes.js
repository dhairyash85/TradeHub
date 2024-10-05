import express from 'express'
import { RequestTradeItems, approveRequest, fetchUserRequests } from '../Controller.js/RequestController.js'
const router=express.Router()

router.post('/addRequest', RequestTradeItems)
router.post('/', fetchUserRequests)
router.post('/approve', approveRequest)
export default router