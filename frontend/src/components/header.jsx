export default function Header() {
    return (
        <header className="w-full h-20 bg-accent text-white px-10">

            <div className="h-full w-full flex relative">

                <img src="logo.png" alt="BOBO Logo" className="h-full w-auto px-12 object-cover absolute left-0" />

                <nav className="h-full w-full flex items-center justify-end gap-10 pr-14 pl-28"> 

                    <a href="/" className="text-lg font-semibold hover:text-secondary">HOME</a>
                    <a href="/products" className="text-lg font-semibold hover:text-secondary">PRODUCTS</a>
                    <a href="/about" className="text-lg font-semibold hover:text-secondary">ABOUT US</a>
                    <a href="/contacts" className="text-lg font-semibold hover:text-secondary">CONTACT US</a>
                    <a href="/careers" className="text-lg font-semibold hover:text-secondary">CAREERS</a>
                </nav>

            </div>

        </header>
    );
}