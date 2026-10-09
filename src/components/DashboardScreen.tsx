import React, { useState } from 'react';
import { ResumeFileInfo } from './SkillProfileScreen';
import { RegionalSignalData } from './RegionalSignalScreen';

export interface GapItem {
  skill: string;
  level: 'High' | 'Medium' | 'Low';
  levelColor: string;
  progressPercent: number;
}

interface DashboardScreenProps {
  education?: string;
  year?: string;
  region?: string;
  targetRole?: string;
  selectedSkills?: string[];
  resumeFile?: ResumeFileInfo | null;
  signalData?: RegionalSignalData | null;
  onViewRoadmap?: () => void;
  onBack?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  education: _education = 'B.Tech / BE',
  year: _year = 'Final year',
  region = 'Chennai',
  targetRole = 'Backend Developer',
  selectedSkills: _selectedSkills = ['Python', 'SQL'],
  resumeFile: _resumeFile = null,
  signalData = null,
  onViewRoadmap,
  onBack
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Derived values from candidate state
  const readinessValue = signalData ? signalData.readinessPercentage : 68;
  const currentRegion = region || 'Chennai';
  const currentRole = targetRole || 'Backend Developer';

  // Role-specific top 3 skill gaps
  const getGapsForRole = (role: string): GapItem[] => {
    if (role === 'Data Analyst') {
      return [
        { skill: 'Power BI', level: 'High', levelColor: '#F06B55', progressPercent: 82 },
        { skill: 'Tableau', level: 'High', levelColor: '#F06B55', progressPercent: 68 },
        { skill: 'Advanced Excel', level: 'Medium', levelColor: '#E2B65B', progressPercent: 51 }
      ];
    }
    if (role === 'AI / ML Engineer') {
      return [
        { skill: 'Docker', level: 'High', levelColor: '#F06B55', progressPercent: 82 },
        { skill: 'PyTorch', level: 'High', levelColor: '#F06B55', progressPercent: 68 },
        { skill: 'MLOps', level: 'Medium', levelColor: '#E2B65B', progressPercent: 51 }
      ];
    }
    if (role === 'Cloud Engineer') {
      return [
        { skill: 'AWS', level: 'High', levelColor: '#F06B55', progressPercent: 82 },
        { skill: 'Terraform', level: 'High', levelColor: '#F06B55', progressPercent: 68 },
        { skill: 'Kubernetes', level: 'Medium', levelColor: '#E2B65B', progressPercent: 51 }
      ];
    }
    if (role === 'UI / UX Designer') {
      return [
        { skill: 'Figma Systems', level: 'High', levelColor: '#F06B55', progressPercent: 82 },
        { skill: 'User Research', level: 'High', levelColor: '#F06B55', progressPercent: 68 },
        { skill: 'Prototyping', level: 'Medium', levelColor: '#E2B65B', progressPercent: 51 }
      ];
    }
    // Default Backend Developer gaps (matches Figma Node 44:277 exact text)
    return [
      { skill: 'Docker', level: 'High', levelColor: '#F06B55', progressPercent: 82 },
      { skill: 'AWS', level: 'High', levelColor: '#F06B55', progressPercent: 68 },
      { skill: 'REST APIs', level: 'Medium', levelColor: '#E2B65B', progressPercent: 51 }
    ];
  };

  const gaps = getGapsForRole(currentRole);
  const gapsSummary = `${gaps[0].skill} • ${gaps[1].skill} • ${gaps[2].skill.replace('REST ', '')}`;

  // Next Best Action details
  const topGapSkill = gaps[0].skill;
  const nextActionTitle = currentRole === 'Backend Developer'
    ? 'Build your Docker foundation.'
    : `Build your ${topGapSkill} foundation.`;
  const nextActionBody = currentRole === 'Backend Developer'
    ? 'Start with containers, then prove the skill with one backend project.'
    : `Master core ${topGapSkill} concepts, then build one targeted project to prove readiness.`;

