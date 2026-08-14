import { Character, Quote, WorryResult, WorrySubmission } from '../types';
import { CHARACTERS } from '../data/characters';
import { QUOTES } from '../data/quotes';

interface MatchOptions {
  previousResult?: WorryResult | null;
}

export function matchWorryQuote(submission: WorrySubmission, options?: MatchOptions): WorryResult {
  const { category, favoritePersonId } = submission;
  const prevResult = options?.previousResult;

  // 1. Find character pool
  let eligibleCharacters: Character[] = [];

  if (favoritePersonId && favoritePersonId !== 'random') {
    const specificChar = CHARACTERS.find((c) => c.id === favoritePersonId);
    if (specificChar) {
      eligibleCharacters = [specificChar];
    }
  }

  if (eligibleCharacters.length === 0) {
    // Filter characters by category
    eligibleCharacters = CHARACTERS.filter((c) => c.categories.includes(category));
    // Fallback: if no characters found for category, use all characters
    if (eligibleCharacters.length === 0) {
      eligibleCharacters = [...CHARACTERS];
    }
  }

  // Deduplicate from previous character if we have multiple choices
  let characterPool = eligibleCharacters;
  if (prevResult && eligibleCharacters.length > 1) {
    characterPool = eligibleCharacters.filter((c) => c.id !== prevResult.person.id);
    if (characterPool.length === 0) characterPool = eligibleCharacters;
  }

  // Randomly pick a character
  const chosenCharacter = characterPool[Math.floor(Math.random() * characterPool.length)];

  // 2. Find quotes pool for the chosen character and category
  let eligibleQuotes: Quote[] = QUOTES.filter(
    (q) => q.personId === chosenCharacter.id && q.category === category
  );

  // If no quote for this category & character, fallback to any quote for this character
  if (eligibleQuotes.length === 0) {
    eligibleQuotes = QUOTES.filter((q) => q.personId === chosenCharacter.id);
  }

  // If still no quote, fallback to all quotes for the category
  if (eligibleQuotes.length === 0) {
    eligibleQuotes = QUOTES.filter((q) => q.category === category);
  }

  // Ultimate fallback
  if (eligibleQuotes.length === 0) {
    eligibleQuotes = [...QUOTES];
  }

  // Deduplicate from previous quote if possible
  let quotePool = eligibleQuotes;
  if (prevResult && eligibleQuotes.length > 1) {
    quotePool = eligibleQuotes.filter((q) => q.id !== prevResult.quote.id);
    if (quotePool.length === 0) quotePool = eligibleQuotes;
  }

  const chosenQuote = quotePool[Math.floor(Math.random() * quotePool.length)];

  return {
    submission,
    person: chosenCharacter,
    quote: chosenQuote,
  };
}
