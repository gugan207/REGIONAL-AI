import React from 'react';

interface NavbarProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSignInClick, onSignUpClick }) => {
  return (
    <header
      style={{
        width: '100%',
        maxWidth: '1344px',
        height: '68px',
        margin: '24px auto 0',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '34px',
        border: '1px solid rgba(255, 255, 255, 0.55)',
        boxShadow: '0 8px 24px rgba(20, 13, 46, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Brand logo & wordmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#5B50E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: 1
          }}
        >
          R
        </div>
        <span
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#17171B',
            letterSpacing: '-0.2px'
          }}
        >
          REGIONAL - AI
        </span>
      </div>

      {/* Nav Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px'
        }}
      >
        <a
          href="#how-it-works"
          style={{
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(64, 66, 79, 0.78)',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#17171B')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(64, 66, 79, 0.78)')}
        >
          How it works
        </a>
        <a
          href="#insights"
          style={{
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(64, 66, 79, 0.78)',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#17171B')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(64, 66, 79, 0.78)')}
        >
          Insights
        </a>
        <a
          href="#for-colleges"
          style={{
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(64, 66, 79, 0.78)',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#17171B')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(64, 66, 79, 0.78)')}
        >
          For colleges
        </a>
      </nav>

      {/* Account Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <button
          type="button"
          onClick={onSignInClick}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            color: '#17171B',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={onSignUpClick}
          style={{
            width: '94px',
            height: '40px',
            backgroundColor: '#5B50E8',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s ease, transform 0.1s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Sign up
        </button>
      </div>
    </header>
  );
};
