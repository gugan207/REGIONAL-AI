import React from 'react';

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: { email: string | null } | null;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  onSignOutClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, user = null, onSignInClick, onSignUpClick, onSignOutClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const renderAccountActions = () => {
    if (isAuthenticated && user) {
      return (
        <div
          className="navbar-desktop-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <button
            type="button"
            onClick={() => { if (onSignOutClick) onSignOutClick(); }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: '#EA580C',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            Sign out
          </button>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#17171B'
            }}
          >
            {user.email?.split('@')[0] || 'User'}
          </span>
        </div>
      );
    }
    return (
      <div
        className="navbar-desktop-actions"
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
    );
  };

  const renderMobileAccountActions = () => {
    if (isAuthenticated && user) {
      return (
        <div style={{ display: 'flex', gap: '12px', paddingTop: '10px', borderTop: '1px solid #E0DEEB' }}>
          <button
            type="button"
            onClick={() => { setMobileMenuOpen(false); if (onSignOutClick) onSignOutClick(); }}
            style={{
              flex: 1,
              height: '40px',
              backgroundColor: '#F0EDFF',
              color: '#EA580C',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Sign out
          </button>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', gap: '12px', paddingTop: '10px', borderTop: '1px solid #E0DEEB' }}>
        <button
          type="button"
          onClick={() => { setMobileMenuOpen(false); if (onSignInClick) onSignInClick(); }}
          style={{
            flex: 1,
            height: '40px',
            backgroundColor: '#F0EDFF',
            color: '#5B50E8',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => { setMobileMenuOpen(false); if (onSignUpClick) onSignUpClick(); }}
          style={{
            flex: 1,
            height: '40px',
            backgroundColor: '#5B50E8',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Sign up
        </button>
      </div>
    );
  };

  return (
    <>
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
          className="navbar-desktop-nav"
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
          className="navbar-desktop-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          {renderAccountActions()}
        </div>

        {/* Mobile Hamburger Toggle (Visible <= 840px) */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Drawer Menu (Visible <= 840px when open) */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#how-it-works"
          onClick={() => setMobileMenuOpen(false)}
          style={{ textDecoration: 'none', fontSize: '15px', fontWeight: 500, color: '#17171B', padding: '8px 0' }}
        >
          How it works
        </a>
        <a
          href="#insights"
          onClick={() => setMobileMenuOpen(false)}
          style={{ textDecoration: 'none', fontSize: '15px', fontWeight: 500, color: '#17171B', padding: '8px 0' }}
        >
          Insights
        </a>
        <a
          href="#for-colleges"
          onClick={() => setMobileMenuOpen(false)}
          style={{ textDecoration: 'none', fontSize: '15px', fontWeight: 500, color: '#17171B', padding: '8px 0' }}
        >
          For colleges
        </a>
        {renderMobileAccountActions()}
      </div>
    </>
  );
};