import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { playJuicePour } from '../../utils/sound';

interface LoadingPageProps {
  onComplete: () => void;
  categoryLabel?: string;
}

const LOADING_MESSAGES = [
  '국민 프로듀서님의 고민을 분석하는 중... 🎀',
  '당신의 고민을 들어줄 최고의 고인을 픽(Pick)하는 중... ✨',
  '수천 년의 시간 속에서 원픽 명언을 찾는 중... 📜',
  '거의 다 되었어요! 당신만의 원픽 고인이 등장합니다 👑',
];

export const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete, categoryLabel }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Play sweet juice bubbling sound
    playJuicePour();

    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 12;
      });
    }, 180);

    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '480px',
        padding: '30px 20px',
        textAlign: 'center',
        gap: '24px',
      }}
    >
      {/* Juice Squeezer / Blender Cup Graphic */}
      <div className="juice-blender-animation">
        {/* Rotating Sparkle Halo */}
        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            border: '2px dashed #FF85A2',
            borderRadius: '50%',
            animation: 'spin 6s linear infinite',
          }}
        />

        {/* Straw */}
        <div className="straw" />

        {/* Cup */}
        <div className="juice-cup">
          <div className="juice-liquid" />
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '28px',
              zIndex: 3,
              animation: 'bounce 1s infinite alternate',
            }}
          >
            🧃
          </div>
        </div>
      </div>

      {/* Title & Loading Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#FF4D6D',
            fontFamily: 'var(--font-title)',
            fontSize: '15px',
          }}
        >
          <Sparkles size={16} />
          <span>{categoryLabel ? `[${categoryLabel}] 카테고리 매칭 중` : '고민 분석 중'}</span>
          <Sparkles size={16} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: '22px',
            color: '#2D2327',
            minHeight: '32px',
            transition: 'all 0.3s ease',
          }}
        >
          {LOADING_MESSAGES[msgIndex]}
        </h2>

        <p style={{ fontSize: '13px', color: '#888' }}>
          잠시만 기다려주세요. 진심을 담아 한 잔 내어드릴게요.
        </p>
      </div>

      {/* Retro Styled Progress Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '280px',
          height: '18px',
          background: '#FFF0F5',
          border: '2px solid #2D2327',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '2px',
          boxShadow: '2px 2px 0px #2D2327',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF99C8 0%, #FF4D6D 100%)',
            borderRadius: '8px',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      {/* Floating Mini Hearts */}
      <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
        <Heart size={14} color="#FF4D6D" fill="#FF4D6D" />
        <Heart size={18} color="#FF758F" fill="#FF758F" />
        <Heart size={14} color="#FFB3C1" fill="#FFB3C1" />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          from { transform: translateX(-50%) translateY(0); }
          to { transform: translateX(-50%) translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