  const handleRoadmapClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (onViewRoadmap) {
        onViewRoadmap();
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
      {/* Organic Violet Glow Accents (Figma nodes 44:253, 102:11) */}
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

      {/* Top Navigation Bar (Figma node 44:254) */}
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
        {/* Brand Group (Figma node 44:255) */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onBack}
          title="Back to Regional Signal"
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

        {/* Right Status / Action (Figma node 44:259) */}
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
            Profile
          </span>
        </div>
      </header>

      {/* Main Content (Figma layout: 988px width) */}
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
        {/* Header Kicker (Figma node 44:260) */}
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
          OVERVIEW
        </div>

        {/* Main Title (Figma node 44:261) */}
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
          Your career intelligence
        </h1>

        {/* Subtitle (Figma node 44:262) */}
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
          A focused view of your market demand, skill gaps and next action.
        </p>

        {/* Three Metric Cards Row (Figma nodes 44:263, 44:269, 44:273) */}
        <div
          className="dashboard-top-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '30px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Card 1: Readiness (Figma node 44:263) */}
          <div
            id="metric-readiness"
            style={{
              height: '150px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '20px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#666670',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                READINESS
              </span>
              <div
                style={{
                  width: '90px',
                  height: '28px',
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
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '18px',
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Demo signal
                </span>
              </div>
            </div>

            <div
              id="dashboard-readiness-value"
              style={{
                fontSize: '42px',
                fontWeight: 700,
                lineHeight: '50px',
                color: '#17171B',
                letterSpacing: '-1px',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {`${readinessValue}%`}
            </div>

            <div
              style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {currentRole}
            </div>
          </div>

          {/* Card 2: Region (Figma node 44:269) */}
          <div
            id="metric-region"
            style={{
              height: '150px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '20px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: '16px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              REGION
            </div>

            <div
              id="dashboard-region-value"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#17171B',
                letterSpacing: '-0.3px',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {currentRegion}
            </div>

            <div
              style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Current target market
            </div>
          </div>

          {/* Card 3: Priority Gaps (Figma node 44:273) */}
          <div
            id="metric-gaps"
            style={{
              height: '150px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '20px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: '16px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              PRIORITY GAPS
            </div>

            <div
              id="dashboard-gaps-value"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#17171B',
                letterSpacing: '-0.3px',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              3 skills
            </div>

            <div
              style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#666670',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {gapsSummary}
            </div>
          </div>
        </div>

        {/* Row 2: Skill Gaps Panel (610px) + Next Action Panel (348px) */}
        <div
          className="dashboard-bottom-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '610px 1fr',
            gap: '30px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Skill Gaps Panel (Figma node 44:277) */}
          <div
            id="skill-gaps-panel"
            className="dashboard-panel-card"
            style={{
              height: '300px',
              borderRadius: '22px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '22px 24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Panel Title (Figma node 44:278) */}
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
              Your top skill gaps
            </div>

            {/* 3 Skill Gap Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {gaps.map((gap, index) => (
                <div
                  key={index}
                  id={`gap-row-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  {/* Skill Name */}
                  <span
                    style={{
                      width: '150px',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      color: '#17171B',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {gap.skill}
                  </span>

                  {/* Level Pill */}
                  <div
                    style={{
                      width: '76px',
                      height: '26px',
                      borderRadius: '99px',
                      backgroundColor: gap.levelColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '18px',
                        color: '#FFFFFF',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {gap.level}
                    </span>
                  </div>

                  {/* Progress Track & Fill (280px total track) */}
                  <div
                    className="dashboard-gap-track"
                    style={{
                      width: '280px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#EBE8F2',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: `${gap.progressPercent}%`,
                        height: '100%',
                        borderRadius: '4px',
                        backgroundColor: gap.levelColor,
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Action Panel (Figma node 44:293) */}
          <div
            id="next-action-panel"
            className="dashboard-panel-card"
            style={{
              height: '300px',
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
            <div>
              {/* Kicker (Figma node 44:295) */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                NEXT BEST ACTION
              </div>

              {/* Title (Figma node 44:296) */}
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '34px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.2px',
                  marginBottom: '10px',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {nextActionTitle}
              </div>

              {/* Body (Figma node 44:297) */}
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
                {nextActionBody}
              </p>
            </div>

            {/* View Roadmap Button (Figma node 44:298) */}
            <button
              type="button"
              id="btn-view-roadmap"
              onClick={handleRoadmapClick}
              disabled={isTransitioning}
              style={{
                width: '100%',
                height: '50px',
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
                {isTransitioning ? 'Loading Roadmap...' : 'View roadmap'}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
