import { useState, type FC } from "react";
import { octalToHex } from "../utils/binary/octalToHex";

const OctalToHex: FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      setOutput(octalToHex(input));
      setError("");
    } catch (conversionError) {
      setOutput("");
      setError(conversionError instanceof Error ? conversionError.message : "Unable to convert the supplied value.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Octal to HEX</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter octal numbers (space separated)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
        onClick={handleConvert}
      >
        Convert
      </button>
      {error && <p className="mb-4 text-sm text-red-600" role="alert">{error}</p>}
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2"
        rows={3}
        value={output}
        readOnly
        placeholder="HEX output"
      />
    </div>
  );
};

export default OctalToHex;
