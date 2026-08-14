export type Category = 'parent' | 'study' | 'friend' | 'career' | 'love' | 'mind' | 'etc';

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  subTitle: string;
  description: string;
  themeColor: string;
  lightBg: string;
  badgeBg: string;
  borderColor: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  era: string;
  description: string;
  avatarEmoji: string;
  avatarBg: string;
  avatarShapeColor: string;
  categories: Category[];
  greeting: string;
  tags: string[];
}

export interface Quote {
  id: string;
  personId: string;
  category: Category;
  quote: string;
  interpretation: string;
  source: string;
  verified: boolean;
  warmKeyword: string;
}

export interface WorrySubmission {
  nickname: string;
  ageGroup?: string;
  category: Category;
  favoritePersonId?: string;
  worryText: string;
  timestamp: number;
}

export interface WorryResult {
  submission: WorrySubmission;
  person: Character;
  quote: Quote;
}

export type PageState = 'START' | 'INPUT' | 'LOADING' | 'RESULT';
