import React, { useState } from 'react';

interface OnboardingScreenProps {
  onContinue?: (data: { education: string; year: string; region: string }) => void;
  onSaveAndExit?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onContinue,
  onSaveAndExit
}) => {
  // Form State
  const [selectedEducation, setSelectedEducation] = useState<string>('B.Tech / BE');
  const [selectedYear, setSelectedYear] = useState<string>('Final year');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dropdown options
  const yearOptions = [
    '1st year',
    '2nd year',
    '3rd year',
    'Final year',
    'Recent graduate'
  ];

  const regionOptions = [
    'Chennai',
    'Coimbatore',
    'Bengaluru',
    'Hyderabad',
    'Madurai',
    'Trichy',
    'Salem',
    'Kochi',
    'Other'
  ];

  const educationChoices = [
    {
      id: 'B.Tech / BE',
      title: 'B.Tech / BE',
      desc: 'Engineering or technology'
    },
    {
      id: 'BCA / B.Sc',
      title: 'BCA / B.Sc',
      desc: 'Computer science & applications'
    },
    {
      id: 'B.Com / BBA',
      title: 'B.Com / BBA',
      desc: 'Commerce & business'
    }
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEducation) {
      setValidationError('Please select your education.');
      return;
    }
    if (!selectedYear) {
      setValidationError('Please select your graduation year.');
      return;
    }
    if (!selectedRegion) {
      setValidationError('Please select your preferred region.');
      return;
    }

    setValidationError(null);
    setSuccessMessage('Profile saved! Advancing to the next step...');
    
    setTimeout(() => {
      if (onContinue) {
        onContinue({
          education: selectedEducation,
          year: selectedYear,
          region: selectedRegion
        });
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
      {/* Decorative Orbs & Ambient Violet Glow */}
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
          left: '30px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          backgroundColor: '#8B7CF6',
          opacity: 0.22,
          filter: 'blur(36px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Navigation / Onboarding (Figma node 42:7) */}
      <header
        className="screen-header-bar"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

        {/* Save & exit action */}
        <button
          type="button"
          id="save-and-exit-btn"
          onClick={onSaveAndExit}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            color: '#17171B',
            cursor: 'pointer',
            padding: '8px 14px',
            borderRadius: '8px',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          Save & exit
        </button>
      </header>

      {/* Main Onboarding Card (Figma node 42:13) */}
      <main
        className="screen-main-card-box"
        style={{
          width: '100%',
          maxWidth: '880px',
          margin: '34px auto 60px auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '1px solid #E0DEEB',
          boxShadow: '0 18px 40px rgba(15, 10, 51, 0.14)',
          padding: '42px 42px 34px 42px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Step Label (Figma node 42:14) */}
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
          STEP 1 OF 3
        </div>

        {/* Title (Figma node 42:15) */}
        <h1
          className="responsive-screen-title"
          style={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '44px',
            letterSpacing: '-0.3px',
            color: '#17171B',
            marginBottom: '8px'
          }}
        >
          Tell us about yourself
        </h1>

        {/* Subtitle (Figma node 42:16) */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#666670',
            marginBottom: '26px'
          }}
        >
          This helps REGIONAL - AI personalize your regional skill signal.
        </p>

        {/* Progress Bar (Figma nodes 42:17, 42:18) */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#EBE8F2',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: '33.33%',
              height: '100%',
              backgroundColor: '#5B50E8',
              borderRadius: '3px',
              transition: 'width 0.4s ease'
            }}
          />
        </div>

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

        {successMessage && (
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
            {successMessage}
          </div>
        )}

        <form onSubmit={handleContinue} noValidate>
          {/* Section: Your education (Figma nodes 42:19, 42:20) */}
          <div style={{ marginBottom: '30px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '28px',
                color: '#17171B',
                marginBottom: '4px'
              }}
            >
              Your education
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#666670',
                marginBottom: '16px'
              }}
            >
              Choose the option that best matches your current study.
            </p>

            {/* Education Options Cards (Figma nodes 42:21, 42:25, 42:29) */}
            <div
              className="onboarding-options-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '16px'
              }}
            >
              {educationChoices.map((choice) => {
                const isSelected = selectedEducation === choice.id;
                return (
                  <div
                    key={choice.id}
                    id={`edu-option-${choice.id.replace(/[^a-zA-Z]/g, '')}`}
                    onClick={() => {
                      setSelectedEducation(choice.id);
                      if (validationError) setValidationError(null);
                    }}
                    style={{
                      height: '86px',
                      backgroundColor: isSelected ? '#F6F3FF' : '#FFFFFF',
                      borderRadius: '14px',
                      border: isSelected ? '1.5px solid #5B50E8' : '1px solid #E0DEEB',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(91, 80, 232, 0.12)' : 'none'
                    }}
                  >
                    {/* Radio circle */}
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '1.5px solid #5B50E8' : '1.5px solid #B2B0C2',
                        backgroundColor: isSelected ? '#5B50E8' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF'
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '20px',
                          color: '#17171B',
                          marginBottom: '2px'
                        }}
                      >
                        {choice.title}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: '#666670'
                        }}
                      >
                        {choice.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Fields: Year and Preferred Region (Figma nodes 42:33, 42:34) */}
          <div
            className="onboarding-fields-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}
          >
            {/* Current Year Field */}
            <div>
              <label
                htmlFor="year-select"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#17171B',
                  marginBottom: '8px'
                }}
              >
                Current year
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  style={{
                    width: '100%',
                    height: '52px',
                    borderRadius: '10px',
                    border: '1px solid #E0DEEB',
                    backgroundColor: '#FFFFFF',
                    padding: '0 40px 0 16px',
                    fontSize: '14px',
                    color: selectedYear ? '#17171B' : '#666670',
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5B50E8';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 80, 232, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E0DEEB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>Select current year</option>
                  {yearOptions.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>

                {/* Chevron icon */}
                <div
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#70727D',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#70727D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Preferred Region Field */}
            <div>
              <label
                htmlFor="region-select"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#17171B',
                  marginBottom: '8px'
                }}
              >
                Preferred region
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="region-select"
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  style={{
                    width: '100%',
                    height: '52px',
                    borderRadius: '10px',
                    border: '1px solid #E0DEEB',
                    backgroundColor: '#FFFFFF',
                    padding: '0 40px 0 16px',
                    fontSize: '14px',
                    color: selectedRegion ? '#17171B' : '#666670',
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5B50E8';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 80, 232, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E0DEEB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>Chennai / Coimbatore / Bengaluru…</option>
                  {regionOptions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>

                {/* Chevron icon */}
                <div
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#70727D',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#70727D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Privacy hint & Continue button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Privacy / Helper Hint (Figma node 42:43) */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#666670',
                lineHeight: '20px'
              }}
            >
              You can update these details later.
            </div>

            {/* Button / Continue (Figma node 42:44) */}
            <button
              type="submit"
              id="onboarding-continue-btn"
              style={{
                width: '180px',
                height: '50px',
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

        {/* Step Indicator (Figma node 42:46) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {/* Active pill indicator (20x8) */}
          <div
            style={{
              width: '20px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: '#5B50E8'
            }}
          />
          {/* Step 2 dot (8x8) */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D6D4E5'
            }}
          />
          {/* Step 3 dot (8x8) */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D6D4E5'
            }}
          />
        </div>
      </main>
    </div>
  );
};
