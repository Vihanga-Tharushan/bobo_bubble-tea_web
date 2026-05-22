import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct} from "../controllers/productController.js";

const productRouters = express.Router();

productRouters.post("/", createProduct);
productRouters.get("/", getProducts);
productRouters.delete("/:productId", deleteProduct);
productRouters.put("/:productId", updateProduct);
productRouters.get("/:productId", getProductById);

export default productRouters;