import React, { useState } from 'react';

interface TargetRoleScreenProps {
  onContinue?: (role: string) => void;
  onBack?: () => void;
  initialRole?: string;
}

interface RoleOption {
  id: string;
  title: string;
  desc: string;
  icon: (color: string) => React.ReactNode;
}

export const TargetRoleScreen: React.FC<TargetRoleScreenProps> = ({
  onContinue,
  onBack,
  initialRole = 'Backend Developer'
}) => {
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  const roles: RoleOption[] = [
    {
      id: 'Backend Developer',
      title: 'Backend Developer',
      desc: 'APIs, services & databases',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    },
    {
      id: 'Data Analyst',
      title: 'Data Analyst',
      desc: 'Insights, SQL & reporting',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'AI / ML Engineer',
      title: 'AI / ML Engineer',
      desc: 'Models, data & experimentation',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.5C4.8 8.8 4 7.5 4 6a4 4 0 0 1 8-4z" />
          <path d="M10 13v3" />
          <path d="M14 13v3" />
          <path d="M7 21h10" />
        </svg>
      )
    },
    {
      id: 'Cloud Engineer',
      title: 'Cloud Engineer',
      desc: 'Infrastructure, deployment & scale',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      )
    },
    {
      id: 'Cybersecurity Analyst',
      title: 'Cybersecurity Analyst',
      desc: 'Security, risk & monitoring',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      id: 'UI / UX Designer',
      title: 'UI / UX Designer',
      desc: 'Research, systems & interfaces',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12a4 4 0 0 1 8 0" />
          <circle cx="9" cy="9" r="1" fill={color} />
          <circle cx="15" cy="9" r="1" fill={color} />
        </svg>
      )
    }
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setValidationError('Please select a target role to continue.');
      return;
    }

    setValidationError(null);
    setSuccessFeedback(`Selected role: ${selectedRole}. Advancing to Skill Profile...`);

    setTimeout(() => {
      if (onContinue) {
        onContinue(selectedRole);
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F6F3FF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Organic Accent Orbs (Figma nodes 44:123, 44:124) */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          backgroundColor: '#8B7CF6',
          opacity: 0.22,
          filter: 'blur(36px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '35px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: '#8B7CF6',
          opacity: 0.22,
          filter: 'blur(36px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Navigation (Figma node 44:125) */}
      <header
        style={{
          width: '100%',
          maxWidth: '1376px',
          height: '68px',
          margin: '24px auto 0',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '34px',
          border: '1px solid rgba(255, 255, 255, 0.60)',
          boxShadow: '0 7px 24px rgba(20, 13, 46, 0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={onBack}>
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
              fontSize: '15px'
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

        {/* Right Status Label (Figma node 44:130) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#666670',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              ← Back
            </button>
          )}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#17171B'
            }}
          >
            STEP 2 OF 3
          </span>
        </div>
      </header>

      {/* Main Target Role Card (Figma node 44:131) */}
      <main
        style={{
          width: '100%',
          maxWidth: '920px',
          margin: '34px auto 60px auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
          padding: '42px 44px 38px 44px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Step Kicker (Figma node 44:132) */}
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
          STEP 2 OF 3
        </div>

        {/* Title (Figma node 44:133) */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '44px',
            letterSpacing: '-0.3px',
            color: '#17171B',
            marginBottom: '8px'
          }}
        >
          What do you want to become?
        </h1>

        {/* Subtitle (Figma node 44:134) */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#666670',
            marginBottom: '32px'
          }}
        >
          Choose the role you are preparing for. You can change this later.
        </p>

        {/* Validation or status alert */}
        {validationError && (
          <div
            role="alert"
            style={{
              backgroundColor: '#FEECEC',
              color: '#D32F2F',
              fontSize: '13px',
              fontWeight: 500,
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #F5C2C2'
            }}
          >
            {validationError}
          </div>
        )}

        {successFeedback && (
          <div
            role="status"
            style={{
              backgroundColor: '#EDF7ED',
              color: '#1E4620',
              fontSize: '13px',
              fontWeight: 500,
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #C8E6C9'
            }}
          >
            {successFeedback}
          </div>
        )}

        <form onSubmit={handleContinue} noValidate>
          {/* 6 Target Roles Grid (3x2) (Figma nodes 44:135 to 44:155) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '18px',
              marginBottom: '34px'
            }}
          >
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  id={`role-option-${role.id.replace(/[^a-zA-Z]/g, '')}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => {
                    setSelectedRole(role.id);
                    if (validationError) setValidationError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedRole(role.id);
                      if (validationError) setValidationError(null);
                    }
                  }}
                  style={{
                    height: '112px',
                    backgroundColor: isSelected ? '#F2F0FF' : '#FFFFFF',
                    borderRadius: '18px',
                    border: isSelected ? '1.5px solid #8C80FA' : '1px solid #E0DEEB',
                    boxShadow: isSelected ? '0 4px 14px rgba(91, 80, 232, 0.12)' : 'none',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  {/* Icon circle (32x32) */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#5B50E8' : '#F0EDFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {role.icon(isSelected ? '#FFFFFF' : '#5B50E8')}
                  </div>

                  {/* Role text */}
                  <div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        color: '#17171B',
                        marginBottom: '4px'
                      }}
                    >
                      {role.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                        color: '#666670'
                      }}
                    >
                      {role.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Row: Helper Hint & Continue button (Figma nodes 44:159, 44:160) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Helper Hint (Figma node 44:159) */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#666670',
                lineHeight: '20px',
                maxWidth: '480px'
              }}
            >
              Your selection powers regional demand and skill-gap analysis.
            </div>

            {/* Button / Continue (Figma node 44:160) */}
            <button
              type="submit"
              id="target-role-continue-btn"
              style={{
                width: '188px',
                height: '52px',
                backgroundColor: '#5B50E8',
                color: '#FFFFFF',
                borderRadius: '14px',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 14px rgba(51, 41, 140, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s ease, transform 0.1s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.94')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
