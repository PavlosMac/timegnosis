"use client"
import React, { useState, useEffect } from "react";
import DateSumInput from "@/components/DateInput";
import NavBar from "@/components/NavBar";
import Planets from "@/components/Planets";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // New: keep birth date in local state
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [, setBirthYear] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  // Initialize today on client side only to avoid hydration mismatch
  useEffect(() => {
    setToday(new Date());
  }, []);

  // initialise state either from URL (highest priority) or localStorage fallback
  useEffect(() => {
    const yearQP = searchParams.get('year');
    const monthQP = searchParams.get('month');
    const dayQP = searchParams.get('day');

    if (yearQP && monthQP && dayQP) {
      // URL already has desired params; ensure they are stored for next visit
      localStorage.setItem('tg-year', yearQP);
      localStorage.setItem('tg-month', monthQP);
      localStorage.setItem('tg-day', dayQP);

      // update local state so UI reflects persisted date
      const paddedMonth = monthQP.padStart(2, '0');
      const paddedDay = dayQP.padStart(2, '0');
      setBirthDate(`${yearQP}-${paddedMonth}-${paddedDay}`);
      setBirthDay(dayQP);
      setBirthMonth(monthQP);
      setBirthYear(yearQP);
      return;
    }

    // otherwise load from localStorage and push into URL
    const storedYear = localStorage.getItem('tg-year');
    const storedMonth = localStorage.getItem('tg-month');
    const storedDay = localStorage.getItem('tg-day');

    if (storedYear && storedMonth && storedDay) {
      const paddedMonth = storedMonth.padStart(2, '0');
      const paddedDay = storedDay.padStart(2, '0');
      setBirthDate(`${storedYear}-${paddedMonth}-${paddedDay}`);
      setBirthDay(storedDay);
      setBirthMonth(storedMonth);
      const params = new URLSearchParams();
      params.set('year', storedYear);
      params.set('month', storedMonth);
      params.set('day', storedDay);
      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  }, [router, searchParams]);

  // Numerology helpers
  const sumDigits = (num: number): number => {
    return num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22) {
      num = sumDigits(num);
    }
    return num;
  }

  // Helper to get fully reduced version (ignores master numbers)
  const getReducedValue = (num: number): number => {
    while (num > 9) {
      num = sumDigits(num);
    }
    return num;
  }
  // Corrected: Personal Month = reduce(personalYear + currentMonth)
  const getPersonalMonth = (birthDay: number, birthMonth: number, todayYear: number, todayMonth: number, todayDay: number): number => {
    // Calculate personal year first
    const personalYear = getPersonalYear(birthDay, birthMonth, todayYear);
    // If today is before the 21st, use current month. If on/after 21st, use next month (wrap to 1 if December)
    let month = todayMonth;
    if (todayDay >= 21) {
      month = todayMonth === 12 ? 1 : todayMonth + 1;
    }
    return reduceToSingleDigit(personalYear + month);
  }
  const getPersonalDay = (personalMonth: number, todayDay: number): number => {
    return reduceToSingleDigit(todayDay + personalMonth);
  }

  const getPersonalYear = (birthDay: number, birthMonth: number, todayYear: number): number => {
    const rawYear = sumDigits(birthDay) + sumDigits(birthMonth) + sumDigits(todayYear);
    return reduceToSingleDigit(rawYear);
  }

  // When user changes date input
  const handleDateChange = (dateString: string) => {
    setBirthDate(dateString);
    if (!dateString) {
      router.replace('/', { scroll: false });
      return;
    }
    if (dateString.length === 10) {
      const [y, m, d] = dateString.split('-');
      setBirthYear(y);
      setBirthMonth(m);
      setBirthDay(d);
      // Calculate personal year
      const params = new URLSearchParams();
      params.set('year', y); // use birth year directly per requirement
      params.set('month', m);
      params.set('day', d);
      router.replace(`/?${params.toString()}`, { scroll: false });
      // persist to localStorage for future sessions
      localStorage.setItem('tg-year', y);
      localStorage.setItem('tg-month', m);
      localStorage.setItem('tg-day', d);
      localStorage.setItem('tg-birth', dateString);
    }
  };

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <main className="flex flex-col items-center gap-8 p-4 sm:p-6 min-h-screen relative">
      <NavBar />

      {/* Mystical background overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 constellation-gold opacity-20" />
        <div className="absolute inset-0 constellation-violet opacity-20" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center relative z-10">
        {/* Primary mystical container with ornate corners */}
        <div className="mystical-container ornate-corners ornate-corners-bottom relative w-full max-w-xl mx-auto overflow-hidden p-6 sm:p-8 md:p-10 animate-fade-in">
          {/* Inner mystical glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15), transparent 70%)'
            }}
          />

          {/* Corner star decorations */}
          <div className="absolute top-4 left-4 text-[#d4af37]/50 text-sm">✦</div>
          <div className="absolute top-4 right-4 text-[#d4af37]/50 text-sm">✦</div>
          <div className="absolute bottom-4 left-4 text-[#d4af37]/50 text-sm">✦</div>
          <div className="absolute bottom-4 right-4 text-[#d4af37]/50 text-sm">✦</div>

          <div className="relative z-10 text-center">
            <h2 className="mystical-heading text-2xl sm:text-3xl md:text-4xl mb-6 animate-text-glow">
              Personal Numerology
            </h2>

            {/* Decorative divider */}
            <div className="mystical-divider mb-6">
              <span className="text-[#d4af37] text-xl">✦</span>
            </div>

            <p className="mystical-body text-lg sm:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
              Numerology is one of the 4 mystical arts to come out of the western mystical tradition. Numbers are an integral part of the universe and are woven into the fabric of reality.
              Harness the gnosis of time to assist your decision making and deepen the understanding of your life.
            </p>

            <div className="mb-8">
              <a
                href="/numerology"
                className="mystical-button inline-block"
              >
                Read more
              </a>
            </div>

            <p className="mystical-flavor text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Enter your birth date to discover your personal numerology and planetary assignments.
            </p>

            <div className="mb-10">
              <DateSumInput date={birthDate} onDateChange={handleDateChange} />
            </div>

            {(birthDay && birthMonth && today) && (() => {
              const personalDay = getPersonalDay(getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate()), today.getDate());
              const personalMonth = getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate());
              const personalYear = getPersonalYear(Number(birthDay), Number(birthMonth), today.getFullYear());

              return (
                <>
                  {/* Decorative divider before oracle cards */}
                  <div className="mystical-divider mb-8">
                    <span className="text-[#d4af37] text-xl">✦</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Personal Day Oracle Card */}
                    <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <div className="mystical-subheading text-lg mb-2 text-[#d4af37]/80">Personal Day</div>
                      <button
                        onClick={() => handleNavigation(`/day/${personalDay}`)}
                        className="group mystical-card relative p-6 animate-float"
                        style={{ animationDelay: '0s' }}
                      >
                        {/* Inner border decoration */}
                        <div className="absolute inset-2 border border-[#d4af37]/30 rounded pointer-events-none" />

                        {/* Corner stars */}
                        <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✦</div>

                        <div className="mystical-heading text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                          {personalDay}
                        </div>
                      </button>
                      {(personalDay === 11 || personalDay === 22) && (
                        <button
                          onClick={() => handleNavigation(`/day/${getReducedValue(personalDay)}`)}
                          className="group mystical-card relative p-4 opacity-80 hover:opacity-100"
                        >
                          <div className="absolute top-1 left-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="absolute top-1 right-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="mystical-subheading text-xs mb-1 text-[#d4af37]/60">Reduce to single digit</div>
                          <div className="mystical-heading text-2xl group-hover:scale-110 transition-transform duration-300">
                            {getReducedValue(personalDay)}
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Personal Month Oracle Card */}
                    <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <div className="mystical-subheading text-lg mb-2 text-[#d4af37]/80">Personal Month</div>
                      <button
                        onClick={() => handleNavigation(`/month/${personalMonth}`)}
                        className="group mystical-card relative p-6 animate-float"
                        style={{ animationDelay: '0.15s' }}
                      >
                        {/* Inner border decoration */}
                        <div className="absolute inset-2 border border-[#d4af37]/30 rounded pointer-events-none" />

                        {/* Corner stars */}
                        <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✦</div>

                        <div className="mystical-heading text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                          {personalMonth}
                        </div>
                      </button>
                      {(personalMonth === 11 || personalMonth === 22) && (
                        <button
                          onClick={() => handleNavigation(`/month/${getReducedValue(personalMonth)}`)}
                          className="group mystical-card relative p-4 opacity-80 hover:opacity-100"
                        >
                          <div className="absolute top-1 left-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="absolute top-1 right-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="mystical-subheading text-xs mb-1 text-[#d4af37]/60">Reduce to single digit</div>
                          <div className="mystical-heading text-2xl group-hover:scale-110 transition-transform duration-300">
                            {getReducedValue(personalMonth)}
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Personal Year Oracle Card */}
                    <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <div className="mystical-subheading text-lg mb-2 text-[#d4af37]/80">Personal Year</div>
                      <button
                        onClick={() => handleNavigation(`/year/${personalYear}`)}
                        className="group mystical-card relative p-6 animate-float"
                        style={{ animationDelay: '0.3s' }}
                      >
                        {/* Inner border decoration */}
                        <div className="absolute inset-2 border border-[#d4af37]/30 rounded pointer-events-none" />

                        {/* Corner stars */}
                        <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                        <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✦</div>

                        <div className="mystical-heading text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                          {personalYear}
                        </div>
                      </button>
                      {(personalYear === 11 || personalYear === 22) && (
                        <button
                          onClick={() => handleNavigation(`/year/${getReducedValue(personalYear)}`)}
                          className="group mystical-card relative p-4 opacity-80 hover:opacity-100"
                        >
                          <div className="absolute top-1 left-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="absolute top-1 right-1 text-[#d4af37]/30 text-xs">✦</div>
                          <div className="mystical-subheading text-xs mb-1 text-[#d4af37]/60">Reduce to single digit</div>
                          <div className="mystical-heading text-2xl group-hover:scale-110 transition-transform duration-300">
                            {getReducedValue(personalYear)}
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Mystical loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'linear-gradient(135deg, rgba(26,0,51,0.95), rgba(45,27,78,0.95))' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" style={{ boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}></div>
            <div className="mystical-subheading text-[#d4af37] animate-text-glow">Consulting the Oracle...</div>
          </div>
        </div>
      )}

      <Planets />
    </main>
  );
}
