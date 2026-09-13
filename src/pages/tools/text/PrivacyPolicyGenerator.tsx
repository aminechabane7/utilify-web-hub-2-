import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PrivacyPolicyGenerator = () => {
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [policy, setPolicy] = useState("");

  const generatePolicy = () => {
    setPolicy(
      `Privacy Policy for ${company}\n\nAt ${website}, we are committed to protecting your privacy...`
    );
  };

  return (
    <ToolLayout
      title="Privacy Policy Generator"
      description="Generate a privacy policy for your website."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Enter your website and company name.</li>
          <li>Click <b>Generate</b> to create a privacy policy.</li>
          <li>Copy and use the generated policy as needed.</li>
        </ol>
      }
    >
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Privacy Policy Generator</h2>
        <div className="text-gray-600 text-center mb-2 text-base">
          Enter your website and company name, then click "Generate" to create a privacy policy.
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Website Name"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={generatePolicy}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate
          </button>
          <textarea
            value={policy}
            readOnly
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default PrivacyPolicyGenerator;
