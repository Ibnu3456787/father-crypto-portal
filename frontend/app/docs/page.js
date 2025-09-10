export default function DocsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📘 Developer Docs</h1>

      <div className="bg-gray-900 text-white p-4 rounded-xl">
        <h2 className="font-semibold">1. Buat Project</h2>
        <p>Isi nama project di dashboard dan klik &quot;Add&quot;.</p>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded-xl">
        <h2 className="font-semibold">2. Gunakan API Key</h2>
        <p>
          Simpan API key kamu, dan gunakan untuk autentikasi request ke RPC
          server.
        </p>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded-xl">
        <h2 className="font-semibold">3. Contoh RPC Call</h2>
        <pre className="bg-black p-2 rounded mt-2 text-sm">
{`curl -X POST https://rpc.fathercrypto.dev/test-project 
-H "Authorization: Bearer <API_KEY>" 
-d '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'`}
        </pre>
      </div>
    </div>
  );
}
