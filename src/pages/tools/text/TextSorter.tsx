import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const TextSorter = () => {
  const [input, setInput] = useState("");
  const [sorted, setSorted] = useState("");

  const handleSort = () => {
    const lines = input
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)
      .sort();
    setSorted(lines.join("\n"));
  };

  return (
    <ToolLayout
      title="Text Sorter"
      description="Sort lines of text alphabetically."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Enter or paste your text, one item per line.</li>
          <li>Click <b>Sort</b> to alphabetically sort the lines.</li>
          <li>Copy or use the sorted result as needed.</li>
        </ol>
      }
    >
      <div
        style={{
          maxWidth: 500,
          margin: "40px auto",
          padding: 24,
          background: "#fafbfc",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Text Sorter</h2>
        <div style={{ color: "#555", fontSize: 15, marginBottom: 8 }}>
          Enter text (one item per line), then click "Sort" to alphabetically sort the lines.
        </div>
        <textarea
          placeholder="Enter text, one item per line"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            marginBottom: 16,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: 15,
            fontFamily: "inherit",
            resize: "vertical"
          }}
        />
        <button
          onClick={handleSort}
          style={{
            padding: "8px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 15,
            marginBottom: 20,
            marginTop: 4
          }}
        >
          Sort
        </button>
        <h3 style={{ margin: "20px 0 8px" }}>Sorted Output</h3>
        <textarea
          value={sorted}
          readOnly
          rows={6}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: 15,
            fontFamily: "inherit",
            background: "#f3f4f6",
            color: "#374151",
            resize: "vertical"
          }}
        />
      </div>
    </ToolLayout>
  );
};

export default TextSorter;
