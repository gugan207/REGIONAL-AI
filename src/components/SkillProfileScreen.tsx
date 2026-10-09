import React, { useState, useRef } from 'react';

export interface ResumeFileInfo {
  name: string;
  size: number;
}

export interface SkillProfileData {
  selectedSkills: string[];
  resumeFile: ResumeFileInfo | null;
}

interface SkillProfileScreenProps {
  initialSkills?: string[];
  initialResume?: ResumeFileInfo | null;
  onBuildProfile?: (data: SkillProfileData) => void;
  onBack?: () => void;
}

export const FIGMA_SKILLS = [
  'Python',
  'Java',
  'SQL',
  'Git',
  'React',
  'Docker',
  'AWS',
  'Figma',
  'Excel',
  'Power BI'
] as const;

export const SkillProfileScreen: React.FC<SkillProfileScreenProps> = ({
  initialSkills = ['Python', 'SQL'],
  initialResume = null,
  onBuildProfile,
  onBack
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills);
  const [resumeFile, setResumeFile] = useState<ResumeFileInfo | null>(initialResume);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    setValidationAlert(null);
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  // Handle file selection (PDF or DOCX)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationAlert(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const validExtensions = ['.pdf', '.docx'];
      const fileNameLower = file.name.toLowerCase();
      const isValid = validExtensions.some((ext) => fileNameLower.endsWith(ext));

      if (!isValid) {
        setValidationAlert('Please select a valid PDF or DOCX resume file.');
        return;
      }

      setResumeFile({
        name: file.name,
        size: file.size
      });
      setSuccessFeedback(`Selected: ${file.name}`);
      setTimeout(() => setSuccessFeedback(null), 3000);
    }
    // Reset file input value so replacing with the same or another file always triggers onChange
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeFile(null);
    setValidationAlert(null);
  };

  // Build Profile interaction
  const handleBuildProfile = () => {
    if (selectedSkills.length === 0 && !resumeFile) {
      setValidationAlert('Please choose at least one skill or upload your resume to continue.');
      return;
    }

    setIsBuilding(true);
    setValidationAlert(null);

    setTimeout(() => {
      setIsBuilding(false);
      setSuccessFeedback('Profile successfully constructed!');
      if (onBuildProfile) {
        onBuildProfile({
          selectedSkills,
          resumeFile
        });
      }
    }, 600);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
      {/* Hidden file input supporting PDF and DOCX */}
      <input
        ref={fileInputRef}
        type="file"
        id="resume-file-input"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Ambient Violet Glow Accents (Figma nodes 44:164/102:7, 44:165/102:8) */}
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

      {/* Top Navigation Bar (Figma node 44:166) */}
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
        {/* Brand Group (Figma node 44:167) */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onBack}
          title="Back to Target Role"
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

        {/* Right Status (Figma node 44:171) */}
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
            STEP 3 OF 3
          </span>
        </div>
      </header>

      {/* Main Content Area: Skill Profile Card (Figma node 44:172) */}
      <main
        style={{
          width: '100%',
          maxWidth: '1000px',
          marginTop: '26px',
          marginBottom: '40px',
          padding: '0 20px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
            padding: '36px 44px 40px 44px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Step Kicker (Figma node 44:173) */}
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '16px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#5B50E8',
              marginBottom: '12px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            STEP 3 OF 3
          </div>

          {/* Title (Figma node 44:174) */}
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '44px',
              color: '#17171B',
              margin: '0 0 10px 0',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.5px'
            }}
          >
            What can you already do?
          </h1>

          {/* Subtitle (Figma node 44:175) */}
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
            Add a resume or select the skills you already have. We’ll use this to find your gaps.
          </p>

          {/* Validation Alert */}
          {validationAlert && (
            <div
              style={{
                backgroundColor: '#FFF0F2',
                border: '1px solid #FFCCD2',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#D92543',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠</span>
              <span>{validationAlert}</span>
            </div>
          )}

          {/* Success Feedback Banner */}
          {successFeedback && (
            <div
              style={{
                backgroundColor: '#F0FBF5',
                border: '1px solid #C3EED5',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#0E8345',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>✓</span>
              <span>{successFeedback}</span>
            </div>
          )}

          {/* Resume Upload Section (Figma node 44:176) */}
          <div
            id="resume-upload-box"
            style={{
              width: '100%',
              minHeight: '92px',
              borderRadius: '18px',
              backgroundColor: '#FFFFFF',
              border: resumeFile ? '1.5px solid #8C80FA' : '1px solid #B8B0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              boxSizing: 'border-box',
              marginBottom: '38px',
              transition: 'border 0.2s ease, box-shadow 0.2s ease',
              boxShadow: resumeFile ? '0 4px 16px rgba(91, 80, 232, 0.08)' : 'none'
            }}
          >
            {/* Left: Icon and Upload Title/Sub */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              {/* Ellipse with document upload icon (Figma node 44:177) */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#8B7CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>

              {/* Title & Sub */}
              <div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: '#17171B',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Upload your resume
                </div>
                <div
                  id="resume-status-text"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    color: resumeFile ? '#5B50E8' : '#666670',
                    fontFamily: "'Inter', sans-serif",
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {resumeFile ? (
                    <>
                      <span style={{ fontWeight: 600 }}>{resumeFile.name}</span>
                      <span style={{ fontSize: '13px', color: '#666670' }}>({formatFileSize(resumeFile.size)})</span>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#A6A3B8',
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: '0 4px',
                          textDecoration: 'underline'
                        }}
                        title="Remove resume"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    'PDF or DOCX • optional'
                  )}
                </div>
              </div>
            </div>

            {/* Right: Choose File Button (Figma node 44:180) */}
            <button
              type="button"
              id="btn-choose-file"
              onClick={handleChooseFileClick}
              style={{
                width: '148px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#5B50E8',
                border: 'none',
                boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, background-color 0.15s ease',
                flexShrink: 0
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
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {resumeFile ? 'Replace file' : 'Choose file'}
              </span>
            </button>
          </div>

          {/* Skill Selection Section Header (Figma node 44:182) */}
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '28px',
              color: '#17171B',
              marginBottom: '18px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Or choose your current skills
          </div>

          {/* Skills Grid: 5 columns x 2 rows (Figma nodes 44:183 to 44:212) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px',
              marginBottom: '38px',
              boxSizing: 'border-box'
            }}
          >
            {FIGMA_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <div
                  key={skill}
                  id={`skill-item-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                  data-skill={skill}
                  data-selected={isSelected ? 'true' : 'false'}
                  onClick={() => handleToggleSkill(skill)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleSkill(skill);
                    }
                  }}
                  style={{
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? '#F2F0FF' : '#FFFFFF',
                    border: isSelected ? '1.5px solid #8C80FA' : '1px solid #E0DEEB',
                    boxShadow: isSelected ? '0 4px 12px rgba(91, 80, 232, 0.12)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 14px',
                    gap: '12px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'border 0.15s ease, background-color 0.15s ease, transform 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#C3BDEC';
                      e.currentTarget.style.backgroundColor = '#FAF9FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#E0DEEB';
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  {/* Indicator circle (Figma node 44:184/187/etc.) */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#5B50E8' : '#F7F7FC',
                      border: isSelected ? 'none' : '1px solid #A6A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background-color 0.15s ease, border-color 0.15s ease'
                    }}
                  >
                    {isSelected && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.2L3.6 7L9 1"
                          stroke="#FFFFFF"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Skill Label (Figma node 44:185/188/etc.) */}
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: '20px',
                      color: isSelected ? '#17171B' : '#17171B',
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Row (Figma nodes 44:213, 44:214) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '6px',
              boxSizing: 'border-box'
            }}
          >
            {/* Note text (Figma node 44:213) */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                color: '#666670',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              You can update these details later.
            </span>

            {/* Build Profile Button (Figma node 44:214) */}
            <button
              type="button"
              id="btn-build-profile"
              onClick={handleBuildProfile}
              disabled={isBuilding}
              style={{
                width: '212px',
                height: '54px',
                borderRadius: '14px',
                backgroundColor: '#5B50E8',
                border: 'none',
                boxShadow: '0 12px 28px rgba(20, 13, 46, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isBuilding ? 'default' : 'pointer',
                opacity: isBuilding ? 0.85 : 1,
                transition: 'transform 0.15s ease, background-color 0.15s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isBuilding) {
                  e.currentTarget.style.backgroundColor = '#4F44DB';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isBuilding) {
                  e.currentTarget.style.backgroundColor = '#5B50E8';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {isBuilding ? 'Building profile...' : 'Build my profile'}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillProfileScreen;
