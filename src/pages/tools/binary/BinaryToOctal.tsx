import React, { useState } from "react";

// Binary to Octal Converter Component
const BinaryToOctal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function binaryToOctal(binary: string): string {
    return binary
      .split(" ")
      .map((bin) => parseInt(bin, 2).toString(8))
      .join(" ");
  }

  const handleConvert = () => {
    setOutput(binaryToOctal(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Binary to Octal</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter binary (space separated)"
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
        placeholder="Octal output"
      />
    </div>
  );
};

export default BinaryToOctal;
