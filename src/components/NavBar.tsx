import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-center items-center p-4 bg-gray-900 text-white shadow-lg">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
            {/* Gradient background circle with white/blue radial gradient and white border */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
              <defs>
                <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="50%" stopColor="#e0eaff"/>
                  <stop offset="80%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#1e3a8a"/>
                </radialGradient>
              </defs>
              <circle cx="40" cy="40" r="36" fill="url(#grad)" stroke="black" strokeWidth="4" />
            </svg>
            {/* Solar eclipse SVG centered on top, bigger */}
            <img src="/planets/solar_eclipse.svg" alt="Solar Eclipse" className="absolute w-20 h-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <h1 className="text-2xl font-bold whitespace-nowrap">Gnosis Esoterica</h1>
        </div>
        <Link href="/" className="hover:text-gray-300 text-lg mt-1">Home</Link>
      </div>
    </nav>
  );
}
