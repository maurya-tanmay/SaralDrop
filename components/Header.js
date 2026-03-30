function Header() {
    return (
        <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-white shadow-sm" data-name="header" data-file="components/Header.js">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center cursor-pointer group" onClick={() => window.location.href = 'index.html'}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center mr-3 shadow-lg transform group-hover:rotate-12 transition-transform">
                            <i className="icon-rocket text-white text-xl"></i>
                        </div>
                        <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink tracking-tight">SaralDrop</span>
                    </div>
                    <nav className="hidden md:flex space-x-8 bg-white/50 px-6 py-2 rounded-full border border-gray-100">
                        <a href="#how-it-works" className="text-gray-600 hover:text-brand-purple px-2 py-1 text-sm font-bold transition-colors">How it works</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center shadow-sm">
                            <i className="icon-user-x mr-2"></i> No Account Needed
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
