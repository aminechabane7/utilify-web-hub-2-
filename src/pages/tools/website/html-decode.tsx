import { useState } from "react";

export default function HtmlDecodePage() {
  const [input, setInput] = useState("&lt;p&gt;Hello!&lt;/p&gt;");
  const [output, setOutput] = useState("");

  const handleDecode = () => {
    const txt = document.createElement("textarea");
    txt.innerHTML = input;
    setOutput(txt.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">HTML Decode</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border mb-4 rounded"
        placeholder="Enter encoded HTML"
        rows={6}
      />
      <button
        onClick={handleDecode}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
      >
        Decode
      </button>
      <textarea
        value={output}
        className="w-full p-2 border rounded bg-gray-100"
        placeholder="Decoded HTML"
        rows={6}
        readOnly
      />
    </div>
  );
}
