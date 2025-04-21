import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-col items-center p-6 bg-gray-900 text-white shadow-2xl rounded-2xl w-full">
      <h1 className="text-3xl font-bold text-center mb-4 w-full tracking-wide">Gnosis Esoterica</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative flex items-center justify-center rounded-full shadow-xl mx-auto" style={{ width: 90, height: 90, boxShadow: '0 0 24px 0 rgba(30, 58, 138, 0.25)' }}>
          {/* Gradient background circle with blue/white gradient and semi-transparent black border */}
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="50%" stopColor="#e0eaff"/>
                <stop offset="80%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#1e3a8a"/>
              </radialGradient>
            </defs>
            <circle cx="45" cy="45" r="40" fill="url(#grad)" stroke="rgba(0,0,0,0.85)" strokeWidth="5" />
          </svg>
          {/* Solar eclipse SVG centered on top, bigger */}
          <img src="/planets/solar_eclipse.svg" alt="Solar Eclipse" className="absolute w-24 h-24" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 2px 12px #1e3a8a44)' }} />
        </div>
        <Link href="/" className="hover:text-gray-300 text-xl mt-4 tracking-wider">TimeGnosis</Link>
      </div>
    </nav>
  );
}
