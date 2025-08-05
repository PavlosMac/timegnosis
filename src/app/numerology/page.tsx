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
        <h1 className="text-3xl font-bold mb-6 text-yellow-200 text-center">TimeGnosis System</h1>
        <div className="mt-6">
          <div className="prose prose-invert max-w-none">
            <p className={`${gnosisBodyTextClass} text-yellow-200`}>
            The TimeGnosis system you find on this website comes from my involvment in the Taroscopic Mystery School, from which I had the day interpretations. I found my old
            notes and felt it was important to share this system with others. 
            Numerology has sibling traditions namely the Tarot, Astrology Kabbalah. Consider the 22 Major Arcana for example. 1 - 22 are represent within this system, 11 and 22 are higher harmonic numbers,
            and 12 - 21 are reduced to their single digits. 
            </p>
            <br></br>
            <p className={`${gnosisBodyTextClass} text-yellow-200`}>
            I have added also the Astrological Planets to give another dimension of character to the numbers. The Planetry assignments are not exact science, but the authors 
            interpretation. For example
            number 6 is represented by Jupiter, but the Sun or Mercury may also have their say. 
            </p>
            
            <div className="mt-6 p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <p className={`${gnosisBodyTextClass} font-bold italic text-yellow-200`}>
                The calculation is simple.</p>
                <br></br>
                <p className={`${gnosisBodyTextClass} italic text-yellow-200`}>
                Take the birth day and month and add them together. Then add this to the year.
                <br></br>
                E.g 8th of January = 8 + 1 = 9  <br></br>
                9 + 2025 = 34  <br></br>
                3 + 4 = 7  <br></br>

                7 is then the year number.   <br></br>  <br></br>Then you want to add 7 to current month.<br/>
                E.g April = 4<br/>
                4 + 7 = 11<br/>
                1 + 1 = 2
                <br></br>
                2 is then the month number.  <br></br>  <br></br>

                Then you want to add 2 to current day.<br/>
                E.g 15th of April = 15 + 2 = 17 = 8<br/>
                <br></br>  <br></br>
                8 is then the day number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}