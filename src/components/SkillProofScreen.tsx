import React, { useState } from 'react';
import { ResumeFileInfo } from './SkillProfileScreen';

export interface ChecklistItem {
  id: string;
  label: string;
  verified: boolean;
}

export interface SkillProofScreenProps {
  region?: string;
  targetRole?: string;
  education?: string;
  year?: string;
  selectedSkills?: string[];
  resumeFile?: ResumeFileInfo | null;
  selectedGapSkill?: string | null;
  readinessScore?: number;
  onBack?: () => void;
  onComplete?: () => void;
}

export const SkillProofScreen: React.FC<SkillProofScreenProps> = ({
  region = 'Chennai',
  targetRole = 'Backend Developer',
  education = 'B.Tech / BE',
  year = 'Final year',
  selectedSkills = ['Python', 'SQL'],
  resumeFile = null,
  selectedGapSkill = 'Docker',
  readinessScore = 68,
  onBack,
  onComplete
}) => {
  const activeSkill = selectedGapSkill || 'Docker';

  // 5 Checklist items matching Figma Node 44:574 - 44:583 exactly
  // Default state: 2 checked ('Project completed', 'Demo available') matching Figma "2 / 5 verified"
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'item-1', label: 'Project completed', verified: true },
    { id: 'item-2', label: 'Demo available', verified: true },
    { id: 'item-3', label: 'README added', verified: false },
    { id: 'item-4', label: 'Portfolio linked', verified: false },
    { id: 'item-5', label: 'Skill demonstrated', verified: false }
  ]);

  const [projectStarted, setProjectStarted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const verifiedCount = checklist.filter((item) => item.verified).length;

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.verified;
          showToast(`Checklist updated: "${item.label}" marked ${nextState ? 'verified' : 'pending'}.`);
          return { ...item, verified: nextState };
        }
        return item;
      })
    );
  };

  const handleStartProject = () => {
    setProjectStarted(true);
    showToast(`Project workspace initialized for ${activeSkill}! Clone repository to begin verification.`);
  };

  const handleVerifiedBannerClick = () => {
    if (verifiedCount === 5) {
      showToast('All 5 proof requirements verified! Ready for review.');
      if (onComplete) onComplete();
    } else {
      showToast(`${verifiedCount} of 5 proof requirements verified. Complete remaining items to finalize.`);
    }
  };

  // Dynamic requirements and project details based on selected gap skill
  const getProjectDetails = (skill: string) => {
    switch (skill.toLowerCase()) {
      case 'docker':
        return {
          pill: 'DOCKER',
          title: 'Containerized REST API',
          desc: 'A production-style backend project packaged with Docker and documented for deployment.',
          reqs: [
            'Dockerfile',
            'Docker Compose',
            'REST API',
            'PostgreSQL',
            'README + setup',
            'Demo endpoint'
          ]
        };
      case 'aws':
        return {
          pill: 'AWS',
          title: 'Cloud Deployed Backend API',
          desc: 'A production-ready service deployed on AWS infrastructure with CI/CD and monitoring.',
          reqs: [
            'AWS ECS / Lambda',
            'CloudFormation / CDK',
            'REST API',
            'RDS PostgreSQL',
            'README + setup',
            'Live URL endpoint'
          ]
        };
      case 'sql':
      case 'postgresql':
        return {
          pill: 'POSTGRESQL',
          title: 'Relational Database Schema & API',
          desc: 'A high-performance normalized database architecture with indexing and migration workflows.',
          reqs: [
            'Schema DDL',
            'Database Migrations',
            'Indexed Queries',
            'Connection Pooling',
            'README + setup',
            'Benchmarked queries'
          ]
        };
      default:
        return {
          pill: skill.toUpperCase(),
          title: `${skill} Production Project`,
          desc: `A production-ready application demonstrating ${skill} mastery for employers in ${region}.`,
          reqs: [
            `${skill} implementation`,
            'Architecture tests',
            'REST API',
            'PostgreSQL',
            'README + setup',
            'Demo endpoint'
          ]
        };
    }
  };

  const projectInfo = getProjectDetails(activeSkill);

  return (
    <div
      id="skill-proof-screen"
      data-candidate-role={targetRole}
      data-candidate-region={region}
      data-candidate-education={`${education} • ${year}`}
      data-candidate-skills={selectedSkills.join(', ')}
      data-candidate-readiness={readinessScore}
      data-resume-attached={resumeFile ? 'true' : 'false'}
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
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="proof-toast"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#17171B',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Ambient Violet Glow Orbs (matching Figma Node 102:21 & 102:22) */}
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

      {/* Top Navigation Bar (Figma Node 44:542 - 1376 x 68px, r=34px) */}
      <header
        id="top-nav"
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
              id="btn-back-resume"
              onClick={onBack}
              aria-label="Back to Resume Builder"
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

        {/* Right Status Pill (Figma Node 44:547) */}
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
          SKILL PROOF
        </div>
      </header>

      {/* Main Content Container (matching Figma 988px 2-card layout) */}
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
        {/* Header Section (Figma Nodes 44:548, 44:549, 44:550) */}
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
            PROVE THE SKILL
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
            Turn learning into evidence.
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
            Build one project that demonstrates the skill employers care about.
          </p>
        </div>

        {/* Two Main Cards Grid: Project Card (610px) + Proof Checklist (346px), gap 32px */}
        <div
          className="skill-proof-main-grid"
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '610px 346px',
            gap: '32px',
            alignItems: 'start'
          }}
        >
          {/* Card 1: Project Card (Figma Node 44:551 - 610 x 470px, r=24px) */}
          <section
            id="project-card"
            className="skill-proof-card-item"
            style={{
              width: '610px',
              height: '470px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px 24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Skill Pill (Figma Node 44:552 & 44:553 - 90 x 30px, r=99px, bg #8B7CF6) */}
              <div
                id="skill-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '90px',
                  height: '30px',
                  padding: '0 14px',
                  borderRadius: '99px',
                  backgroundColor: '#8B7CF6',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                {projectInfo.pill}
              </div>

              {/* Title (Figma Node 44:554) */}
              <h2
                id="project-title"
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '34px',
                  color: '#17171B',
                  margin: '0 0 10px 0'
                }}
              >
                {projectInfo.title}
              </h2>

              {/* Description (Figma Node 44:555) */}
              <p
                id="project-desc"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#666670',
                  margin: '0 0 20px 0',
                  maxWidth: '520px'
                }}
              >
                {projectInfo.desc}
              </p>

              {/* WHAT TO PROVE Section Header (Figma Node 44:556) */}
              <div
                id="req-title"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#5B50E8',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                WHAT TO PROVE
              </div>

              {/* 6 Requirements List (Figma Nodes 44:557 - 44:568) */}
              <div
                id="requirements-list"
                className="skill-proof-req-list"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px 16px'
                }}
              >
                {projectInfo.reqs.map((req, idx) => (
                  <div
                    key={idx}
                    id={`req-item-${idx + 1}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {/* Ellipse bullet (8x8px, bg #78B99A) */}
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#78B99A',
                        flexShrink: 0
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#17171B'
                      }}
                    >
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Project Button (Figma Node 44:569 - 210 x 48px, r=14px, bg #5B50E8) */}
            <button
              type="button"
              id="btn-start-project"
              onClick={handleStartProject}
              onMouseEnter={() => setHoveredButton('start')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                width: '210px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: hoveredButton === 'start' ? '#4F44DF' : '#5B50E8',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
                transition: 'all 0.15s ease'
              }}
            >
              {projectStarted ? 'Project in progress' : 'Start project'}
            </button>
          </section>

          {/* Card 2: Proof Checklist (Figma Node 44:571 - 346 x 470px, r=24px) */}
          <section
            id="proof-checklist-card"
            className="skill-proof-card-item"
            style={{
              width: '346px',
              height: '470px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px 24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Title (Figma Node 44:572) */}
              <h2
                id="checklist-title"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: '30px',
                  color: '#17171B',
                  margin: '0 0 6px 0'
                }}
              >
                Proof checklist
              </h2>

              {/* Subtitle (Figma Node 44:573) */}
              <p
                id="checklist-sub"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#666670',
                  margin: '0 0 24px 0'
                }}
              >
                Evidence becomes part of your skill profile.
              </p>

              {/* 5 Checklist Items (Figma Nodes 44:574 - 44:583) */}
              <div
                id="checklist-items-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {checklist.map((item, idx) => (
                  <div
                    key={item.id}
                    id={`check-item-${idx + 1}`}
                    onClick={() => toggleChecklist(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {/* Circle Indicator (Figma Node 44:574/576/578/580/582 - 20x20px) */}
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: item.verified ? '#78B99A' : '#FFFFFF',
                        border: item.verified ? '1px solid #78B99A' : '1px solid #B2B0C4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {item.verified ? '✓' : ''}
                    </div>

                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#17171B'
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Status Banner (Figma Node 44:584 - 298 x 48px, r=14px, bg #8B7CF6) */}
            <div
              id="verified-status-banner"
              onClick={handleVerifiedBannerClick}
              style={{
                width: '298px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#8B7CF6',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'opacity 0.15s ease'
              }}
            >
              <span
                id="verified-status-text"
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#17171B'
                }}
              >
                {`${verifiedCount} / 5 verified`}
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
