import Link from "next/link";
import "./globals.css";

// Fallback for requests that never reach a locale route. Normal 404s are
// handled by app/[locale]/(client)/not-found.tsx (localized).
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
          <p className="text-xl text-gray-500">Page not found</p>
          <Link href="/" className="rounded-md bg-darkOrange px-4 py-2 text-white">
            Home
          </Link>
        </div>
      </body>
    </html>
  );
}
