import React, { useState, useEffect } from 'react';
import { DecorativeRings } from './components/DecorativeRings';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AuthCard } from './components/AuthCard';
import { OnboardingScreen } from './components/OnboardingScreen';
import { TargetRoleScreen } from './components/TargetRoleScreen';
import { SkillProfileScreen, ResumeFileInfo, SkillProfileData } from './components/SkillProfileScreen';
import { RegionalSignalScreen, RegionalSignalData } from './components/RegionalSignalScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { SkillIntelligenceScreen } from './components/SkillIntelligenceScreen';
import { SkillGapScreen } from './components/SkillGapScreen';
import { RoadmapScreen } from './components/RoadmapScreen';
import { ResumeBuilderScreen } from './components/ResumeBuilderScreen';
import { SkillProofScreen } from './components/SkillProofScreen';
import { SystemQAScreen } from './components/SystemQAScreen';


type Screen =
  | 'login'
  | 'onboarding'
  | 'target-role'
  | 'skill-profile'
  | 'regional-signal'
  | 'dashboard'
  | 'skill-intelligence'
  | 'skill-gap'
  | 'roadmap'
  | 'resume-builder'
  | 'skill-proof'
  | 'system-qa'
  | 'step13-boundary-gate';

interface UserProfileState {
  education: string;
  year: string;
  region: string;
  targetRole: string;
  selectedSkills: string[];
  resumeFile: ResumeFileInfo | null;
  signalData: RegionalSignalData | null;
  selectedGapSkill: string | null;
}


