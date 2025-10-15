export const dynamic = "force-static";
import { gnosisBodyTextClass } from "@/styles/textClassNames";

export async function generateMetadata() {
  return {
    title: "Numerology | TimeGnosis",
    description: "Explore the mystical art of numerology and discover the archetypal forces that shape your reality.",
    openGraph: {
      title: "Numerology | TimeGnosis",
      description: "Explore the mystical art of numerology and discover the archetypal forces that shape your reality.",
    }
  };
}

export default function NumerologyPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 #353a3a text-center">TimeGnosis System</h1>
        <div className="mt-6">
          <div className="prose prose-invert max-w-none">
            <p className={`${gnosisBodyTextClass} #353a3a`}>
            The TimeGnosis system I share here comes from my involvment in the Taroscopic Mystery School. After many years I found my old notes and with them the original interpreations.
            I felt it was important to share this system with others since it has been such a compelling tool for me in understanding my journey through life over many years.
            Numerology has sibling traditions namely the Tarot, Astrology Kabbalah. Consider the 22 Major Arcana for example. 1 - 22 are represent within this system, 11 and 22 are higher harmonic numbers,
            and 12 upwards are reduced to their single digits.
            </p>
            <br></br>
            <p className={`${gnosisBodyTextClass} #353a3a`}>
            I have added the Astrological Planets to give another dimension of character to the numbers. The Planetry assignments are not an exact science, but my interpretation 
            after years of contemplation. For example number 6 is represented by Jupiter, but the Sun or Mercury have similar characteristics.
            </p>
            
            <div className="mt-6 p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <p className={`${gnosisBodyTextClass} font-bold italic #353a3a`}>
                The calculation is simple.</p>
                <br></br>
                <p className={`${gnosisBodyTextClass} italic #353a3a`}>
                Take the birth day and month and add them together. Then add this to the current year.
                <br></br>
                E.g birth date = 5th August = 8 + 5 = 13 = 4  <br></br>
                  <br></br>
                4 + 2025 = (  2 + 0 + 2 + 5 = 9 ) + 4 = 13 <br></br>
                ( 1 + 3 ) = 4 <br></br>

                <br></br>4 is the year number.   <br></br>  <br></br>Then you want to add 4 to current month.<br/>
                
                E.g April = 4<br/>
                4 + 4 = 8<br/>
                <br></br>
                8 is the month number.  <br></br>  <br></br>

                Then you want to add 8 to current day.<br/>
                E.g 15th of April = 15 + 8 = 23 = 5<br/>
                <br></br> 
                5 is the day number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}