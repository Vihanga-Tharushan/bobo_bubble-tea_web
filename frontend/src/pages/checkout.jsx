import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import ProductCard from "../components/productCard";
import { loadCart, updateQuantity, removeFromCart } from "../utils/cart";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
   
    const location = useLocation();
    const [cart, setCart] = useState(() => {
        if (Array.isArray(location.state)) return location.state;
        if (location.state?.cart) return location.state.cart;
        return [];
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            setCart(loadCart());
        }
        setLoading(false);
    }, []);

    const handleUpdate = (productId, delta) => {
        updateQuantity(productId, delta);
        setCart((prev) =>
            prev
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter((item) => item.quantity >= 1)
        );
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        toast.success("Item removed from cart");
    };

    async function purchaseCart() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to proceed with the purchase.");
            navigate("/login");
            return;
        }

        try {

            const items = [];
            for(i=0; i<cart.length; i++){
                items.push({
                    productId: cart[i].productId,
                    quantity: cart[i].quantity
                });
            }

            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/orders",
                { items: items },
                {address: "123 Main St, City, Country"},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Purchase successful! Redirecting to orders...");
            localStorage.removeItem("cart");
            setTimeout(() => navigate("/orders"), 2000);


        } catch (error) {

            console.error("Purchase failed:", error);
            toast.error("Purchase failed. Please try again.");
        }


    }

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
        <div className="w-full min-h-screen bg-primary py-3 px-4 md:px-8 ">
            <div className="max-w-4xl mx-auto">
             
                <h1 className="text-secondary text-3xl font-bold mb-6">Checkout</h1>

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
                </div>

                <div className="mt-6 flex justify-end">
                    <Link
                        to="/payment"
                        state={cart}
                        onClick={purchaseCart}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-[0_10px_28px_-8px_rgba(34,197,94,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(34,197,94,0.8)]"
                    >
                        <FiShoppingCart size={18} />
                            <span>Order Now</span>
                        
                    </Link>
                </div>
            </div>
        </div>
    );
}   
