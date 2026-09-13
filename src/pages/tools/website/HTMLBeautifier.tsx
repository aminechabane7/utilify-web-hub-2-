import React, { useState } from "react";
import beautify from "js-beautify";

const HTMLBeautifier: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">HTML Beautifier</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={8}
        placeholder="Paste HTML code here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOutput(beautify.html(input))}
      >
        Beautify
      </button>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows={8}
        placeholder="Beautified HTML"
        value={output}
        readOnly
      />
    </div>
  );
};

export default HTMLBeautifier;
