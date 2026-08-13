import { create } from 'zustand';

// Types
export type Hairstyle = {
  id: string;
  name: string;
  category: string;
  duration: string;
  difficulty: string;
  hasTutorial: boolean;
  matchScore?: string;
};

export type ScheduleSlot = {
  id: string;
  type: 'CURRENT' | 'NEXT' | 'UPCOMING';
  style: Hairstyle;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'completed';
};

interface AppState {
  // Onboarding profile
  userProfile: Record<string, string>;
  setProfileAnswer: (questionId: string, answer: string) => void;
  
  // Schedule
  schedule: ScheduleSlot[];
  completeCurrentStyle: () => void;
  replaceNextStyle: (newStyle: Hairstyle) => void;
}

// Initial Mock Data
const MOCK_CURRENT: ScheduleSlot = {
  id: 's1',
  type: 'CURRENT',
  status: 'active',
  style: { id: '1', name: 'Box Braids', category: 'Braids', duration: '2-4 weeks', difficulty: 'Moderate', hasTutorial: true },
  startDate: 'Aug 10',
  endDate: 'Aug 24'
};

const MOCK_NEXT: ScheduleSlot = {
  id: 's2',
  type: 'NEXT',
  status: 'planned',
  style: { id: '2', name: 'Natural Twist-out', category: 'Natural', duration: '3-7 days', difficulty: 'Easy', hasTutorial: true },
  startDate: 'Aug 25',
  endDate: 'Aug 30'
};

const MOCK_UPCOMING: ScheduleSlot = {
  id: 's3',
  type: 'UPCOMING',
  status: 'planned',
  style: { id: '3', name: 'Cornrows', category: 'Braids', duration: '1-2 weeks', difficulty: 'Advanced', hasTutorial: false },
  startDate: 'Aug 31',
  endDate: 'Sep 14'
};

export const useAppStore = create<AppState>((set) => ({
  userProfile: {},
  
  setProfileAnswer: (questionId, answer) => set((state) => ({
    userProfile: { ...state.userProfile, [questionId]: answer }
  })),

  schedule: [MOCK_CURRENT, MOCK_NEXT, MOCK_UPCOMING],

  // Mark current as complete, shift next to current, upcoming to next, generate new upcoming
  completeCurrentStyle: () => set((state) => {
    const nextToCurrent = { ...state.schedule[1], type: 'CURRENT' as const, status: 'active' as const, startDate: 'Today' };
    const upcomingToNext = { ...state.schedule[2], type: 'NEXT' as const };
    
    // Generate a new mock upcoming style
    const newUpcoming: ScheduleSlot = {
      id: `s${Date.now()}`,
      type: 'UPCOMING',
      status: 'planned',
      style: { id: '4', name: 'Bantu Knots', category: 'Natural', duration: '3-5 days', difficulty: 'Moderate', hasTutorial: true },
      startDate: 'TBD',
      endDate: 'TBD'
    };

    return { schedule: [nextToCurrent, upcomingToNext, newUpcoming] };
  }),

  // Replace the NEXT slot with a new style chosen from alternatives
  replaceNextStyle: (newStyle: Hairstyle) => set((state) => {
    const updatedSchedule = [...state.schedule];
    updatedSchedule[1] = {
      ...updatedSchedule[1],
      style: newStyle
    };
    return { schedule: updatedSchedule };
  })
}));
