import "./globals.css";

export const metadata = {
  title: "Father Crypto Dev Portal",
  description: "Developer-Friendly NodeOps Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center shadow">
          <div className="font-bold text-lg">⚡ Father Crypto</div>
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-gray-200">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/apikeys" className="hover:text-gray-200">
                API Keys
              </a>
            </li>
            <li>
              <a href="/docs" className="hover:text-gray-200">
                Docs
              </a>
            </li>
          </ul>
        </nav>

        {/* Konten utama */}
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}
