import axios from "axios";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import ProductCard from "../components/productCard";



export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (isLoading) {

            axios.get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching products:', err);
                    setIsLoading(false);
                    toast.error('Failed to load products. Please try again later.');
                });
        }

    }, [isLoading]);

    return (
        <div className="h-[calc(100vh-80px)] bg-primary pt-10">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center max-w-7xl mx-auto px-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                
            )}

            <a href="https://ibb.co/WvdT8L0g"><img src="https://i.ibb.co/GQ1hYq9c/Bubble-Tea.png" alt="Bubble-Tea" border="0" /></a>
           <img src="https://i.ibb.co/R4PL2pbj/Caremal-Bubble-Tea.png" alt="Caremal-Bubble-Tea" border="0"/>
        </div>
    );
}