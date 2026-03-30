function Footer() {
    return (
        <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-100 mt-auto relative z-10" data-name="footer" data-file="components/Footer.js">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="flex items-center group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center mr-3 shadow-md transform group-hover:rotate-12 transition-transform">
                            <i className="icon-rocket text-white text-sm"></i>
                        </div>
                        <span className="font-black text-xl text-gray-800">SaralDrop</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}