export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [profileData, setProfileData] = useState<UserProfileState>({
    education: 'B.Tech / BE',
    year: 'Final year',
    region: 'Chennai',
    targetRole: 'Backend Developer',
    selectedSkills: ['Python', 'SQL'],
    resumeFile: null,
    signalData: null,
    selectedGapSkill: 'Docker'
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with URL hash if provided
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#onboarding') {
        setCurrentScreen('onboarding');
      } else if (hash === '#target-role') {
        setCurrentScreen('target-role');
      } else if (hash === '#skill-profile') {
        setCurrentScreen('skill-profile');
      } else if (hash === '#regional-signal') {
        setCurrentScreen('regional-signal');
      } else if (hash === '#dashboard') {
        setCurrentScreen('dashboard');
      } else if (hash === '#skill-intelligence') {
        setCurrentScreen('skill-intelligence');
      } else if (hash === '#skill-gap') {
        setCurrentScreen('skill-gap');
      } else if (hash === '#roadmap') {
        setCurrentScreen('roadmap');
      } else if (hash === '#resume-builder') {
        setCurrentScreen('resume-builder');
      } else if (hash === '#skill-proof') {
        setCurrentScreen('skill-proof');
      } else if (hash === '#system-qa') {
        setCurrentScreen('system-qa');
      } else if (hash === '#step13-boundary-gate') {
        setCurrentScreen('step13-boundary-gate');
      } else if (hash === '#login') {
        setCurrentScreen('login');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    const hash =
      screen === 'onboarding'
        ? '#onboarding'
        : screen === 'target-role'
        ? '#target-role'
        : screen === 'skill-profile'
        ? '#skill-profile'
        : screen === 'regional-signal'
        ? '#regional-signal'
        : screen === 'dashboard'
        ? '#dashboard'
        : screen === 'skill-intelligence'
        ? '#skill-intelligence'
        : screen === 'skill-gap'
        ? '#skill-gap'
        : screen === 'roadmap'
        ? '#roadmap'
        : screen === 'resume-builder'
        ? '#resume-builder'
        : screen === 'skill-proof'
        ? '#skill-proof'
        : screen === 'system-qa'
        ? '#system-qa'
        : screen === 'step13-boundary-gate'
        ? '#step13-boundary-gate'
        : screen === 'login'
        ? '#login'
        : '#next';
    window.location.hash = hash;
  };

  // Step 13 boundary gate: Strict boundary - Step 13 and Step 14 not implemented
  if (currentScreen === 'step13-boundary-gate') {
    return (
      <div
        id="step13-boundary-gate"
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F6F3FF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E0DEEB',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 18px 40px rgba(15, 10, 51, 0.12)'
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
              margin: '0 auto 20px auto',
              fontWeight: 700,
              fontSize: '20px'
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#17171B', marginBottom: '12px' }}>
            Step 12 — System &amp; QA Passed &amp; Verified!
          </h2>
          <div
            style={{
              backgroundColor: '#F6F3FF',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left',
              fontSize: '14px',
              color: '#17171B',
              lineHeight: '24px'
            }}
          >
            <div><strong>Education:</strong> {profileData.education}</div>
            <div><strong>Current Year:</strong> {profileData.year}</div>
            <div><strong>Preferred Region:</strong> {profileData.region}</div>
            <div><strong>Target Role:</strong> {profileData.targetRole}</div>
            <div>
              <strong>Selected Skills ({profileData.selectedSkills.length}):</strong>{' '}
              <span style={{ color: '#5B50E8', fontWeight: 600 }}>
                {profileData.selectedSkills.join(', ')}
              </span>
            </div>
            <div>
              <strong>Target Proven Skill:</strong>{' '}
              <span style={{ color: '#5B50E8', fontWeight: 700, fontSize: '15px' }}>
                {profileData.selectedGapSkill || 'Docker'}
              </span>
            </div>
            <div>
              <strong>Resume Source:</strong>{' '}
              {profileData.resumeFile ? (
                <span style={{ color: '#0E8345', fontWeight: 600 }}>
                  {profileData.resumeFile.name} ({(profileData.resumeFile.size / 1024).toFixed(1)} KB)
                </span>
              ) : (
                <span style={{ color: '#666670', fontStyle: 'italic' }}>Standard Candidate Context</span>
              )}
            </div>
            <div style={{ marginTop: '8px', borderTop: '1px solid #E0DEEB', paddingTop: '8px' }}>
              <strong>Regional Readiness:</strong>{' '}
              <span style={{ color: '#5B50E8', fontWeight: 700 }}>
                {profileData.signalData ? `${profileData.signalData.readinessPercentage}%` : '68%'}
              </span>
            </div>
            <div>
              <strong>System QA Status:</strong> Ready for Development (11 screens verified, checklist 7/7, notes 5/5)
            </div>
          </div>
          <p style={{ fontSize: '15px', color: '#666670', lineHeight: '22px', marginBottom: '28px' }}>
            All candidate parameters and prototype QA specifications preserved.
            <br />
            <strong style={{ color: '#5B50E8' }}>STRICT BOUNDARY:</strong> Step 13 and Step 14 are NOT implemented per project requirements.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              type="button"
              id="btn-back-to-system-qa"
              onClick={() => navigateTo('system-qa')}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1px solid #E0DEEB',
                backgroundColor: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                color: '#17171B',
                cursor: 'pointer'
              }}
            >
              Back to System &amp; QA
            </button>
            <button
              type="button"
              id="btn-return-to-dashboard"
              onClick={() => navigateTo('dashboard')}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#5B50E8',
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 12: System & QA Screen
  if (currentScreen === 'system-qa') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <SystemQAScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          selectedGapSkill={profileData.selectedGapSkill}
          readinessScore={profileData.signalData?.readinessPercentage || 68}
          onBack={() => navigateTo('skill-proof')}
          onComplete={() => {
            showToast('Step 12 System & QA verified!');
            navigateTo('step13-boundary-gate');
          }}
          onNavigateToScreen={(target) => navigateTo(target as Screen)}
        />
      </div>
    );
  }

  // Render Step 11: Skill Proof Screen
  if (currentScreen === 'skill-proof') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <SkillProofScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          selectedGapSkill={profileData.selectedGapSkill}
          readinessScore={profileData.signalData?.readinessPercentage || 68}
          onBack={() => navigateTo('resume-builder')}
          onComplete={() => {
            showToast('All proof criteria verified! Proceeding to System & QA...');
            navigateTo('system-qa');
          }}
        />
      </div>
    );
  }

  // Render Step 10: Resume Builder Screen
  if (currentScreen === 'resume-builder') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <ResumeBuilderScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          selectedGapSkill={profileData.selectedGapSkill}
          onFileChange={(file) => {
            setProfileData((prev) => ({ ...prev, resumeFile: file }));
            showToast(`Resume file set: ${file.name}`);
          }}
          onProceedToSkillProof={() => {
            showToast('Proceeding to Skill Proof...');
            navigateTo('skill-proof');
          }}
          onBack={() => navigateTo('roadmap')}
        />
      </div>
    );
  }

  // Render Step 9: Roadmap Screen
  if (currentScreen === 'roadmap') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <RoadmapScreen
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedGapSkill={profileData.selectedGapSkill}
          onProceedToResume={() => {
            showToast('Opening Resume Builder...');
            navigateTo('resume-builder');
          }}
          onBack={() => navigateTo('skill-gap')}
        />
      </div>
    );
  }

  // Render Step 8: Skill Gap Screen
  if (currentScreen === 'skill-gap') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <SkillGapScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          onBuildSkill={(skillName) => {
            setProfileData((prev) => ({
              ...prev,
              selectedGapSkill: skillName
            }));
            showToast(`Targeting ${skillName}! Loading action roadmap...`);
            navigateTo('roadmap');
          }}
          onBack={() => navigateTo('skill-intelligence')}
        />
      </div>
    );
  }

  // Render Step 7: Skill Intelligence Screen
  if (currentScreen === 'skill-intelligence') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <SkillIntelligenceScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          signalData={profileData.signalData}
          onViewSkillGap={() => {
            showToast('Opening skill gap analysis...');
            navigateTo('skill-gap');
          }}
          onBack={() => navigateTo('dashboard')}
        />
      </div>
    );
  }

  // Render Step 6: Dashboard Screen
  if (currentScreen === 'dashboard') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <DashboardScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          signalData={profileData.signalData}
          onViewRoadmap={() => {
            showToast('Opening skill intelligence...');
            navigateTo('skill-intelligence');
          }}
          onBack={() => navigateTo('regional-signal')}
        />
      </div>
    );
  }

  // Render Step 5: Regional Signal Screen
  if (currentScreen === 'regional-signal') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <RegionalSignalScreen
          education={profileData.education}
          year={profileData.year}
          region={profileData.region}
          targetRole={profileData.targetRole}
          selectedSkills={profileData.selectedSkills}
          resumeFile={profileData.resumeFile}
          onContinue={(sigData: RegionalSignalData) => {
            setProfileData((prev) => ({
              ...prev,
              signalData: sigData
            }));
            showToast('Signal action registered! Opening dashboard...');
            navigateTo('dashboard');
          }}
          onBack={() => navigateTo('skill-profile')}
        />
      </div>
    );
  }

  // Render Step 4: Skill Profile Screen
  if (currentScreen === 'skill-profile') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <SkillProfileScreen
          initialSkills={profileData.selectedSkills}
          initialResume={profileData.resumeFile}
          onBuildProfile={(data: SkillProfileData) => {
            setProfileData((prev) => ({
              ...prev,
              selectedSkills: data.selectedSkills,
              resumeFile: data.resumeFile
            }));
            showToast('Profile constructed! Ready for Regional Signal.');
            navigateTo('regional-signal');
          }}
          onBack={() => navigateTo('target-role')}
        />
      </div>
    );
  }

  // Render Step 3: Target Role Screen
  if (currentScreen === 'target-role') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <TargetRoleScreen
          initialRole={profileData.targetRole}
          onContinue={(role) => {
            setProfileData((prev) => ({ ...prev, targetRole: role }));
            showToast(`Role selected: ${role}!`);
            navigateTo('skill-profile');
          }}
          onBack={() => navigateTo('onboarding')}
        />
      </div>
    );
  }

  // Render Step 2: Onboarding Screen
  if (currentScreen === 'onboarding') {
    return (
      <div>
        {toastMessage && (
          <div
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

        <OnboardingScreen
          onContinue={(data) => {
            setProfileData((prev) => ({
              ...prev,
              education: data.education,
              year: data.year,
              region: data.region
            }));
            showToast('Onboarding saved! Proceeding to Target Role...');
            navigateTo('target-role');
          }}
          onSaveAndExit={() => {
            showToast('Progress saved locally. Exiting to Login.');
            navigateTo('login');
          }}
        />
      </div>
    );
  }

  // Render Step 1: Login Screen (Default)
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#5B50E8',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden'
      }}
    >
      {toastMessage && (
        <div
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

      {/* Decorative ambient background rings and depth gradient */}
      <DecorativeRings />

      {/* Floating Navbar */}
      <div style={{ width: '100%', padding: '0 24px', boxSizing: 'border-box', zIndex: 10 }}>
        <Navbar
          onSignInClick={() => {}}
          onSignUpClick={() => navigateTo('onboarding')}
        />
      </div>

      {/* Main Content Area (1440 layout canvas) */}
      <main
        className="app-main-layout"
        style={{
          width: '100%',
          maxWidth: '1344px',
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '48px 24px 64px 24px',
          boxSizing: 'border-box',
          gap: '48px',
          zIndex: 1,
          flexWrap: 'wrap'
        }}
      >
        {/* Left Hero Column */}
        <div className="hero-section-col">
          <HeroSection />
        </div>

        {/* Right Auth Column */}
        <div
          className="auth-card-col"
          style={{
            flex: '1 1 480px',
            maxWidth: '584px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <AuthCard
            onSuccess={() => {
              showToast('Sign in verified! Directing to Onboarding...');
              setTimeout(() => navigateTo('onboarding'), 800);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
