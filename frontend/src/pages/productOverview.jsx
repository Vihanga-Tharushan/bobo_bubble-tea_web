import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw
} from "lucide-react";
import { SiBuymeacoffee } from "react-icons/si";
import Loader from "./loader";
import toast from "react-hot-toast";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { Link } from "react-router-dom";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [state, setState] = useState("loading");
  
  // UI States for interactions
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (state === "loading" && params.id) {
      axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
        .then((response) => {
          setProduct(response.data);
          setState("loaded");
        })
        .catch(err => {
          console.error('Error fetching product details:', err);
          setState("error");
          toast.error('Failed to load product details. Please try again later.');
        });
    }
  }, [params, state]);

  // Calculate discount safely
  const discount = product && product.labelPrice > product.price
    ? Math.round(((product.labelPrice - product.price) / product.labelPrice) * 100)
    : 0;

  if (state === "loading") {
    return (
      <div className="w-full min-h-screen bg-primary flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (state === "error" || !product) {
    return (
      <div className="w-full min-h-screen bg-primary flex items-center justify-center">
        <p className="text-secondary font-medium">Error loading product details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-primary py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* LEFT: Image Side */}
          <div className="flex items-start justify-center">
            <ImageSlider images={product.images} alt={product.name} />
          </div>

          {/* RIGHT: Details Side */}
          <div className="flex flex-col mt-14">
            
            {/* Category Badge */}
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold uppercase tracking-wide">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-secondary leading-tight">
              {product.name}
            </h1>

            {/* Alt Names */}
            {product.altNames && product.altNames.length > 0 && (
              <p className="mt-1 text-sm text-secondary/60">
                Also known as: {product.altNames.join(", ")}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "fill-accent text-accent" : "text-secondary/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-secondary/70">4.8 (1,284 reviews)</span>
            </div>

            {/* Price Section */}
            <div className="flex items-end gap-3 mt-6">
              <span className="text-4xl font-bold text-secondary">
                LKR {product.price.toFixed(2)}
              </span>
              {product.labelPrice > product.price && (
                <>
                  <span className="text-lg text-secondary/40 line-through mb-1">
                    LKR {product.labelPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-accent bg-accent-light px-2 py-1 rounded-full mb-1">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-secondary/80 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity + Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-white border border-secondary/15 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-12 w-12 flex items-center justify-center text-secondary hover:bg-accent-light transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold text-secondary">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-12 w-12 flex items-center justify-center text-secondary hover:bg-accent-light transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold h-12 px-6 hover:bg-[#8a3dc7] transition-all shadow-[0_10px_28px_-8px_rgba(157,78,221,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(157,78,221,0.8)]"
                onClick={() => {
                    addToCart(product, qty);
                    toast.success(`${qty} - ${product.name} added to cart!`);
                    console.log(localStorage.getItem("cart")); // For debugging: log the current cart state
                }
                }
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>

              {/* Buy Now Button with money logo */}
              <Link
                type="button"
                to="/checkout"
                state={[{
                 
                  image: product.images[0],
                  name: product.name,
                  price: product.price,
                  quantity: qty,
                  productId: product.productId,
                  labelPrice: product.labelPrice

                }] } // Pass the selected product and quantity to checkout
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-green-600 text-white font-semibold h-12 px-6 hover:bg-green-700 transition-all shadow-[0_10px_28px_-8px_rgba(34,197,94,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(34,197,94,0.8)]"
                onClick={() => {
                    addToCart(product, qty);
                    toast.success(`Proceeding to checkout with ${qty} - ${product.name}!`);
                }}
              >
                <SiBuymeacoffee className="h-5 w-5" />
                Buy Now
              </Link>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setWish((w) => !w)}
                aria-label="Add to wishlist"
                className={`h-12 w-12 rounded-full border flex items-center justify-center transition-colors ${
                  wish
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-secondary border-secondary/15 hover:border-accent hover:text-accent"
                }`}
              >
                <Heart className={`h-5 w-5 ${wish ? "fill-current" : ""}`} />
              </button>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Badge Component for Trust Indicators
function Badge({ icon, label, sub }) {
  return (
    <div className="flex flex-col items-start gap-1 p-3 rounded-2xl bg-white border border-secondary/10">
      <div className="h-8 w-8 rounded-full bg-accent-light text-accent flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-semibold text-secondary">{label}</span>
      <span className="text-[10px] text-secondary/60">{sub}</span>
    </div>
  );
}