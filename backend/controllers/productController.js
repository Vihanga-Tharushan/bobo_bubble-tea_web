import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to create a product"
        });
    }

    try {
        const productData = req.body;

        const product = new Product(productData);

        await product.save();
        res.status(201).json({
                message: "Product created successfully",
                product: product
            });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}

export async function getProducts(req, res) {

    try {

        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({ error: error.message });
     }
}

export async function deleteProduct(req, res) {

    if (!isAdmin(req)) {
            return res.status(403).json({
                message: "You are not authorized to delete a product"
            });
        }

    try {

        const productId = req.params.productId;

        if(productId == null || productId == undefined) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

       await Product.deleteOne({
            productId: productId
       });

       res.json({
        message: "Product deleted successfully"
       });


    } catch (error) {

        console.log(error);
        res.status(500).json({ error: error.message });
     }
}

export async function updateProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to update a product"
        });
    }

    try {

        const productId = req.params.productId;
        const updateData = req.body;
        if(productId == null || productId == undefined) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        await Product.updateOne(
            {productId: productId}, updateData
        );

        res.json({
            message: "Product updated successfully"
        });
    
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: error.message });
     }
}

export async function getProductById(req, res) {
    try {
        const productId = req.params.productId;

        if(productId == null || productId == undefined) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        const product = await Product.findOne({ productId: productId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}