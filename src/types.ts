export type GoalType = 'strength' | 'fat-loss' | 'athletic';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: string;
  targetGoal: GoalType;
  videoUrlPlaceholder?: string;
  defaultTips: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WorkoutDay {
  day: string;
  title: string;
  exercises: {
    name: string;
    target: string;
  }[];
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpNext: number;
  workoutsCompleted: number;
  streak: number;
  weightProgress: string;
  fitnessGoal: string;
  settings: {
    restTimerAlerts: boolean;
    videoTutorials: boolean;
    aiCoachReminders: boolean;
    weeklyCheckIn: boolean;
  };
}
