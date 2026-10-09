import React, { useState, useEffect, useCallback } from 'react';
import { isEmbeddableYouTubeId } from '../services/apiClient';

export interface RoadmapStep {
  step: string;
  verb: 'LEARN' | 'PRACTICE' | 'BUILD' | 'PROVE';
  title: string;
  desc: string;
  status: 'DONE' | 'NEXT' | 'UP NEXT';
  statusColor: string;
  dotColor: string;
}

/** Retains the actual video information returned by the YouTube API / curated fallback. */
export interface YouTubeResource {
  id: string;
  /** 11-char YouTube video ID when a real video is known; empty string means search-only. */
  videoId: string;
  title: string;
  channelTitle: string;
  /** Genuine i.ytimg.com thumbnail URL; empty when no real video is known. */
  thumbnailUrl: string;
  /** Real watch URL or a genuine YouTube search URL. */
  videoUrl: string;
  duration: string;
  level: string;
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
  const [selectedVideo, setSelectedVideo] = useState<YouTubeResource | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [resourcesLoading, setResourcesLoading] = useState(true);

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

  // Deterministic curated fallback matching Figma Nodes 50:80 and 50:90.
  // Every videoId is a real, publicly known YouTube video — never fabricated.
  const getResourcesForSkill = (skill: string): YouTubeResource[] => {
    if (skill.toLowerCase().includes('aws')) {
      return [
        {
          id: 'ulprqHHWlng',
          videoId: 'ulprqHHWlng',
          title: 'AWS cloud practitioner fundamentals',
          channelTitle: 'freeCodeCamp.org',
          thumbnailUrl: 'https://i.ytimg.com/vi/ulprqHHWlng/hqdefault.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=ulprqHHWlng',
          level: 'Beginner • Demo result',
          duration: '48 min'
        },
        {
          id: 'k1RI5locZE4',
          videoId: 'k1RI5locZE4',
          title: 'AWS backend deployment guide',
          channelTitle: 'TechWorld with Nana',
          thumbnailUrl: 'https://i.ytimg.com/vi/k1RI5locZE4/hqdefault.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=k1RI5locZE4',
          level: 'Intermediate • Demo result',
          duration: '35 min'
        }
      ];
    }
    if (skill.toLowerCase().includes('rest')) {
      return [
        {
          id: '-MTSQjw5DrM',
          videoId: '-MTSQjw5DrM',
          title: 'RESTful API architecture & design',
          channelTitle: 'Amigoscode',
          thumbnailUrl: 'https://i.ytimg.com/vi/-MTSQjw5DrM/hqdefault.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=-MTSQjw5DrM',
          level: 'Beginner • Demo result',
          duration: '40 min'
        },
        {
          id: '7Q17ubqLfaM',
          videoId: '7Q17ubqLfaM',
          title: 'API authentication with JWT & OAuth',
          channelTitle: 'Hussein Nasser',
          thumbnailUrl: 'https://i.ytimg.com/vi/7Q17ubqLfaM/hqdefault.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=7Q17ubqLfaM',
          level: 'Intermediate • Demo result',
          duration: '32 min'
        }
      ];
    }
    // Default: Docker resources strictly matching Figma text tokens
    return [
      {
        id: 'pTFZFxd4hOI',
        videoId: 'pTFZFxd4hOI',
        title: 'Docker fundamentals',
        channelTitle: 'Programming with Mosh',
        thumbnailUrl: 'https://i.ytimg.com/vi/pTFZFxd4hOI/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
        level: 'Beginner • Demo result',
        duration: '42 min'
      },
      {
        id: '3c-iBn73dDE',
        videoId: '3c-iBn73dDE',
        title: 'Docker for backend developers',
        channelTitle: 'TechWorld with Nana',
        thumbnailUrl: 'https://i.ytimg.com/vi/3c-iBn73dDE/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        level: 'Intermediate • Demo result',
        duration: '31 min'
      }
    ];
  };

  const [resources, setResources] = useState<YouTubeResource[]>(getResourcesForSkill(activeSkill));
  const [_resourceSource, setResourceSource] = useState<string>('curated');

