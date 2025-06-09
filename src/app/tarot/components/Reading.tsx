import React from "react";
import TarotCard from "./TarotCard";
import { TarotCardData } from "../models";

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

interface ReadingProps {
  selectedCards: SelectedCard[];
}

const Reading: React.FC<ReadingProps> = ({ selectedCards }) => (
  <div className="flex flex-col gap-6 min-w-[140px] items-center">
    {selectedCards.length === 0 ? (
      <div className="text-gray-400 italic text-center">No cards selected</div>
    ) : (
      selectedCards.map((card, i) => <TarotCard key={i} card={card} />)
    )}
  </div>
);

export default Reading;
