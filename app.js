class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div className="flex flex-col min-h-screen w-full" data-name="app" data-file="app.js">
        <Header />
        
        <main className="flex-grow z-10">
            {/* Hero Section */}
            <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pb-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                        <div className="md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center text-center mb-16 lg:mb-0">
                            <div>
                                <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-brand-pink/20">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
                                    </span>
                                    <span className="text-sm font-bold text-brand-purple">Created by - Black Devil😈</span>
                                </div>
                                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl leading-tight">
                                    <span className="block">File sharing</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange mt-2 pb-2">reimagined</span>
                                </h1>
                                <p className="mt-6 text-lg text-gray-600 sm:text-xl lg:text-xl max-w-xl mx-auto lg:mx-0">
                                    Send files. Receive instantly. Zero friction.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 sm:mt-16 lg:mt-0 lg:col-span-6 z-10 relative">
                            {/* Decorative elements behind the widget */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-full blur-2xl opacity-50 z-0 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-brand-teal to-brand-purple rounded-full blur-2xl opacity-50 z-0 animate-pulse" style={{animationDelay: '1s'}}></div>
                            
                            <div className="max-w-md mx-auto sm:max-w-lg relative z-10 transform transition-transform hover:-translate-y-1 duration-500">
                                <FileTransfer />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="how-it-works" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border-y border-white"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">How simple is it?</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-teal rounded-full opacity-20 z-0"></div>
                        
                        <div className="relative z-10 group">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-purple/10 transform transition-transform group-hover:scale-110 group-hover:rotate-6 border-2 border-brand-purple/10">
                                <span className="text-4xl font-black text-brand-purple">1</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Upload</h3>
                            <p className="text-gray-600 text-center leading-relaxed">Drag and drop any file up to 2GB. We'll encrypt it right in your browser.</p>
                        </div>
                        
                        <div className="relative z-10 group">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-pink/10 transform transition-transform group-hover:scale-110 group-hover:-rotate-6 border-2 border-brand-pink/10">
                                <span className="text-4xl font-black text-brand-pink">2</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Get Code</h3>
                            <p className="text-gray-600 text-center leading-relaxed">Receive a secure, randomized 4-digit code instead of a clunky URL.</p>
                        </div>
                        
                        <div className="relative z-10 group">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-teal/10 transform transition-transform group-hover:scale-110 group-hover:rotate-6 border-2 border-brand-teal/10">
                                <span className="text-4xl font-black text-brand-teal">3</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Receive</h3>
                            <p className="text-gray-600 text-center leading-relaxed">The receiver enters the code on any device to instantly download the file.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);