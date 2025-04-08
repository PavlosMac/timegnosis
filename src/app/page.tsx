
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
      <DateSumInput setDay={setDay} setMonth={setMonth} setYear={setYear} />

      {/* Display the calculated values */}
      <div className="flex flex-col items-center p-4 border rounded-md shadow-md bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">Your Personal Numbers</h2>
        <p className="text-md text-gray-800 mt-2">
        <Link href={`/day/${day}`} className="text-blue-500 hover:underline">
          <span className="font-bold">Day:</span> {day} | 
          </Link>
          <Link href={`/month/${month}`} className="text-blue-500 hover:underline">
          <span className="font-bold"> Month:</span> {month} | 
          </Link>
          <Link href={`/year/${year}`} className="text-blue-500 hover:underline">
          <span className="font-bold"> Year:</span> {year}
         </Link>
        </p>
      </div>

      <Planets day={day} month={month} year={year} />
    </main>
  );
}