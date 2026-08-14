import { ArrowRight, HelpCircle, Heart, Coffee, Shield } from 'lucide-react';
import { RibbonHeader } from '../common/RibbonHeader';
import { playPop, playClick } from '../../utils/sound';

interface StartPageProps {
  onStart: () => void;
  onOpenIntro: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart, onOpenIntro }) => {
  const handleStartClick = () => {
    playPop(520);
    onStart();
  };

  const handleIntroClick = () => {
    playClick();
    onOpenIntro();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Ribbon Header */}
      <RibbonHeader />

      {/* Main Content Body */}
      <div className="page-body" style={{ alignItems: 'center', textAlign: 'center', gap: '20px' }}>
        
        {/* Cute Illustration / Juice Character Box */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '340px',
            background: 'linear-gradient(180deg, #FFF9FA 0%, #FFF0F4 100%)',
            border: '2.5px solid #2D2327',
            borderRadius: '24px',
            padding: '24px 20px',
            boxShadow: '4px 5px 0px #2D2327',
            margin: '8px 0',
          }}
        >
          {/* Top Tape Sticker */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-1deg)',
              background: 'rgba(255, 209, 102, 0.9)',
              border: '1.5px solid #2D2327',
              padding: '2px 24px',
              fontSize: '12px',
              fontFamily: 'var(--font-title)',
              borderRadius: '4px',
              boxShadow: '1px 2px 0px #2D2327',
            }}
          >
            GOIN-DUCE 101
          </div>

          {/* Animated Graphics */}
          <div style={{ fontSize: '56px', margin: '8px 0', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            👑🎀✨
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '22px',
              color: '#2D2327',
              marginBottom: '8px',
              lineHeight: 1.35,
            }}
          >
            “고민을 적으면, 그 고민을 들어줄<br />
            <span style={{ color: '#FF4D6D' }}>고인(故人)과 한 문장</span>을 만나요”
          </h2>

          <p style={{ fontSize: '13.5px', color: '#6C5861', lineHeight: 1.5 }}>
            부모, 학업, 친구, 진로에 지친 당신을 위해<br />
            역사 속 위대한 고인들이 건네는 특별한 지혜의 처방전!
          </p>
        </div>

        {/* Action Buttons Section */}
        <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Main CTA: 시작하기 */}
          <button
            onClick={handleStartClick}
            className="btn-primary-retro"
            style={{ fontSize: '22px', padding: '18px 24px' }}
            id="start-button"
          >
            <span>시작하기</span>
            <ArrowRight size={22} />
          </button>

          {/* Sub CTA: 고인이란? / 소개 */}
          <button
            onClick={handleIntroClick}
            className="btn-secondary-retro"
            style={{ width: '100%', fontSize: '15px' }}
            id="intro-button"
          >
            <HelpCircle size={16} color="#FF4D6D" />
            <span>고인이란? / 서비스 소개</span>
          </button>
        </div>

        {/* Feature Badges Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            width: '100%',
            maxWidth: '360px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              background: '#FFF0F5',
              border: '1.5px solid #2D2327',
              borderRadius: '12px',
              padding: '8px 6px',
              fontSize: '11.5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '1px 2px 0px #2D2327',
            }}
          >
            <Heart size={16} color="#FF4D6D" />
            <span style={{ fontWeight: 'bold', color: '#2D2327' }}>역대급 고인 라인업</span>
            <span style={{ color: '#888', fontSize: '10px' }}>공자·정약용·소크라테스</span>
          </div>

          <div
            style={{
              background: '#FFF9E6',
              border: '1.5px solid #2D2327',
              borderRadius: '12px',
              padding: '8px 6px',
              fontSize: '11.5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '1px 2px 0px #2D2327',
            }}
          >
            <Coffee size={16} color="#FB8500" />
            <span style={{ fontWeight: 'bold', color: '#2D2327' }}>원픽 처방전</span>
            <span style={{ color: '#888', fontSize: '10px' }}>명언과 맞춤 풀이</span>
          </div>

          <div
            style={{
              background: '#E8F5E9',
              border: '1.5px solid #2D2327',
              borderRadius: '12px',
              padding: '8px 6px',
              fontSize: '11.5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '1px 2px 0px #2D2327',
            }}
          >
            <Shield size={16} color="#2EC4B6" />
            <span style={{ fontWeight: 'bold', color: '#2D2327' }}>100% 비밀보장</span>
            <span style={{ color: '#888', fontSize: '10px' }}>서버에 저장 안 됨</span>
          </div>
        </div>

      </div>

      {/* Lace Bottom Pattern */}
      <div className="lace-bottom-banner" />
    </div>
  );
};
