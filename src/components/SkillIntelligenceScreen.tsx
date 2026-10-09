import React, { useState } from 'react';
import { ResumeFileInfo } from './SkillProfileScreen';
import { RegionalSignalData } from './RegionalSignalScreen';

export interface DemandSkillItem {
  skill: string;
  demandPercentage: number;
  trackColor: string;
  isGap?: boolean;
}

export interface SkillIntelligenceData {
  region: string;
  role: string;
  experience: string;
  window: string;
  demandSkills: DemandSkillItem[];
  topItemName: string;
  topItemBody: string;
  topItemPriority: string;
  topItemReason: string;
}

interface SkillIntelligenceScreenProps {
  education?: string;
  year?: string;
  region?: string;
  targetRole?: string;
  selectedSkills?: string[];
  resumeFile?: ResumeFileInfo | null;
  signalData?: RegionalSignalData | null;
  onViewSkillGap?: () => void;
  onBack?: () => void;
}

export const SkillIntelligenceScreen: React.FC<SkillIntelligenceScreenProps> = ({
  education: _education = 'B.Tech / BE',
  year: _year = 'Final year',
  region = 'Chennai',
  targetRole = 'Backend Developer',
  selectedSkills: _selectedSkills = ['Python', 'SQL'],
  resumeFile: _resumeFile = null,
  signalData: _signalData = null,
  onViewSkillGap,
  onBack
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentRegion = region || 'Chennai';
  const currentRole = targetRole || 'Backend Developer';

  // Role-specific demand distributions (matching Figma Node 44:321 exact text and values by default)
  const getIntelligenceForRole = (role: string): SkillIntelligenceData => {
    if (role === 'Data Analyst') {
      return {
        region: currentRegion,
        role: currentRole,
        experience: 'Fresher',
        window: 'Recent signals',
        demandSkills: [
          { skill: 'Python', demandPercentage: 92, trackColor: '#78B99A' },
          { skill: 'SQL', demandPercentage: 88, trackColor: '#78B99A' },
          { skill: 'Power BI', demandPercentage: 82, trackColor: '#E2B65B', isGap: true },
          { skill: 'Tableau', demandPercentage: 68, trackColor: '#5B50E8' },
          { skill: 'Advanced Excel', demandPercentage: 58, trackColor: '#5B50E8' },
          { skill: 'Statistics', demandPercentage: 45, trackColor: '#8B7CF6' }
        ],
        topItemName: 'Power BI',
        topItemBody: 'A strong match for your target role — and a current gap in your profile.',
        topItemPriority: 'HIGH PRIORITY',
        topItemReason: 'Recommended because of regional demand + role relevance + your current evidence.'
      };
    }
    if (role === 'AI / ML Engineer') {
      return {
        region: currentRegion,
        role: currentRole,
        experience: 'Fresher',
        window: 'Recent signals',
        demandSkills: [
          { skill: 'Python', demandPercentage: 95, trackColor: '#78B99A' },
          { skill: 'SQL', demandPercentage: 80, trackColor: '#78B99A' },
          { skill: 'PyTorch', demandPercentage: 78, trackColor: '#5B50E8' },
          { skill: 'Docker', demandPercentage: 62, trackColor: '#E2B65B', isGap: true },
          { skill: 'MLOps', demandPercentage: 58, trackColor: '#5B50E8' },
          { skill: 'Transformers', demandPercentage: 42, trackColor: '#8B7CF6' }
        ],
        topItemName: 'Docker',
        topItemBody: 'A strong match for your target role — and a current gap in your profile.',
        topItemPriority: 'HIGH PRIORITY',
        topItemReason: 'Recommended because of regional demand + role relevance + your current evidence.'
      };
    }
    if (role === 'Cloud Engineer') {
      return {
        region: currentRegion,
        role: currentRole,
        experience: 'Fresher',
        window: 'Recent signals',
        demandSkills: [
          { skill: 'Linux', demandPercentage: 90, trackColor: '#78B99A' },
          { skill: 'Python', demandPercentage: 82, trackColor: '#78B99A' },
          { skill: 'AWS', demandPercentage: 76, trackColor: '#E2B65B', isGap: true },
          { skill: 'Terraform', demandPercentage: 64, trackColor: '#5B50E8' },
          { skill: 'Kubernetes', demandPercentage: 55, trackColor: '#5B50E8' },
          { skill: 'CI/CD', demandPercentage: 40, trackColor: '#8B7CF6' }
        ],
        topItemName: 'AWS',
        topItemBody: 'A strong match for your target role — and a current gap in your profile.',
        topItemPriority: 'HIGH PRIORITY',
        topItemReason: 'Recommended because of regional demand + role relevance + your current evidence.'
      };
    }
    if (role === 'UI / UX Designer') {
      return {
        region: currentRegion,
        role: currentRole,
        experience: 'Fresher',
        window: 'Recent signals',
        demandSkills: [
          { skill: 'Figma', demandPercentage: 94, trackColor: '#78B99A' },
          { skill: 'Wireframing', demandPercentage: 85, trackColor: '#78B99A' },
          { skill: 'Design Systems', demandPercentage: 76, trackColor: '#E2B65B', isGap: true },
          { skill: 'User Research', demandPercentage: 62, trackColor: '#5B50E8' },
          { skill: 'Prototyping', demandPercentage: 54, trackColor: '#5B50E8' },
          { skill: 'Usability Testing', demandPercentage: 38, trackColor: '#8B7CF6' }
        ],
        topItemName: 'Design Systems',
        topItemBody: 'A strong match for your target role — and a current gap in your profile.',
        topItemPriority: 'HIGH PRIORITY',
        topItemReason: 'Recommended because of regional demand + role relevance + your current evidence.'
      };
    }

    // Default: Backend Developer (Exact match to Figma Node 44:301)
    return {
      region: currentRegion,
      role: currentRole,
      experience: 'Fresher',
      window: 'Recent signals',
      demandSkills: [
        { skill: 'Java', demandPercentage: 91, trackColor: '#78B99A' },
        { skill: 'SQL', demandPercentage: 84, trackColor: '#78B99A' },
        { skill: 'REST APIs', demandPercentage: 78, trackColor: '#5B50E8' },
        { skill: 'Docker', demandPercentage: 62, trackColor: '#E2B65B', isGap: true },
        { skill: 'AWS', demandPercentage: 57, trackColor: '#5B50E8' },
        { skill: 'Kubernetes', demandPercentage: 34, trackColor: '#8B7CF6' }
      ],
      topItemName: 'Docker',
      topItemBody: 'A strong match for your target role — and a current gap in your profile.',
      topItemPriority: 'HIGH PRIORITY',
      topItemReason: 'Recommended because of regional demand + role relevance + your current evidence.'
    };
  };

  const intelligence = getIntelligenceForRole(currentRole);

  const handleSkillGapClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (onViewSkillGap) {
        onViewSkillGap();
      }
    }, 400);
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
      {/* Ambient Violet Glow Accents (Figma nodes 44:302, 102:13, 102:14) */}
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

      {/* Top Navigation Bar (Figma node 44:303) */}
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
        {/* Brand Group (Figma node 44:304) */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onBack}
          title="Back to Dashboard"
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

        {/* Right Status / Action (Figma node 44:308) */}
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
            SKILL INTELLIGENCE
          </span>
        </div>
      </header>

      {/* Main Content Area (988px width) */}
      <main
        className="screen-main-card-box"
        style={{
          width: '100%',
          maxWidth: '988px',
          marginTop: '32px',
          marginBottom: '50px',
          padding: '0 20px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Kicker (Figma node 44:309) */}
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
          REGIONAL SKILL INTELLIGENCE
        </div>

        {/* Header Title (Figma node 44:310) */}
        <h1
          className="responsive-screen-title"
          style={{
            fontSize: '38px',
            fontWeight: 700,
            lineHeight: '46px',
            letterSpacing: '-0.3px',
            color: '#17171B',
            margin: '0 0 10px 0',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          What are employers asking for?
        </h1>

        {/* Header Subtitle (Figma node 44:311) */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#666670',
            margin: '0 0 28px 0',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Explore demand by region, target role and experience level.
        </p>

        {/* Filters / Context Panel (Figma node 44:312) */}
        <div
          id="filters-panel"
          className="skill-intel-filter-bar"
          style={{
            width: '100%',
            height: '72px',
            borderRadius: '18px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0DEEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            marginBottom: '28px',
            boxSizing: 'border-box'
          }}
        >
          {/* Filter 1: REGION (44:313, 44:314) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                lineHeight: '14px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              REGION
            </span>
            <span
              id="filter-region-value"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '18px',
                color: '#17171B',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {intelligence.region}
            </span>
          </div>

          {/* Filter 2: ROLE (44:315, 44:316) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                lineHeight: '14px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              ROLE
            </span>
            <span
              id="filter-role-value"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '18px',
                color: '#17171B',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {intelligence.role}
            </span>
          </div>

          {/* Filter 3: EXPERIENCE (44:317, 44:318) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                lineHeight: '14px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              EXPERIENCE
            </span>
            <span
              id="filter-experience-value"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '18px',
                color: '#17171B',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {intelligence.experience}
            </span>
          </div>

          {/* Filter 4: WINDOW (44:319, 44:320) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                lineHeight: '14px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              WINDOW
            </span>
            <span
              id="filter-window-value"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '18px',
                color: '#17171B',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {intelligence.window}
            </span>
          </div>
        </div>

        {/* Row 2: Demand Chart (650px) + Why This Matters (312px) */}
        <div
          className="skill-intel-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '650px 312px',
            gap: '26px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Demand Chart Panel (Figma node 44:321) */}
          <div
            id="demand-chart-panel"
            className="skill-intel-panel-card"
            style={{
              height: '420px',
              borderRadius: '22px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px 28px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Chart Title (Figma node 44:322) */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: 600,
                lineHeight: '30px',
                color: '#17171B',
                marginBottom: '26px',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Skill demand by target role
            </div>

            {/* 6 Skill Demand Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {intelligence.demandSkills.map((item, idx) => (
                <div
                  key={idx}
                  id={`demand-row-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  {/* Skill Label */}
                  <span
                    style={{
                      width: '110px',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      color: '#17171B',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {item.skill}
                  </span>

                  {/* Progress Track & Fill (410px total track) */}
                  <div
                    style={{
                      width: '410px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#EBE8F2',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: `${item.demandPercentage}%`,
                        height: '100%',
                        borderRadius: '4px',
                        backgroundColor: item.trackColor,
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>

                  {/* Percentage Value */}
                  <span
                    style={{
                      width: '52px',
                      fontSize: '13px',
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: '#17171B',
                      textAlign: 'right',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {`${item.demandPercentage}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why This Matters Panel (Figma node 44:347) */}
          <div
            id="why-this-matters-panel"
            className="skill-intel-panel-card"
            style={{
              height: '420px',
              borderRadius: '22px',
              backgroundColor: '#5B50E8',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Top Content */}
            <div>
              {/* Kicker (Figma node 44:348) */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                WHY THIS MATTERS
              </div>

              {/* Title (Figma node 44:349) */}
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  lineHeight: '36px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.2px',
                  marginBottom: '12px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {intelligence.topItemName}
              </div>

              {/* Body (Figma node 44:350) */}
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  margin: '0 0 16px 0',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {intelligence.topItemBody}
              </p>

              {/* Priority Badge (Figma node 44:351) */}
              <div
                style={{
                  width: '120px',
                  height: '30px',
                  borderRadius: '99px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '16px',
                    color: '#5B50E8',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {intelligence.topItemPriority}
                </span>
              </div>

              {/* Reason (Figma node 44:353) */}
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: 'rgba(255, 255, 255, 0.92)',
                  margin: 0,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {intelligence.topItemReason}
              </p>
            </div>

            {/* View Your Skill Gap Button (Figma node 44:354) */}
            <button
              type="button"
              id="btn-view-skill-gap"
              onClick={handleSkillGapClick}
              disabled={isTransitioning}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isTransitioning ? 'default' : 'pointer',
                transition: 'transform 0.15s ease, background-color 0.15s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.backgroundColor = '#F6F3FF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#5B50E8',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {isTransitioning ? 'Loading Skill Gap...' : 'View your skill gap'}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillIntelligenceScreen;
