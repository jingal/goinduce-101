import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Share2, Download, RefreshCw, Home, Sparkles, Quote as QuoteIcon, CheckCircle2, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { WorryResult } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { exportCardAsImage } from '../../utils/cardExporter';
import { playChime, playSparkle, playPop, playClick } from '../../utils/sound';

interface ResultPageProps {
  result: WorryResult;
  onRefreshQuote: () => void;
  onGoHome: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onRefreshQuote, onGoHome }) => {
  const { submission, person, quote } = result;
  const [showWorry, setShowWorry] = useState(false);
  const [copiedToast, setCopiedToast] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const categoryMeta = CATEGORIES.find((c) => c.id === submission.category);
  const userGreetingName = submission.nickname ? `${submission.nickname}님` : '당신';

  useEffect(() => {
    // Play celebratory sound
    playChime();

    // Trigger sweet confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF4D6D', '#FFD166', '#80ED99', '#A0C4FF', '#FF758F'],
      });
    } catch (e) {
      // Ignore
    }
  }, [quote.id]);

  // Share handler (Web Share API with Clipboard fallback)
  const handleShare = async () => {
    playSparkle();
    const shareText = `[고인듀스 101 🎀]\n"${quote.quote}"\n- ${person.name} (${quote.source})\n\n당신의 고민을 들어줄 원픽 고인을 만나보세요!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '고인듀스 101 - 당신의 고민을 들어줄 원픽 고인은?',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedToast('클립보드에 명언이 복사되었습니다! 💌');
      setTimeout(() => setCopiedToast(''), 3000);
    } catch (err) {
      setCopiedToast('명언 공유 링크가 준비되었습니다.');
      setTimeout(() => setCopiedToast(''), 3000);
    }
  };

  // Export card as image
  const handleSaveCard = async () => {
    playSparkle();
    setIsExporting(true);
    const success = await exportCardAsImage('gomin-result-card', `goinduce101-${person.name}.png`);
    setIsExporting(false);
    if (success) {
      setCopiedToast('결과 카드가 이미지로 저장되었습니다! 🖼️✨');
      setTimeout(() => setCopiedToast(''), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Toast Notification */}
      {copiedToast && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#2D2327',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '13.5px',
            fontFamily: 'var(--font-title)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'modalPop 0.2s ease',
          }}
        >
          <Sparkles size={16} color="#FFD166" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Result Container / Scrollable Area */}
      <div className="page-body" style={{ gap: '18px', overflowY: 'auto' }}>
        
        {/* Personalized Header (Matching sketch: 당신의 고민을 들어줄 고인은...) */}
        <div style={{ textAlign: 'center', margin: '4px 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: categoryMeta?.badgeBg || '#FFE5EC',
              border: '1.5px solid #2D2327',
              borderRadius: '16px',
              fontSize: '12.5px',
              fontFamily: 'var(--font-title)',
              color: categoryMeta?.themeColor || '#FF4D6D',
              boxShadow: '1px 2px 0px #2D2327',
              marginBottom: '8px',
            }}
          >
            <span>{categoryMeta?.emoji}</span>
            <span>{categoryMeta?.label} 처방전</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '23px',
              color: '#2D2327',
              lineHeight: 1.3,
            }}
          >
            {userGreetingName}의 고민을 들어줄 고인은...
          </h2>
        </div>

        {/* =================================================================
           Target Exportable Result Card
           ================================================================= */}
        <div
          id="gomin-result-card"
          style={{
            position: 'relative',
            background: '#FFFFFF',
            border: '2.5px solid #2D2327',
            borderRadius: '24px',
            padding: '24px 20px',
            boxShadow: '4px 6px 0px #2D2327',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Card Top Ribbon Stamp */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '24px',
              background: '#FF4D6D',
              color: '#fff',
              fontSize: '11px',
              fontFamily: 'var(--font-title)',
              padding: '4px 10px 6px 10px',
              borderRadius: '0 0 10px 10px',
              border: '1.5px solid #2D2327',
              borderTop: 'none',
              boxShadow: '1px 2px 0px #2D2327',
            }}
          >
            고인듀스 101 🎀
          </div>

          {/* 1. Character Avatar & Badge Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: person.avatarBg,
                border: '2.5px solid #2D2327',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
                boxShadow: '2px 3px 0px #2D2327',
                position: 'relative',
              }}
            >
              <span>{person.avatarEmoji}</span>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: '#FFD166',
                  border: '1.5px solid #2D2327',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                }}
              >
                ✨
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '24px',
                  color: '#2D2327',
                  letterSpacing: '-0.3px',
                }}
              >
                {person.name}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#8E24AA', fontWeight: 600 }}>
                {person.title}
              </p>
              <p style={{ fontSize: '11.5px', color: '#777', marginTop: '2px' }}>
                {person.era}
              </p>
            </div>
          </div>

          {/* 2. Character Greeting & Intro */}
          <div
            style={{
              background: '#FFF9FA',
              border: '1.5px dashed #FFCCD5',
              borderRadius: '14px',
              padding: '10px 14px',
              fontSize: '13px',
              color: '#5C4A52',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            💬 “{person.greeting}”
          </div>

          {/* 3. The Main Quote Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF0F4 0%, #FFF8FA 100%)',
              border: '2px solid #2D2327',
              borderRadius: '18px',
              padding: '20px 18px',
              boxShadow: '2px 3px 0px #FF85A2',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <QuoteIcon
              size={22}
              color="#FF85A2"
              style={{
                position: 'absolute',
                top: '12px',
                left: '14px',
                opacity: 0.6,
                transform: 'scaleX(-1)',
              }}
            />

            <blockquote
              style={{
                fontFamily: 'var(--font-quote)',
                fontSize: '19px',
                fontWeight: 700,
                color: '#2D2327',
                lineHeight: 1.6,
                padding: '0 12px',
                margin: '8px 0',
              }}
            >
              “{quote.quote}”
            </blockquote>

            {/* Quote Source & Verified Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#888',
                marginTop: '6px',
              }}
            >
              {quote.verified && <CheckCircle2 size={13} color="#2EC4B6" />}
              <span>{quote.source}</span>
            </div>
          </div>

          {/* 4. Warm Interpretation / 풀이풀이 (PRD Requirement) */}
          <div
            style={{
              background: '#EDF6FD',
              border: '2px solid #2D2327',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '2px 2px 0px #2D2327',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-title)',
                fontSize: '15px',
                color: '#0284C7',
                marginBottom: '6px',
              }}
            >
              <Heart size={15} fill="#0284C7" color="#0284C7" />
              <span>고인듀스 101의 다정한 풀이</span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#2D2327', lineHeight: 1.65 }}>
              {quote.interpretation}
            </p>
          </div>

          {/* Tag Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {person.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11px',
                  background: '#F0E6EF',
                  color: '#6C5861',
                  padding: '2px 8px',
                  borderRadius: '10px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 5. User Submitted Worry (Collapsible Accordion) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #2D2327',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '2px 2px 0px #2D2327',
          }}
        >
          <button
            type="button"
            onClick={() => setShowWorry(!showWorry)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#FFF9FA',
              fontFamily: 'var(--font-title)',
              fontSize: '14.5px',
              color: '#2D2327',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>내가 남긴 고민 다시보기</span>
              <span>💌</span>
            </span>
            {showWorry ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showWorry && (
            <div
              style={{
                padding: '14px 16px',
                fontSize: '13.5px',
                color: '#555',
                lineHeight: 1.6,
                background: '#FFFFFF',
                borderTop: '1px dashed #FFCCD5',
              }}
            >
              “{submission.worryText}”
            </div>
          )}
        </div>

        {/* 6. Action Buttons Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
          
          {/* Main Action 1: 공유하기 */}
          <button
            onClick={handleShare}
            className="btn-primary-retro"
            style={{ fontSize: '18px', padding: '14px 20px' }}
            id="share-button"
          >
            <Share2 size={18} />
            <span>이 명언 공유하기</span>
          </button>

          {/* Secondary Actions: 이미지 저장 & 다른 명언 보기 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={handleSaveCard}
              disabled={isExporting}
              className="btn-secondary-retro"
              style={{ fontSize: '14px', padding: '12px 8px' }}
              id="save-image-button"
            >
              <Download size={16} color="#FF4D6D" />
              <span>{isExporting ? '저장 중...' : '카드 이미지 저장'}</span>
            </button>

            <button
              onClick={() => {
                playPop(650);
                onRefreshQuote();
              }}
              className="btn-secondary-retro"
              style={{ fontSize: '14px', padding: '12px 8px' }}
              id="refresh-quote-button"
            >
              <RefreshCw size={16} color="#0284C7" />
              <span>다른 명언 보기</span>
            </button>
          </div>

          {/* Home Button */}
          <button
            onClick={() => {
              playClick();
              onGoHome();
            }}
            className="btn-ghost-retro"
            style={{ alignSelf: 'center', marginTop: '4px' }}
            id="home-button"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Home size={15} />
              <span>처음으로 돌아가기 (새 고민 쓰기)</span>
            </span>
          </button>
        </div>

      </div>

      {/* Lace Bottom Pattern */}
      <div className="lace-bottom-banner" />
    </div>
  );
};
