export default function ApiKeysPage() {
  const keys = [
    {
      project: "Test Project",
      apiKey: "fc_r89khpw1x4",
      rpc: "https://rpc.fathercrypto.dev/test-project",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔑 API Keys</h1>

      <table className="w-full border border-gray-700 text-left">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="p-2">Project</th>
            <th className="p-2">API Key</th>
            <th className="p-2">RPC</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-2">{k.project}</td>
              <td className="p-2 font-mono">{k.apiKey}</td>
              <td className="p-2 font-mono">{k.rpc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
