import React from 'react';

export const ProductPreviewCard: React.FC = () => {
  const skills = [
    { name: 'Java', level: 'High', percentage: 85, color: '#78B99A' },
    { name: 'SQL', level: 'High', percentage: 78, color: '#78B99A' },
    { name: 'Docker', level: 'Medium', percentage: 57, color: '#E2B65B' },
    { name: 'AWS', level: 'Medium', percentage: 50, color: '#E2B65B' }
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '610px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 28px 64px -10px rgba(26, 15, 107, 0.30), 0 4px 14px rgba(26, 15, 107, 0.12)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ padding: '24px 24px 16px 24px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#17171B',
                lineHeight: '28px',
                marginBottom: '2px'
              }}
            >
              Your regional skill signal
            </h3>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#666670',
                lineHeight: '20px'
              }}
            >
              Chennai &nbsp;•&nbsp; Backend Developer
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#F0EDFF',
              color: '#5B50E8',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2px',
              padding: '8px 14px',
              borderRadius: '17px',
              lineHeight: 1
            }}
          >
            68% READY
          </div>
        </div>

        {/* Skill rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
          {skills.map((skill) => (
            <div key={skill.name} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '64px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#17171B'
                }}
              >
                {skill.name}
              </span>
              <span
                style={{
                  width: '64px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#666670'
                }}
              >
                {skill.level}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: '#EBE8F0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${skill.percentage}%`,
                    height: '100%',
                    backgroundColor: skill.color,
                    borderRadius: '4px',
                    transition: 'width 0.8s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Demo Data disclaimer */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#666670',
            letterSpacing: '0.8px',
            textTransform: 'uppercase'
          }}
        >
          DEMO DATA &nbsp;·&nbsp; Sample figures, not live
        </div>
      </div>

      {/* AI Insight callout banner */}
      <div
        style={{
          backgroundColor: '#F0EDFF',
          borderTop: '1px solid #BAB0FA',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#5B50E8',
            lineHeight: '20px'
          }}
        >
          ✦&nbsp;&nbsp;Docker is a priority gap for your target role.
        </span>
      </div>
    </div>
  );
};
