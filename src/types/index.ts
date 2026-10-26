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

export interface PersonalizedAdvice {
  coreDilemma: string; // 질문의 본질 / 딜레마 분석
  insight: string;     // 인물의 시선에서 본질을 짚어주는 맞춤 통찰
  actionTips: string[]; // 구체적인 양방향 실천 해결책 (예: 게임 조절법 + 공부 몰입법)
}

export interface WorryResult {
  submission: WorrySubmission;
  person: Character;
  quote: Quote;
  advice: PersonalizedAdvice;
}

export type PageState = 'START' | 'INPUT' | 'LOADING' | 'RESULT';
