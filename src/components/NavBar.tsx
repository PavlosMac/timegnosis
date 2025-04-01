import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center gap-3">
        {/* Placeholder SVG (Replace with your own) */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
        </svg>
        <h1 className="text-xl font-bold">Gnosis Esoterica</h1>
      </div>
      <div>
        <Link href="/" className="hover:text-gray-300">Home</Link>
      </div>
    </nav>
  );
}
