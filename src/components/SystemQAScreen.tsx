import React, { useState } from 'react';
import { ResumeFileInfo } from './SkillProfileScreen';

export interface SystemQAScreenProps {
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
  onNavigateToScreen?: (screen: string) => void;
}

export const SystemQAScreen: React.FC<SystemQAScreenProps> = ({
  region = 'Chennai',
  targetRole = 'Backend Developer',
  education = 'B.Tech / BE',
  year = 'Final year',
  selectedSkills = ['Python', 'SQL'],
  resumeFile = null,
  selectedGapSkill = 'Docker',
  readinessScore = 68,
  onBack,
  onComplete,
  onNavigateToScreen
}) => {
  // Checklist items corresponding exactly to Figma Node 44:614 - 44:628
  const [checklist, setChecklist] = useState([
    { id: 'check-1', text: 'REGIONAL - AI naming is consistent', checked: true },
    { id: 'check-2', text: 'Purple / white system is consistent', checked: true },
    { id: 'check-3', text: 'Shared typography scale used', checked: true },
    { id: 'check-4', text: 'No broken placeholder controls', checked: true },
    { id: 'check-5', text: 'One primary purple CTA pattern', checked: true },
    { id: 'check-6', text: 'Roadmap includes learning-resource cards', checked: true },
    { id: 'check-7', text: 'Every screen has a clear next action', checked: true }
  ]);

  const [activeStepInspection, setActiveStepInspection] = useState<string | null>(null);
  const [showBoundaryModal, setShowBoundaryModal] = useState<boolean>(false);
  const [_backendStatus, setBackendStatus] = useState<string>('Operational (Fallback-First Ready)');

  React.useEffect(() => {
    let isMounted = true;
    import('../services/apiClient').then(({ apiClient }) => {
      apiClient.getHealth().then(res => {
        if (isMounted && res && res.data) {
          setBackendStatus(`Live Connected (v${res.data.version})`);
        }
      }).catch(() => {});
    });
    return () => { isMounted = false; };
  }, []);

  // Exact 11 flow steps from Figma Node 44:592 - 44:612, 50:174
  const flowSteps = [
    { id: 'login', name: 'Login', width: 66, bg: '#8B7CF6', screen: 'login' },
    { id: 'onboarding', name: 'Onboarding', width: 78, bg: '#8B7CF6', screen: 'onboarding' },
    { id: 'target-role', name: 'Target Role', width: 88, bg: '#8B7CF6', screen: 'target-role' },
    { id: 'skills', name: 'Skills', width: 60, bg: '#8B7CF6', screen: 'skill-profile' },
    { id: 'regional-signal', name: 'Regional Signal', width: 92, bg: '#8B7CF6', screen: 'regional-signal' },
    { id: 'dashboard', name: 'Dashboard', width: 78, bg: '#5B50E8', screen: 'dashboard' }, // Figma Node 44:603 fill #5b50e8
    { id: 'skill-intelligence', name: 'Skill Intelligence', width: 98, bg: '#8B7CF6', screen: 'skill-intelligence' },
    { id: 'skill-gap', name: 'Skill Gap', width: 74, bg: '#8B7CF6', screen: 'skill-gap' },
    { id: 'roadmap', name: 'Roadmap', width: 68, bg: '#8B7CF6', screen: 'roadmap' },
    { id: 'resume-builder', name: 'Resume Builder', width: 102, bg: '#8B7CF6', screen: 'resume-builder' },
    { id: 'skill-proof', name: 'Skill Proof', width: 80, bg: '#8C80FA', screen: 'skill-proof' } // Figma Node 50:174 fill #8c80fa
  ];

  // Exact 5 implementation notes from Figma Node 44:630 - 44:635
  const implementationNotes = [
    '• Replace demo demand values with approved dummy backend data.',
    '• Connect roadmap resources to the YouTube search endpoint.',
    '• Connect resume generation to the NVIDIA LLM backend.',
    '• Keep confidence, freshness and source labels visible.',
    '• Preserve Figma layer names during implementation.'
  ];

  const toggleCheck = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleStepClick = (stepScreen: string, stepName: string) => {
    setActiveStepInspection(stepName);
    if (onNavigateToScreen) {
      onNavigateToScreen(stepScreen);
    }
  };

  const handleStatusBadgeClick = () => {
    if (onComplete) {
      onComplete();
    } else {
      setShowBoundaryModal(true);
    }
  };

  return (
    <div
      id="prototype-system-qa-desktop-1440"
      data-testid="system-qa-screen"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F6F3FF',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        fontFamily: "'Inter', sans-serif",
        padding: '24px 32px 48px 32px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Figma Node 102:23 & 44:588: Ambient / Violet Glow / Top Right (420 x 420, #8B7CF6, blur 28px) */}
      <div
        id="ambient-glow-top-right"
        style={{
          position: 'absolute',
          top: '-160px',
          right: '-60px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          backgroundColor: '#8B7CF6',
          filter: 'blur(28px)',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Figma Node 102:24: Ambient / Violet Glow / Bottom Left (250 x 250, #FFFFFF, blur 28px) */}
      <div
        id="ambient-glow-bottom-left"
        style={{
          position: 'absolute',
          top: '680px',
          left: '-85px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          filter: 'blur(28px)',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Navigation Bar (Design System: 1376 x 68px, r=34px) */}
      <header
        id="top-nav"
        className="screen-header-bar"
        style={{
          position: 'relative',
          zIndex: 2,
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
          marginBottom: '20px'
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
              id="btn-back-skill-proof"
              onClick={onBack}
              aria-label="Back to Skill Proof"
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
                transition: 'all 0.15s ease',
                outline: 'none',
                padding: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F6F3FF';
                e.currentTarget.style.borderColor = '#5B50E8';
                e.currentTarget.style.color = '#5B50E8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E0DEEB';
                e.currentTarget.style.color = '#666670';
              }}
            >
              ←
            </button>
          )}

          <div
            id="nav-logo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#5B50E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(91, 80, 232, 0.25)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <span
              id="brand-name"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: '#17171B',
                letterSpacing: '-0.3px',
                display: 'block',
                lineHeight: '20px'
              }}
            >
              REGIONAL - AI
            </span>
            <span
              id="nav-step-label"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '11px',
                color: '#5B50E8',
                letterSpacing: '0.4px',
                textTransform: 'uppercase'
              }}
            >
              STEP 12 • SYSTEM & QA
            </span>
          </div>
        </div>

        {/* Candidate Context Breadcrumbs */}
        <div
          id="nav-candidate-meta"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div
            id="badge-candidate-role"
            style={{
              height: '28px',
              padding: '0 12px',
              borderRadius: '14px',
              backgroundColor: '#F6F3FF',
              color: '#5B50E8',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #E0DEEB'
            }}
          >
            🎯 {targetRole}
          </div>

          <div
            id="badge-candidate-region"
            style={{
              height: '28px',
              padding: '0 12px',
              borderRadius: '14px',
              backgroundColor: '#F6F3FF',
              color: '#5B50E8',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #E0DEEB'
            }}
          >
            📍 {region}
          </div>

          <div
            id="badge-candidate-readiness"
            style={{
              height: '28px',
              padding: '0 12px',
              borderRadius: '14px',
              backgroundColor: '#EEFBF4',
              color: '#0E8345',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #C4ECD4'
            }}
          >
            ✓ Proven: {selectedGapSkill || 'Docker'} ({readinessScore}%)
          </div>

          <div
            id="badge-system-qa-status"
            style={{
              height: '28px',
              padding: '0 12px',
              borderRadius: '14px',
              backgroundColor: '#5B50E8',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '0.5px'
            }}
          >
            QA PASSED
          </div>
        </div>
      </header>

      {/* Main Content Area (Matching Figma 1440 layout with 72px left coordinate) */}
      <main
        className="screen-main-card-box"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1296px',
          boxSizing: 'border-box',
          padding: '0 24px'
        }}
      >
        {/* Figma Node 44:589: Kicker */}
        <div
          id="kicker"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '1.2px',
            color: '#5B50E8',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}
        >
          REGIONAL - AI PROTOTYPE QA
        </div>

        {/* Figma Node 44:590: Title */}
        <h1
          id="title"
          className="responsive-screen-title"
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '38px',
            lineHeight: '46px',
            letterSpacing: '-0.3px',
            color: '#17171B',
            marginBottom: '8px'
          }}
        >
          Prototype flow & verification
        </h1>

        {/* Figma Node 44:591: Sub */}
        <p
          id="sub"
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0px',
            color: '#666670',
            maxWidth: '900px',
            marginBottom: '26px'
          }}
        >
          Team reference for design consistency, screen order, API-driven features, learning resources and dummy-data handling.
        </p>

        {/* Figma Node 44:592: Prototype Flow (w: 988, h: 122, r: 22, bg: #FFFFFF, border: 1px solid #E0DEEB) */}
        <section
          id="prototype-flow"
          className="qa-prototype-flow-box"
          aria-label="Prototype Flow"
          style={{
            width: '988px',
            maxWidth: '100%',
            height: '122px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0DEEB',
            borderRadius: '22px',
            padding: '20px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 4px 16px rgba(20, 13, 46, 0.04)'
          }}
        >
          {/* Label inside flow card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#5B50E8',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}
            >
              PROTOTYPE SCREEN ORDER (11 SCREENS VERIFIED)
            </span>
            <span
              id="active-step-inspection-indicator"
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: activeStepInspection ? '#5B50E8' : '#666670'
              }}
            >
              {activeStepInspection
                ? `Inspecting: ${activeStepInspection} • Context: ${targetRole} (${education}, ${year}, ${region}) • Skills: ${selectedSkills.join(', ')}${resumeFile ? ` • Resume: ${resumeFile.name}` : ''}`
                : 'Click any step to inspect or review screen'}
            </span>
          </div>

          {/* 11 Flow Step Pills matching Figma geometry & fills */}
          <div
            id="flow-steps-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              overflowX: 'auto',
              paddingBottom: '2px'
            }}
          >
            {flowSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                id={`flow-step-${step.id}`}
                onClick={() => handleStepClick(step.screen, step.name)}
                title={`Inspect Step: ${step.name}`}
                style={{
                  width: `${step.width}px`,
                  minWidth: `${step.width}px`,
                  height: '42px',
                  backgroundColor: step.bg,
                  borderRadius: '99px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '11px',
                  lineHeight: '18px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(91, 80, 232, 0.20)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 14px rgba(91, 80, 232, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(91, 80, 232, 0.20)';
                }}
              >
                {step.name}
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Section: Design Audit & Implementation Notes side-by-side */}
        <div
          className="qa-bottom-flex-box"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '26px', // In Figma: 568 - (72 + 470) = 26px
            width: '988px',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Figma Node 44:613: Design Audit Card (470 x 350, r: 22, #FFFFFF, shadow: 0 12px 28px rgba(20, 13, 46, 0.12)) */}
          <section
            id="design-audit"
            className="qa-audit-card-box"
            aria-label="Verification checklist"
            style={{
              width: '470px',
              height: '350px',
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              padding: '22px 24px',
              boxSizing: 'border-box',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Figma Node 44:614: Title */}
            <h2
              id="verification-checklist-title"
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                lineHeight: '30px',
                color: '#17171B',
                marginBottom: '18px'
              }}
            >
              Verification checklist
            </h2>

            {/* 7 Checklist items matching Figma Node 44:615 - 44:628 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {checklist.map((item, index) => (
                <div
                  key={item.id}
                  id={`checklist-item-${index + 1}`}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  {/* Figma Ellipse: 16 x 16, fill #78B99A */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      borderRadius: '50%',
                      backgroundColor: item.checked ? '#78B99A' : '#E0DEEB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    {item.checked && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Figma Check text: 13px, weight 500, color #17171B, lh: 20px */}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '13px',
                      lineHeight: '20px',
                      color: '#17171B'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Figma Node 44:629: Implementation Notes Card (492 x 350, r: 22, #5B50E8, shadow: 0 12px 28px rgba(20, 13, 46, 0.12)) */}
          <section
            id="implementation-notes"
            className="qa-notes-card-box"
            aria-label="Before frontend build"
            style={{
              width: '492px',
              height: '350px',
              backgroundColor: '#5B50E8',
              borderRadius: '22px',
              padding: '22px 24px',
              boxSizing: 'border-box',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#FFFFFF'
            }}
          >
            <div>
              {/* Figma Node 44:630: Title */}
              <h2
                id="implementation-notes-title"
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '22px',
                  lineHeight: '30px',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Before frontend build
              </h2>

              {/* 5 Implementation Notes matching Figma Node 44:631 - 44:635 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {implementationNotes.map((note, index) => (
                  <p
                    key={index}
                    id={`implementation-note-${index + 1}`}
                    style={{
                      margin: 0,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '24px',
                      color: '#FFFFFF'
                    }}
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>

            {/* Figma Node 44:636 & 44:637: Status Badge / Button (202 x 32, r: 99, bg: #FFFFFF, text: #5B50E8) */}
            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                id="status-badge"
                onClick={handleStatusBadgeClick}
                title="Review System Status & Complete Step 12"
                style={{
                  width: '202px',
                  height: '32px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '99px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#5B50E8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.20)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
                }}
              >
                READY FOR DEVELOPMENT
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Step 13 Boundary Modal (Triggered if complete is clicked without full page redirection) */}
      {showBoundaryModal && (
        <div
          id="step13-boundary-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(20, 13, 46, 0.50)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 24px 48px rgba(20, 13, 46, 0.20)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#78B99A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 16px auto'
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#17171B',
                marginBottom: '8px'
              }}
            >
              Step 12 — System &amp; QA Passed
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#666670',
                lineHeight: '22px',
                marginBottom: '20px'
              }}
            >
              All 11 prototype screens, verification checklists, and implementation specifications have been validated against Figma.
              <br />
              <strong style={{ color: '#5B50E8' }}>STRICT BOUNDARY:</strong> Steps 13 &amp; 14 are not implemented per project specifications.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowBoundaryModal(false)}
                style={{
                  height: '40px',
                  padding: '0 20px',
                  borderRadius: '20px',
                  border: '1px solid #E0DEEB',
                  backgroundColor: '#FFFFFF',
                  color: '#17171B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Return to QA Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
