import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiPackage, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ProductDeleteConfirm(props){
    const productId = props.productId;
    const close = props.close; // Function to close the confirmation popup
    const refresh = props.refresh; // Function to trigger refresh of product list after deletion

    function deleteProduct() {

        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

        // Set the Authorization header with the token

        axios.delete(import.meta.env.VITE_API_URL+"/api/products/"+ productId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Product deleted successfully:', response.data);
            close(false);
            toast.success('Product deleted successfully');
            refresh(); // Trigger re-fetching of products after deletion
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            close(false);
            toast.error('Failed to delete product. Please try again.');
        });
    }

    return (
        <div className="fixed left-0 top-0 w-full h-screen bg-[#00000060] backdrop-blur-[2px] flex items-center justify-center z-100 opacity-100"> {/* Semi-transparent backdrop */}
            <div className="bg-primary rounded-lg shadow-lg p-6 w-full max-w-md border border-secondary/20">
                <h2 className="text-xl font-semibold text-secondary mb-4 text-center">Confirm Deletion</h2>
                <p className="text-md text-secondary mb-6 text-center">Are you sure you want to delete the product with ID {productId}?</p>
                <div className="flex justify-center gap-4">    
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors" onClick={() => props.close(false)}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors" onClick={() => {
                        deleteProduct();
                    }}>
                        Delete
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default function AdminProductPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);


    useEffect(() => {

        if(isLoading) {

            axios.get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setError(null); // Clear error on success
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    setError("Failed to load products. Please try again later.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }, [isLoading]); //we use this dependency array to ensure the products are fetched only once when the component mounts

    // Client-side search filter
    const filteredProducts = products.filter(product => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="min-h-screen bg-primary">

            {
                showConfirm && <ProductDeleteConfirm refresh={() => setIsLoading(true)} productId={productToDelete} close={() => setShowConfirm(false)} />
            }
            

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


                {/* Search & Filters Bar */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or category..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-secondary/10 rounded-xl text-secondary placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2.5 bg-white/60 border border-secondary/10 rounded-xl text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all cursor-pointer">
                            <option>All Categories</option>
                            {/* Ideally map categories here from state */}
                        </select>
                        <select className="px-4 py-2.5 bg-white/60 border border-secondary/10 rounded-xl text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all cursor-pointer">
                            <option>Sort by</option>
                        </select>
                    </div>

                    <div
                        className="ml-auto flex items-center gap-2"
                    >
                        <button
                                onClick={() => navigate('/admin/add-product')}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] "
                                title="Add new product"
                            >
                                <FiPlus size={18} />
                                <span className="hidden sm:inline">Add Product</span>
                        </button>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white/70 backdrop-blur-sm border border-secondary/10 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-secondary/5 border-b border-secondary/10">
                                <tr>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">ID</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Image</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Name</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider hidden md:table-cell">Description</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Category</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Labeled Price</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Price</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-secondary/60 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary/5">
                                {isLoading ? (
                                    // Loading Skeleton
                                    [...Array(5)].map((_, idx) => (
                                        <tr key={`skeleton-${idx}`} className="animate-pulse">
                                            <td className="py-4 px-6"><div className="h-4 w-12 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6"><div className="w-16 h-16 bg-secondary/10 rounded-lg"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 w-32 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6 hidden md:table-cell"><div className="h-4 w-48 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 w-20 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 w-16 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 w-16 bg-secondary/10 rounded"></div></td>
                                            <td className="py-4 px-6"><div className="h-8 w-20 bg-secondary/10 rounded-lg"></div></td>
                                        </tr>
                                    ))
                                ) : error ? (
                                    // Error State
                                    <tr>
                                        <td colSpan="8" className="py-16 px-6 text-center">
                                            <div className="flex flex-col items-center gap-3 text-red-500">
                                                <FiAlertCircle size={48} className="opacity-70" />
                                                <p className="text-lg font-medium">{error}</p>
                                                <button 
                                                    onClick={() => window.location.reload()} 
                                                    className="mt-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-medium rounded-lg transition-colors"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredProducts.length === 0 ? (
                                    // Empty State
                                    <tr>
                                        <td colSpan="8" className="py-16 px-6 text-center">
                                            <div className="flex flex-col items-center gap-3 text-secondary/50">
                                                <FiPackage size={48} className="opacity-50" />
                                                <p className="text-lg font-medium">No products found</p>
                                                <p className="text-sm">
                                                    {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first product"}
                                                </p>
                                                {!searchQuery && (
                                                    <button 
                                                        onClick={() => navigate('/admin/add-product')}
                                                        className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-lg transition-colors"
                                                    >
                                                        <FiPlus size={16} />
                                                        Add Product
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr 
                                            key={product.productId} 
                                            className="group hover:bg-accent/5 transition-colors duration-150"
                                        >
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-mono text-secondary/60">#{product.productId}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-200">
                                                    <img 
                                                        // Safe access: check if images exist, else use placeholder
                                                        src={product.images?.[0]} 
                                                        alt={product.name || "Product Image"} 
                                                        className="w-full h-full object-cover rounded-xl border border-secondary/10 shadow-sm"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-semibold text-secondary line-clamp-1">{product.name}</span>
                                            </td>
                                            <td className="py-4 px-6 hidden md:table-cell">
                                                <span className="text-sm text-secondary/70 line-clamp-2">{product.description}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm text-secondary/50 line-through">Rs.{product.labelPrice}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-bold text-accent">Rs.{product.price}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5">
                                                    <button 
                                                        className="inline-flex items-center justify-center p-2 text-secondary/50 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-150 active:scale-95" 
                                                        title="Edit product"
                                                        aria-label="Edit product"
                                                        onClick={() => navigate('/admin/update-product', { state: product })}
                                                    >
                                                        <FiEdit size={17} />
                                                    </button>
                                                    <button 
                                                        onClick={
                                                            () => {
                                                                setShowConfirm(true);
                                                                setProductToDelete(product.productId);
                                                            }
                                                        }
                                                        className="inline-flex items-center justify-center p-2 text-secondary/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-150 active:scale-95" 
                                                        title="Delete product"
                                                        aria-label="Delete product"
                                                    >
                                                        <FiTrash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!isLoading && !error && filteredProducts.length > 0 && (
                        <div className="px-6 py-4 border-t border-secondary/10 bg-secondary/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-sm text-secondary/60">
                                Showing <span className="font-medium text-secondary">{filteredProducts.length}</span> of <span className="font-medium text-secondary">{products.length}</span> products
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-sm font-medium text-secondary/60 hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed bg-white/50 border border-secondary/10 rounded-lg hover:bg-white transition-colors" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-white bg-accent border border-accent rounded-lg">
                                    1
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-secondary/60 hover:text-secondary bg-white/50 border border-secondary/10 rounded-lg hover:bg-white transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-secondary/60 hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed bg-white/50 border border-secondary/10 rounded-lg hover:bg-white transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}