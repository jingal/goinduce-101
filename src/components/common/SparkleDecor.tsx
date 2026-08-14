import React from 'react';

export const SparkleDecor: React.FC = () => {
  const stars = [
    { top: '5%', left: '8%', size: 22, color: '#FFD166', delay: '0s', char: '★' },
    { top: '15%', right: '10%', size: 30, color: '#FF99C8', delay: '1.2s', char: '★' },
    { top: '40%', left: '4%', size: 26, color: '#A9DEF9', delay: '2.4s', char: '✦' },
    { top: '65%', right: '6%', size: 28, color: '#E4C1F9', delay: '0.8s', char: '★' },
    { top: '82%', left: '10%', size: 24, color: '#D0F4DE', delay: '1.8s', char: '✦' },
    { top: '90%', right: '12%', size: 20, color: '#FFD166', delay: '3.1s', char: '★' },
  ];

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="sparkle-particle"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            fontSize: `${s.size}px`,
            color: s.color,
            animationDelay: s.delay,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          {s.char}
        </div>
      ))}
    </>
  );
};
