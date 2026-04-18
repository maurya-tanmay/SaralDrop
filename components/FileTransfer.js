function FileTransfer() {
  const [mode, setMode] = React.useState("send");
  const [dark, setDark] = React.useState(true);

  const [file, setFile] = React.useState(null);
  const [shareCode, setShareCode] = React.useState("");
  const [inputCode, setInputCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && code.length === 4) {
      setMode("receive");
      setInputCode(code);
    }
  }, []);

  const card = dark
    ? "bg-white/10 backdrop-blur-xl border border-white/10 text-white"
    : "bg-white text-gray-900 border border-gray-200";

  const input = dark
    ? "bg-white/10 text-white border border-white/20"
    : "bg-gray-100 text-black border border-gray-300";

  const uploadFile = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    setLoading(true);
    setMsg("");
    setShareCode("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.code) {
        setShareCode(data.code);
        setMsg("Upload Successful 🚀");
      } else {
        setMsg("Upload Failed");
      }
    } catch (err) {
      setMsg("Server Error");
    }

    setLoading(false);
  };

  const downloadFile = () => {
    if (inputCode.length !== 4) {
      alert("Enter valid OTP");
      return;
    }

    window.location.href =
  "/download/" + inputCode;
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(shareCode);
    alert("OTP Copied");
  };

  const qrLink =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(
      window.location.origin + "/?code=" + shareCode
    );

  return (
    <div
      className={`rounded-3xl p-8 shadow-2xl transition-all duration-500 ${card}`}
      style={{
        background: dark
          ? "linear-gradient(135deg,#0f172a,#1e1b4b,#111827)"
          : ""
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">
          ⚡ Cyber Share
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-full bg-pink-500 text-white font-bold"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => setMode("send")}
          className={`py-3 rounded-2xl font-bold ${
            mode === "send"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              : "bg-white/10"
          }`}
        >
          📤 Send
        </button>

        <button
          onClick={() => setMode("receive")}
          className={`py-3 rounded-2xl font-bold ${
            mode === "receive"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              : "bg-white/10"
          }`}
        >
          📥 Receive
        </button>
      </div>

      {/* SEND */}
      {mode === "send" && (
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className={`w-full p-4 rounded-2xl mb-5 ${input}`}
          />

          {file && (
            <div className="mb-4 text-sm opacity-80">
              📄 {file.name}
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transition-all"
          >
            {loading
              ? "Uploading..."
              : "🚀 Upload & Generate OTP"}
          </button>

          {shareCode && (
            <div className="mt-8 text-center">
              <p className="mb-2 text-sm opacity-80">
                Share this OTP
              </p>

              <div className="text-5xl font-black tracking-[10px] text-pink-400">
                {shareCode}
              </div>

              <button
                onClick={copyCode}
                className="mt-4 px-6 py-3 rounded-xl bg-cyan-500 text-white font-bold"
              >
                📋 Copy OTP
              </button>

              {/* QR BOX */}
              <div className="mt-8 p-5 rounded-3xl bg-white/10 border border-cyan-400/30">
                <p className="mb-4 text-sm font-bold text-cyan-300">
                  📱 Scan QR to Receive
                </p>

                <img
                  src={qrLink}
                  alt="QR Code"
                  className="mx-auto rounded-2xl bg-white p-2 w-52 h-52"
                />

                <p className="mt-3 text-xs opacity-70">
                  Scan on mobile to auto open receive page
                </p>
              </div>
            </div>
          )}

          {msg && (
            <div className="mt-4 text-center text-green-400 font-semibold">
              {msg}
            </div>
          )}
        </div>
      )}

      {/* RECEIVE */}
      {mode === "receive" && (
        <div>
          <input
            type="text"
            maxLength="4"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="1234"
            className={`w-full p-4 rounded-2xl text-center text-3xl tracking-[10px] mb-5 ${input}`}
          />

          <button
            onClick={downloadFile}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all"
          >
            ⚡ Download File
          </button>

          <p className="text-center mt-4 text-sm opacity-70">
            File auto deletes after download 😈
          </p>
        </div>
      )}
    </div>
  );
}