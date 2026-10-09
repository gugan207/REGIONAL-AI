import React, { useState } from 'react';
import { ResumeFileInfo } from './SkillProfileScreen';

export interface RegionalSignalData {
  readinessPercentage: number;
  topGapSkill: string;
  gapReason: string;
  priority: string;
  actionSequence: string;
  sources: string[];
}

interface RegionalSignalScreenProps {
  education?: string;
  year?: string;
  region?: string;
  targetRole?: string;
  selectedSkills?: string[];
  resumeFile?: ResumeFileInfo | null;
  onContinue?: (signalData: RegionalSignalData) => void;
  onBack?: () => void;
}

export const RegionalSignalScreen: React.FC<RegionalSignalScreenProps> = ({
  education: _education = 'B.Tech / BE',
  year = 'Fresher',
  region = 'Chennai',
  targetRole = 'Backend Developer',
  selectedSkills = ['Python', 'SQL'],
  resumeFile = null,
  onContinue,
  onBack
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Deterministic demo signal calculation derived from candidate inputs
  const computeSignalData = (): RegionalSignalData => {
    // Role skill requirements map
    const roleRequirements: Record<string, { skills: string[]; topGapDefault: string; reason: string }> = {
      'Backend Developer': {
        skills: ['Python', 'SQL', 'Docker', 'Git', 'AWS'],
        topGapDefault: 'Docker',
        reason: 'High relevance for your target backend role.'
      },
      'Data Analyst': {
        skills: ['SQL', 'Excel', 'Power BI', 'Python'],
        topGapDefault: 'Power BI',
        reason: 'Crucial for data visualization and reporting in analytics teams.'
      },
      'AI / ML Engineer': {
        skills: ['Python', 'SQL', 'Docker', 'AWS'],
        topGapDefault: 'Docker',
        reason: 'Essential for containerizing ML pipelines and model inference.'
      },
      'Cloud Engineer': {
        skills: ['AWS', 'Docker', 'Git', 'Python'],
        topGapDefault: 'AWS',
        reason: 'Fundamental foundation for regional cloud infrastructure jobs.'
      },
      'Cybersecurity Analyst': {
        skills: ['Git', 'SQL', 'Python', 'AWS'],
        topGapDefault: 'Git',
        reason: 'Key for automated security posture and compliance scripts.'
      },
      'UI / UX Designer': {
        skills: ['Figma', 'React'],
        topGapDefault: 'Figma',
        reason: 'Core standard for regional design systems and prototyping.'
      }
    };

    const config = roleRequirements[targetRole] || roleRequirements['Backend Developer'];
    
    // Determine missing skills
    const missingSkills = config.skills.filter((s) => !selectedSkills.includes(s));
    const topGap = missingSkills.length > 0 ? missingSkills[0] : config.topGapDefault;

    // Calculate deterministic readiness: default 68% for baseline profile
    let readiness = 50;
    const matchingCount = config.skills.filter((s) => selectedSkills.includes(s)).length;
    readiness += matchingCount * 9;
    if (resumeFile) readiness += 5;
    // Bound readiness between 45% and 88%
    readiness = Math.max(45, Math.min(88, readiness));

    // If default profile (Chennai, Backend Developer, Python+SQL), exact match 68%
    if (targetRole === 'Backend Developer' && selectedSkills.includes('Python') && selectedSkills.includes('SQL') && selectedSkills.length <= 3) {
      readiness = 68;
    }

    return {
      readinessPercentage: readiness,
      topGapSkill: topGap,
      gapReason: config.reason,
      priority: 'HIGH',
      actionSequence: 'Learn → Build → Prove',
      sources: ['Regional demand', 'Role requirements', 'Your current skills']
    };
  };

  const signal = computeSignalData();

  const handleNextAction = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (onContinue) {
        onContinue(signal);
      }
    }, 450);
  };

  // Format subtitle string: "Chennai  •  Backend Developer  •  Fresher"
  const formattedSubtitle = `${region || 'Chennai'}  •  ${targetRole || 'Backend Developer'}  •  ${
    year ? (year === 'Final year' ? 'Fresher' : year) : 'Fresher'
  }`;

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
      {/* Organic Violet Glow Accents (Figma nodes 44:218/102:9, 44:219/102:10) */}
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

      {/* Top Navigation Bar (Figma node 44:220) */}
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
        {/* Brand Group (Figma node 44:221) */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onBack}
          title="Back to Skill Profile"
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
              lineHeight: 1,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            R
          </div>
          <span
            style={{
              fontSize: '17px',
              fontWeight: 600,
              lineHeight: '22px',
              color: '#17171B',
              letterSpacing: '-0.2px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            REGIONAL - AI
          </span>
        </div>

        {/* Right Status (Figma node 44:225) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                padding: '6px 12px',
                borderRadius: '8px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#17171B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666670')}
            >
              ← Back
            </button>
          )}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              color: '#17171B',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            REGIONAL SIGNAL
          </span>
        </div>
      </header>

      {/* Main Container (Aligned to Figma 1440 layout: 988px width) */}
      <main
        style={{
          width: '100%',
          maxWidth: '988px',
          marginTop: '34px',
          marginBottom: '50px',
          padding: '0 20px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Kicker (Figma node 44:226) */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            lineHeight: '16px',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: '#5B50E8',
            marginBottom: '8px',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          YOUR REGIONAL SIGNAL
        </div>

        {/* Main Title (Figma node 44:227) */}
        <h1
          style={{
            fontSize: '44px',
            fontWeight: 700,
            lineHeight: '52px',
            letterSpacing: '-0.4px',
            color: '#17171B',
            margin: '0 0 10px 0',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Your market signal is ready.
        </h1>

        {/* Supporting Subtitle (Figma node 44:228) */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#666670',
            margin: '0 0 32px 0',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {formattedSubtitle}
        </p>

        {/* Two-Card Grid Row: Readiness Card (350px) + Top Gap Card (610px) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '350px 1fr',
            gap: '28px',
            marginBottom: '32px',
            boxSizing: 'border-box',
            width: '100%'
          }}
        >
          {/* Readiness Card (Figma node 44:229) */}
          <div
            id="readiness-card"
            style={{
              width: '100%',
              minHeight: '236px',
              borderRadius: '24px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Card Label (Figma node 44:230) */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#666670',
                  marginBottom: '12px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                CURRENT READINESS
              </div>

              {/* Value (Figma node 44:231) */}
              <div
                id="readiness-value"
                style={{
                  fontSize: '60px',
                  fontWeight: 700,
                  lineHeight: '68px',
                  color: '#17171B',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: '8px'
                }}
              >
                {`${signal.readinessPercentage}%`}
              </div>

              {/* Caption (Figma node 44:232) */}
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#666670',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Demo signal based on selected profile.
              </div>
            </div>

            {/* Signal Action Pill (Figma node 44:233) */}
            <div
              id="signal-action-pill"
              onClick={handleNextAction}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNextAction();
                }
              }}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#5B50E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginTop: '18px',
                boxSizing: 'border-box',
                transition: 'background-color 0.15s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4F44DB';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5B50E8';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {isTransitioning ? 'Preparing roadmap...' : 'Your next best action is clear.'}
              </span>
            </div>
          </div>

          {/* Top Gap Card (Figma node 44:235) */}
          <div
            id="top-gap-card"
            style={{
              width: '100%',
              minHeight: '236px',
              borderRadius: '24px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Card Label (Figma node 44:236) */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#5B50E8',
                  marginBottom: '10px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                TOP PRIORITY GAP
              </div>

              {/* Skill Name (Figma node 44:237) */}
              <div
                id="top-gap-skill"
                style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  lineHeight: '38px',
                  color: '#17171B',
                  letterSpacing: '-0.3px',
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: '4px'
                }}
              >
                {signal.topGapSkill}
              </div>

              {/* Reason (Figma node 44:238) */}
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#666670',
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: '14px'
                }}
              >
                {signal.gapReason}
              </div>

              {/* Priority Pill (Figma node 44:239) */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '88px',
                  height: '30px',
                  borderRadius: '99px',
                  backgroundColor: '#E2B65B',
                  boxSizing: 'border-box'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '18px',
                    letterSpacing: '0.5px',
                    color: '#17171B',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  HIGH
                </span>
              </div>
            </div>

            {/* Action Strip (Figma node 44:240) */}
            <div
              id="action-strip-btn"
              onClick={handleNextAction}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNextAction();
                }
              }}
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '14px',
                backgroundColor: '#8B7CF6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginTop: '14px',
                boxSizing: 'border-box',
                transition: 'background-color 0.15s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7B6BE8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8B7CF6';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#17171B',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.2px'
                }}
              >
                Learn → Build → Prove
              </span>
            </div>
          </div>
        </div>

        {/* Signal Sources Panel (Figma node 44:243) */}
        <div
          id="signal-sources-panel"
          style={{
            width: '100%',
            minHeight: '170px',
            borderRadius: '22px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0DEEB',
            padding: '24px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {/* Section Title (Figma node 44:244) */}
          <div
            style={{
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '26px',
              color: '#17171B',
              marginBottom: '20px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            What the system is seeing
          </div>

          {/* Three Source Badges (Figma nodes 44:245, 44:247, 44:249) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            {/* Source 1: Regional demand (#5B50E8) */}
            <div
              style={{
                width: '190px',
                height: '34px',
                borderRadius: '99px',
                backgroundColor: '#5B50E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Regional demand
              </span>
            </div>

            {/* Source 2: Role requirements (#8B7CF6) */}
            <div
              style={{
                width: '190px',
                height: '34px',
                borderRadius: '99px',
                backgroundColor: '#8B7CF6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Role requirements
              </span>
            </div>

            {/* Source 3: Your current skills (#78B99A) */}
            <div
              style={{
                width: '190px',
                height: '34px',
                borderRadius: '99px',
                backgroundColor: '#78B99A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Your current skills
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegionalSignalScreen;
