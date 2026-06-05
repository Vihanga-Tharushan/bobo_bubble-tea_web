import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";

export default function HomePage() {
    return (
        <div className="w-full h-screen bg-primary">
            <Header />
            <Routes path="/">
                <Route path="/" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">Welcome to BOBO</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/about" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">About Us</h1>} />
                <Route path="/contacts" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">Contact Us</h1>} />
                <Route path="/careers" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">Careers</h1>} />
                <Route path="/overview/:id" element={<ProductOverview />} />
                <Route path="/*" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">404 Page Not Found</h1>} />
            </Routes>
        </div>
    );
}