import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send, AlertCircle, Heart, User, Calendar, BookOpen, UserCheck } from 'lucide-react';
import { Category, WorrySubmission } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { CHARACTERS } from '../../data/characters';
import { playPop, playClick } from '../../utils/sound';

interface InputPageProps {
  onBack: () => void;
  onSubmit: (submission: WorrySubmission) => void;
}

const AGE_OPTIONS = [
  { id: 'teen', label: '10대 학생 🎒' },
  { id: 'twenties', label: '20대 청춘 🌿' },
  { id: 'thirties', label: '30대 이상 💼' },
  { id: 'secret', label: '비밀이에요 🤫' },
];

export const InputPage: React.FC<InputPageProps> = ({ onBack, onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [ageGroup, setAgeGroup] = useState('teen');
  const [selectedCategory, setSelectedCategory] = useState<Category>('study');
  const [favoritePersonId, setFavoritePersonId] = useState('random');
  const [worryText, setWorryText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCategorySelect = (catId: Category) => {
    playPop(600);
    setSelectedCategory(catId);
    setErrorMessage('');
  };

  const handleAgeSelect = (ageId: string) => {
    playClick();
    setAgeGroup(ageId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!worryText.trim()) {
      setErrorMessage('당신의 고민을 한 글자 이상 적어주세요 🥺');
      playPop(300);
      return;
    }

    setErrorMessage('');
    playPop(750);

    const submission: WorrySubmission = {
      nickname: nickname.trim(),
      ageGroup,
      category: selectedCategory,
      favoritePersonId: favoritePersonId === 'random' ? undefined : favoritePersonId,
      worryText: worryText.trim(),
      timestamp: Date.now(),
    };

    onSubmit(submission);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar with Back Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: '#FFF0F5',
          borderBottom: '2px solid #2D2327',
        }}
      >
        <button
          onClick={() => {
            playClick();
            onBack();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-title)',
            fontSize: '15px',
            color: '#2D2327',
            padding: '4px 8px',
            borderRadius: '8px',
            background: '#FFFFFF',
            border: '1.5px solid #2D2327',
            boxShadow: '1px 2px 0px #2D2327',
          }}
          aria-label="처음으로 돌아가기"
        >
          <ArrowLeft size={16} />
          <span>처음으로</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-title)', fontSize: '16px', color: '#FF4D6D' }}>
          <span>고민 접수 & 고인 매칭</span>
          <span>🎀</span>
        </div>
      </div>

      {/* Input Form Body */}
      <form onSubmit={handleSubmit} className="page-body" style={{ gap: '16px', overflowY: 'auto' }}>
        
        {/* Title Notice */}
        <div
          style={{
            background: '#FFF9FA',
            border: '2px dashed #FF85A2',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13.5px',
            color: '#5C4A52',
          }}
        >
          <Sparkles size={18} color="#FF4D6D" style={{ flexShrink: 0 }} />
          <span>편안한 마음으로 적어주세요. 당신의 고민을 들어줄 고인(故人)이 기다리고 있어요.</span>
        </div>

        {/* 1. 사용자 닉네임 / 이름 (Optional) */}
        <div className="form-group">
          <label className="form-label" htmlFor="user-nickname">
            <User size={16} color="#FF4D6D" />
            <span>당신의 이름이나 닉네임</span>
            <span className="optional-badge">선택</span>
          </label>
          <input
            id="user-nickname"
            type="text"
            className="retro-input"
            placeholder="예: 별이, 지친 대학생, 홍길동 (미입력 시 '당신')"
            maxLength={15}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* 2. 나이대 선택 (Optional) */}
        <div className="form-group">
          <label className="form-label">
            <Calendar size={16} color="#FF4D6D" />
            <span>나이대 / 호칭</span>
            <span className="optional-badge">선택</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAgeSelect(opt.id)}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  border: ageGroup === opt.id ? '2px solid #FF4D6D' : '2px solid #2D2327',
                  background: ageGroup === opt.id ? '#FFF0F4' : '#FFFFFF',
                  color: ageGroup === opt.id ? '#FF4D6D' : '#2D2327',
                  fontFamily: 'var(--font-title)',
                  fontSize: '14px',
                  boxShadow: ageGroup === opt.id ? '2px 2px 0px #FF4D6D' : '1px 2px 0px #2D2327',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 고민 카테고리 (P0 필수) */}
        <div className="form-group">
          <label className="form-label">
            <BookOpen size={16} color="#FF4D6D" />
            <span>고민의 종류를 골라주세요</span>
            <span className="required-badge">필수</span>
          </label>
          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{
                    backgroundColor: isSelected ? cat.badgeBg : '#FFFFFF',
                    borderColor: isSelected ? cat.themeColor : '#2D2327',
                    boxShadow: isSelected ? `3px 3px 0px ${cat.themeColor}` : '2px 2px 0px #2D2327',
                  }}
                >
                  <div className="category-card-header">
                    <span className="category-card-emoji">{cat.emoji}</span>
                    {isSelected && (
                      <span
                        style={{
                          fontSize: '11px',
                          background: cat.themeColor,
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-title)',
                        }}
                      >
                        선택됨
                      </span>
                    )}
                  </div>
                  <span className="category-card-label" style={{ color: isSelected ? cat.themeColor : '#2D2327' }}>
                    {cat.label}
                  </span>
                  <span className="category-card-sub">{cat.subTitle}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 호감 고인 (Optional - 스케치 반영) */}
        <div className="form-group">
          <label className="form-label" htmlFor="favorite-person">
            <UserCheck size={16} color="#FF4D6D" />
            <span>이야기 나누고픈 인물 (호감 고인)</span>
            <span className="optional-badge">선택</span>
          </label>
          <div style={{ position: 'relative' }}>
            <select
              id="favorite-person"
              className="retro-input"
              value={favoritePersonId}
              onChange={(e) => {
                playClick();
                setFavoritePersonId(e.target.value);
              }}
              style={{
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                background: '#FFFFFF url("data:image/svg+xml;utf8,<svg fill=\'%232D2327\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 12px center',
              }}
            >
              <option value="random">🎲 전체 인물 중 랜덤 매칭 (추천)</option>
              <optgroup label="역사적 스승 & 철학자">
                {CHARACTERS.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.avatarEmoji} {char.name} ({char.title})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* 5. 고민 내용 입력 (Text Area) */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label" htmlFor="worry-content">
              <Heart size={16} color="#FF4D6D" />
              <span>고민을 자세히 들려주세요</span>
              <span className="required-badge">필수</span>
            </label>
            <span style={{ fontSize: '12px', color: worryText.length >= 480 ? '#FF4D6D' : '#888' }}>
              {worryText.length} / 500자
            </span>
          </div>
          <textarea
            id="worry-content"
            className="retro-textarea"
            placeholder="요즘 공부를 열심히 해도 성적이 오르지 않아서 속상해요... 친구와 오해가 생겼는데 어떻게 풀어야 할지 막막해요..."
            maxLength={500}
            value={worryText}
            onChange={(e) => {
              setWorryText(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            rows={4}
          />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              background: '#FFF0F0',
              border: '2px solid #FF4D6D',
              borderRadius: '12px',
              color: '#D90429',
              fontSize: '13.5px',
              fontFamily: 'var(--font-title)',
              animation: 'modalPop 0.2s ease',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <div style={{ marginTop: '8px', paddingBottom: '10px' }}>
          <button
            type="submit"
            className="btn-primary-retro"
            style={{ fontSize: '20px', padding: '16px' }}
            id="submit-worry-btn"
          >
            <span>내 고민 들어줘 (고인 찾기)</span>
            <Send size={20} />
          </button>
        </div>

      </form>
    </div>
  );
};
