import React from 'react';
import { X, Heart, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { playClick } from '../../utils/sound';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#FFF0F4',
            border: '2px solid #2D2327',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0px #2D2327',
          }}
          aria-label="닫기"
        >
          <X size={18} color="#2D2327" />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#FFE5EC',
              borderRadius: '16px',
              fontSize: '13px',
              fontFamily: 'var(--font-title)',
              color: '#FF4D6D',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={13} />
            <span>고인듀스 101 비하인드</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', color: '#2D2327' }}>
            고인이란? (故人)
          </h2>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#4A3E44', lineHeight: 1.65 }}>
          <div
            style={{
              background: '#FFF9FA',
              border: '2px dashed #FFCCD5',
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#FF4D6D' }}>
              <Heart size={16} fill="#FF4D6D" color="#FF4D6D" />
              <span>시대를 초월한 지혜의 스승들을 만나보세요</span>
            </div>
            <p>
              <strong>고인(故人)</strong>이란 먼저 세상을 살아가며 수많은 방황과 갈등을 겪고, 이를 위대한 깨달음과 명언으로 승화시킨 옛 사상가와 위인들을 뜻합니다.
              국민 프로듀서님의 지친 마음에 딱 맞는 고인이 원픽 멘토로 나섭니다!
            </p>
          </div>

          <div
            style={{
              background: '#EDF6FD',
              border: '2px solid #2D2327',
              borderRadius: '16px',
              padding: '14px',
              boxShadow: '2px 2px 0px #2D2327',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#0284C7', marginBottom: '6px' }}>
              <BookOpen size={16} />
              <span>고인듀스 101의 3단계 힐링 시스템</span>
            </div>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>고민 접수</strong>: 부모, 학업, 친구 등 마음에 담아둔 이야기를 적어요.</li>
              <li><strong>운명의 고인 매칭</strong>: 당신의 고민 카테고리에 맞는 최적의 인물이 센터로 선발됩니다.</li>
              <li><strong>원픽 명언 처방</strong>: 가슴을 울리는 명언과 다정한 풀이로 위로를 받아요.</li>
            </ol>
          </div>

          <div
            style={{
              background: '#E8F5E9',
              border: '2px dashed #81C784',
              borderRadius: '14px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#2E7D32',
            }}
          >
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <span>작성하신 고민 내용은 서버에 저장되지 않고 온전히 당신만을 위해 안전하게 사용됩니다.</span>
          </div>
        </div>

        {/* Modal Close CTA */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleClose}
            className="btn-primary-retro"
            style={{ padding: '12px 20px', fontSize: '17px' }}
          >
            알겠어요, 고민 털어놓으러 가기 🎀
          </button>
        </div>
      </div>
    </div>
  );
};
