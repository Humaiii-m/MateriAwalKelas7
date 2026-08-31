export interface StudentSession {
  name: string;
  studentClass: string;
  startedAt: string;
}

export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MaterialSection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  contentPoints: string[];
  keyHighlight?: string;
  exampleCase?: {
    title: string;
    scenario: string;
    takeaway: string;
  };
}

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  steps: string[];
  type?: 'checklist' | 'interactive_sort' | 'password_tester' | 'search_sim';
}

export interface TopicMaterial {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  color: string;
  bannerColor: string;
  badge: string;
  estimatedTime: string;
  objectives: string[];
  sections: MaterialSection[];
  practiceTasks: PracticeTask[];
  questions: QuizQuestion[];
}

export interface QuizAnswerDetail {
  questionId: string;
  questionText: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  selectedText: string;
  correctText: string;
}

export interface QuizResult {
  id: string;
  studentName: string;
  class: string;
  topicId: string;
  topicName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
  answersDetail?: QuizAnswerDetail[];
}

export interface TeacherUser {
  id: string;
  username: string;
  displayName: string;
  role: 'teacher';
}

export interface TeacherAuthResponse {
  token: string;
  user: TeacherUser;
}

export interface TeacherStats {
  totalStudents: number;
  totalQuizzesTaken: number;
  averageScore: number;
  passingRate: number;
}
