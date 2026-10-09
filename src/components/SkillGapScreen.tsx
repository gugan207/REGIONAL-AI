import React, { useState } from 'react';

export interface SkillGapItem {
  id: string;
  name: string;
  priority: 'High priority' | 'Improve';
  priorityColor: string;
  marketDemand: string;
  nextAction: string;
}

export interface SkillGapScreenProps {
  region?: string;
  targetRole?: string;
  education?: string;
  year?: string;
  selectedSkills?: string[];
  onBuildSkill?: (skillName: string) => void;
  onBack?: () => void;
}

export const SkillGapScreen: React.FC<SkillGapScreenProps> = ({
  region = 'Chennai',
  targetRole = 'Backend Developer',
  education: _education = 'B.Tech / BE',
  year: _year = 'Final year',
  selectedSkills: _selectedSkills = ['Python', 'SQL'],
  onBuildSkill,
  onBack
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Deterministic gap baseline matching Figma frame 44:357
  const defaultGaps: SkillGapItem[] = [
    {
      id: 'docker',
      name: 'Docker',
      priority: 'High priority',
      priorityColor: '#F06B55', // Coral red
      marketDemand: '82% market demand',
      nextAction: 'Build containerized API'
    },
    {
      id: 'aws',
      name: 'AWS',
      priority: 'High priority',
      priorityColor: '#F06B55', // Coral red
      marketDemand: '57% market demand',
      nextAction: 'Deploy backend service'
    },
    {
      id: 'rest-apis',
      name: 'REST APIs',
      priority: 'Improve',
      priorityColor: '#E2B65B', // Warm amber / gold
      marketDemand: '78% market demand',
      nextAction: 'Build + document API'
    }
  ];

  // Derive dynamic gaps if alternate role is selected (e.g. Data Analyst)
  const getGapsForRole = (): SkillGapItem[] => {
    if (targetRole.toLowerCase().includes('data analyst')) {
      return [
        {
          id: 'power-bi',
          name: 'Power BI',
          priority: 'High priority',
          priorityColor: '#F06B55',
          marketDemand: '88% market demand',
          nextAction: 'Build interactive dashboards'
        },
        {
          id: 'tableau',
          name: 'Tableau',
          priority: 'High priority',
          priorityColor: '#F06B55',
          marketDemand: '74% market demand',
          nextAction: 'Publish executive reports'
        },
        {
          id: 'sql',
          name: 'Advanced SQL',
          priority: 'Improve',
          priorityColor: '#E2B65B',
          marketDemand: '92% market demand',
          nextAction: 'Complex joins & window functions'
        }
      ];
    }
    return defaultGaps;
  };

  const gaps = getGapsForRole();

  const handleAction = (skillName: string) => {
    if (onBuildSkill) {
      onBuildSkill(skillName);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F6F3FF',
        overflowX: 'hidden',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 32px 48px 32px',
        boxSizing: 'border-box'
      }}
    >
      {/* Ambient Violet Glow Orbs (matching Figma 102:15 & 102:16) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-80px',
          right: '-60px',
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
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '-40px',
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

      {/* Top Navigation Bar (Figma Node 44:359) */}
      <header
        className="screen-header-bar"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1376px',
          height: '68px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.60)',
          borderRadius: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
          boxShadow: '0 12px 28px rgba(20, 13, 46, 0.10)',
          marginBottom: '36px'
        }}
      >
        {/* Brand Left */}
        <div
          id="nav-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {onBack && (
            <button
              type="button"
              id="btn-back-skill-intelligence"
              onClick={onBack}
              aria-label="Back to Skill Intelligence"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid #E0DEEB',
                backgroundColor: '#FFFFFF',
                color: '#666670',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginRight: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              ←
            </button>
          )}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#5B50E8',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            R
          </div>
          <span
            style={{
              fontWeight: 600,
              fontSize: '17px',
              color: '#17171B',
              letterSpacing: '-0.2px'
            }}
          >
            REGIONAL - AI
          </span>
        </div>

        {/* Right Status Pill */}
        <div
          id="nav-status-pill"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#17171B',
            padding: '6px 14px',
            borderRadius: '99px',
            backgroundColor: '#F6F3FF',
            border: '1px solid #E0DEEB'
          }}
        >
          SKILL GAP
        </div>
      </header>

      {/* Main Content Container (988px width matching Figma layout) */}
      <main
        className="screen-main-card-box"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '988px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        {/* Header Section (Figma Nodes 44:365, 44:366, 44:367) */}
        <div style={{ marginBottom: '28px', textAlign: 'left' }}>
          <div
            id="kicker"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              color: '#5B50E8',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            YOUR SKILL GAP
          </div>
          <h1
            id="page-title"
            className="responsive-screen-title"
            style={{
              fontSize: '38px',
              fontWeight: 700,
              lineHeight: '46px',
              letterSpacing: '-0.3px',
              color: '#17171B',
              margin: '0 0 8px 0'
            }}
          >
            What are you missing?
          </h1>
          <p
            id="page-subtitle"
            style={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              color: '#666670',
              margin: 0
            }}
          >
            Compared with your target role and regional demand.
          </p>
        </div>

        {/* Gap Summary Panel (Figma Node 44:368 - 988 x 116px, r=22px) */}
        <section
          id="gap-summary-panel"
          className="skill-gap-summary-panel"
          style={{
            width: '100%',
            height: '116px',
            backgroundColor: '#FFFFFF',
            borderRadius: '22px',
            boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
            padding: '24px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}
        >
          {/* Left: Role & Region */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              id="gap-summary-role"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '24px',
                color: '#17171B'
              }}
            >
              {targetRole}
            </div>
            <div
              id="gap-summary-region"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#666670'
              }}
            >
              {region}
            </div>
          </div>

          {/* Right: Signal Badge (Figma Node 44:371 - 190 x 34px, r=99px, bg #8B7CF6) */}
          <div
            id="gap-summary-signal-badge"
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
              id="gap-summary-signal-label"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '18px',
                color: '#17171B'
              }}
            >
              3 priority gaps
            </span>
          </div>
        </section>

        {/* Three Skill Gap Cards Row (Figma 44:372, 44:381, 44:389) */}
        <div
          id="skill-gap-cards-grid"
          className="skill-gap-cards-container"
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 316px)',
            gap: '20px',
            marginBottom: '28px'
          }}
        >
          {gaps.map((gap) => {
            const isHovered = hoveredCard === gap.id;
            const isBtnHovered = hoveredBtn === gap.id;

            return (
              <div
                key={gap.id}
                id={`gap-card-${gap.id}`}
                className="skill-gap-card-item"
                onMouseEnter={() => setHoveredCard(gap.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  width: '316px',
                  height: '292px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  boxShadow: isHovered
                    ? '0 18px 36px rgba(20, 13, 46, 0.16)'
                    : '0 12px 28px rgba(20, 13, 46, 0.12)',
                  padding: '22px 22px 20px 22px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'none'
                }}
              >
                {/* Top Section: Priority Badge & Skill Name */}
                <div>
                  {/* Priority Badge (112 x 28px, r=99px) */}
                  <div
                    id={`priority-badge-${gap.id}`}
                    style={{
                      width: '112px',
                      height: '28px',
                      borderRadius: '99px',
                      backgroundColor: gap.priorityColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '18px',
                        color: '#FFFFFF'
                      }}
                    >
                      {gap.priority}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h2
                    id={`skill-name-${gap.id}`}
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      lineHeight: '32px',
                      color: '#17171B',
                      margin: '0 0 14px 0'
                    }}
                  >
                    {gap.name}
                  </h2>

                  {/* Market Demand */}
                  <div
                    id={`market-demand-${gap.id}`}
                    style={{
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#666670',
                      marginBottom: '10px'
                    }}
                  >
                    {gap.marketDemand}
                  </div>

                  {/* Next Step Guidance */}
                  <div
                    id={`next-action-${gap.id}`}
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '22px',
                      color: '#17171B'
                    }}
                  >
                    {gap.nextAction}
                  </div>
                </div>

                {/* Bottom Action: Build this skill button (272 x 46px, r=13px, bg #5B50E8) */}
                <button
                  type="button"
                  id={`btn-build-skill-${gap.id}`}
                  onClick={() => handleAction(gap.name)}
                  onMouseEnter={() => setHoveredBtn(gap.id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    width: '272px',
                    height: '46px',
                    borderRadius: '13px',
                    backgroundColor: isBtnHovered ? '#4F44DF' : '#5B50E8',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease, transform 0.1s ease',
                    boxShadow: '0 4px 12px rgba(91, 80, 232, 0.25)'
                  }}
                >
                  Build this skill
                </button>
              </div>
            );
          })}
        </div>

        {/* Explainability Section (Figma Node 44:397 - 988 x 70px, r=18px, bg #8B7CF6) */}
        <section
          id="explainability-panel"
          style={{
            width: '100%',
            minHeight: '70px',
            backgroundColor: '#8B7CF6',
            borderRadius: '18px',
            padding: '20px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <p
            id="explainability-text"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              color: '#FFFFFF',
              margin: 0
            }}
          >
            Every priority is explained by evidence: regional demand + target-role relevance + your current skill profile.
          </p>
        </section>
      </main>
    </div>
  );
};
