import React, { useState } from "react";

const HTMLEncode: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function htmlEncode(str: string) {
    const el = document.createElement("div");
    el.innerText = str;
    return el.innerHTML;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">HTML Encode</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={5}
        placeholder="Enter text to encode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOutput(htmlEncode(input))}
      >
        Encode
      </button>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows={5}
        placeholder="Encoded output"
        value={output}
        readOnly
      />
    </div>
  );
};

export default HTMLEncode;
