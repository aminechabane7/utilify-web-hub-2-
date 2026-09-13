import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const TermsAndConditionGenerator = () => {
  const [website, setWebsite] = useState("");
  const [terms, setTerms] = useState("");

  const generateTerms = () => {
    setTerms(
      `Terms and Conditions for ${website}\n\nBy accessing this website, you agree to be bound by these terms...`
    );
  };

  return (
    <ToolLayout
      title="Terms and Condition Generator"
      description="Generate terms and conditions for your website."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Enter your website name.</li>
          <li>Click <b>Generate</b> to create terms and conditions.</li>
          <li>Copy and use the generated terms as needed.</li>
        </ol>
      }
    >
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Terms and Condition Generator</h2>
        <div className="text-gray-600 text-center mb-2 text-base">
          Enter your website name and click "Generate" to create terms and conditions.
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Website Name"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={generateTerms}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate
          </button>
          <textarea
            value={terms}
            readOnly
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default TermsAndConditionGenerator;