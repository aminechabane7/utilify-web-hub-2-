import React, { useState, ChangeEvent } from "react";
import jsQR from "jsqr";

const QRCodeDecoder: React.FC = () => {
  const [result, setResult] = useState("");

  const handleQrDecode = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResult("No file selected.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new window.Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);
        setResult(code ? code.data : "No QR code found");
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">QR Code Decoder</h1>
      <input type="file" accept="image/*" onChange={handleQrDecode} />
      <div className="mt-4">{result}</div>
    </div>
  );
};

export default QRCodeDecoder;
