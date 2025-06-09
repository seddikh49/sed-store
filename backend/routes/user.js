import express from 'express'
const userRouter = express.Router()
import admin from '../controllers/user.js'
import authAdmin from '../middlewares/admin.js'




userRouter.post('/admin',  admin)
userRouter.post('/verify-token', authAdmin, async(req, res) => {
    const { role, id } = req.user
    return res.json({ role, msg: 'Token verified seccussfully', id: id })
})



export default userRouter