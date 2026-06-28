import mediaUpload from "../../utils/mediaUpload";
import { useState } from "react";
import { FiPackage, FiUpload, FiArrowLeft, FiDollarSign, FiTag, FiType, FiGrid, FiFileText, FiInfo, FiHash } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const productData = location.state; // Get the product object from the state passed via navigate

    const [productId, setProductId] = useState(productData.productId);
    const [name, setName] = useState(productData.name);
    const [altNames, setAltNames] = useState(productData.altNames?.join(","));
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(productData.price.toString());
    const [labelPrice, setLabelPrice] = useState(productData.labelPrice.toString());
    const [description, setDescription] = useState(productData.description);
    const [category, setCategory] = useState(productData.category);
    const [stock, setStock] = useState(productData.stock ?? 0);


    

    async function updateProduct() {

         const token = localStorage.getItem("token");

        if (token == null) {
            navigate("/login");
            return;
        }

        // Upload images to Supabase and get their URLs
        const promises = [];

        for (let i = 0; i < images.length; i++) {
            
            promises[i] = mediaUpload(images[i]);
        }

        try {

            let Urls = await Promise.all(promises);

            if (Urls.length == 0) {
                Urls = productData.images; // Use existing images if no new images are uploaded
            }

            const alternateNames = altNames.split(",");

            const product = {
                productId: productId,
                name: name,
                altNames: alternateNames,
                images: Urls,
                price: price,
                labelPrice: labelPrice,
                description: description,
                category: category,
                stock: stock
            };

            const response = await axios.put(import.meta.env.VITE_API_URL + "/api/products/"+productId, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Product updated successfully");
                navigate("/admin/products");
            } else {
                toast.error("Failed to update product");
            }

            
        } catch (error) {
            console.error("Error ", error);
            toast.error("Failed to update product. Please try again.");
        }
    }


    // get product details from backend using productId and set the state variables accordingly

    


        


    return (
        <div className="min-h-screen bg-primary">

            {/* Form Card */}
            <main className="max-w-4xl mx-auto px-4">
                <div className="bg-white/70 backdrop-blur-sm border border-secondary/10 rounded-2xl shadow-sm overflow-hidden">
                    {/* Card Header */}
                    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-secondary/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <FiPackage className="text-accent" size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-secondary">
                                    Update Product
                                </h1>
                                <p className="text-sm text-secondary/50 mt-0.5">
                                    Fill in the details below to update the product information
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Product ID */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiHash size={12} />
                                    Product ID
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    placeholder="e.g. BOBO-001"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                                />
                            </div>

                            {/* Product Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiType size={12} />
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Mango Tango"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                                />
                            </div>

                            {/* Alternative Names */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiInfo size={12} />
                                    Alternative Names
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Mango Shake, Aam Ras"
                                    value={altNames}
                                    onChange={(e) => setAltNames(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiGrid size={12} />
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all cursor-pointer appearance-none"
                                >
                                    <option value="fruit-tea">Fruit Tea</option>
                                    <option value="milkshake">Milkshake</option>
                                    <option value="sundae">Sundae</option>
                                    <option value="ice-cream">Ice Cream</option>
                                    <option value="smoothie">Smoothie</option>
                                    <option value="coffee">Coffee</option>
                                    <option value="dessert">Dessert</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiDollarSign size={12} />
                                    Selling Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 font-medium text-sm">Rs.</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Label Price */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                    <FiTag size={12} />
                                    Label Price (MRP)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 font-medium text-sm">Rs.</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={labelPrice}
                                        onChange={(e) => setLabelPrice(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-5 space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                <FiFileText size={12} />
                                Description
                            </label>
                            <textarea
                                placeholder="Describe your product in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 bg-white border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="mt-5 space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wide text-secondary/60 flex items-center gap-1.5">
                                <FiUpload size={12} />
                                Product Images
                            </label>
                            <label className="relative flex flex-col items-center justify-center w-full min-h-35 px-4 py-6 bg-white border-2 border-dashed border-secondary/20 rounded-xl cursor-pointer hover:border-accent/40 hover:bg-accent/2 transition-all group">
                                <FiUpload className="text-secondary/30 group-hover:text-accent/60 transition-colors mb-2" size={28} />
                                <p className="text-sm text-secondary/50 group-hover:text-secondary/70 transition-colors">
                                    <span className="font-medium text-accent">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-secondary/40 mt-1">PNG, JPG, WEBP (max 5MB each)</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        setImages(e.target.files);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>

                        {/* Image Preview */}
                        {images.length > 0 && (
                            <div className="mt-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60 mb-3">
                                    Preview ({images.length} image{images.length !== 1 ? "s" : ""})
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {Array.from(images).map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative group/preview w-24 h-24 rounded-xl overflow-hidden border border-secondary/10 shadow-sm"
                                        >
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/20 transition-colors" />
                                            <span className="absolute bottom-1 right-1 text-[10px] font-medium bg-black/60 text-white px-1.5 py-0.5 rounded-md">
                                                {index + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock */}
                        <div className="mt-6">
                            <label htmlFor="stock" className="block text-sm font-medium text-secondary/80 mb-2">
                                Stock
                            </label>
                            <input
                                type="number"
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                                className="bg-secondary/10 border border-secondary/20 placeholder:text-secondary/50 text-secondary focus:ring-accent focus:border-accent rounded-lg py-2 px-4 focus:outline-none"
                                placeholder="Enter stock quantity"
                                min="0"
                            />
                        </div>

                        {/* Submit button at right corner */}
                        <div className="mt-8 pt-6 border-t border-secondary/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    updateProduct();
                                }}
                                className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-[0_8px_24px_-6px_rgba(157,78,221,0.6)] hover:shadow-[0_12px_32px_-6px_rgba(157,78,221,0.8)] transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2"
                            >
                                <FiPackage size={18} />
                                <span>Update Product</span>
                            </button>

                            <button
                               
                                  onClick={() => navigate('/admin/products')}
                                className="w-full sm:w-auto px-8 py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 ml-3 mt-3 sm:mt-0"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
