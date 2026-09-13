import React, { useState } from "react";

type ParsedUrl = {
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
};

function parseUrl(url: string): ParsedUrl | null {
  try {
    const u = new URL(url);
    return {
      protocol: u.protocol,
      host: u.host,
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
      params: Object.fromEntries(u.searchParams.entries()),
    };
  } catch {
    return null;
  }
}

const URLParser: React.FC = () => {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedUrl | null>(null);

  const handleParse = () => {
    setParsed(parseUrl(input));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Parser</h1>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleParse}
      >
        Parse
      </button>
      {parsed && (
        <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default URLParser;
