import express from 'express'
import { addProduct, removeProducts, singleProduct, listProducts } from '../controllers/product.js'
import upload from '../middlewares/multer.js'

import authAdmin from '../middlewares/admin.js'
// authAdmin,

const productRouter = express.Router()



productRouter.post('/add',authAdmin,  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)

productRouter.post('/single', singleProduct)
productRouter.post('/remove',  removeProducts)


productRouter.get('/list', listProducts)



export default productRouter