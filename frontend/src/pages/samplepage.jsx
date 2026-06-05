import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import ImageSlider from "@/components/ImageSlider";

export const Route = createFileRoute("/product/$productId")({
  component: ProductOverviewPage,
});

// Mock product — replace with loader fetch when wired to backend
const mockProduct = {
  productId: "BOBO-TARO-001",
  name: "Taro Bubble Tea Deluxe",
  altNames: ["Taro Milk Tea", "Purple Boba"],
  images: [
    "https://images.unsplash.com/photo-1558857563-b371033873b8?w=900&q=80",
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&q=80",
    "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=900&q=80",
    "https://images.unsplash.com/photo-1525803377221-4f6ccdaa2b7d?w=900&q=80",
  ],
  price: 6.5,
  labelPrice: 8.0,
  description:
    "Our signature creamy taro bubble tea blended with premium tapioca pearls. Naturally sweet, velvety smooth, and crowned with a luscious purple swirl — a fan favorite at every BOBO store.",
  category: "Bubble Tea",
};

function ProductOverviewPage() {
  const product = mockProduct;
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);

  const discount = Math.round(
    ((product.labelPrice - product.price) / product.labelPrice) * 100,
  );

  return (
    <div className="min-h-screen w-full bg-bobo-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-bobo-cream/80 backdrop-blur border-b border-bobo-secondary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-bobo-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-bold text-bobo-secondary">BOBO</span>
          </div>
          <button className="relative inline-flex items-center gap-2 text-bobo-secondary hover:text-accent transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-bobo-secondary/60 mb-6">
          <span>Shop</span> <span className="mx-1">/</span>
          <span>{product.category}</span> <span className="mx-1">/</span>
          <span className="text-bobo-secondary font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image side */}
          <div>
            <ImageSlider images={product.images} alt={product.name} />
          </div>

          {/* Details side */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold uppercase tracking-wide">
              {product.category}
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-bobo-secondary leading-tight">
              {product.name}
            </h1>

            {product.altNames.length > 0 && (
              <p className="mt-1 text-sm text-bobo-secondary/60">
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
                      i < 4 ? "fill-accent text-accent" : "text-bobo-secondary/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-bobo-secondary/70">4.8 (1,284 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mt-6">
              <span className="text-4xl font-bold text-bobo-secondary">
                ${product.price.toFixed(2)}
              </span>
              {product.labelPrice > product.price && (
                <>
                  <span className="text-lg text-bobo-secondary/40 line-through mb-1">
                    ${product.labelPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-accent bg-accent-light px-2 py-1 rounded-full mb-1">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-bobo-secondary/80 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity + actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white border border-bobo-secondary/15 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-12 w-12 flex items-center justify-center text-bobo-secondary hover:bg-accent-light transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold text-bobo-secondary">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-12 w-12 flex items-center justify-center text-bobo-secondary hover:bg-accent-light transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold h-12 px-6 hover:bg-accent/90 transition-all shadow-[0_10px_28px_-8px_rgba(157,78,221,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(157,78,221,0.8)]"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => setWish((w) => !w)}
                aria-label="Add to wishlist"
                className={`h-12 w-12 rounded-full border flex items-center justify-center transition-colors ${
                  wish
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-bobo-secondary border-bobo-secondary/15 hover:border-accent hover:text-accent"
                }`}
              >
                <Heart className={`h-5 w-5 ${wish ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              <Badge icon={<Truck className="h-4 w-4" />} label="Free delivery" sub="Over $20" />
              <Badge icon={<ShieldCheck className="h-4 w-4" />} label="Fresh daily" sub="Made to order" />
              <Badge icon={<RotateCcw className="h-4 w-4" />} label="Easy returns" sub="Within 24h" />
            </div>

            {/* Meta */}
            <div className="mt-8 pt-6 border-t border-bobo-secondary/10 text-xs text-bobo-secondary/60 space-y-1">
              <p>
                <span className="font-semibold text-bobo-secondary">SKU:</span>{" "}
                {product.productId}
              </p>
              <p>
                <span className="font-semibold text-bobo-secondary">Category:</span>{" "}
                {product.category}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Badge({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1 p-3 rounded-2xl bg-white border border-bobo-secondary/10">
      <div className="h-8 w-8 rounded-full bg-accent-light text-accent flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-semibold text-bobo-secondary">{label}</span>
      <span className="text-[10px] text-bobo-secondary/60">{sub}</span>
    </div>
  );
}
