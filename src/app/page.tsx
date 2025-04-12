
'use client'
import DateSumInput from "@/components/DateInput";
import NavBar from "@/components/NavBar";
import PersonalNumerology from "@/components/PersonalNumberology";
import Planets from "@/components/Planets";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  // const [day, setDay] = useState(0);
  // const [month, setMonth] = useState(0);
  // const [year, setYear] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [day, setDay] = useState(Number(searchParams.get('day')) || 0);
  const [month, setMonth] = useState(Number(searchParams.get('month')) || 0);
  const [year, setYear] = useState(Number(searchParams.get('year')) || 0);

  // Update the URL when values change
  useEffect(() => {
    const params = new URLSearchParams();
    if (day) params.set('day', day.toString());
    if (month) params.set('month', month.toString());
    if (year) params.set('year', year.toString());

    router.replace(`/?${params.toString()}`);
  }, [day, month, year]);

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
            <DateSumInput setDay={setDay} setMonth={setMonth} setYear={setYear} />
          </div>

          {(day || month || year) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href={`/day/${day}`} 
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center">
              <div className="text-blue-400 text-lg font-medium mb-2">Personal Day</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{day}</div>
            </Link>
            <Link href={`/month/${month}`}
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center">
              <div className="text-purple-400 text-lg font-medium mb-2">Personal Month</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{month}</div>
            </Link>
            <Link href={`/year/${year}`}
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-all duration-300 text-center">
              <div className="text-pink-400 text-lg font-medium mb-2">Personal Year</div>
              <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{year}</div>
            </Link>
          </div>
          )}
        </div>
      </div>

      {(day || month || year) && (
        <Planets day={day} month={month} year={year} />
      )}
    </main>
  );
}