import express from 'express'
import { RequestTradeItems, approveRequest, completeRequest, fetchApprovedRequests, fetchUserRequests } from '../Controller.js/RequestController.js'
const router=express.Router()

router.post('/addRequest', RequestTradeItems)
router.post('/', fetchUserRequests)
router.post('/approve', approveRequest)
router.post('/fetchApproved', fetchApprovedRequests)
router.post('/complete', completeRequest)
export default router