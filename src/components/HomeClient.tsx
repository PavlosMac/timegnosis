"use client"
import React, { useState, useEffect } from "react";
import DateSumInput from "@/components/DateInput";
import NavBar from "@/components/NavBar";
import Image from 'next/image';
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
      setBirthDay(dayQP);
      setBirthMonth(monthQP);
      setBirthYear("" /* unknown */);
      return;
    }

    // otherwise load from localStorage and push into URL
    const storedYear = localStorage.getItem('tg-year');
    const storedMonth = localStorage.getItem('tg-month');
    const storedDay = localStorage.getItem('tg-day');

    if (storedYear && storedMonth && storedDay) {
      setBirthDay(storedDay);
      setBirthMonth(storedMonth);
      const params = new URLSearchParams();
      params.set('year', storedYear);
      params.set('month', storedMonth);
      params.set('day', storedDay);
      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  }, []); // run once on mount

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

  // Get today's date for calculations
  const today = new Date();

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
    <main className="flex flex-col items-center gap-8 p-6">
      <NavBar />
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
        <div className="relative w-full max-w-xl mx-auto overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-20 hidden md:block">
            <Image src="/planets/astro.svg" alt="Background" fill className="object-cover w-full h-full scale-200" priority={false} style={{ objectFit: 'cover' }} />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#4B2067]">
              Personal Numerology
            </h2>
            <p className="text-xl text-white mb-4 max-w-2xl mx-auto leading-relaxed">
              Numerology is one of the 4 mystical arts and has been used by spiritual traditions for millennia. Numbers are woven into reality and represent archetypal forces that shadow the self. Harness the gnosis of time to assist your decision making and deepen the understanding of your life.
            </p>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Enter your birth date to discover your personal numerology and planetary assignments.
            </p>
            <div className="mb-8">
              <DateSumInput date={birthDate} onDateChange={handleDateChange} />
            </div>
            {(birthDay && birthMonth) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <button 
                  onClick={() => handleNavigation(`/day/${getPersonalDay(getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate()), today.getDate())}`)}
                  className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center relative">
                  <div className="text-blue-400 text-lg font-medium mb-2">Personal Day</div>
                  <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {getPersonalDay(getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate()), today.getDate())}
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation(`/month/${getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate())}`)}
                  className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center relative">
                  <div className="text-purple-400 text-lg font-medium mb-2">Personal Month</div>
                  <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {getPersonalMonth(Number(birthDay), Number(birthMonth), today.getFullYear(), today.getMonth() + 1, today.getDate())}
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation(`/year/${getPersonalYear(Number(birthDay), Number(birthMonth), today.getFullYear())}`)}
                  className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-all duration-300 text-center relative">
                  <div className="text-pink-400 text-lg font-medium mb-2">Personal Year</div>
                  <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {getPersonalYear(Number(birthDay), Number(birthMonth), today.getFullYear())}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Planets />
    </main>
  );
}
