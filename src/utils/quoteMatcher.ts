import { Category, Character, Quote, WorryResult, WorrySubmission } from '../types';
import { CHARACTERS } from '../data/characters';
import { QUOTES } from '../data/quotes';

interface MatchOptions {
  previousResult?: WorryResult | null;
}

// 키워드 사전: 고민 본문에서 감지할 카테고리별 단어들
const CATEGORY_KEYWORDS: Record<Exclude<Category, 'etc'>, string[]> = {
  love: [
    '연애', '사랑', '좋아하', '짝사랑', '헤어', '이별', '고백', '남친', '여친',
    '애인', '썸', '데이트', '차였', '설레', '결혼', '남자친구', '여자친구', '마음앓이', '전남친', '전여친', '밀당'
  ],
  study: [
    '공부', '성적', '시험', '학업', '대학', '합격', '불합격', '수능', '학원',
    '과제', '점수', '등수', '집중', '성적표', '자격증', '독서실', '배움', '공시', '수험', '모의고사'
  ],
  parent: [
    '부모', '엄마', '아빠', '가족', '어머니', '아버지', '집안', '형제', '자매',
    '남매', '잔소리', '기대', '가정', '부모님'
  ],
  friend: [
    '친구', '교우', '무리', '절친', '왕따', '은따', '소외', '배신', '오해',
    '대인관계', '거리두기', '인간관계', '싸웠', '절교', '손절'
  ],
  career: [
    '진로', '취업', '취준', '꿈', '미래', '직장', '회사', '퇴사', '면접',
    '이직', '적성', '방향', '합격', '스펙', '포트폴리오', '앞날'
  ],
  mind: [
    '우울', '불안', '지쳐', '지쳤', '힘들', '무기력', '번아웃', '자존감', '멘탈',
    '쉼', '휴식', '외로', '눈물', '불면', '괴로', '슬픔', '스트레스', '피곤'
  ],
};

/**
 * 고민 본문(worryText)을 분석하여 가장 어울리는 카테고리를 추론하거나 보정
 */
function resolveCategory(worryText: string, userCategory: Category): Category {
  if (userCategory !== 'etc') {
    return userCategory;
  }

  // 사용자가 '기타'를 골랐지만 본문에 명확한 키워드가 많은 경우 자동 매칭
  const text = worryText.toLowerCase();
  let bestCategory: Category = 'etc';
  let maxMatches = 0;

  (Object.keys(CATEGORY_KEYWORDS) as Array<Exclude<Category, 'etc'>>).forEach((cat) => {
    const keywords = CATEGORY_KEYWORDS[cat];
    const matchCount = keywords.filter((kw) => text.includes(kw)).length;
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestCategory = cat;
    }
  });

  return bestCategory;
}

