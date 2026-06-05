import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="w-full h-20 bg-accent text-white px-10">

            <div className="h-full w-full flex relative">

                <img src="/BOBOimg.png" alt="BOBO Logo" className="h-full w-auto  object-cover absolute left-0" />

                <nav className="h-full w-full flex items-center justify-end gap-10 pr-14 pl-28"> 

                    <Link to="/" className="text-lg font-semibold hover:text-secondary">HOME</Link>
                    <Link to="/products" className="text-lg font-semibold hover:text-secondary">PRODUCTS</Link>
                    <Link to="/about" className="text-lg font-semibold hover:text-secondary">ABOUT US</Link>
                    <Link to="/contacts" className="text-lg font-semibold hover:text-secondary">CONTACT US</Link>
                    <Link to="/careers" className="text-lg font-semibold hover:text-secondary">CAREERS</Link>
                </nav>

            </div>

        </header>
    );
}