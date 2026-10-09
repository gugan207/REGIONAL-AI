import React from 'react';

export const DecorativeRings: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Background Depth Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0) 50%, rgba(20, 10, 97, 0.45) 100%)'
        }}
      />

      {/* Ring / Bottom Left 1 (620x620) */}
      <div
        style={{
          position: 'absolute',
          left: '-100px',
          top: '500px',
          width: '620px',
          height: '620px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.11)',
          boxSizing: 'border-box'
        }}
      />

      {/* Ring / Bottom Left 2 (440x440) */}
      <div
        style={{
          position: 'absolute',
          left: '-10px',
          top: '590px',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.11)',
          boxSizing: 'border-box'
        }}
      />

      {/* Ring / Top Right 1 (560x560) */}
      <div
        style={{
          position: 'absolute',
          left: '1020px',
          top: '-50px',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.11)',
          boxSizing: 'border-box'
        }}
      />

      {/* Ring / Top Right 2 (380x380) */}
      <div
        style={{
          position: 'absolute',
          left: '1110px',
          top: '40px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.11)',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};
