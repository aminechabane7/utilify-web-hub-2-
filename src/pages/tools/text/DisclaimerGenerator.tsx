import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const DisclaimerGenerator = () => {
  const [website, setWebsite] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const generateDisclaimer = () => {
    setDisclaimer(
      `Disclaimer for ${website}\n\nAll the information on this website is published in good faith...`
    );
  };

  return (
    <ToolLayout
      title="Disclaimer Generator"
      description="Generate a disclaimer for your website."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Enter your website name.</li>
          <li>Click <b>Generate</b> to create a disclaimer.</li>
          <li>Copy and use the generated disclaimer as needed.</li>
        </ol>
      }
    >
      <div
        style={{
          maxWidth: 500,
          margin: "40px auto",
          padding: 24,
          borderRadius: 12,
          background: "#fafbfc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Disclaimer Generator</h2>
        <div style={{ color: "#555", fontSize: 15, textAlign: "center", marginBottom: 4 }}>
          Enter your website name and click "Generate" to create a disclaimer.
        </div>
        <input
          type="text"
          placeholder="Website Name"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          style={{
            width: "100%",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            padding: 10,
            fontSize: 16,
            marginBottom: 4,
          }}
        />
        <button
          onClick={generateDisclaimer}
          style={{
            padding: "8px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Generate
        </button>
        <textarea
          value={disclaimer}
          readOnly
          rows={10}
          style={{
            width: "100%",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            padding: 10,
            fontSize: 15,
            background: "#f3f4f6",
            color: "#374151",
            resize: "vertical",
          }}
        />
      </div>
    </ToolLayout>
  );
};

export default DisclaimerGenerator;
