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
  <div className="flex flex-row gap-2 justify-center items-center">
    {selectedCards.map((card, i) => (
      <TarotCard key={i} card={card} small={true} />
    ))}
  </div>
);

export default Reading;
