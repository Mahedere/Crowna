import { create } from 'zustand';
import { HairstyleData, MOCK_HAIRSTYLES } from './mockHairstyles';

export type ScheduleSlot = {
  id: string;
  type: 'CURRENT' | 'NEXT' | 'UPCOMING';
  style: HairstyleData;
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
  replaceNextStyle: (newStyle: HairstyleData) => void;
}

// Initial Mock Data
const MOCK_CURRENT: ScheduleSlot = {
  id: 's1',
  type: 'CURRENT',
  status: 'active',
  style: MOCK_HAIRSTYLES[0], // Knotless Box Braids
  startDate: 'Aug 10',
  endDate: 'Aug 24'
};

const MOCK_NEXT: ScheduleSlot = {
  id: 's2',
  type: 'NEXT',
  status: 'planned',
  style: { ...MOCK_HAIRSTYLES[1], matchScore: '94%' }, // Twist Out
  startDate: 'Aug 25',
  endDate: 'Aug 30'
};

const MOCK_UPCOMING: ScheduleSlot = {
  id: 's3',
  type: 'UPCOMING',
  status: 'planned',
  style: MOCK_HAIRSTYLES[3], // Fulani Braids
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
      style: MOCK_HAIRSTYLES[4], // Wash and Go
      startDate: 'TBD',
      endDate: 'TBD'
    };

    return { schedule: [nextToCurrent, upcomingToNext, newUpcoming] };
  }),

  // Replace the NEXT slot with a new style chosen from alternatives
  replaceNextStyle: (newStyle: HairstyleData) => set((state) => {
    const updatedSchedule = [...state.schedule];
    updatedSchedule[1] = {
      ...updatedSchedule[1],
      style: { ...newStyle, matchScore: newStyle.matchScore || '90%' }
    };
    return { schedule: updatedSchedule };
  })
}));
