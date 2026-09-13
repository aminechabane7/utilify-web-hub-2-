import React, { useState } from "react";
import { Base64 } from "js-base64";

const JavascriptDeObfuscator: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleDeobfuscate() {
      try {
      setOutput(Base64.decode(input));
      } catch {
      setOutput("Invalid base64 string");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Javascript DeObfuscator</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste base64-encoded JavaScript here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleDeobfuscate}
      >
        DeObfuscate
      </button>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows={8}
        placeholder="Decoded JavaScript"
        value={output}
        readOnly
      />
    </div>
  );
};

export default JavascriptDeObfuscator;
