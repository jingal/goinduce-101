import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playPop } from '../../utils/sound';

interface RibbonHeaderProps {
  onSoundChange?: (enabled: boolean) => void;
  showSubtitle?: boolean;
}

export const RibbonHeader: React.FC<RibbonHeaderProps> = ({ showSubtitle = true }) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) {
      playPop(700);
    }
  };

  return (
    <header className="ribbon-header-wrapper">
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="sound-toggle-btn"
        aria-label={soundOn ? '효과음 끄기' : '효과음 켜기'}
        title={soundOn ? '효과음 끄기' : '효과음 켜기'}
      >
        {soundOn ? <Volume2 size={18} color="#FF4D6D" /> : <VolumeX size={18} color="#9E8994" />}
      </button>

      {/* SVG Big Red Cute Ribbon (Matching sketch) */}
      <svg
        className="big-red-ribbon"
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Ribbon Tail */}
        <path
          d="M 50,60 Q 20,95 10,115 L 35,105 L 55,115 Q 60,85 65,60 Z"
          fill="#D90429"
          stroke="#2D2327"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Right Ribbon Tail */}
        <path
          d="M 110,60 Q 140,95 150,115 L 125,105 L 105,115 Q 100,85 95,60 Z"
          fill="#D90429"
          stroke="#2D2327"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Left Bow Loop */}
        <path
          d="M 80,45 C 50,15 15,30 20,55 C 25,80 60,65 80,50 Z"
          fill="#FF4D6D"
          stroke="#2D2327"
          strokeWidth="3"
        />
        <path
          d="M 32,42 C 40,32 60,35 70,45"
          stroke="#FFAEC0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Right Bow Loop */}
        <path
          d="M 80,45 C 110,15 145,30 140,55 C 135,80 100,65 80,50 Z"
          fill="#FF4D6D"
          stroke="#2D2327"
          strokeWidth="3"
        />
        <path
          d="M 128,42 C 120,32 100,35 90,45"
          stroke="#FFAEC0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Center Ribbon Knot */}
        <circle
          cx="80"
          cy="48"
          r="16"
          fill="#EF233C"
          stroke="#2D2327"
          strokeWidth="3"
        />
        <circle
          cx="76"
          cy="44"
          r="4"
          fill="#FFAEC0"
        />
      </svg>

      {/* Brand Logo & Tagline */}
      <div className="brand-logo-container">
        <div className="brand-logo-badge">
          <Sparkles size={12} color="#2D2327" />
          <span>당신의 고민을 들어줄 원픽 고인</span>
          <Sparkles size={12} color="#2D2327" />
        </div>
        <h1 className="brand-title">
          <span>고인듀스 101</span>
          <span style={{ fontSize: '32px' }}>🎀</span>
        </h1>
        {showSubtitle && (
          <p className="brand-subtitle">
            시대를 초월한 역사적 인물들이 당신의 고민을 픽(Pick)합니다
          </p>
        )}
      </div>
    </header>
  );
};