  const loadResources = useCallback((skill: string) => {
    let isMounted = true;
    setResourcesLoading(true);
    import('../services/apiClient')
      .then(({ apiClient }) =>
        apiClient.searchYouTube(skill, targetRole).then(res => {
          if (!isMounted) return;
          if (res && res.ok !== false && res.data && Array.isArray(res.data.videos) && res.data.videos.length > 0) {
            const mapped: YouTubeResource[] = res.data.videos.slice(0, 2).map((v: any, i: number) => ({
              id: v.id || v.videoId || `fallback-${i}`,
              videoId: isEmbeddableYouTubeId(v.videoId) ? v.videoId : '',
              title: v.title || `${skill} tutorial`,
              channelTitle: v.channelTitle || 'YouTube',
              thumbnailUrl: typeof v.thumbnailUrl === 'string' ? v.thumbnailUrl : '',
              videoUrl: v.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} tutorial`)}`,
              level: v.level || (i === 0 ? 'Beginner • Live result' : 'Intermediate • Live result'),
              duration: v.duration || (i === 0 ? '42 min' : '31 min')
            }));
            if (mapped.length > 0) {
              setResources(mapped);
              setResourceSource(res.meta.isFallback ? 'curated_fallback' : 'youtube_live');
            }
          }
        })
      )
      .catch(err => {
        console.warn('[RoadmapScreen] Learning-resource fetch failed, keeping curated fallback:',
          err instanceof Error ? err.message : err);
      })
      .finally(() => {
        if (isMounted) setResourcesLoading(false);
      });
    return () => { isMounted = false; };
  }, [targetRole]);

  React.useEffect(() => {
    const cancel = loadResources(activeSkill);
    return cancel;
  }, [activeSkill, loadResources]);

  // Escape closes the video player modal
  useEffect(() => {
    if (!selectedVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedVideo]);

  const openVideo = (item: YouTubeResource) => {
    // Only open a real embed when a validated video ID exists.
    if (isEmbeddableYouTubeId(item.videoId)) {
      setSelectedVideo(item);
    } else {
      // No real video known — open the genuine YouTube search URL in a new tab.
      window.open(item.videoUrl || 'https://www.youtube.com/results?search_query=tutorial', '_blank', 'noopener,noreferrer') as unknown as void;
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
          className="roadmap-content-grid"
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
            className="roadmap-panel-item"
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
            className="roadmap-panel-item"
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  opacity: resourcesLoading ? 0.75 : 1,
                  transition: 'opacity 0.2s ease'
                }}
                aria-busy={resourcesLoading || undefined}
              >
                {resources.length === 0 && !resourcesLoading && (
                  <div style={{ fontSize: '13px', color: '#666670', padding: '8px 4px' }}>
                    No learning resources found for this skill yet.
                  </div>
                )}
                {resources.map((item, idx) => {
                  const isHovered = hoveredCard === item.id;
                  return (
                    <div
                      key={item.id}
                      id={`youtube-resource-${idx + 1}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => openVideo(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openVideo(item);
                        }
                      }}
                      aria-label={`Play video ${item.title}${item.channelTitle ? ` by ${item.channelTitle}` : ''}`}
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
                      {/* Video Thumbnail (108 x 74px, r=12px) — actual API thumbnail */}
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
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Actual thumbnail image when a real video is known */}
                        {item.thumbnailUrl && isEmbeddableYouTubeId(item.videoId) ? (
                          <img
                            id={`thumbnail-img-${idx + 1}`}
                            src={item.thumbnailUrl}
                            alt={`Video thumbnail for ${item.title}`}
                            loading="lazy"
                            style={{
                              width: '108px',
                              height: '74px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : null}
                        {/* White play circle overlay (30x30, Figma Node 50:86) */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
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
                          {item.channelTitle && item.channelTitle !== 'YouTube Search'
                            ? `${item.channelTitle} • ${item.level}`
                            : item.level}
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
                            {'YouTube'}
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
                Click a card to play its tutorial. Live YouTube results appear when the API is available.
              </p>
            </div>
          </section>
        </div>

        {/* Inline Video Player Modal — real YouTube embed for validated video IDs */}
        {selectedVideo && (
          <div
            id="video-player-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Video player: ${selectedVideo.title}`}
            onClick={() => setSelectedVideo(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(23, 23, 27, 0.72)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '24px',
              boxSizing: 'border-box'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(860px, 100%)',
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '18px',
                boxSizing: 'border-box',
                boxShadow: '0 24px 60px rgba(20, 13, 46, 0.35)'
              }}
            >
              {/* Player header: title + channel + close control */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '12px'
                }}
              >
                <div>
                  <div
                    id="video-modal-title"
                    style={{ fontSize: '15px', fontWeight: 600, color: '#17171B', lineHeight: '20px' }}
                  >
                    {selectedVideo.title}
                  </div>
                  <div
                    id="video-modal-channel"
                    style={{ fontSize: '13px', color: '#666670', marginTop: '2px' }}
                  >
                    {selectedVideo.channelTitle}
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-close-video-player"
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close video player"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid #E0DEEB',
                    backgroundColor: '#FFFFFF',
                    color: '#17171B',
                    fontSize: '15px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Working YouTube embed from validated 11-char video ID */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#17171B'
                }}
              >
                <iframe
                  id="video-embed-frame"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              </div>

              {/* Accessible link to the original YouTube video (new tab, noopener) */}
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#666670' }}>
                  Playing from YouTube — press Escape or click outside to close.
                </span>
                <a
                  id="video-modal-open-youtube"
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#5B50E8',
                    textDecoration: 'none'
                  }}
                >
                  Open on YouTube ↗
                </a>
              </div>
            </div>
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
