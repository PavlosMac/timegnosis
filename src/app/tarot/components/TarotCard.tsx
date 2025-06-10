import { TarotCardData } from "@/app/tarot/models";
import Image from "next/image";
import React from "react";

interface TarotCardProps {
  card: TarotCardData;
  showMeaning?: boolean;
  small?: boolean;
}


export default function TarotCard({ card, showMeaning = true, small = false }: TarotCardProps) {
  return (
    <div className={`tarot-card flex flex-col items-center ${small ? '' : ''}`}>
      <div className={`relative ${small ? 'w-24 h-40 min-w-[96px] min-h-[160px]' : 'w-12 h-20 min-w-[48px] min-h-[80px]'} transition-transform ${card.reversed ? 'rotate-180' : ''}`}>
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          className="rounded-lg shadow-md object-cover"
          sizes={small ? '96px' : '48px'}
        />
      </div>
      <h3 className={`text-center ${small ? 'text-[10px] font-semibold mt-0.5' : 'text-xs sm:text-sm font-semibold mt-1'}`}>{card.name}</h3>
      {!small && showMeaning && (
        <p className="text-center text-[10px] sm:text-xs mt-0.5 text-gray-600">
          {card.reversed && card.reversedMeaning ? card.reversedMeaning : card.meaning}
        </p>
      )}
    </div>
  );
}
