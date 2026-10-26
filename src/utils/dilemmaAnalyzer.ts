import { Category, PersonalizedAdvice } from '../types';

interface DilemmaRule {
  id: string;
  match: (text: string, category: Category) => boolean;
  getAdvice: (text: string, personName: string, category: Category) => PersonalizedAdvice;
}

const DILEMMA_RULES: DilemmaRule[] = [
  // 1. 욕망/유혹 vs 목표/의무 (예: "공부를 잘하고 싶지만 게임도 하고 싶어", "과제해야 하는데 유튜브 봄", "시험공부 vs 폰")
  {
    id: 'temptation-vs-goal',
    match: (text) => {
      const temptations = ['게임', '유튜브', '넷플릭스', '폰', '스마트폰', '인스타', '틱톡', '놀고', '딴짓', '웹툰', '눕고', '침대', '뒹굴'];
      const goals = ['공부', '성적', '시험', '과제', '학업', '자격증', '독서', '운동', '다이어트', '취업', '일'];
      const hasTemptation = temptations.some((k) => text.includes(k));
      const hasGoal = goals.some((k) => text.includes(k));
      const hasConflict = text.includes('싶지만') || text.includes('하고 싶은데') || text.includes('해야 하는데') || text.includes('줄이') || text.includes('참');
      return (hasTemptation && hasGoal) || (hasTemptation && hasConflict);
    },
    getAdvice: (text, personName) => {
      // 텍스트에서 구체적 유혹 대상 감지
      let temptationItem = '게임이나 딴짓';
      if (text.includes('게임')) temptationItem = '게임';
      else if (text.includes('유튜브') || text.includes('넷플릭스') || text.includes('인스타')) temptationItem = '영상/SNS';
      else if (text.includes('폰') || text.includes('스마트폰')) temptationItem = '스마트폰';

      return {
        coreDilemma: `즉각적인 쾌락(${temptationItem})과 장기적인 목표(성취) 사이의 도파민 충돌`,
        insight: `${personName}의 관점에서 볼 때, 당신은 의지가 약한 사람이 아닙니다. 인간의 뇌는 당연히 즉각적 보상에 끌리도록 설계되어 있습니다. 핵심은 ${temptationItem}을 무작정 참아내는 고통이 아니라, ${temptationItem}의 '위치'를 정당한 보상으로 재배치하는 환경 설계에 있습니다.`,
        actionTips: [
          `[선(先)집중 후(後)보상 규칙]: ${temptationItem}을 완전히 끊으려 하지 말고, "오늘 45분 집중 후 ${temptationItem} 1판(또는 15분)"처럼 정당한 휴식 보상으로 전환하세요.`,
          `[물리적 접근 장벽 높이기]: 공부할 때는 ${temptationItem} 기기나 폰을 다른 방에 두거나 가방 깊숙이 넣어, 손에 닿기까지 3초 이상의 망설임 시간을 만드세요.`,
          `[시작 마찰력 낮추기]: "오늘 공부 3시간 해야지" 대신 "딱 10분만 책 펴놓고 보기"로 뇌의 저항을 속이세요. 시작만 하면 관성으로 몰입하게 됩니다.`,
        ],
      };
    },
  },

  // 2. 사랑/호감 vs 거절 두려움 (예: "좋아하는 사람이 있는데 고백하면 차일까 봐", "연락하고 싶은데 어색할까 봐")
  {
    id: 'love-vs-fear',
    match: (text, cat) => {
      const loveKeywords = ['좋아하', '짝사랑', '고백', '관심', '호감', '연락', '다가가'];
      const fearKeywords = ['차일', '두려', '무서', '어색', '망설', '거절', '부담', '틀어질까'];
      return (cat === 'love' || loveKeywords.some((k) => text.includes(k))) && fearKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '마음을 전하고 싶은 순수한 갈망과 거절당해 상처받을까 두려워하는 자기방어의 갈등',
      insight: `${personName}은 말합니다. 좋아하는 감정은 부끄러워 숨겨야 할 죄가 아닙니다. 하지만 0에서 100으로 바로 뛰어드는 부담스러운 고백은 상대도 나도 긴장하게 만듭니다. 거절의 공포를 줄이려면 '올인'하지 말고 가벼운 호기심부터 건네보세요.`,
      actionTips: [
        '[거창한 고백 대신 1마디 공통 질문]: "나 너 좋아해"라는 담판 대신, 상대가 편하게 답할 수 있는 질문(음악, 음식, 취미, 사소한 칭찬)으로 대화의 물꼬를 트세요.',
        '[내 존엄성과 결과의 분리]: 상대가 미온적으로 반응하더라도 그것은 당신의 매력이 부족해서가 아니라 단지 상대의 상황이나 인연의 타이밍일 뿐임을 기억하세요.',
        '[자연스러운 시선과 미소 교환]: 눈이 마주쳤을 때 피하지 않고 가볍게 눈인사를 건네는 작은 제스처가 백 마디 말보다 호감을 열어줍니다.',
      ],
    }),
  },

  // 3. 이별/미련 vs 일상 회복 (예: "헤어진 전애인이 자꾸 생각나", "잊고 싶은데 미련이 남아")
  {
    id: 'breakup-vs-movingon',
    match: (text, cat) => {
      const breakupKeywords = ['이별', '헤어', '차였', '전남친', '전여친', '미련', '잊고', '잊지', '잊혀', '그리워'];
      return cat === 'love' || breakupKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '과거의 아름다웠던 온기에 대한 그리움과 홀로서야 하는 현실 사이의 금단 현상',
      insight: `${personName}의 가르침처럼, 상처가 아무는 데에는 반드시 계절이 바뀌는 시간의 마취가 필요합니다. 상대를 억지로 머릿속에서 지우려 애쓰면 역설적으로 더 선명해집니다. 지나간 인연을 쥐고 있는 손을 가만히 펴는 것부터 시작하세요.`,
      actionTips: [
        '[디지털 흔적의 의도적 봉인]: 상대의 SNS, 메신저 프로필, 사진첩을 엿보는 행위는 아물어가는 상처에 계속 소금을 뿌리는 일입니다. 한 달간 숨김/차단하세요.',
        '[에너지의 회수와 나를 위한 대접]: 그 사람에게 쏟았던 정성과 시간을 오늘 나만을 위한 따뜻한 식사, 방 정리, 새로운 향기나 산책으로 채워 넣으세요.',
        '[감정의 파도 허용하기]: 슬픔이 밀려올 땐 억지로 참지 말고 "그만큼 내가 진심으로 사랑했구나"라고 충분히 울고 털어내세요.',
      ],
    }),
  },

  // 4. 부모님의 기대/비교 vs 나의 자유/한계 (예: "부모님이 자꾸 남과 비교해서 화나", "기대에 못 미쳐서 죄송하지만 답답해")
  {
    id: 'parent-expectation-vs-self',
    match: (text, cat) => {
      const parentKeywords = ['부모', '엄마', '아빠', '어머니', '아버지'];
      const conflictKeywords = ['비교', '잔소리', '기대', '압박', '화나', '짜증', '서운', '답답', '죄송', '싸웠'];
      return (cat === 'parent' || parentKeywords.some((k) => text.includes(k))) && conflictKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '부모님께 인정받고 싶은 본능과 나만의 속도로 숨 쉬고 싶은 독립심의 충돌',
      insight: `${personName}은 꿰뚫어 봅니다. 부모님의 뾰족한 잔소리와 비교는 당신에 대한 미움이 아니라, 험난한 세상을 먼저 겪은 부모님 본인의 '서툰 불안과 두려움'이 잘못 튀어나온 것입니다. 부모님의 불안을 내 존재의 부족함으로 받아들이지 마세요.`,
      actionTips: [
        '[심리적 우산 쓰기]: 부모님의 날 선 비교가 쏟아질 때 "저건 내 문제가 아니라 부모님의 불안이야"라고 마음속 우산을 펴고 감정적으로 동일시하지 마세요.',
        '[반항 대신 차분한 한계 선언]: "엄마(아빠)가 그렇게 비교하시면 저를 믿어주지 않는 것 같아 힘이 빠져요. 저도 제 미래를 고민하고 있으니 지켜봐 주세요"라고 차분히 말하세요.',
        '[사소한 안부로 긴장 완화하기]: 성적이나 진로 외의 영역(예: "식사 챙겨드셨어요?", 따뜻한 물 한 잔)에서 작은 온기를 건네면 부모님의 방어벽이 누그러집니다.',
      ],
    }),
  },

  // 5. 친구 무리의 소외감 / 갈등 vs 관계 유지 (예: "친구에게 서운한데 말하면 멀어질까 봐", "무리에서 소외당하는 기분")
  {
    id: 'friend-distance-vs-harmony',
    match: (text, cat) => {
      const friendKeywords = ['친구', '교우', '무리', '절친'];
      const issueKeywords = ['서운', '소외', '혼자', '겉돌', '손절', '배신', '싸웠', '어색', '오해', '멀어질까'];
      return (cat === 'friend' || friendKeywords.some((k) => text.includes(k))) && issueKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '무리 속에 속해야 한다는 안전 욕구와, 상처받으면서까지 맞추고 싶지 않은 자존감의 갈등',
      insight: `${personName}의 통찰입니다. 참는 것만이 능사가 아닙니다. 서운함을 덮어두면 마음속에서 원망으로 발효되어 결국 관계를 더 차갑게 망가뜨립니다. 그렇다고 공격적으로 따질 필요도 없습니다. '상대 공격'이 아닌 '내 감정의 표현'이 열쇠입니다.`,
      actionTips: [
        '["나(I) 전달법"으로 솔직함 전하기]: "너 왜 그랬어?"라는 비난 대신, "네가 그 말을 했을 때 내 마음이 조금 슬펐어"라고 주어를 나로 바꿔 조용히 털어놓으세요.',
        '[무리보다 1:1 교감에 집중]: 여러 명이 얽힌 시끄러운 무리보다, 마음의 결이 통하는 한 사람과 담백하게 차를 마시며 대화하는 것이 훨씬 깊은 위로가 됩니다.',
        '[자연스러운 거리두기의 지혜]: 나를 존중하지 않고 소모시키는 관계라면 억지로 붙잡지 마세요. 적당한 거리를 둘 때 비로소 서로의 진짜 가치가 보입니다.',
      ],
    }),
  },

  // 6. 완벽주의 vs 미루기 / 시작 공포 (예: "완벽하게 하고 싶은데 손이 안 가", "자꾸 미루고 게을러져서 자책해")
  {
    id: 'perfectionism-vs-procrastination',
    match: (text) => {
      const procrastinationKeywords = ['미루', '게으', '안돼', '손이 안', '의지박약', '시작이 안', '미루다', '귀찮'];
      const perfectionKeywords = ['완벽', '잘하고 싶은데', '실패할까', '부담', '자책', '망할까'];
      return procrastinationKeywords.some((k) => text.includes(k)) || perfectionKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '잘해내고 싶은 높은 기준(완벽주의)과 그에 미치지 못할까 봐 작업을 회피하는 뇌의 방어기제',
      insight: `${personName}은 단언합니다. 당신은 게으른 것이 아니라, 실패에 대한 두려움이 너무 크기 때문에 시작을 미루고 있는 것입니다. 완벽주의의 가장 훌륭한 해독제는 '대충 시작하는 용기'입니다.`,
      actionTips: [
        '["5분 타이머 기법"]: "오늘 끝내야지" 대신 "딱 5분만 대충 끄적이고 그만두자"며 타이머를 맞추세요. 시작의 마찰력만 넘으면 뇌는 스스로 몰입합니다.',
        '["완벽보다 완료(Done is better than perfect)"]: 엉망진창인 초안도 빈 종이보다는 백 배 위대합니다. 일단 끝까지 형태를 만드는 것에만 목표를 두세요.',
        '[스스로를 채찍질하는 혼잣말 멈추기]: 자책은 도파민을 말려 무기력을 심화시킵니다. "지금까지 버틴 것만으로도 수고했어, 작은 것 하나만 해보자"라고 응원해주세요.',
      ],
    }),
  },

  // 7. 남과의 비교 vs 자존감 저하 / 번아웃 (예: "남들은 다 앞서가는데 나만 멈춰있어", "친구들은 다 취업/성공했는데 나만 초라해")
  {
    id: 'comparison-vs-self-worth',
    match: (text) => {
      const compareKeywords = ['남들', '친구들', '동기', '다른사람', '남과', '비교', '뒤처', '초라', '나만', '자괴감', '제자리'];
      return compareKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '타인의 편집된 하이라이트와 나의 생생한 무대 뒤 비하인드를 불공정하게 비교하며 생기는 자괴감',
      insight: `${personName}의 가르침을 마음에 새기세요. 모든 꽃은 피어나는 계절이 다릅니다. 봄에 피는 매화가 겨울의 동백을 시기하지 않듯, 당신만의 개화 시기는 아직 오지 않았을 뿐 지금 보이지 않는 땅속에서 단단한 뿌리를 내리는 중입니다.`,
      actionTips: [
        '[소셜 미디어(SNS) 3일 디톡스]: 남들의 자랑거리를 일방적으로 소비하는 것은 내 마음에 독을 주입하는 일입니다. 인스타나 타인의 소식을 며칠간 차단하세요.',
        '[어제의 나와 오늘의 나만 비교하기]: 남의 트랙을 쳐다보지 마세요. 오늘 물 한 잔 마시고, 책 한 페이지를 넘긴 어제보다 1% 나아진 나 자신을 기록하고 칭찬하세요.',
        '[결과가 아닌 나의 호흡 회복]: 인생은 속도전이 아니라 방향과 지속성의 여정입니다. 조급한 마음에 쉼표를 찍고 따뜻한 휴식을 선물하세요.',
      ],
    }),
  },

  // 8. 진로 / 미래의 막막함 vs 적성 방황 (예: "내가 뭘 좋아하는지 모르겠고 앞이 캄캄해")
  {
    id: 'career-uncertainty',
    match: (text, cat) => {
      const careerKeywords = ['진로', '취업', '적성', '꿈', '미래', '뭐해야', '방향', '길'];
      const lostKeywords = ['모르겠', '막막', '캄캄', '불안', '방황', '두려'];
      return (cat === 'career' || careerKeywords.some((k) => text.includes(k))) && lostKeywords.some((k) => text.includes(k));
    },
    getAdvice: (_text, personName) => ({
      coreDilemma: '단번에 인생의 완벽한 정답을 찾아야 한다는 강박과, 경험 부족에서 오는 막막함의 충돌',
      insight: `${personName}은 조언합니다. 진로는 방 안에서 머리로 생각해서 찾아내는 보물찾기가 아닙니다. 발을 디뎌보아야만 땅의 감촉을 알 수 있듯, 아주 작고 위험 부담 없는 경험의 발자국을 찍어갈 때 길은 비로소 모습을 드러냅니다.`,
      actionTips: [
        '["좋아하는 것" 대신 "죽어도 싫은 것" 먼저 지우기]: 적성을 모를 땐 소거법이 최고입니다. 내가 결코 견디기 힘든 환경이나 일의 방식을 목록에서 제외하세요.',
        '[부담 없는 마이크로 실험]: 자격증 공부나 거창한 취업 준비 전, 관련 분야 유튜브, 짧은 대외활동, 원데이 클래스 등 가벼운 맛보기 경험을 해보세요.',
        '[나만의 쓸모 신뢰하기]: 곧은 나무만 활이 되는 것이 아닙니다. 세상 그 누구도 가지지 못한 당신만의 독특한 성향과 감성이 가장 강력한 무기입니다.',
      ],
    }),
  },
];

