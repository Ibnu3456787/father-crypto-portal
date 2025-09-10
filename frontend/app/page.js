"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  // Fetch project dari backend
  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  // Tambah project baru
  const addProject = async () => {
    if (!name.trim()) return;
    const res = await fetch("http://localhost:3001/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const project = await res.json();
    setProjects([...projects, project]);
    setName("");
  };

  // Copy text ke clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Father Crypto Dev Portal</h1>

      {/* Input tambah project */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-2 border rounded-lg text-black"
          placeholder="Project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addProject}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Daftar project */}
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 text-white p-4 rounded-xl shadow-lg"
          >
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-400">Created: {p.createdAt}</p>

            <div className="mt-3">
              <p>
                <span className="font-semibold">API Key:</span>{" "}
                <span className="font-mono">{p.apiKey}</span>
                <button
                  onClick={() => copyToClipboard(p.apiKey)}
                  className="ml-2 text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </p>
              <p className="mt-2">
                <span className="font-semibold">RPC:</span>{" "}
                <span className="font-mono">{p.rpc}</span>
                <button
                  onClick={() => copyToClipboard(p.rpc)}
                  className="ml-2 text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
