import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Atmospheric vignette backdrop */}
      <div className="fixed inset-0 vignette z-0" />

      {/* Constellation overlays for atmosphere */}
      <div className="fixed inset-0 constellation-gold opacity-30 z-0" />
      <div className="fixed inset-0 constellation-violet opacity-20 z-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto p-4 sm:p-8 animate-fade-in text-center">
        {/* Mystical container with ornate corners */}
        <div className="mystical-container ornate-corners relative overflow-hidden">
          {/* Bottom ornate corners */}
          <div className="ornate-corners-bottom absolute inset-0 pointer-events-none" />

          {/* Corner star decorations */}
          <div className="absolute top-4 left-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute top-4 right-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute bottom-4 left-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute bottom-4 right-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>

          {/* Inner mystical glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.2), transparent 60%)'
            }}
          />

          {/* Content wrapper */}
          <div className="relative z-10 p-8 sm:p-12">
            {/* 404 number */}
            <div className="mb-6">
              <span className="text-7xl sm:text-8xl font-bold mystical-text-glow-strong text-[var(--mystical-gold)]">
                404
              </span>
            </div>

            {/* Title */}
            <h1 className="mystical-heading text-2xl sm:text-3xl mb-4">
              Lost in the Cosmic Void
            </h1>

            {/* Decorative divider */}
            <div className="mystical-divider my-6">
              <span className="text-[var(--mystical-gold)] text-xl">&#10022;</span>
            </div>

            {/* Message */}
            <p className="mystical-body text-lg mb-8 opacity-80">
              The stars have aligned, but this path leads to darkness.
              The wisdom you seek does not dwell here.
            </p>

            {/* Return button */}
            <Link
              href="/"
              className="mystical-button inline-flex items-center gap-2 px-6 py-3"
            >
              <span className="text-sm">&#8592;</span>
              <span>Return to the Cosmos</span>
            </Link>

            {/* Bottom decorative element */}
            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--mystical-gold)]" />
                <span className="text-[var(--mystical-gold)] text-lg">&#9788;</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--mystical-gold)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer mystical text */}
        <p className="mystical-flavor text-sm opacity-50 mt-6">
          "Not all who wander are lost... but you are."
        </p>
      </div>
    </div>
  );
}
