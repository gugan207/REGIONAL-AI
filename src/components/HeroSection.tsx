import React from 'react';
import { ProductPreviewCard } from './ProductPreviewCard';

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        flex: '1 1 50%',
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        zIndex: 1
      }}
    >
      {/* Kicker Badge */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '17px',
            padding: '7px 16px',
            color: '#FFFFFF'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.2px',
              textTransform: 'uppercase'
            }}
          >
            REGIONAL CAREER INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Hero Title */}
      <h1
        style={{
          fontSize: '44px',
          fontWeight: 700,
          lineHeight: '54px',
          letterSpacing: '-0.4px',
          color: '#FFFFFF',
          maxWidth: '640px'
        }}
      >
        Know what the market needs. Build the skills that matter.
      </h1>

      {/* Hero Subtitle */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '26px',
          color: 'rgba(255, 255, 255, 0.94)',
          maxWidth: '600px'
        }}
      >
        REGIONAL - AI helps you see what employers near you need — then turns the gap into a practical learning path.
      </p>

      {/* Trust Points */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          margin: '4px 0 12px 0'
        }}
      >
        {['Regional demand', 'Skill gap analysis', 'Action roadmap'].map((item) => (
          <div
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '17px',
              padding: '8px 16px 8px 14px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#D9D4FF'
              }}
            />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.94)',
                lineHeight: '18px'
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Product Preview Card */}
      <ProductPreviewCard />
    </section>
  );
};
