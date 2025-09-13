import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GuitarSettings, Chord, ChordVoicing, ChordProgression, Tuning } from '../types/music';
import { STANDARD_TUNINGS, getAllKeys, getAllModes } from '../lib/musicTheory';

// Action types
type GuitarAction =
  | { type: 'SET_GUITAR_TYPE'; payload: '6-string' | '7-string' }
  | { type: 'SET_TUNING'; payload: Tuning }
  | { type: 'SET_KEY'; payload: string }
  | { type: 'SET_MODE'; payload: string }
  | { type: 'SET_SELECTED_CHORD'; payload: Chord | undefined }
  | { type: 'SET_SELECTED_VOICING'; payload: ChordVoicing | undefined }
  | { type: 'ADD_CHORD_TO_PROGRESSION'; payload: ChordVoicing }
  | { type: 'REMOVE_CHORD_FROM_PROGRESSION'; payload: number }
  | { type: 'CLEAR_PROGRESSION' }
  | { type: 'SAVE_PROGRESSION'; payload: ChordProgression };

// Initial state
const initialState: GuitarSettings & { progression: ChordVoicing[] } = {
  guitarType: '6-string',
  tuning: STANDARD_TUNINGS[0], // E Standard
  key: getAllKeys()[0], // C
  mode: getAllModes()[0], // Ionian
  selectedChord: undefined,
  selectedVoicing: undefined,
  progression: []
};

// Reducer
function guitarReducer(
  state: typeof initialState,
  action: GuitarAction
): typeof initialState {
  switch (action.type) {
    case 'SET_GUITAR_TYPE':
      return {
        ...state,
        guitarType: action.payload,
        // Reset tuning to first available for new guitar type
        tuning: STANDARD_TUNINGS.find(t => t.guitarType === action.payload) || state.tuning
      };
    
    case 'SET_TUNING':
      return {
        ...state,
        tuning: action.payload
      };
    
    case 'SET_KEY':
      return {
        ...state,
        key: getAllKeys().find(k => k.name === action.payload) || state.key
      };
    
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload
      };
    
    case 'SET_SELECTED_CHORD':
      return {
        ...state,
        selectedChord: action.payload,
        selectedVoicing: undefined // Reset voicing when chord changes
      };
    
    case 'SET_SELECTED_VOICING':
      return {
        ...state,
        selectedVoicing: action.payload
      };
    
    case 'ADD_CHORD_TO_PROGRESSION':
      return {
        ...state,
        progression: [...state.progression, action.payload]
      };
    
    case 'REMOVE_CHORD_FROM_PROGRESSION':
      return {
        ...state,
        progression: state.progression.filter((_, index) => index !== action.payload)
      };
    
    case 'CLEAR_PROGRESSION':
      return {
        ...state,
        progression: []
      };
    
    case 'SAVE_PROGRESSION':
      // This would typically save to localStorage or a backend
      console.log('Saving progression:', action.payload);
      return state;
    
    default:
      return state;
  }
}

// Context
const GuitarContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<GuitarAction>;
} | null>(null);

// Provider component
export function GuitarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(guitarReducer, initialState);

  return (
    <GuitarContext.Provider value={{ state, dispatch }}>
      {children}
    </GuitarContext.Provider>
  );
}

// Custom hook to use the context
export function useGuitar() {
  const context = useContext(GuitarContext);
  if (!context) {
    throw new Error('useGuitar must be used within a GuitarProvider');
  }
  return context;
}

// Action creators for easier usage
export const guitarActions = {
  setGuitarType: (type: '6-string' | '7-string') => ({
    type: 'SET_GUITAR_TYPE' as const,
    payload: type
  }),
  
  setTuning: (tuning: Tuning) => ({
    type: 'SET_TUNING' as const,
    payload: tuning
  }),
  
  setKey: (key: string) => ({
    type: 'SET_KEY' as const,
    payload: key
  }),
  
  setMode: (mode: string) => ({
    type: 'SET_MODE' as const,
    payload: mode
  }),
  
  setSelectedChord: (chord: Chord | undefined) => ({
    type: 'SET_SELECTED_CHORD' as const,
    payload: chord
  }),
  
  setSelectedVoicing: (voicing: ChordVoicing | undefined) => ({
    type: 'SET_SELECTED_VOICING' as const,
    payload: voicing
  }),
  
  addChordToProgression: (voicing: ChordVoicing) => ({
    type: 'ADD_CHORD_TO_PROGRESSION' as const,
    payload: voicing
  }),
  
  removeChordFromProgression: (index: number) => ({
    type: 'REMOVE_CHORD_FROM_PROGRESSION' as const,
    payload: index
  }),
  
  clearProgression: () => ({
    type: 'CLEAR_PROGRESSION' as const,
    payload: null
  }),
  
  saveProgression: (progression: ChordProgression) => ({
    type: 'SAVE_PROGRESSION' as const,
    payload: progression
  })
};
