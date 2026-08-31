import React, { useState, useEffect } from 'react';
import { StudentSession, TeacherUser, QuizResult } from './types';
import { TOPIC_MATERIALS } from './data/materialsData';
import { 
  getSavedStudentSession, 
  saveStudentSession, 
  clearStudentSession,
  getTeacherUser,
  clearTeacherAuth
} from './services/api';
import { Navbar } from './components/Navbar';
import { WelcomePage } from './pages/WelcomePage';
import { StudentDashboard } from './pages/StudentDashboard';
import { MaterialDetailPage } from './pages/MaterialDetailPage';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { TeacherLoginPage } from './pages/TeacherLoginPage';
import { TeacherDashboard } from './pages/TeacherDashboard';

export default function App() {
  const [studentSession, setStudentSession] = useState<StudentSession | null>(() => getSavedStudentSession());
  const [teacherUser, setTeacherUser] = useState<TeacherUser | null>(() => getTeacherUser());
  const [currentView, setCurrentView] = useState<string>(() => {
    const saved = getSavedStudentSession();
    return saved ? 'student-dashboard' : 'welcome';
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>(TOPIC_MATERIALS[0].id);
  const [activeQuizResult, setActiveQuizResult] = useState<QuizResult | null>(null);

  // Sync state if session changes
  useEffect(() => {
    const saved = getSavedStudentSession();
    if (saved && currentView === 'welcome') {
      setStudentSession(saved);
      setCurrentView('student-dashboard');
    }
  }, []);

  const handleStartLearning = (name: string, studentClass: string) => {
    const session = saveStudentSession(name, studentClass);
    setStudentSession(session);
    setCurrentView('student-dashboard');
  };

  const handleStudentLogout = () => {
    clearStudentSession();
    setStudentSession(null);
    setCurrentView('welcome');
  };

  const handleTeacherLogout = () => {
    clearTeacherAuth();
    setTeacherUser(null);
    setCurrentView('welcome');
  };

  const handleSelectTopic = (topicId: string, action: 'material' | 'quiz' | 'practice' = 'material') => {
    setSelectedTopicId(topicId);
    if (action === 'material') {
      setCurrentView('material-detail');
    } else if (action === 'quiz') {
      setCurrentView('quiz');
    } else if (action === 'practice') {
      setCurrentView('practice');
    }
  };

  const handleQuizFinished = (result: QuizResult) => {
    setActiveQuizResult(result);
    setCurrentView('quiz-result');
  };

  const currentTopic = TOPIC_MATERIALS.find(t => t.id === selectedTopicId) || TOPIC_MATERIALS[0];

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#2B2D42] flex flex-col selection:bg-[#7D8F69] selection:text-white">
      {/* Universal Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view, topicId) => {
          if (topicId) setSelectedTopicId(topicId);
          setCurrentView(view);
        }}
        studentSession={studentSession}
        onStudentLogout={handleStudentLogout}
        teacherUser={teacherUser}
        onTeacherLogout={handleTeacherLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: WELCOME / STUDENT IDENTITY FORM */}
        {currentView === 'welcome' && (
          <WelcomePage
            onStartLearning={handleStartLearning}
            onNavigateToTeacher={() => {
              if (teacherUser) {
                setCurrentView('teacher-dashboard');
              } else {
                setCurrentView('teacher-login');
              }
            }}
          />
        )}

        {/* VIEW 2: STUDENT DASHBOARD */}
        {currentView === 'student-dashboard' && studentSession && (
          <StudentDashboard
            studentSession={studentSession}
            onSelectTopic={handleSelectTopic}
            onSwitchStudent={handleStudentLogout}
          />
        )}

        {/* VIEW 3: MATERIAL DETAIL */}
        {currentView === 'material-detail' && (
          <MaterialDetailPage
            topic={currentTopic}
            onBack={() => setCurrentView('student-dashboard')}
            onGoToQuiz={(topicId) => {
              setSelectedTopicId(topicId);
              setCurrentView('quiz');
            }}
            onGoToPractice={(topicId) => {
              setSelectedTopicId(topicId);
              setCurrentView('practice');
            }}
          />
        )}

        {/* VIEW 4: PRACTICE PAGE */}
        {currentView === 'practice' && studentSession && (
          <PracticePage
            topic={currentTopic}
            studentSession={studentSession}
            onBackToMaterial={() => setCurrentView('material-detail')}
            onGoToQuiz={(topicId) => {
              setSelectedTopicId(topicId);
              setCurrentView('quiz');
            }}
            onBackToDashboard={() => setCurrentView('student-dashboard')}
          />
        )}

        {/* VIEW 5: QUIZ PAGE */}
        {currentView === 'quiz' && studentSession && (
          <QuizPage
            topic={currentTopic}
            studentSession={studentSession}
            onBackToMaterial={() => setCurrentView('material-detail')}
            onQuizFinished={handleQuizFinished}
          />
        )}

        {/* VIEW 6: QUIZ RESULT & REVIEW */}
        {currentView === 'quiz-result' && activeQuizResult && studentSession && (
          <QuizResultPage
            result={activeQuizResult}
            topic={currentTopic}
            studentSession={studentSession}
            onRetakeQuiz={(topicId) => {
              setSelectedTopicId(topicId);
              setCurrentView('quiz');
            }}
            onGoToPractice={(topicId) => {
              setSelectedTopicId(topicId);
              setCurrentView('practice');
            }}
            onBackToDashboard={() => setCurrentView('student-dashboard')}
          />
        )}

        {/* VIEW 7: TEACHER LOGIN */}
        {currentView === 'teacher-login' && (
          <TeacherLoginPage
            onLoginSuccess={(user) => {
              setTeacherUser(user);
              setCurrentView('teacher-dashboard');
            }}
            onBackToStudent={() => {
              if (studentSession) {
                setCurrentView('student-dashboard');
              } else {
                setCurrentView('welcome');
              }
            }}
          />
        )}

        {/* VIEW 8: TEACHER DASHBOARD */}
        {currentView === 'teacher-dashboard' && teacherUser && (
          <TeacherDashboard
            teacherUser={teacherUser}
            onLogout={handleTeacherLogout}
            onGoToStudentMode={() => {
              if (studentSession) {
                setCurrentView('student-dashboard');
              } else {
                setCurrentView('welcome');
              }
            }}
          />
        )}
      </main>
    </div>
  );
}
