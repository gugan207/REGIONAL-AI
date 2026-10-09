import React, { useState } from 'react';

export interface RoadmapStep {
  step: string;
  verb: 'LEARN' | 'PRACTICE' | 'BUILD' | 'PROVE';
  title: string;
  desc: string;
  status: 'DONE' | 'NEXT' | 'UP NEXT';
  statusColor: string;
  dotColor: string;
}

export interface YouTubeResource {
  id: string;
  title: string;
  level: string;
  duration: string;
  platform: string;
}

export interface RoadmapScreenProps {
  region?: string;
  targetRole?: string;
  selectedGapSkill?: string | null;
  onProceedToResume?: () => void;
  onBack?: () => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  region = 'Chennai',
  targetRole = 'Backend Developer',
  selectedGapSkill = 'Docker',
  onProceedToResume,
  onBack
}) => {
  const activeSkill = selectedGapSkill || 'Docker';
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Baseline 6-week learning path matching Figma Node 50:44
  const steps: RoadmapStep[] = [
    {
      step: '01',
      verb: 'LEARN',
      title: 'REST APIs',
      desc: 'Core request / response patterns',
      status: 'DONE',
      statusColor: '#78B99A', // Soft green matching Figma 50:52
      dotColor: '#78B99A'
    },
    {
      step: '02',
      verb: 'PRACTICE',
      title: activeSkill === 'REST APIs' ? 'REST APIs Advanced' : activeSkill,
      desc: activeSkill === 'AWS' ? 'Deploy a backend service' : 'Images, containers & Dockerfile',
      status: 'NEXT',
      statusColor: '#5B50E8', // Brand indigo matching Figma 50:59
      dotColor: '#5B50E8'
    },
    {
      step: '03',
      verb: 'BUILD',
      title: activeSkill === 'AWS' ? 'Docker' : 'AWS',
      desc: activeSkill === 'AWS' ? 'Images, containers & Dockerfile' : 'Deploy a backend service',
      status: 'UP NEXT',
      statusColor: '#8B7CF6', // Accent violet matching Figma 50:66
      dotColor: '#8B7CF6'
    },
    {
      step: '04',
      verb: 'PROVE',
      title: 'Backend Project',
      desc: 'Production-style API project',
      status: 'UP NEXT',
      statusColor: '#8B7CF6', // Accent violet matching Figma 50:73
      dotColor: '#8B7CF6'
    }
  ];

  // Deterministic YouTube resources matching Figma Nodes 50:80 and 50:90
  const getResourcesForSkill = (skill: string): YouTubeResource[] => {
    if (skill.toLowerCase().includes('aws')) {
      return [
        {
          id: 'aws-1',
          title: 'AWS cloud practitioner fundamentals',
          level: 'Beginner • Demo result',
          duration: '48 min',
          platform: 'YouTube'
        },
        {
          id: 'aws-2',
          title: 'AWS backend deployment guide',
          level: 'Intermediate • Demo result',
          duration: '35 min',
          platform: 'YouTube'
        }
      ];
    }
    if (skill.toLowerCase().includes('rest')) {
      return [
        {
          id: 'rest-1',
          title: 'RESTful API architecture & design',
          level: 'Beginner • Demo result',
          duration: '40 min',
          platform: 'YouTube'
        },
        {
          id: 'rest-2',
          title: 'Building scalable RESTful APIs',
          level: 'Intermediate • Demo result',
          duration: '28 min',
          platform: 'YouTube'
        }
      ];
    }
    // Default: Docker resources strictly matching Figma text tokens
    return [
      {
        id: 'docker-1',
        title: 'Docker fundamentals',
        level: 'Beginner • Demo result',
        duration: '42 min',
        platform: 'YouTube'
      },
      {
        id: 'docker-2',
        title: 'Docker for backend developers',
        level: 'Intermediate • Demo result',
        duration: '31 min',
        platform: 'YouTube'
      }
    ];
  };

  const [resources, setResources] = useState<YouTubeResource[]>(getResourcesForSkill(activeSkill));
  const [_resourceSource, setResourceSource] = useState<string>('curated');

  React.useEffect(() => {
    let isMounted = true;
    import('../services/apiClient').then(({ apiClient }) => {
      apiClient.searchYouTube(activeSkill, targetRole).then(res => {
        if (isMounted && res && res.data && res.data.videos && res.data.videos.length >= 2) {
          const mapped: YouTubeResource[] = res.data.videos.slice(0, 2).map((v, i) => ({
            id: v.id,
            title: v.title,
            level: v.level || (i === 0 ? 'Beginner • Live result' : 'Intermediate • Live result'),
            duration: v.duration || (i === 0 ? '42 min' : '31 min'),
            platform: 'YouTube'
          }));
          setResources(mapped);
          setResourceSource(res.meta.isFallback ? 'curated_fallback' : 'youtube_live');
        }
      }).catch(() => {});
    });
    return () => { isMounted = false; };
  }, [activeSkill, targetRole]);

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
      {/* Ambient Violet Glow Orbs (matching Figma 102:17 & 102:18) */}
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

      {/* Top Navigation Bar (Figma Node 44:490) */}
      <header
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
              id="btn-back-skill-gap"
              onClick={onBack}
              aria-label="Back to Skill Gap"
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
          ACTION ROADMAP
        </div>
      </header>

      {/* Main Content Container (988px width matching Figma layout) */}
      <main
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
        {/* Header Section (Figma Nodes 50:41, 50:42, 50:43) */}
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
            YOUR ACTION ROADMAP
          </div>
          <h1
            id="page-title"
            style={{
              fontSize: '38px',
              fontWeight: 700,
              lineHeight: '46px',
              letterSpacing: '-0.3px',
              color: '#17171B',
              margin: '0 0 8px 0'
            }}
          >
            From skill gap to job-ready proof.
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
            Every priority skill becomes a focused learning path with curated YouTube resources.
          </p>
        </div>

        {/* Two-Column Grid: Timeline (620px) + Resources (342px) -> Total 988px */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '620px 342px',
            gap: '26px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Roadmap Timeline (Figma Node 50:44 - 620 x 500px, r=22px) */}
          <section
            id="roadmap-timeline-panel"
            style={{
              width: '620px',
              height: '500px',
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px 22px 20px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Header */}
            <div>
              <h2
                id="timeline-title"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: '30px',
                  color: '#17171B',
                  margin: '0 0 4px 0'
                }}
              >
                Your 6-week learning path
              </h2>
              <div
                id="timeline-target-context"
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#666670',
                  marginBottom: '18px'
                }}
              >
                {`Target: ${targetRole} • ${region}`}
              </div>

              {/* 4 Steps List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {steps.map((st) => {
                  const isHovered = hoveredStep === st.step;
                  return (
                    <div
                      key={st.step}
                      id={`timeline-step-${st.step}`}
                      onMouseEnter={() => setHoveredStep(st.step)}
                      onMouseLeave={() => setHoveredStep(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '12px',
                        backgroundColor: isHovered ? '#F6F3FF' : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      {/* Left: Step Dot + Content */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Step Dot (26x26) */}
                        <div
                          id={`step-dot-${st.step}`}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: st.dotColor,
                            color: '#FFFFFF',
                            fontSize: '10px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {st.step}
                        </div>

                        {/* Step Info */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            id={`step-verb-${st.step}`}
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '1px',
                              color: '#5B50E8',
                              textTransform: 'uppercase'
                            }}
                          >
                            {st.verb}
                          </span>
                          <span
                            id={`step-title-${st.step}`}
                            style={{
                              fontSize: '16px',
                              fontWeight: 600,
                              lineHeight: '22px',
                              color: '#17171B'
                            }}
                          >
                            {st.title}
                          </span>
                          <span
                            id={`step-desc-${st.step}`}
                            style={{
                              fontSize: '13px',
                              fontWeight: 400,
                              lineHeight: '18px',
                              color: '#666670'
                            }}
                          >
                            {st.desc}
                          </span>
                        </div>
                      </div>

                      {/* Right: Status Pill (110x30px, r=15px) */}
                      <div
                        id={`step-status-${st.step}`}
                        style={{
                          width: '110px',
                          height: '30px',
                          borderRadius: '15px',
                          backgroundColor: st.statusColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
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
                          {st.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Principle Banner (Figma Node 50:74 - 576 x 36px, r=12px, bg #5B50E8) */}
            <div
              id="roadmap-principle-banner"
              style={{
                width: '100%',
                height: '36px',
                borderRadius: '12px',
                backgroundColor: '#5B50E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '12px'
              }}
            >
              <span
                id="roadmap-principle-text"
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: '#FFFFFF'
                }}
              >
                Learn → Practice → Build → Prove
              </span>
            </div>
          </section>

          {/* Right Column: Learning Resources (Figma Node 50:77 - 342 x 500px, r=22px) */}
          <section
            id="learning-resources-panel"
            style={{
              width: '342px',
              height: '500px',
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
              padding: '24px 22px 20px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Header */}
            <div>
              <h2
                id="resources-title"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: '30px',
                  color: '#17171B',
                  margin: '0 0 4px 0'
                }}
              >
                Recommended to learn
              </h2>
              <div
                id="resources-skill-context"
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#666670',
                  marginBottom: '16px'
                }}
              >
                {`Skill: ${activeSkill} • Curated via YouTube`}
              </div>

              {/* YouTube Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {resources.map((item, idx) => {
                  const isHovered = hoveredCard === item.id;
                  return (
                    <div
                      key={item.id}
                      id={`youtube-resource-${idx + 1}`}
                      onClick={() => setSelectedVideo(item.title)}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        width: '298px',
                        height: '138px',
                        borderRadius: '16px',
                        backgroundColor: '#FFFFFF',
                        border: isHovered ? '1px solid #5B50E8' : '1px solid #E0DEEB',
                        padding: '12px 14px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isHovered ? '0 8px 20px rgba(91, 80, 232, 0.12)' : 'none'
                      }}
                    >
                      {/* Video Thumbnail (108 x 74px, r=12px, bg #5B50E8 with play button) */}
                      <div
                        id={`thumbnail-${idx + 1}`}
                        style={{
                          width: '108px',
                          height: '74px',
                          borderRadius: '12px',
                          backgroundColor: '#5B50E8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        {/* White circle 30x30 */}
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {/* Play triangle */}
                          <div
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: '5px solid transparent',
                              borderBottom: '5px solid transparent',
                              borderLeft: '9px solid #5B50E8',
                              marginLeft: '2px'
                            }}
                          />
                        </div>
                      </div>

                      {/* Video Info */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          flex: 1
                        }}
                      >
                        <h3
                          id={`video-title-${idx + 1}`}
                          style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            lineHeight: '19px',
                            color: '#17171B',
                            margin: '0 0 6px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {item.title}
                        </h3>
                        <div
                          id={`video-meta-${idx + 1}`}
                          style={{
                            fontSize: '13px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: '#666670',
                            marginBottom: '10px'
                          }}
                        >
                          {item.level}
                        </div>

                        {/* Pills: Duration + Platform */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span
                            id={`video-duration-${idx + 1}`}
                            style={{
                              height: '26px',
                              padding: '0 10px',
                              borderRadius: '99px',
                              backgroundColor: '#8B7CF6',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {item.duration}
                          </span>
                          <span
                            id={`video-platform-${idx + 1}`}
                            style={{
                              height: '26px',
                              padding: '0 10px',
                              borderRadius: '99px',
                              backgroundColor: '#5B50E8',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {item.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resource Note (Figma Node 50:100 - 298 x 72px, r=14px, bg #8B7CF6) */}
            <div
              id="resource-note-banner"
              style={{
                width: '100%',
                minHeight: '72px',
                borderRadius: '14px',
                backgroundColor: '#8B7CF6',
                padding: '14px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <p
                id="resource-note-text"
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: '#17171B',
                  margin: 0
                }}
              >
                Demo resources shown here. Live YouTube search will populate these cards during implementation.
              </p>
            </div>
          </section>
        </div>

        {/* Optional demo video selection indicator or Step 10 transition CTA */}
        {selectedVideo && (
          <div
            id="selected-video-toast"
            style={{
              marginTop: '20px',
              padding: '12px 20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #5B50E8',
              fontSize: '14px',
              color: '#5B50E8',
              fontWeight: 500
            }}
          >
            ▶ Selected demo tutorial: <strong>{selectedVideo}</strong>
          </div>
        )}

        {onProceedToResume && (
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <button
              type="button"
              id="btn-proceed-resume"
              onClick={onProceedToResume}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: '#5B50E8',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(91, 80, 232, 0.25)'
              }}
            >
              Continue to Resume Builder →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