/**
 * 사용자의 고민 텍스트와 카테고리를 심층 분석하여
 * 질문의 본질을 바로잡고 양방향 해결책을 제시하는 맞춤형 분석 도출
 */
export function analyzeUserDilemma(worryText: string, category: Category, personName: string): PersonalizedAdvice {
  const text = (worryText || '').trim();

  // 1. 규칙 기반 매칭
  for (const rule of DILEMMA_RULES) {
    if (rule.match(text, category)) {
      return rule.getAdvice(text, personName, category);
    }
  }

  // 2. 카테고리 기반 포괄적 본질 도출 (Fallback)
  switch (category) {
    case 'study':
      return {
        coreDilemma: '배움의 과정에서 겪는 정체기와 조급한 결과 기대 사이의 불균형',
        insight: `${personName}의 시선에서 볼 때, 공부가 힘든 것은 당신이 못나서가 아니라 지금 가장 단단한 지적 근육을 형성하는 과정이기 때문입니다. 결과에 대한 불안을 내려놓고 오늘 하루의 성실한 루틴에 집중하세요.`,
        actionTips: [
          '결과(등수/점수) 대신 오늘 실천한 행동(문제 10개 풀기)을 목표로 삼으세요.',
          '집중이 흐려질 땐 억지로 앉아있지 말고 10분간 가벼운 스트레칭과 산책을 하세요.',
          '틀린 문제는 부끄러움이 아니라 실력을 올릴 보물임을 기억하고 오답을 안아주세요.',
        ],
      };
    case 'love':
      return {
        coreDilemma: '사랑받고 싶은 순수한 갈망과 상처받지 않으려는 방어 본능 사이의 줄다리기',
        insight: `${personName}은 당신에게 속삭입니다. 상대의 마음을 억지로 통제하려 들면 불안해집니다. 내 손을 떠난 상대의 반응에 일희일비하지 말고, 상대를 향한 내 진심의 온도를 편안하게 유지하세요.`,
        actionTips: [
          '연락의 횟수나 답장 속도로 상대의 마음 전체를 재단하지 마세요.',
          '상대에게 기대기 전에 나 혼자서도 온전히 행복할 수 있는 일상을 단단히 가꾸세요.',
          '마음속 서운함은 감정의 폭발이 아닌, 차분하고 정중한 대화로 풀어내세요.',
        ],
      };
    case 'parent':
      return {
        coreDilemma: '가장 가까운 가족이기에 더 깊게 베이는 감정의 엉킴과 인정 욕구',
        insight: `${personName}은 말합니다. 부모님의 서툰 말투 속에 숨겨진 사랑을 읽어내되, 부모님의 감정에 내가 휘둘리지 않는 건강한 심리적 경계선을 그어야 합니다.`,
        actionTips: [
          '부모님의 말씀 중 불안 섞인 비난은 걸러듣고 본래의 애정만 취하세요.',
          '감정이 격해질 땐 그 자리에서 맞서지 말고 잠시 자리를 피해 냉각기를 가지세요.',
          '하루 한 번 따뜻한 눈인사나 사소한 안부로 서로의 방어벽을 낮추세요.',
        ],
      };
    case 'friend':
      return {
        coreDilemma: '친구 관계에서 오는 소외감과 나다운 모습을 지키고픈 욕구의 충돌',
        insight: `${personName}은 강조합니다. 모든 사람의 마음에 들려고 애쓰지 마세요. 담백한 물과 같은 편안한 관계가 진정한 우정입니다.`,
        actionTips: [
          '나를 깎아내리며 유지해야 하는 무리라면 조금씩 거리를 두어도 괜찮습니다.',
          '서운한 감정은 묵혀두지 말고 조용한 자리에서 나(I)의 감정을 털어놓으세요.',
          '혼자 보내는 시간을 외로움이 아닌 내실을 다지는 고결한 시간으로 바라보세요.',
        ],
      };
    case 'career':
      return {
        coreDilemma: '불확실한 미래에 대한 공포와 나만의 특별한 길을 찾고픈 열망',
        insight: `${personName}의 통찰처럼, 방황은 실패가 아니라 새로운 길을 개척하는 사람에게만 주어지는 특권입니다. 남들의 속도에 휩쓸리지 말고 나만의 페이스를 찾으세요.`,
        actionTips: [
          '남들이 정해둔 기준이 아닌, 내가 진정으로 가슴 뛰는 가치 3가지를 적어보세요.',
          '오늘 당장 실천할 수 있는 작은 배움이나 준비 1가지를 행동으로 옮기세요.',
          '닫힌 문 앞에서 울지 말고, 나를 향해 새롭게 열리는 다른 기회의 문을 찾으세요.',
        ],
      };
    case 'mind':
      return {
        coreDilemma: '지친 마음에 쉼을 주어야 한다는 신호와, 쉬는 것조차 불안해하는 조급함',
        insight: `${personName}의 가르침입니다. 강물은 서두르지 않아도 바다로 흘러갑니다. 오늘만큼은 모든 짐을 내려놓고 숨을 깊게 쉬며 당신 자신을 보살펴주세요.`,
        actionTips: [
          '오늘 하루는 "아무것도 생산적인 일을 하지 않는 완전한 쉼"을 허락하세요.',
          '따뜻한 차 한 잔을 마시며 지금 내 호흡과 심장 박동에만 온전히 머물러보세요.',
          '나를 자책하는 목소리가 들릴 때 "그동안 정말 많이 애썼어"라고 토닥여주세요.',
        ],
      };
    default:
      return {
        coreDilemma: '복잡하게 얽힌 문제 앞에서 통제할 수 있는 것과 없는 것의 혼란',
        insight: `${personName}은 조용히 미소 짓습니다. 세상의 모든 실타래는 억지로 잡아당기지 않고 가만히 바라볼 때 풀리는 매듭이 보입니다. 한 걸음 물러나 마음의 호흡을 가다듬으세요.`,
        actionTips: [
          '머릿속의 복잡한 생각들을 종이 위에 마인드맵처럼 여과 없이 다 털어놓으세요.',
          '내가 통제할 수 없는 것은 흘려보내고, 지금 내 손으로 할 수 있는 것 딱 하나만 실행하세요.',
          '오늘 하루를 무사히 살아낸 스스로에게 따뜻한 칭찬 한마디를 건네세요.',
        ],
      };
  }
}
