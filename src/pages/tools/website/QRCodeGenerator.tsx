import React, { useState } from "react";
import * as QRCode from "qrcode";

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleGenerate = async () => {
    if (!QRCode) {
      setQrImage("");
      return;
    }
    try {
      const url = await QRCode.toDataURL(input);
      setQrImage(url);
    } catch {
      setQrImage("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">QR Code Generator</h1>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter text or URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
      >
        Generate QR
      </button>
      {qrImage && (
        <div className="mt-4 flex flex-col items-center">
          <img src={qrImage} alt="QR Code" className="w-40 h-40" />
          <a href={qrImage} download="qrcode.png" className="text-blue-500 mt-2 underline">
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
