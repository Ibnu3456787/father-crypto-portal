"use client";

import { useEffect, useState } from "react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/projects";

    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data]; // guard jika backend return object tunggal
        setKeys(arr);
      })
      .catch((e) => setErr(e.message || "Fetch error"))
      .finally(() => setLoading(false));
  }, []);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // notifikasi sederhana — ganti dengan toast kalau mau
      alert("Copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔑 API Keys</h1>

      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : err ? (
        <div className="text-red-500">Error: {err}</div>
      ) : keys.length === 0 ? (
        <div className="text-gray-500">Belum ada API key. Buat project dulu di Dashboard.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th scope="col" className="p-3">Project</th>
                <th scope="col" className="p-3">API Key</th>
                <th scope="col" className="p-3">RPC</th>
                <th scope="col" className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id || k.name} className="border-t">
                  <td className="p-3 align-top">{k.name || k.project}</td>
                  <td className="p-3 font-mono break-words">{k.apiKey}</td>
                  <td className="p-3 font-mono break-words">
                    <a href={k.rpc} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                      {k.rpc}
                    </a>
                  </td>
                  <td className="p-3">
                    <button onClick={() => copy(k.apiKey)} className="mr-2 bg-gray-200 px-2 py-1 rounded">Copy Key</button>
                    <button onClick={() => copy(k.rpc)} className="bg-gray-200 px-2 py-1 rounded">Copy RPC</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
