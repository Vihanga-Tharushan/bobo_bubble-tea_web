import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import ProductCard from "../components/productCard";
import { loadCart, updateQuantity, removeFromCart } from "../utils/cart";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);
        setCart(loadCart());
        setLoading(false);

    }, []);

    const handleUpdate = (productId, delta) => {
        const updated = updateQuantity(productId, delta);
        if (updated) setCart([...updated]);
    };

    const handleRemove = (productId) => {
        const updated = removeFromCart(productId);
        setCart([...updated]);
        toast.success("Item removed from cart");
    };

    const subtotal = cart.reduce((sum, item) => sum + item.labelPrice * item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-screen bg-primary flex flex-col items-center justify-center px-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-16 shadow-lg border border-accent/10 flex flex-col items-center text-center max-w-md">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                        <FiShoppingCart className="text-accent" size={36} />
                    </div>
                    <h2 className="text-secondary text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-secondary/60 text-sm">Looks like you haven't added anything yet. Browse our products and find something you love!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-primary py-3 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
             
                <h1 className="text-secondary text-3xl font-bold mb-6">Your Cart</h1>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.productId} className="group bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-accent/10 shadow-sm hover:shadow-md hover:border-accent/25 transition-all duration-200">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-22 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden bg-secondary/5 shrink-0 items-center justify-center flex">
                                    <img src={item.image} alt={item.name} className="w-20 h-30 object-cover " />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-secondary font-semibold text-base md:text-lg truncate">{item.name}</h3>
                                            <p className="text-accent font-bold text-lg mt-1">Rs.{item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.productId)}
                                            className="p-2 text-secondary/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Remove item"
                                        >
                                            <ImCross size={12} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 md:mt-6">
                                        <div className="flex items-center gap-1 bg-secondary/5 rounded-xl p-1 border border-secondary/10">
                                            <button
                                                onClick={() => handleUpdate(item.productId, -1)}
                                                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                                            >
                                                <FaAngleDown size={16} />
                                            </button>
                                            <span className="w-10 text-center font-semibold text-secondary text-sm select-none">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdate(item.productId, 1)}
                                                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                                            >
                                                <FaAngleUp size={16} />
                                            </button>
                                        </div>
                                        <p className="text-secondary font-semibold text-sm md:text-base">
                                            Rs.{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-accent/10 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-secondary/70 text-sm">Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"})</span>
                        <span className="text-secondary/70 text-sm line-through relative">
                            Rs.{subtotal.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-accent/10">
                        <span className="text-secondary font-bold text-xl">Total</span>
                        <span className="text-accent font-bold text-2xl">Rs.{total.toLocaleString()}</span>
                    </div>

                    <Link
                        to="/checkout"
                        state={{ cart }}
                        className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-[0_8px_24px_-6px_rgba(157,78,221,0.5)] hover:shadow-[0_10px_30px_-6px_rgba(157,78,221,0.7)] hover:bg-accent/90 active:scale-[0.98] transition-all duration-200"
                    >
                        Proceed to Checkout
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
