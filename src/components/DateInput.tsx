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
    <div className="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter Your Birth Date</h2>
        <div className="relative">
          <input
            type="date"
            value={date}
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
