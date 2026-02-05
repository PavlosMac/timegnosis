'use client';

type DateSumInputProps = {
  date: string;
  onDateChange: (date: string) => void;
};

export default function DateSumInput({ date, onDateChange }: DateSumInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 max-w-2xl mx-auto">
      {/* Mystical container with ornate styling */}
      <div className="relative w-full max-w-md mystical-container p-6 sm:p-8">
        {/* Corner star decorations */}
        <div className="absolute top-3 left-3 text-[#d4af37]/50 text-sm">&#10022;</div>
        <div className="absolute top-3 right-3 text-[#d4af37]/50 text-sm">&#10022;</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37]/50 text-sm">&#10022;</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37]/50 text-sm">&#10022;</div>

        {/* Ornate corner borders */}
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[#d4af37]/50 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[#d4af37]/50 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-xl" />

        {/* Mystical glow overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none rounded-xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.2), transparent 70%)',
          }}
        />

        {/* Title with mystical styling */}
        <h2
          className="mystical-heading text-xl sm:text-2xl mb-6 text-center"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Enter Your Birth Date
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <span className="text-[#d4af37]/70 text-lg">&#10022;</span>
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>

        {/* Date input field */}
        <div className="relative">
          <label
            className="block text-sm mb-2 tracking-wider mystical-text-glow"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#e6d5b8',
              letterSpacing: '0.1em',
            }}
          >
            Date of Birth
          </label>

          <div className="relative">
            {/* Input corner stars */}
            <div className="absolute top-1 left-1 text-[#d4af37]/30 text-xs">&#10022;</div>
            <div className="absolute top-1 right-1 text-[#d4af37]/30 text-xs">&#10022;</div>
            <div className="absolute bottom-1 left-1 text-[#d4af37]/30 text-xs">&#10022;</div>
            <div className="absolute bottom-1 right-1 text-[#d4af37]/30 text-xs">&#10022;</div>

            <input
              type="date"
              value={date}
              onChange={handleChange}
              className="w-full p-4 rounded-lg text-lg
                       transition-all duration-300 ease-out
                       focus:outline-none"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: '#e6d5b8',
                backgroundColor: 'rgba(45, 27, 78, 0.6)',
                border: '2px solid rgba(212, 175, 55, 0.4)',
                boxShadow: 'inset 0 0 20px rgba(26, 0, 51, 0.5)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(26, 0, 51, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                e.target.style.boxShadow = 'inset 0 0 20px rgba(26, 0, 51, 0.5)';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
