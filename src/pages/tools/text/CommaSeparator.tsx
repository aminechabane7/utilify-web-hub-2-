import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const buttonStyle: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "0.6em 1.5em",
  fontSize: "1em",
  cursor: "pointer",
  fontWeight: 500,
  marginBottom: "0.5em",
  transition: "background 0.2s",
};

const copyButtonStyle: React.CSSProperties = {
  background: "#64748b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "0.5em 1.2em",
  fontSize: "0.98em",
  cursor: "pointer",
  fontWeight: 500,
  transition: "background 0.2s",
};

const CommaSeparator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSeparate = () => {
    const items = input
      .split(/[\n\r,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    setOutput(items.join(", "));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <ToolLayout
      title="Comma Separator"
      description="Convert lines or separated items into a comma-separated list."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Paste or type your items (one per line or separated by commas).</li>
          <li>Click <b>Separate with Commas</b> to generate the comma-separated list.</li>
          <li>Copy the result for use elsewhere.</li>
        </ol>
      }
    >
      <div
        style={{
          maxWidth: 480,
          margin: "2em auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "2em",
          fontFamily: "inherit",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5em", color: "#2d3748" }}>
          Comma Separator
        </h2>
        <div style={{ color: "#555", fontSize: "15px", textAlign: "center", marginBottom: "1em" }}>
          Paste your items (one per line or separated by commas), then click "Separate with Commas".
        </div>
        <textarea
          rows={6}
          style={{
            width: "100%",
            marginBottom: "1em",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            padding: "0.75em",
            fontSize: "1em",
            background: "#f9fafb",
            resize: "vertical",
            outline: "none",
            transition: "border 0.2s",
          }}
          placeholder="Enter text, one item per line or separated by commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button
          onClick={handleSeparate}
          style={buttonStyle}
        >
          Separate with Commas
        </button>
        {output && (
          <div style={{ marginTop: "1.5em" }}>
            <label style={{ fontWeight: 500, color: "#374151" }}>Result:</label>
            <div
              style={{
                background: "#f1f5f9",
                padding: "0.75em",
                borderRadius: "6px",
                marginBottom: "0.75em",
                wordBreak: "break-all",
                fontSize: "1em",
                border: "1px solid #e5e7eb",
                minHeight: "2.5em",
              }}
            >
              {output}
            </div>
            <button
              onClick={handleCopy}
              style={{
                ...copyButtonStyle,
                background: copied ? "#22c55e" : copyButtonStyle.background,
              }}
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CommaSeparator;
