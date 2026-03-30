function FileTransfer() {
    const [mode, setMode] = React.useState('send'); // 'send' or 'receive'
    
    // Send State
    const [isDragging, setIsDragging] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [uploadStatus, setUploadStatus] = React.useState('idle'); // idle, uploading, complete
    const [shareCode, setShareCode] = React.useState('');
    const [progress, setProgress] = React.useState(0);

    // Receive State
    const [inputCode, setInputCode] = React.useState(['', '', '', '']);
    const [receiveStatus, setReceiveStatus] = React.useState('idle'); // idle, searching, found, error
    const [foundFile, setFoundFile] = React.useState(null);

    const codeInputRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null)
    ];

    // --- Send Handlers ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
            setFiles([e.dataTransfer.files[0]]); // Limit to 1 file for simplicity with code
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
        }
    };

    const removeFile = () => {
        setFiles([]);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileIcon = (type) => {
        if (!type) return 'icon-file text-brand-purple';
        if (type.startsWith('image/')) return 'icon-file-image text-brand-pink';
        if (type.startsWith('video/')) return 'icon-file-video text-brand-purple';
        if (type.startsWith('audio/')) return 'icon-file-audio text-brand-yellow';
        if (type.includes('pdf')) return 'icon-file-text text-brand-orange';
        return 'icon-file text-brand-teal';
    };

    const handleUpload = () => {
        if (files.length === 0) return;
        
        setUploadStatus('uploading');
        setProgress(0);
        
        // Simulate upload process
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStatus('complete');
                    // Generate a 4-digit random code
                    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
                    setShareCode(generatedCode);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 20) + 10;
            });
        }, 300);
    };

    const resetSend = () => {
        setFiles([]);
        setUploadStatus('idle');
        setShareCode('');
        setProgress(0);
    };

    // --- Receive Handlers ---
    const handleCodeChange = (index, value) => {
        if (value.length > 1) value = value.slice(-1); // Only allow 1 char
        if (!/^[0-9]*$/.test(value)) return; // Only allow numbers

        const newCode = [...inputCode];
        newCode[index] = value;
        setInputCode(newCode);

        // Auto focus next
        if (value && index < 3) {
            codeInputRefs[index + 1].current.focus();
        }

        // Auto submit if all filled
        if (value && index === 3 && newCode.every(c => c !== '')) {
            handleRetrieve(newCode.join(''));
        }
    };

    const handleCodeKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !inputCode[index] && index > 0) {
            codeInputRefs[index - 1].current.focus();
        }
    };

    const handleRetrieve = (codeString) => {
        setReceiveStatus('searching');
        
        // Simulate finding file
        setTimeout(() => {
            // Simulated fake success
            setFoundFile({
                name: `Shared_File_${codeString}.zip`,
                size: Math.floor(Math.random() * 50000000) + 1000000,
                type: 'application/zip'
            });
            setReceiveStatus('found');
        }, 1500);
    };

    const resetReceive = () => {
        setInputCode(['', '', '', '']);
        setReceiveStatus('idle');
        setFoundFile(null);
    };

    return (
        <div className="glass-panel overflow-hidden relative" data-name="file-transfer" data-file="components/FileTransfer.js">
            {/* Mode Switcher */}
            <div className="flex border-b border-gray-100">
                <button 
                    onClick={() => setMode('send')}
                    className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${mode === 'send' ? 'text-brand-purple border-b-2 border-brand-purple bg-purple-50/50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <i className="icon-arrow-up mr-2"></i> Send File
                </button>
                <button 
                    onClick={() => setMode('receive')}
                    className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${mode === 'receive' ? 'text-brand-pink border-b-2 border-brand-pink bg-pink-50/50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <i className="icon-arrow-down mr-2"></i> Receive File
                </button>
            </div>

            <div className="p-8">
                {/* ---------- SEND MODE ---------- */}
                {mode === 'send' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {uploadStatus === 'idle' && (
                            <>
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-extrabold text-gray-800">Share Securely</h2>
                                    <p className="text-sm text-gray-500 mt-2">Upload a file to get a 4-digit secret code</p>
                                </div>

                                {files.length === 0 ? (
                                    <div 
                                        className={`border-3 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${isDragging ? 'border-brand-purple bg-brand-purple/5 scale-[1.02]' : 'border-gray-200 hover:border-brand-purple bg-gray-50/50 hover:bg-white'}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="w-20 h-20 bg-gradient-to-tr from-brand-purple to-brand-pink rounded-full flex items-center justify-center mx-auto shadow-lg mb-6 transform transition-transform hover:rotate-12">
                                            <i className="icon-cloud-upload text-4xl text-white"></i>
                                        </div>
                                        <p className="text-lg font-bold text-gray-800 mb-2">Drag & drop to upload</p>
                                        <p className="text-sm text-gray-500 mb-6">Max file size 2GB</p>
                                        <label className="btn btn-secondary cursor-pointer">
                                            <i className="icon-folder-search mr-2"></i> Browse Files
                                            <input type="file" className="hidden" onChange={handleFileInput} />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                            <div className="flex items-center space-x-4 overflow-hidden">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                    <i className={`${getFileIcon(files[0].type)} text-2xl`}></i>
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-base font-bold text-gray-800 truncate">{files[0].name}</p>
                                                    <p className="text-sm text-gray-500">{formatSize(files[0].size)}</p>
                                                </div>
                                            </div>
                                            <button onClick={removeFile} className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                                                <i className="icon-x text-lg"></i>
                                            </button>
                                        </div>
                                        
                                        <div className="mt-8">
                                            <button onClick={handleUpload} className="btn btn-primary w-full text-lg py-4">
                                                Generate Code <i className="icon-wand-sparkles ml-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {uploadStatus === 'uploading' && (
                            <div className="text-center py-12">
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                        <circle 
                                            cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" 
                                            strokeDasharray={`${progress * 2.827}, 282.7`} 
                                            className="transition-all duration-300 ease-out" strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#8A2BE2" />
                                                <stop offset="100%" stopColor="#FF4E8D" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">{progress}%</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Encrypting & Uploading</h3>
                                <p className="text-gray-500 mt-2">Almost ready for takeoff 🚀</p>
                            </div>
                        )}

                        {uploadStatus === 'complete' && (
                            <div className="text-center py-6 animate-in zoom-in duration-500">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Your file is ready!</h3>
                                
                                <div className="bg-gradient-to-br from-brand-purple to-brand-pink p-1 rounded-3xl inline-block mb-8">
                                    <div className="bg-white rounded-[23px] px-10 py-6 text-center">
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Secret Code</p>
                                        <div className="flex space-x-3 justify-center">
                                            {shareCode.split('').map((char, i) => (
                                                <span key={i} className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
                                                    {char}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                                    Share this code with the receiver. They can enter it in the "Receive" tab to download.
                                </p>
                                
                                <button onClick={resetSend} className="btn btn-secondary w-full">
                                    Send Another File
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ---------- RECEIVE MODE ---------- */}
                {mode === 'receive' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {receiveStatus === 'idle' && (
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-gradient-to-tr from-brand-teal to-brand-purple rounded-full flex items-center justify-center mx-auto shadow-lg mb-8 transform transition-transform hover:scale-110">
                                    <i className="icon-arrow-down-to-line text-4xl text-white"></i>
                                </div>
                                <h2 className="text-2xl font-extrabold text-gray-800">Receive a File</h2>
                                <p className="text-sm text-gray-500 mt-2 mb-8">Enter the 4-digit code to download</p>
                                
                                <div className="flex justify-center space-x-4 mb-8">
                                    {inputCode.map((val, idx) => (
                                        <input
                                            key={idx}
                                            ref={codeInputRefs[idx]}
                                            type="text"
                                            value={val}
                                            onChange={(e) => handleCodeChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                                            className="w-16 h-20 text-center text-4xl font-black text-brand-purple bg-slate-50 border-2 border-gray-200 rounded-2xl focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/20 outline-none transition-all shadow-inner"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => handleRetrieve(inputCode.join(''))}
                                    disabled={inputCode.some(c => c === '')}
                                    className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    Retrieve File <i className="icon-search ml-2"></i>
                                </button>
                            </div>
                        )}

                        {receiveStatus === 'searching' && (
                            <div className="text-center py-16">
                                <div className="flex justify-center space-x-2 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-brand-pink animate-bounce" style={{animationDelay: '0ms'}}></div>
                                    <div className="w-4 h-4 rounded-full bg-brand-purple animate-bounce" style={{animationDelay: '150ms'}}></div>
                                    <div className="w-4 h-4 rounded-full bg-brand-teal animate-bounce" style={{animationDelay: '300ms'}}></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Searching for file...</h3>
                                <p className="text-gray-500 mt-2">Connecting to the secure node</p>
                            </div>
                        )}

                        {receiveStatus === 'found' && foundFile && (
                            <div className="text-center py-6 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="icon-circle-check text-5xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">File Found!</h3>
                                
                                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 shadow-sm inline-block w-full mb-8 mt-4 text-left flex items-center space-x-4">
                                     <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                        <i className={`${getFileIcon(foundFile.type)} text-3xl`}></i>
                                    </div>
                                    <div className="truncate">
                                        <p className="text-lg font-bold text-gray-800 truncate">{foundFile.name}</p>
                                        <p className="text-sm font-medium text-gray-500">{formatSize(foundFile.size)}</p>
                                    </div>
                                </div>
                                
                                <button className="btn btn-primary w-full text-lg py-4 mb-4">
                                    Download File <i className="icon-download ml-2"></i>
                                </button>
                                <button onClick={resetReceive} className="text-gray-500 hover:text-gray-800 font-medium transition-colors text-sm">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
