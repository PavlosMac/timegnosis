'use client'
import { useState } from 'react'

export default function DateSumInput() {

  const [selectedDate, setSelectedDate] = useState("");
  const [sum, setSum] = useState(null);

  const calculateSum = (dateString) => {
    if (!dateString) return;
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const sumDigits = (num) => num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    
    const totalSum = sumDigits(day) + sumDigits(month) + sumDigits(currentYear);
    setSum(totalSum);
  };

  const handleChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    calculateSum(newDate);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-sm mx-auto border rounded-lg shadow-md">
      <label className="text-gray-700 font-medium">Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="p-2 border rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {sum !== null && (
        <div className="text-lg font-semibold text-blue-600">Calculated Sum: {sum}</div>
      )}
    </div>
  );
}
