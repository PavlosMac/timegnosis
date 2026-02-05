export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: "Numerology | TimeGnosis",
    description: "Explore the mystical art of numerology and discover the archetypal forces that shape your reality.",
    openGraph: {
      title: "Numerology | TimeGnosis",
      description: "Explore the mystical art of numerology and discover the archetypal forces that shape your reality.",
    }
  };
}

export default function NumerologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8 sm:py-12">
      {/* Main mystical container */}
      <div className="mystical-container ornate-corners relative p-6 sm:p-10 md:p-12">
        {/* Bottom ornate corners wrapper */}
        <div className="ornate-corners-bottom absolute inset-0 pointer-events-none" />

        {/* Corner star decorations */}
        <div className="absolute top-3 left-3 text-[#d4af37]/40 text-sm sm:text-base">✦</div>
        <div className="absolute top-3 right-3 text-[#d4af37]/40 text-sm sm:text-base">✦</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37]/40 text-sm sm:text-base">✦</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37]/40 text-sm sm:text-base">✦</div>

        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none rounded-xl"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.1), transparent 60%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 animate-fade-in">
          {/* Main title */}
          <h1 className="mystical-heading text-2xl sm:text-3xl md:text-4xl text-center mb-8">
            The TimeGnosis System
          </h1>

          {/* Decorative divider */}
          <div className="mystical-divider mb-10">
            <span className="text-[#d4af37] text-xl">✦</span>
          </div>

          {/* Introduction section */}
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="mystical-body text-base sm:text-lg leading-relaxed mb-6">
              The TimeGnosis system I share here comes from my involvement in the Taroscopic Mystery School.
              After many years I found my old notes and with them the original interpretations.
              I felt it was important to share this system with others since it has been such a compelling
              tool for me in understanding my journey through life over many years.
            </p>

            <p className="mystical-body text-base sm:text-lg leading-relaxed">
              Numerology has sibling traditions namely the{' '}
              <span className="text-[#d4af37] font-semibold">Tarot</span>,{' '}
              <span className="text-[#d4af37] font-semibold">Astrology</span>, and{' '}
              <span className="text-[#d4af37] font-semibold">Kabbalah</span>.
              Consider the 22 Major Arcana for example. 1 through 22 are represented within this system,
              where 11 and 22 are higher harmonic numbers, and 12 upwards are reduced to their single digits.
            </p>
          </section>

          {/* Divider */}
          <div className="mystical-divider my-10">
            <span className="text-[#d4af37] text-lg">◆</span>
          </div>

          {/* Planetary associations section */}
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="mystical-subheading text-xl sm:text-2xl mb-6 text-center">
              Planetary Correspondences
            </h2>

            <p className="mystical-body text-base sm:text-lg leading-relaxed">
              I have added the <span className="text-[#d4af37]">Astrological Planets</span> to give
              another dimension of character to the numbers. The planetary assignments are not an
              exact science, but rather my interpretation after years of contemplation. For example,
              number <span className="text-[#d4af37] font-semibold">6</span> is represented by{' '}
              <span className="text-[#d4af37] font-semibold">Jupiter</span>, but the Sun or Mercury
              have similar characteristics.
            </p>
          </section>

          {/* Divider */}
          <div className="mystical-divider my-10">
            <span className="text-[#d4af37] text-lg">✦</span>
          </div>

          {/* Calculation section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="mystical-subheading text-xl sm:text-2xl mb-6 text-center">
              The Sacred Calculation
            </h2>

            <p className="mystical-flavor text-center text-lg mb-8">
              The calculation is simple, yet reveals profound truths...
            </p>

            {/* Calculation card */}
            <div className="mystical-card p-6 sm:p-8 relative">
              {/* Inner corner stars */}
              <div className="absolute top-2 left-2 text-[#d4af37]/30 text-xs">✦</div>
              <div className="absolute top-2 right-2 text-[#d4af37]/30 text-xs">✦</div>
              <div className="absolute bottom-2 left-2 text-[#d4af37]/30 text-xs">✦</div>
              <div className="absolute bottom-2 right-2 text-[#d4af37]/30 text-xs">✦</div>

              <p className="mystical-body text-base sm:text-lg leading-relaxed mb-6">
                Take the birth day and month and add them together. Then add this to the current year.
              </p>

              {/* Year calculation example */}
              <div className="mb-8">
                <h3 className="mystical-subheading text-lg mb-4 text-[#d4af37]">
                  Step 1: Finding Your Year Number
                </h3>
                <div className="bg-[#1a0033]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <p className="mystical-body text-sm sm:text-base font-mono leading-relaxed">
                    <span className="text-[#d4af37]/80">Birth date:</span> 5th August<br />
                    <span className="text-[#d4af37]/80">Calculation:</span> 8 + 5 = 13 = <span className="text-[#d4af37] font-bold">4</span><br /><br />
                    <span className="text-[#d4af37]/80">Add to year:</span> 4 + 2025<br />
                    <span className="text-[#d4af37]/80">Year digits:</span> 2 + 0 + 2 + 5 = 9<br />
                    <span className="text-[#d4af37]/80">Combined:</span> 9 + 4 = 13 = (1 + 3) = <span className="text-[#d4af37] font-bold">4</span>
                  </p>
                  <p className="mystical-flavor mt-4 text-center">
                    Your Year Number is <span className="text-[#d4af37] font-semibold not-italic">4</span>
                  </p>
                </div>
              </div>

              {/* Month calculation example */}
              <div className="mb-8">
                <h3 className="mystical-subheading text-lg mb-4 text-[#d4af37]">
                  Step 2: Finding Your Month Number
                </h3>
                <div className="bg-[#1a0033]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <p className="mystical-body text-sm sm:text-base font-mono leading-relaxed">
                    <span className="text-[#d4af37]/80">Year Number:</span> 4<br />
                    <span className="text-[#d4af37]/80">Current Month:</span> April = 4<br />
                    <span className="text-[#d4af37]/80">Calculation:</span> 4 + 4 = <span className="text-[#d4af37] font-bold">8</span>
                  </p>
                  <p className="mystical-flavor mt-4 text-center">
                    Your Month Number is <span className="text-[#d4af37] font-semibold not-italic">8</span>
                  </p>
                </div>
              </div>

              {/* Day calculation example */}
              <div>
                <h3 className="mystical-subheading text-lg mb-4 text-[#d4af37]">
                  Step 3: Finding Your Day Number
                </h3>
                <div className="bg-[#1a0033]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <p className="mystical-body text-sm sm:text-base font-mono leading-relaxed">
                    <span className="text-[#d4af37]/80">Month Number:</span> 8<br />
                    <span className="text-[#d4af37]/80">Current Day:</span> 15th of April<br />
                    <span className="text-[#d4af37]/80">Calculation:</span> 15 + 8 = 23 = (2 + 3) = <span className="text-[#d4af37] font-bold">5</span>
                  </p>
                  <p className="mystical-flavor mt-4 text-center">
                    Your Day Number is <span className="text-[#d4af37] font-semibold not-italic">5</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final divider */}
          <div className="mystical-divider mt-12">
            <span className="text-[#d4af37] text-xl">✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
