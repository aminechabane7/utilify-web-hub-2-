import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const TextRepeater = () => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(2);
  const [result, setResult] = useState("");

  const repeatText = () => {
    setResult(Array(count).fill(text).join("\n"));
  };

  return (
    <ToolLayout
      title="Text Repeater"
      description="Repeat your text multiple times easily."
      category="Text Tools"
      categoryColor="textTool"
      instructions={
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Enter the text you want to repeat.</li>
          <li>Set how many times you want the text to be repeated.</li>
          <li>Click <b>Repeat</b> to generate the repeated text.</li>
          <li>Copy or use the result as needed.</li>
        </ol>
      }
    >
      <div
        style={{
          maxWidth: 500,
          margin: "40px auto",
          padding: 24,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <textarea
          placeholder="Enter text"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
            padding: 10,
            fontSize: 16,
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="number"
            min={1}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            style={{
              width: 80,
              borderRadius: 6,
              border: "1px solid #ccc",
              padding: 8,
              fontSize: 16,
            }}
          />
          <button
            onClick={repeatText}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              background: "#0078d4",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Repeat
          </button>
        </div>
        <textarea
          value={result}
          readOnly
          rows={10}
          style={{
            width: "100%",
            borderRadius: 6,
            border: "1px solid #eee",
            padding: 10,
            fontSize: 15,
            background: "#f9f9f9",
            marginTop: 8,
          }}
        />
      </div>
    </ToolLayout>
  );
};

export default TextRepeater;
