
'use client'
import React from "react";
import DateSumInput from "@/components/DateInput";
import NavBar from "@/components/NavBar";
import PersonalNumerology from "@/components/PersonalNumberology";
import Planets from "@/components/Planets";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function Home() {
  // const [day, setDay] = useState(0);
  // const [month, setMonth] = useState(0);
  // const [year, setYear] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  // Numerology helpers
  function sumDigits(num: number): number {
    return num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  function reduceToSingleDigit(num: number): number {
    while (num > 9 && num !== 11 && num !== 22) {
      num = sumDigits(num);
    }
    return num;
  }
  function getPersonalMonth(birthMonth: number, todayYear: number): number {
    return reduceToSingleDigit(birthMonth + reduceToSingleDigit(todayYear));
  }
  function getPersonalDay(personalMonth: number, todayDay: number): number {
    return reduceToSingleDigit(todayDay + personalMonth);
  }
  function getPersonalYear(birthDay: number, birthMonth: number, todayYear: number): number {
    const rawYear = sumDigits(birthDay) + sumDigits(birthMonth) + sumDigits(todayYear);
    return reduceToSingleDigit(rawYear);
  }

  // Get today's date for calculations
  const today = new Date();

  // Use local state for the input value to prevent reload/focus loss
  const [inputDate, setInputDate] = React.useState(() => {
    let initial = '';
    if (year) initial += year;
    if (month) initial += (initial ? '-' : '') + String(month).padStart(2, '0');
    if (day) initial += (initial.length === 7 ? '-' : '') + String(day).padStart(2, '0');
    return initial;
  });

  // Sync input state with URL params if they change (e.g. back/forward navigation)
  React.useEffect(() => {
    let newDate = '';
    if (year) newDate += year;
    if (month) newDate += (newDate ? '-' : '') + String(month).padStart(2, '0');
    if (day) newDate += (newDate.length === 7 ? '-' : '') + String(day).padStart(2, '0');
    setInputDate(newDate);
  }, [year, month, day]);

  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      router.replace('/', { shallow: true, scroll: false });
      return;
    }
    // Only update URL if complete date (YYYY-MM-DD)
    if (dateString.length === 10) {
      const [y, m, d] = dateString.split('-');
      // Calculate personal year
      const personalYear = getPersonalYear(Number(d), Number(m), today.getFullYear());
      if (String(personalYear) === year && m === month && d === day) return; // Already set, do nothing
      const params = new URLSearchParams();
      params.set('year', String(personalYear));
      params.set('month', m);
      params.set('day', d);
      router.replace(`/?${params.toString()}`, undefined, { shallow: true, scroll: false });
    }
  };

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <NavBar />
      <PersonalNumerology />

      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Your Personal Numbers
          </h2>
          
          <div className="mb-8">
            <DateSumInput date={inputDate} onDateChange={(value) => {
              setInputDate(value);
              handleDateChange(value);
            }} />
          </div>

          {(day || month || year) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href={`/day/${month ? getPersonalDay(getPersonalMonth(Number(month), today.getFullYear()), today.getDate()) : ''}`} 
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center">
              <div className="text-blue-400 text-lg font-medium mb-2">Personal Day</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{month ? getPersonalDay(getPersonalMonth(Number(month), today.getFullYear()), today.getDate()) : ''}</div>
            </Link>
            <Link href={`/month/${month ? getPersonalMonth(Number(month), today.getFullYear()) : ''}`}
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center">
              <div className="text-purple-400 text-lg font-medium mb-2">Personal Month</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{month ? getPersonalMonth(Number(month), today.getFullYear()) : ''}</div>
            </Link>
            <Link href={`/year/${day && month ? getPersonalYear(Number(day), Number(month), new Date().getFullYear()) : ''}`}
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-all duration-300 text-center">
              <div className="text-pink-400 text-lg font-medium mb-2">Personal Year</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{day && month ? getPersonalYear(Number(day), Number(month), new Date().getFullYear()) : ''}</div>
            </Link>
          </div>
          )}
        </div>
      </div>

      <Planets />
      
    </main>
  );
}