import express from "express";
import Product from '../models/products.js';




const listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({});
        res.status(200).json({ products: products, msg: true });
    } catch (error) {
        res.status(500).json({ error: error, msg: false });
    }
}

const addProduct = async (req, res) => {
    const images = [];

    if (req.files.image1) images.push(req.files.image1[0].path);
    if (req.files.image2) images.push(req.files.image2[0].path);
    if (req.files.image3) images.push(req.files.image3[0].path);
    if (req.files.image4) images.push(req.files.image4[0].path);

    try {
        const {
            name,
            description,
            price,
            category,
            date,
        } = req.body;
     

        const newProduct = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            image:images, // ← أضفها هنا أيضاً
            date: new Date()
        });
        res.status(200).json({ success: true, newProduct, msg: "product added successfully" });
    } catch (error) {
        res.json({ err: error, msg: "fail to add product" });
    }
};





const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const singleProduct = await productModel.findByPk(productId);
        res.json({
            msg: "this product deleted succesfully",
            product: singleProduct,
        });
    } catch (error) {
        console.log(error);
    }
};


const removeProducts = async (req, res) => {

}



export { addProduct, listProducts, removeProducts, singleProduct };