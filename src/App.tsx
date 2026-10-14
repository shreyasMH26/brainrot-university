import { useState, useEffect, useCallback } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useStudentProgress } from './hooks/useStudentProgress';

// Lazy-loaded pages
import Home from './pages/Home';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import ExaminationHall from './pages/ExaminationHall';
import StudentPortal from './pages/StudentPortal';
import HallOfFame from './pages/HallOfFame';
import Faculty from './pages/Faculty';
import SecretDimension from './pages/SecretDimension';
import AchievementToast from './components/AchievementToast';

// Konami code sequence
const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

function App() {
  const {
    profile,
    isLoaded,
    recentAchievements,
    createProfile,
    resetProfile,
    enrollCourse,
    submitExamResult,
    incrementCrestClick,
    activateKonami,
    unlockSecretCourse,
    clearRecentAchievements,
    updateName,
  } = useStudentProgress();

  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [showKonamiEffect, setShowKonamiEffect] = useState(false);

  // Track crest clicks
  const handleCrestClick = useCallback(() => {
    if (!profile) return;
    incrementCrestClick();
    if ((profile.crestClickCount + 1) >= 7) {
      setSecretUnlocked(true);
    }
  }, [profile, incrementCrestClick]);

  // Konami code detection
  useEffect(() => {
    let buffer: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.join(',') === KONAMI.join(',')) {
        activateKonami();
        setShowKonamiEffect(true);
        setTimeout(() => setShowKonamiEffect(false), 3000);
        buffer = [];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activateKonami]);

  // Sync secret unlocked state from profile
  useEffect(() => {
    if (profile?.crestClickCount && profile.crestClickCount >= 7) {
      setSecretUnlocked(true);
    }
  }, [profile]);

  const handleUnlockSecret = useCallback(() => {
    unlockSecretCourse();
  }, [unlockSecretCourse]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <div className="text-[#C6FF00] text-xl font-mono animate-pulse">
          Loading academic records...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans">
        {/* Konami effect overlay */}
        {showKonamiEffect && (
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <div className="absolute inset-0 bg-[#C6FF00] opacity-10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C6FF00] text-4xl font-bold text-center">
              <div className="text-6xl mb-4">🕹️</div>
              <div>BRAINROT ACTIVATED</div>
              <div className="text-lg mt-2 text-white">Achievement Unlocked: Chronically Online Since Birth</div>
            </div>
          </div>
        )}

        <Navbar
          onCrestClick={handleCrestClick}
          profile={profile}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home profile={profile} />}
            />
            <Route
              path="/departments"
              element={<Departments />}
            />
            <Route
              path="/departments/:deptId"
              element={
                <DepartmentDetail
                  profile={profile}
                  onEnroll={enrollCourse}
                />
              }
            />
            <Route
              path="/courses"
              element={
                <Courses
                  profile={profile}
                  onEnroll={enrollCourse}
                />
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <CourseDetail
                  profile={profile}
                  onEnroll={enrollCourse}
                />
              }
            />
            <Route
              path="/examination-hall"
              element={
                <ExaminationHall
                  profile={profile}
                  onSubmitResult={submitExamResult}
                />
              }
            />
            <Route
              path="/examination-hall/:courseId"
              element={
                <ExaminationHall
                  profile={profile}
                  onSubmitResult={submitExamResult}
                />
              }
            />
            <Route
              path="/exam/:courseId"
              element={
                <ExaminationHall
                  profile={profile}
                  onSubmitResult={submitExamResult}
                />
              }
            />
            <Route
              path="/portal"
              element={
                <StudentPortal
                  profile={profile}
                  onCreateProfile={createProfile}
                  onResetProfile={resetProfile}
                  onUpdateName={updateName}
                />
              }
            />
            <Route
              path="/hall-of-fame"
              element={<HallOfFame profile={profile} />}
            />
            <Route
              path="/faculty"
              element={<Faculty />}
            />
            <Route
              path="/secret"
              element={
                secretUnlocked ? (
                  <SecretDimension
                    profile={profile}
                    onUnlockSecret={handleUnlockSecret}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Achievement toast notifications */}
        {recentAchievements.length > 0 && (
          <AchievementToast
            achievementIds={recentAchievements}
            onDismiss={clearRecentAchievements}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
