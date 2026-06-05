import { Link } from "react-router-dom";

export default function ProductCard(props) {

   const product = props.product;

    return (
        
        <Link to={"/overview/"+product.productId} className="group w-full max-w-sm rounded-2xl overflow-hidden bg-white shadow-[0_8px_24px_rgba(46,26,71,0.12)] transition-all duration-300 hover:shadow-[0_0px_30px_rgba(157,78,221,0.4),0_12px_32px_rgba(46,26,71,0.18)] hover:scale-105 cursor-pointer inline-block">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-linear-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

            {/* Image Section */}
            <div className="relative h-44 sm:h-52 overflow-hidden bg-linear-to-br from-accent/5 via-white to-accent/8">
                {/* Radial Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_60%,rgba(157,78,221,0.08)_0%,transparent_80%)]"></div>
                
                {/* Product Image */}
                <div className="absolute inset-3 sm:inset-5 flex items-center justify-center">
                    <img
                        alt={product.name}
                        src={product.images[0]}
                        className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] w-full h-full"
                    />
                </div>

                {/* Category Badge - Left */}
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-accent text-white text-[8px] sm:text-[10px] font-bold rounded-full shadow-md shadow-accent/30">
                    {product.category}
                </span>

                
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 group-hover:bg-linear-to-r group-hover:from-transparent group-hover:via-accent/40 group-hover:to-transparent transition-all duration-500"></div>

            {/* Content Section */}
            <div className="p-3 sm:p-4">
                {/* Product Name */}
                <h3 className="text-[14px] sm:text-[16px] font-extrabold leading-snug line-clamp-1 mb-1 text-secondary group-hover:text-accent transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Product Description */}
                <p className="text-[10px] sm:text-[12px] leading-relaxed mb-3 line-clamp-2 min-h-6 text-gray-400 transition-colors duration-500">
                    {product.description || "Premium bubble tea with chewy tapioca pearls"}
                </p>

                {/* Price Section */}
                <div className="mt-3 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-accent/5">
                    <span className="text-[16px] sm:text-[18px] font-extrabold text-accent tracking-tight">
                        LKR {product.price.toFixed(2)}
                    </span>
                </div>

                
            </div>
        </Link>
    );
}