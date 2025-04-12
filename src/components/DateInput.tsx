'use client';
import { useState } from 'react';

export default function DateSumInput({ setDay, setMonth, setYear }) {
  const [selectedDate, setSelectedDate] = useState('');

  const sumDigits = (num) =>
    num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);

  const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22) {
      num = sumDigits(num);
    }
    return num;
  };

  const calculateSums = (dateString) => {
    if (!dateString || dateString.length < 10) {
      // Reset values if date is incomplete
      setYear(0);
      setMonth(0);
      setDay(0);
      return;
    }

    const birthDate = new Date(dateString);
    // Validate the date is valid
    if (isNaN(birthDate.getTime())) {
      return;
    }
    
    const today = new Date();

    const birthDay = birthDate.getDate();
    const birthMonth = birthDate.getMonth() + 1;

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 1-indexed
    const currentDay = today.getDate();

    // Step 1: Personal Year = sum(birthDay) + sum(birthMonth) + sum(currentYear)
    const rawYear =
      sumDigits(birthDay) + sumDigits(birthMonth) + sumDigits(currentYear);
    const personalYear = reduceToSingleDigit(rawYear);

    // Step 2: Personal Month = personalYear + sum(currentMonth)
    const rawMonth = personalYear + sumDigits(currentMonth);
    const personalMonth = reduceToSingleDigit(rawMonth);

    // Step 3: Personal Day = personalMonth + sum(currentDay)
    const rawDay = personalMonth + sumDigits(currentDay);
    const personalDay = reduceToSingleDigit(rawDay);

    setYear(personalYear);
    setMonth(personalMonth);
    setDay(personalDay);
  };

  const handleChange = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
    calculateSums(inputDate);
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter Your Birth Date</h2>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white
                     text-lg font-medium shadow-inner focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
