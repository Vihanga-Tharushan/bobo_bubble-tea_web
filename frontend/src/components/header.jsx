import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contacts" },
    { label: "Careers", to: "/careers" },
];

export default function Header() {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-40 w-full bg-primary/80 backdrop-blur-md border-b border-accent/15">
            <div className="max-w-7xl mx-auto h-20 px-6 md:px-10 flex items-center justify-between gap-8">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative h-12 w-12 rounded-2xl bg-accent flex items-center justify-center shadow-md shadow-accent/30 transition-transform duration-300 group-hover:scale-105">
                        <img
                            src="/BOBOimg.png"
                            alt="BOBO"
                            className="h-11 w-11 object-contain"
                        />
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-lg font-extrabold tracking-tight text-secondary">
                            BOBO
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                            Sip &amp; Scoop
                        </span>
                    </div>
                </Link>

                {/* Center Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-accent/5 rounded-full px-2 py-1.5 border border-accent/10">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                    isActive
                                        ? "bg-accent text-white shadow-sm shadow-accent/30"
                                        : "text-secondary/70 hover:text-accent hover:bg-accent/10"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-secondary/70 hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="Search"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                        <span>Search</span>
                    </button>

                    <Link
                        to="/login"
                        className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-secondary hover:text-accent transition-colors"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/cart"
                        className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white shadow-md shadow-accent/30 hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all"
                        aria-label="Cart"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-primary text-[10px] font-bold flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
