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
    if (!dateString) return;

    const birthDate = new Date(dateString);
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
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md bg-gray-100">
      <label className="text-gray-700 font-medium mb-2">Enter your birthday</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="p-2 border rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
