"use client";
import React, { useState } from "react";

import TarotCard, { TarotCardData } from "@/components/TarotCard";

// Tarot deck with first 22 cards (Major Arcana) using provided srcs
const TAROT_DECK: TarotCardData[] = [
  { name: "The Fool", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-00.webp", meaning: "New beginnings, innocence", reversedMeaning: "Recklessness, risk-taking" },
  { name: "The Magician", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-01.webp", meaning: "Manifestation, resourcefulness", reversedMeaning: "Manipulation, poor planning" },
  { name: "The High Priestess", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-02.webp", meaning: "Intuition, unconscious", reversedMeaning: "Secrets, disconnected from intuition" },
  { name: "The Empress", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-03.webp", meaning: "Fertility, beauty, nature", reversedMeaning: "Dependence, creative block" },
  { name: "The Emperor", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-04.webp", meaning: "Authority, structure", reversedMeaning: "Domination, rigidity" },
  { name: "The Hierophant", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-05.webp", meaning: "Tradition, conformity", reversedMeaning: "Rebellion, unconventionality" },
  { name: "The Lovers", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-06.webp", meaning: "Love, harmony", reversedMeaning: "Imbalance, misalignment" },
  { name: "The Chariot", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-07.webp", meaning: "Control, willpower", reversedMeaning: "Aggression, lack of direction" },
  { name: "Strength", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-08.webp", meaning: "Courage, persuasion", reversedMeaning: "Self-doubt, weakness" },
  { name: "The Hermit", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-09.webp", meaning: "Soul-searching, solitude", reversedMeaning: "Isolation, withdrawal" },
  { name: "Wheel of Fortune", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-10.webp", meaning: "Luck, karma, cycles", reversedMeaning: "Bad luck, resistance to change" },
  { name: "Justice", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-11.webp", meaning: "Truth, fairness", reversedMeaning: "Dishonesty, unfairness" },
  { name: "The Hanged Man", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-12.webp", meaning: "Pause, surrender", reversedMeaning: "Delays, resistance" },
  { name: "Death", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-13.webp", meaning: "Endings, transformation", reversedMeaning: "Fear of change, stagnation" },
  { name: "Temperance", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-14.webp", meaning: "Balance, patience", reversedMeaning: "Imbalance, excess" },
  { name: "The Devil", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-15.webp", meaning: "Addiction, materialism", reversedMeaning: "Freedom, release" },
  { name: "The Tower", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-16.webp", meaning: "Sudden change, upheaval", reversedMeaning: "Avoidance of disaster" },
  { name: "The Star", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-17.webp", meaning: "Hope, renewal", reversedMeaning: "Despair, lack of faith" },
  { name: "The Moon", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-18.webp", meaning: "Illusion, fear", reversedMeaning: "Release of fear, confusion" },
  { name: "The Sun", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-19.webp", meaning: "Joy, success", reversedMeaning: "Negativity, depression" },
  { name: "Judgement", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-20.webp", meaning: "Rebirth, inner calling", reversedMeaning: "Self-doubt, refusal" },
  { name: "The World", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-T-21.webp", meaning: "Completion, accomplishment", reversedMeaning: "Shortcuts, delays" },
  // Pentacles suit
  { name: "Ace of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-0A.webp", meaning: "New financial or career opportunity, manifestation, abundance", reversedMeaning: "Lost opportunity, lack of planning and foresight" },
  { name: "Two of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-02.webp", meaning: "Balance, adaptability, time management", reversedMeaning: "Overwhelmed, disorganization" },
  { name: "Three of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-03.webp", meaning: "Teamwork, collaboration, learning", reversedMeaning: "Disharmony, misalignment, working alone" },
  { name: "Four of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-04.webp", meaning: "Saving money, security, conservatism", reversedMeaning: "Greed, materialism, self-protection" },
  { name: "Five of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-05.webp", meaning: "Financial loss, poverty, isolation", reversedMeaning: "Recovery from loss, spiritual poverty" },
  { name: "Six of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-06.webp", meaning: "Giving, receiving, sharing wealth", reversedMeaning: "Debt, selfishness, one-sided charity" },
  { name: "Seven of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-07.webp", meaning: "Long-term view, perseverance, investment", reversedMeaning: "Lack of long-term vision, limited success" },
  { name: "Eight of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-08.webp", meaning: "Apprenticeship, repetitive tasks, mastery", reversedMeaning: "Perfectionism, uninspired, no passion" },
  { name: "Nine of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-09.webp", meaning: "Abundance, luxury, self-sufficiency", reversedMeaning: "Overindulgence, financial setbacks" },
  { name: "Ten of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-10.webp", meaning: "Wealth, inheritance, family, establishment", reversedMeaning: "Financial failure, loneliness, loss" },
  { name: "Page of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-J1.webp", meaning: "Manifestation, financial opportunity, skill development", reversedMeaning: "Lack of progress, procrastination" },
  { name: "Knight of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-J2.webp", meaning: "Hard work, productivity, routine", reversedMeaning: "Laziness, boredom, feeling stuck" },
  { name: "Queen of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-QU.webp", meaning: "Practicality, creature comforts, financial security", reversedMeaning: "Self-centeredness, jealousy, smothering" },
  { name: "King of Pentacles", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-P-KI.webp", meaning: "Wealth, business, leadership, security", reversedMeaning: "Greed, indulgence, sensuality" },
  // Wands suit
  { name: "Ace of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-0A.webp", meaning: "Inspiration, new opportunities, growth", reversedMeaning: "Delays, lack of motivation" },
  { name: "Two of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-02.webp", meaning: "Planning, making decisions, leaving comfort", reversedMeaning: "Fear of change, playing safe" },
  { name: "Three of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-03.webp", meaning: "Expansion, foresight, overseas opportunities", reversedMeaning: "Delays, obstacles, frustration" },
  { name: "Four of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-04.webp", meaning: "Celebration, harmony, home, community", reversedMeaning: "Conflict with family, instability" },
  { name: "Five of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-05.webp", meaning: "Competition, conflict, rivalry", reversedMeaning: "Avoiding conflict, compromise" },
  { name: "Six of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-06.webp", meaning: "Victory, success, public recognition", reversedMeaning: "Ego, lack of recognition, fall from grace" },
  { name: "Seven of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-07.webp", meaning: "Challenge, competition, perseverance", reversedMeaning: "Giving up, overwhelmed" },
  { name: "Eight of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-08.webp", meaning: "Speed, action, movement, swift change", reversedMeaning: "Delays, frustration, holding off" },
  { name: "Nine of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-09.webp", meaning: "Resilience, courage, persistence", reversedMeaning: "Exhaustion, fatigue, questioning motives" },
  { name: "Ten of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-10.webp", meaning: "Burden, responsibility, hard work", reversedMeaning: "Burnout, stress, letting go" },
  { name: "Page of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-J1.webp", meaning: "Inspiration, discovery, free spirit", reversedMeaning: "Setbacks to new ideas, pessimism" },
  { name: "Knight of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-J2.webp", meaning: "Energy, passion, inspired action", reversedMeaning: "Impulsiveness, haste, scattered energy" },
  { name: "Queen of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-QU.webp", meaning: "Courage, confidence, independence", reversedMeaning: "Selfishness, jealousy, insecurity" },
  { name: "King of Wands", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-W-KI.webp", meaning: "Natural leader, vision, entrepreneur", reversedMeaning: "Impulsiveness, haste, ruthless" },
  // Cups suit
  { name: "Ace of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-0A.webp", meaning: "Love, new relationships, compassion", reversedMeaning: "Emotional loss, blocked creativity" },
  { name: "Two of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-02.webp", meaning: "Unified love, partnership, attraction", reversedMeaning: "Break-up, imbalance, lack of harmony" },
  { name: "Three of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-03.webp", meaning: "Celebration, friendship, creativity", reversedMeaning: "Overindulgence, gossip, isolation" },
  { name: "Four of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-04.webp", meaning: "Meditation, contemplation, apathy", reversedMeaning: "Boredom, missed opportunity" },
  { name: "Five of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-05.webp", meaning: "Regret, failure, disappointment", reversedMeaning: "Acceptance, moving on, finding peace" },
  { name: "Six of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-06.webp", meaning: "Reunion, nostalgia, childhood memories", reversedMeaning: "Stuck in the past, naivety" },
  { name: "Seven of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-07.webp", meaning: "Opportunities, choices, wishful thinking", reversedMeaning: "Lack of purpose, diversion, confusion" },
  { name: "Eight of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-08.webp", meaning: "Disappointment, withdrawal, abandonment", reversedMeaning: "Fear of change, stagnation" },
  { name: "Nine of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-09.webp", meaning: "Contentment, satisfaction, gratitude", reversedMeaning: "Lack of inner joy, dissatisfaction" },
  { name: "Ten of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-10.webp", meaning: "Harmony, marriage, happiness, alignment", reversedMeaning: "Misalignment of values, broken home" },
  { name: "Page of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-J1.webp", meaning: "Creative opportunities, curiosity, possibility", reversedMeaning: "Emotional immaturity, insecurity" },
  { name: "Knight of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-J2.webp", meaning: "Romance, charm, imagination", reversedMeaning: "Unrealistic, jealousy, moodiness" },
  { name: "Queen of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-QU.webp", meaning: "Compassionate, caring, emotionally stable", reversedMeaning: "Insecurity, dependence, martyrdom" },
  { name: "King of Cups", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-C-KI.webp", meaning: "Emotionally balanced, diplomatic, generous", reversedMeaning: "Moodiness, volatility, manipulation" },
  // Swords suit
  { name: "Ace of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-0A.webp", meaning: "Breakthrough, clarity, sharp mind", reversedMeaning: "Confusion, brutality, chaos" },
  { name: "Two of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-02.webp", meaning: "Difficult decisions, weighing up options", reversedMeaning: "Indecision, confusion, information overload" },
  { name: "Three of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-03.webp", meaning: "Heartbreak, emotional pain, sorrow", reversedMeaning: "Recovery, forgiveness, moving on" },
  { name: "Four of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-04.webp", meaning: "Rest, restoration, contemplation", reversedMeaning: "Restlessness, burnout, stress" },
  { name: "Five of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-05.webp", meaning: "Conflict, disagreements, defeat", reversedMeaning: "Reconciliation, making amends" },
  { name: "Six of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-06.webp", meaning: "Transition, change, rite of passage", reversedMeaning: "Resistance to change, unfinished business" },
  { name: "Seven of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-07.webp", meaning: "Deception, trickery, tactics", reversedMeaning: "Coming clean, rethinking approach" },
  { name: "Eight of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-08.webp", meaning: "Imprisonment, entrapment, self-victimization", reversedMeaning: "Freedom, release, finding solutions" },
  { name: "Nine of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-09.webp", meaning: "Anxiety, worry, fear, depression", reversedMeaning: "Inner turmoil, deep fears released" },
  { name: "Ten of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-10.webp", meaning: "Ruin, failure, betrayal", reversedMeaning: "Survival, recovery, regeneration" },
  { name: "Page of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-J1.webp", meaning: "New ideas, curiosity, thirst for knowledge", reversedMeaning: "Deception, manipulation, all talk" },
  { name: "Knight of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-J2.webp", meaning: "Ambitious, action-oriented, driven", reversedMeaning: "No direction, disregard for consequences" },
  { name: "Queen of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-QU.webp", meaning: "Complexity, perceptiveness, clear mindedness", reversedMeaning: "Cold-hearted, cruel, bitterness" },
  { name: "King of Swords", imageUrl: "https://steve-p.org/cards/small/sm_RWSa-S-KI.webp", meaning: "Intellectual, authority, truth", reversedMeaning: "Manipulative, cruel, weakness" },
];


function shuffleDeck(deck: TarotCardData[]): TarotCardData[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Selected card type
interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

export default function TarotGame() {
  const [numCards, setNumCards] = useState<number>(3);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setShuffledDeck(shuffleDeck(TAROT_DECK));
    setSelectedCards([]);
    setGameStarted(true);
  };

  const selectCard = (idx: number) => {
    if (selectedCards.length >= numCards) return;
    if (selectedCards.find((c) => c.idx === idx)) return;
    // Randomly determine reversed
    const reversed = Math.random() < 0.5;
    setSelectedCards([
      ...selectedCards,
      { ...shuffledDeck[idx], idx, reversed },
    ]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700 shadow-2xl mt-8">
      {/* Subtle background SVG (planet or tarot motif) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none hidden md:block">
        <img src="/planets/astro.svg" alt="Background" className="object-cover w-full h-full scale-200" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-purple-500">
        Tarot Card Shuffle Game
      </h1>
      {!gameStarted && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <label className="text-lg">How many cards for your reading?</label>
          <select
            className="border rounded px-2 py-1"
            value={numCards}
            onChange={(e) => setNumCards(Number(e.target.value))}
          >
            {[1, 3, 5, 7, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 text-white rounded-lg shadow hover:from-yellow-500 hover:to-purple-600 transition-all font-semibold"
            onClick={startGame}
          >
            Shuffle & Start
          </button>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="mb-4 text-center mt-2">
            <span className="font-semibold">Select {numCards} card{numCards > 1 ? "s" : ""}:</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 justify-center">
            {shuffledDeck.slice(0, 12).map((card, idx) => {
              const isSelected = selectedCards.find((c) => c.idx === idx);
              return (
                <button
                  key={idx}
                  className={`w-36 h-[216px] border border-gray-700 rounded-lg shadow bg-gray-800/70 flex items-center justify-center relative transition-transform duration-200 ${isSelected ? "opacity-30 grayscale" : "hover:scale-105 hover:border-yellow-400"}`}
                  onClick={() => selectCard(idx)}
                  disabled={!!isSelected || selectedCards.length >= numCards}
                  aria-label="Pick card"
                >
                  <span className="text-2xl">🃏</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap gap-6 justify-center">
              {selectedCards.map((card, i) => (
                <TarotCard key={i} card={card} />
              ))}
            </div>
            {selectedCards.length === numCards && (
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 text-white rounded-lg shadow hover:from-yellow-500 hover:to-purple-600 transition-all font-semibold mx-auto block"
                onClick={() => setGameStarted(false)}
              >
                New Reading
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
