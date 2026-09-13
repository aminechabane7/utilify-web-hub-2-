import React, { useState } from "react";

// HEX to Binary Converter Component
const HexToBinary: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function hexToBinary(hex: string): string {
    return (
      hex
        .replace(/\s+/g, "")
        .match(/.{1,2}/g)
        ?.map((byte) =>
          parseInt(byte, 16).toString(2).padStart(8, "0")
        )
        .join(" ") || ""
    );
  }

  const handleConvert = () => {
    setOutput(hexToBinary(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">HEX to Binary</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter HEX (e.g. 48 65 6C 6C 6F)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
        onClick={handleConvert}
      >
        Convert
      </button>
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2"
        rows={3}
        value={output}
        readOnly
        placeholder="Binary output"
      />
    </div>
  );
};

export default HexToBinary;
