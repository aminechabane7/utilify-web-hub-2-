import { useState } from "react";

export default function FacebookIdFinder() {
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const extractFacebookId = (input: string): string => {
    const match = input.match(/(?:id=|\/(\d{5,}))/);
    return match ? match[1] : "Not found";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Find Facebook ID</h1>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Facebook profile or post URL"
      />
      <button
        onClick={() => setId(extractFacebookId(url))}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Find ID
      </button>
      <div className="mt-4 p-2 border rounded bg-gray-100">{id}</div>
    </div>
  );
}