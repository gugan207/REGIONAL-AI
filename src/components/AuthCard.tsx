import React, { useState } from 'react';

interface AuthCardProps {
  onSuccess?: (email: string) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setError('Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFeedbackMessage(null);

    // Mock sign in simulation
    setTimeout(() => {
      setIsLoading(false);
      setFeedbackMessage('Welcome back! Signed in successfully.');
      if (onSuccess) onSuccess(email);
    }, 700);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setFeedbackMessage('Password reset link sent to ' + (email || 'your email') + '.');
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFeedbackMessage('Google authentication simulated successfully.');
      if (onSuccess) onSuccess('google_user@gmail.com');
    }, 600);
  };

  const handleCreateAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    setFeedbackMessage('Create account flow initialized (Step 1 demo mode).');
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '584px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(229, 227, 237, 0.90)',
        boxShadow: '0 28px 64px -10px rgba(26, 15, 107, 0.30), 0 4px 14px rgba(26, 15, 107, 0.12)',
        padding: '40px 48px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 2
      }}
    >
      {/* Auth Kicker */}
      <div
        style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: '#5B50E8',
          marginBottom: '8px'
        }}
      >
        WELCOME BACK
      </div>

      {/* Auth Title */}
      <h2
        style={{
          fontSize: '40px',
          fontWeight: 700,
          lineHeight: '48px',
          letterSpacing: '-0.4px',
          color: '#17171B',
          marginBottom: '6px'
        }}
      >
        Sign in
      </h2>

      {/* Auth Subtitle */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          color: '#666670',
          marginBottom: '28px'
        }}
      >
        Continue your regional skill journey.
      </p>

      {/* Validation or Feedback Alert */}
      {error && (
        <div
          role="alert"
          style={{
            backgroundColor: '#FEECEC',
            color: '#D32F2F',
            fontSize: '13px',
            fontWeight: 500,
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '18px',
            border: '1px solid #F5C2C2'
          }}
        >
          {error}
        </div>
      )}

      {feedbackMessage && (
        <div
          role="status"
          style={{
            backgroundColor: '#EDF7ED',
            color: '#1E4620',
            fontSize: '13px',
            fontWeight: 500,
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '18px',
            border: '1px solid #C8E6C9'
          }}
        >
          {feedbackMessage}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSignIn} noValidate>
        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="email-input"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#17171B',
              marginBottom: '8px'
            }}
          >
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@example.com"
            style={{
              width: '100%',
              height: '54px',
              borderRadius: '10px',
              border: '1px solid #E0DEE8',
              backgroundColor: '#FFFFFF',
              padding: '0 16px',
              fontSize: '15px',
              color: '#17171B',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#5B50E8';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 80, 232, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E0DEE8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Password Header & Field */}
        <div style={{ marginBottom: '26px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}
          >
            <label
              htmlFor="password-input"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#17171B'
              }}
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                color: '#5B50E8',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Forgot password?
            </button>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="••••••••••"
              style={{
                width: '100%',
                height: '54px',
                borderRadius: '10px',
                border: '1px solid #E0DEE8',
                backgroundColor: '#FFFFFF',
                padding: '0 48px 0 16px',
                fontSize: '15px',
                color: '#17171B',
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: showPassword ? 'normal' : '2px',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#5B50E8';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 80, 232, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E0DEE8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />

            {/* Password show/hide eye button matching Figma vectors */}
            <button
              type="button"
              id="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                color: '#727784'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* CTA / Sign In */}
        <button
          type="submit"
          id="sign-in-btn"
          disabled={isLoading}
          style={{
            width: '100%',
            height: '54px',
            backgroundColor: '#5B50E8',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: isLoading ? 'default' : 'pointer',
            boxShadow: '0 6px 14px -3px rgba(92, 79, 232, 0.32)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'opacity 0.2s ease, transform 0.1s ease',
            opacity: isLoading ? 0.7 : 1
          }}
          onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.opacity = '0.94'; }}
          onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.opacity = '1'; }}
        >
          {isLoading ? 'Signing in...' : 'Sign in  →'}
        </button>
      </form>

      {/* Or Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '22px 0',
          gap: '16px'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E0DEE8' }} />
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#666670' }}>or</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E0DEE8' }} />
      </div>

      {/* Secondary / Google Button */}
      <button
        type="button"
        id="google-sign-in-btn"
        onClick={handleGoogleSignIn}
        style={{
          width: '100%',
          height: '54px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #DEDBE5',
          boxShadow: '0 3px 10px rgba(13, 8, 38, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease, border-color 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FBFBFC')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
      >
        {/* 4-color Google Vector Icon */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
            fill="#4285F4"
          />
          <path
            d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
            fill="#34A853"
          />
          <path
            d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
            fill="#EA4335"
          />
        </svg>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#17171B'
          }}
        >
          Continue with Google
        </span>
      </button>

      {/* Create Account prompt */}
      <div
        style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 500,
          color: '#666670'
        }}
      >
        New to REGIONAL - AI?{' '}
        <button
          type="button"
          onClick={handleCreateAccount}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            color: '#5B50E8',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Create an account
        </button>
      </div>

      {/* Footer Divider */}
      <div
        style={{
          height: '1px',
          backgroundColor: '#E7E5EA',
          margin: '28px 0 16px 0'
        }}
      />

      {/* Terms Notice */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '18px',
          color: '#666670'
        }}
      >
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};