export function matchWorryQuote(submission: WorrySubmission, options?: MatchOptions): WorryResult {
  const { category: rawCategory, favoritePersonId, worryText } = submission;
  const prevResult = options?.previousResult;

  // 1. 실제 적용할 카테고리 결정 (기타 고민일 때 본문 키워드 분석 지원)
  const targetCategory = resolveCategory(worryText || '', rawCategory);

  // 2. 해당 카테고리에 부합하는 명언 풀 우선 확보 (카테고리 불일치 절대 방지)
  let categoryQuotes = QUOTES.filter((q) => q.category === targetCategory);
  if (categoryQuotes.length === 0) {
    categoryQuotes = QUOTES.filter((q) => q.category === rawCategory);
  }
  if (categoryQuotes.length === 0) {
    categoryQuotes = [...QUOTES];
  }

  // 3. 인물(Character) 매칭
  let chosenCharacter: Character;
  let chosenQuote: Quote;

  // 3-1. 사용자가 특정 인물(호감 고인)을 직접 지정한 경우
  if (favoritePersonId && favoritePersonId !== 'random') {
    const specificChar = CHARACTERS.find((c) => c.id === favoritePersonId);
    if (specificChar) {
      chosenCharacter = specificChar;
      // 해당 인물의 타겟 카테고리 명언 검색
      let charQuotes = categoryQuotes.filter((q) => q.personId === specificChar.id);
      if (charQuotes.length === 0) {
        // 해당 인물에게 해당 카테고리 명언이 없으면 그 인물의 전체 명언 중 선택
        charQuotes = QUOTES.filter((q) => q.personId === specificChar.id);
      }
      if (charQuotes.length === 0) {
        charQuotes = categoryQuotes;
      }
      // 직전 명언과 중복 배제
      let pool = charQuotes;
      if (prevResult && charQuotes.length > 1) {
        pool = charQuotes.filter((q) => q.id !== prevResult.quote.id);
        if (pool.length === 0) pool = charQuotes;
      }
      chosenQuote = pool[Math.floor(Math.random() * pool.length)];

      return {
        submission,
        person: chosenCharacter,
        quote: chosenQuote,
      };
    }
  }

  // 3-2. 랜덤 매칭: 특정 인물로 쏠리지 않도록 인물 목록을 추출하여 균등 추첨
  // 해당 카테고리의 명언을 보유한 고유 인물 목록 추출
  const availablePersonIds = Array.from(new Set(categoryQuotes.map((q) => q.personId)));

  // 직전 결과(previousResult)의 인물 제외하여 연속 같은 인물 중복 100% 방지
  let candidatePersonIds = availablePersonIds;
  if (prevResult && availablePersonIds.length > 1) {
    candidatePersonIds = availablePersonIds.filter((pid) => pid !== prevResult.person.id);
    if (candidatePersonIds.length === 0) candidatePersonIds = availablePersonIds;
  }

  // 인물 후보군 중 1명 균등 랜덤 선택
  const chosenPersonId = candidatePersonIds[Math.floor(Math.random() * candidatePersonIds.length)];
  const foundChar = CHARACTERS.find((c) => c.id === chosenPersonId);
  chosenCharacter = foundChar || CHARACTERS[0];

  // 4. 선택된 인물의 해당 카테고리 명언 풀 확보
  let personCategoryQuotes = categoryQuotes.filter((q) => q.personId === chosenPersonId);
  if (personCategoryQuotes.length === 0) {
    personCategoryQuotes = categoryQuotes;
  }

  // 직전 명언과 중복 배제
  let finalQuotePool = personCategoryQuotes;
  if (prevResult && personCategoryQuotes.length > 1) {
    finalQuotePool = personCategoryQuotes.filter((q) => q.id !== prevResult.quote.id);
    if (finalQuotePool.length === 0) finalQuotePool = personCategoryQuotes;
  }

  // 본문 텍스트와 키워드가 겹치는 명언이 있다면 가중치 부여
  if (worryText && worryText.trim().length > 0) {
    const text = worryText.toLowerCase();
    const scoredQuotes = finalQuotePool.map((q) => {
      let score = 1;
      if (q.warmKeyword && text.includes(q.warmKeyword.toLowerCase())) score += 3;
      if (q.interpretation && text.split(' ').some((w) => w.length > 1 && q.interpretation.includes(w))) score += 1;
      return { quote: q, score };
    });

    // 점수 기반 룰렛 선택
    const totalScore = scoredQuotes.reduce((acc, cur) => acc + cur.score, 0);
    let rand = Math.random() * totalScore;
    let selected = scoredQuotes[0].quote;
    for (const item of scoredQuotes) {
      if (rand < item.score) {
        selected = item.quote;
        break;
      }
      rand -= item.score;
    }
    chosenQuote = selected;
  } else {
    chosenQuote = finalQuotePool[Math.floor(Math.random() * finalQuotePool.length)];
  }

  return {
    submission,
    person: chosenCharacter,
    quote: chosenQuote,
  };
}

