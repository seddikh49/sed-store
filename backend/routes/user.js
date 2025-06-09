import express from 'express'
const userRouter = express.Router()
import admin from '../controllers/user.js'




userRouter.post('/admin',  admin)




export default userRouter