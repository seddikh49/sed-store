import express from 'express'
import { addOrder, getAllOrders, deleteOrder, updateOrder, updateAllNotifications } from '../controllers/order.js'
import authAdmin from '../middlewares/admin.js'



const orderRouter = express.Router()


orderRouter.post('/add', addOrder)
orderRouter.get('/list', getAllOrders)
orderRouter.delete('/delete/:id', deleteOrder)
orderRouter.put('/update/:id', updateOrder)
orderRouter.put('/updateNotifications', updateAllNotifications)






export default orderRouter