import React, { useState } from "react";

function buildUtm(base: string, utm: Record<string, string>) {
  try {
    const url = new URL(base);
    Object.entries(utm).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return "Invalid base URL";
  }
}

const UTMBuilder: React.FC = () => {
  const [utmBase, setUtmBase] = useState("");
  const [utm, setUtm] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });
  const [utmResult, setUtmResult] = useState("");

  const handleBuild = () => {
    setUtmResult(buildUtm(utmBase, utm));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">UTM Builder</h1>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Base URL"
        value={utmBase}
        onChange={(e) => setUtmBase(e.target.value)}
      />
      {Object.keys(utm).map((k) => (
        <input
          key={k}
          className="w-full p-2 border rounded mb-2"
          placeholder={k}
          value={utm[k as keyof typeof utm]}
          onChange={(e) => setUtm({ ...utm, [k]: e.target.value })}
        />
      ))}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleBuild}
      >
        Build UTM URL
      </button>
      <input
        className="w-full p-2 border rounded mt-2"
        value={utmResult}
        readOnly
        placeholder="UTM URL"
      />
    </div>
  );
};

export default UTMBuilder;
