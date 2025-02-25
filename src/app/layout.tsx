"use client";

import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body>
      <Toaster position="top-center" />
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">My App </h2>
              <nav>
                <ul>
                  <li className="mb-2">
                    <Link href="/" className="block p-2 rounded hover:bg-gray-700">
                      Dashboard
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/customers" className="block p-2 rounded hover:bg-gray-700">
                      Customers
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/categories" className="block p-2 rounded hover:bg-gray-700">
                      Categories
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/order" className="block p-2 rounded hover:bg-gray-700">
                      Orders
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/unit-type" className="block p-2 rounded hover:bg-gray-700">
                      Unit Management
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/design-pattern" className="block p-2 rounded hover:bg-gray-700">
                      Pattern Management
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/backup" className="block p-2 rounded hover:bg-gray-700">Backup</Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 p-2 rounded hover:bg-red-600 text-center mt-4"
            >
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
