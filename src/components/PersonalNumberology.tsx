'use client';

import Image from 'next/image';

export default function PersonalNumerology() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="relative overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/planets/astro.svg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Personal Numerology
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Discover the cosmic influence of numbers in your life path through ancient numerological wisdom.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Life Path</h3>
              <p className="text-gray-300">Your core purpose and life journey</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Expression</h3>
              <p className="text-gray-300">Your talents and abilities</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-pink-400 mb-2">Soul Urge</h3>
              <p className="text-gray-300">Your inner desires and motivations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  