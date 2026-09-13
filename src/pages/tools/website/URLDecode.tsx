import React, { useState } from "react";

const URLDecode: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function urlDecode(str: string) {
    try {
      return decodeURIComponent(str);
    } catch {
      return "Invalid encoded URL string";
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Decode</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={5}
        placeholder="Enter URL-encoded text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOutput(urlDecode(input))}
      >
        Decode
      </button>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows={5}
        placeholder="Decoded output"
        value={output}
        readOnly
      />
    </div>
  );
};

export default URLDecode;
