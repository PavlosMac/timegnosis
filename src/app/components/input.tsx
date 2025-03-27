'use client'
import { useState } from 'react'

export default function DateSumInput() {

  const [selectedDate, setSelectedDate] = useState("");
  const [sumYear, setYear] = useState(null);
  const [sumMonth, setMonth] = useState(null);
  const [sumDay, setDay] = useState(null);

  const sumDigitsDouble = (num) => {
    while (num > 9) {
      num = num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
  };
  const calculateSums = (dateString) => {
    if (!dateString) return;
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()
    console.log("month ",currentMonth)
    console.log("currentDay ",currentDay)


    
    const sumDigits = (num) => num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    
    const sumYear = sumDigits(day) + sumDigits(month) + sumDigits(currentYear);
    const personalYear =  (sumYear !== 22 && sumYear !== 11) ? sumDigitsDouble(sumYear) : sumYear;
    const sumMonth = sumDigits(day) + sumDigits(month) + sumDigits(currentMonth) + 2;
    const personalMonth =  (sumMonth !== 22 && sumMonth !== 11) ? sumDigitsDouble(sumMonth) : sumMonth;
    const sumDay = sumMonth + currentDay;
    const personalDay =  (sumDay !== 22 && sumDay !== 11) ? sumDigitsDouble(sumDay) : sumDay;
    setYear(personalYear);
    setMonth(personalMonth)
    setDay(personalDay);
  };

  const handleChange = (event) => {
    const rawDate = event.target.value;
    const formattedDate = new Date(rawDate).toISOString().split("T")[0]; // Ensures YYYY-MM-DD format
    setSelectedDate(formattedDate);
    calculateSums(formattedDate);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-sm mx-auto border rounded-lg shadow-md">
      <label className="text-gray-700 font-medium">Enter your birthday</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="p-2 border rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
            <h1 className='text-lg font-semibold text-blue-900'>Personal</h1>
      {sumYear !== null && (
        <div className="grid grid-cols-3 gap-4 text-lg font-semibold">
        <div className="flex flex-col items-center">
          <span>Day {sumDay}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Month {sumMonth}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Year {sumYear}</span>
        </div>
      </div>
      )}
    </div>
  );
}
