import type { Note, ChordVoicing } from '../types/music';
import { NOTES, generateChord } from './musicTheory';

export interface ProgressionData {
  id: string;
  name: string;
  genre: 'progressive-metal' | 'math-rock' | 'midwest-emo';
  description: string;
  key: Note;
  mode: string;
  chords: {
    symbol: string;
    root: Note;
    type: string;
    roman: string;
  }[];
  bands: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface ProgressionWithVoicings extends ProgressionData {
  voicings: ChordVoicing[][];
}

// Progressive Metal Chord Progressions
export const PROGRESSIVE_METAL_PROGRESSIONS: ProgressionData[] = [
  {
    id: 'prog-metal-1',
    name: 'Minor Modal Interchange',
    genre: 'progressive-metal',
    description: 'Common in Periphery and TesseracT - combines minor and major tonalities',
    key: NOTES[9], // A
    mode: 'Aeolian',
    chords: [
      { symbol: 'Am', root: NOTES[9], type: 'min', roman: 'i' },
      { symbol: 'C', root: NOTES[0], type: 'maj', roman: 'bIII' },
      { symbol: 'G', root: NOTES[7], type: 'maj', roman: 'bVII' },
      { symbol: 'F', root: NOTES[5], type: 'maj', roman: 'bVI' }
    ],
    bands: ['Periphery', 'TesseracT', 'Spiritbox'],
    difficulty: 'intermediate',
    tags: ['modal-interchange', 'minor-key', 'atmospheric']
  },
  {
    id: 'prog-metal-2',
    name: 'Extended Jazz Harmony',
    genre: 'progressive-metal',
    description: 'Complex extended chords used by Erra and Periphery',
    key: NOTES[4], // E
    mode: 'Dorian',
    chords: [
      { symbol: 'Em7', root: NOTES[4], type: 'min7', roman: 'i7' },
      { symbol: 'Amaj9', root: NOTES[9], type: 'maj9', roman: 'IV9' },
      { symbol: 'Dmaj7', root: NOTES[2], type: 'maj7', roman: 'bVIImaj7' },
      { symbol: 'G#m7b5', root: NOTES[8], type: 'min7b5', roman: 'iiiø7' }
    ],
    bands: ['Erra', 'Periphery', 'Animals as Leaders'],
    difficulty: 'advanced',
    tags: ['jazz-influence', 'extended-chords', 'complex-harmony']
  },
  {
    id: 'prog-metal-3',
    name: 'Drop Tuning Power Chords',
    genre: 'progressive-metal',
    description: 'Heavy power chord progressions in drop tunings',
    key: NOTES[2], // D (Drop D tuning)
    mode: 'Aeolian',
    chords: [
      { symbol: 'D5', root: NOTES[2], type: 'maj', roman: 'i' },
      { symbol: 'G5', root: NOTES[7], type: 'maj', roman: 'iv' },
      { symbol: 'A5', root: NOTES[9], type: 'maj', roman: 'v' },
      { symbol: 'F5', root: NOTES[5], type: 'maj', roman: 'bIII' }
    ],
    bands: ['Spiritbox', 'Erra', 'Periphery'],
    difficulty: 'beginner',
    tags: ['drop-tuning', 'power-chords', 'heavy']
  },
  {
    id: 'prog-metal-4',
    name: 'Lydian Modal Progression',
    genre: 'progressive-metal',
    description: 'Lydian mode with suspended chords for ethereal sound',
    key: NOTES[7], // G
    mode: 'Lydian',
    chords: [
      { symbol: 'G', root: NOTES[7], type: 'maj', roman: 'I' },
      { symbol: 'C', root: NOTES[0], type: 'maj', roman: 'IV' },
      { symbol: 'Dsus4', root: NOTES[2], type: 'sus4', roman: 'Vsus4' },
      { symbol: 'Am7', root: NOTES[9], type: 'min7', roman: 'ii7' }
    ],
    bands: ['TesseracT', 'Periphery'],
    difficulty: 'intermediate',
    tags: ['lydian', 'suspended-chords', 'ethereal']
  }
];

// Math Rock Chord Progressions
export const MATH_ROCK_PROGRESSIONS: ProgressionData[] = [
  {
    id: 'math-rock-1',
    name: 'Midwest Emo Classic',
    genre: 'math-rock',
    description: 'The quintessential math rock progression from American Football',
    key: NOTES[7], // G
    mode: 'Ionian',
    chords: [
      { symbol: 'Gmaj7', root: NOTES[7], type: 'maj7', roman: 'Imaj7' },
      { symbol: 'Em7', root: NOTES[4], type: 'min7', roman: 'vi7' },
      { symbol: 'Am7', root: NOTES[9], type: 'min7', roman: 'ii7' },
      { symbol: 'D7', root: NOTES[2], type: 'dom7', roman: 'V7' }
    ],
    bands: ['American Football', 'Covet', 'CHON'],
    difficulty: 'intermediate',
    tags: ['midwest-emo', 'maj7', 'jazzy']
  },
  {
    id: 'math-rock-2',
    name: 'Extended Harmony Cascade',
    genre: 'math-rock',
    description: 'Complex extended chords with voice leading',
    key: NOTES[4], // E
    mode: 'Dorian',
    chords: [
      { symbol: 'Em9', root: NOTES[4], type: 'min9', roman: 'im9' },
      { symbol: 'Am11', root: NOTES[9], type: 'min11', roman: 'iv11' },
      { symbol: 'Dmaj9', root: NOTES[2], type: 'maj9', roman: 'bVIImaj9' },
      { symbol: 'G#m7b5', root: NOTES[8], type: 'min7b5', roman: 'iiiø7' }
    ],
    bands: ['Covet', 'CHON', 'Standards'],
    difficulty: 'advanced',
    tags: ['extended-chords', 'voice-leading', 'jazzy']
  },
  {
    id: 'math-rock-3',
    name: 'Suspended Chord Progression',
    genre: 'math-rock',
    description: 'Uses sus2 and sus4 chords for open, airy sound',
    key: NOTES[9], // A
    mode: 'Mixolydian',
    chords: [
      { symbol: 'Asus2', root: NOTES[9], type: 'sus2', roman: 'Isus2' },
      { symbol: 'Dsus4', root: NOTES[2], type: 'sus4', roman: 'IVsus4' },
      { symbol: 'Gsus2', root: NOTES[7], type: 'sus2', roman: 'bVIIsus2' },
      { symbol: 'Cadd9', root: NOTES[0], type: 'add9', roman: 'bIIIadd9' }
    ],
    bands: ['Covet', 'American Football', 'Tiny Moving Parts'],
    difficulty: 'beginner',
    tags: ['suspended-chords', 'open-voicings', 'ambient']
  },
  {
    id: 'math-rock-4',
    name: 'Modal Interchange Math',
    genre: 'math-rock',
    description: 'Borrows chords from parallel modes for colorful harmony',
    key: NOTES[0], // C
    mode: 'Ionian',
    chords: [
      { symbol: 'Cmaj7', root: NOTES[0], type: 'maj7', roman: 'Imaj7' },
      { symbol: 'Am7', root: NOTES[9], type: 'min7', roman: 'vi7' },
      { symbol: 'Fmaj7', root: NOTES[5], type: 'maj7', roman: 'IVmaj7' },
      { symbol: 'G7sus4', root: NOTES[7], type: 'dom7', roman: 'V7sus4' }
    ],
    bands: ['CHON', 'Standards', 'Covet'],
    difficulty: 'intermediate',
    tags: ['modal-interchange', 'maj7', 'smooth-voice-leading']
  }
];

// Combine all progressions
export const ALL_PROGRESSIONS: ProgressionData[] = [
  ...PROGRESSIVE_METAL_PROGRESSIONS,
  ...MATH_ROCK_PROGRESSIONS
];

// Generate chord voicings for a progression
export function generateProgressionVoicings(
  progression: ProgressionData,
  _tuningId: string = 'e-standard-6'
): ProgressionWithVoicings {
  const voicings: ChordVoicing[][] = [];
  
  // For now, we'll use a simple approach to generate voicings
  // In a real implementation, you'd want to use the existing voicing generation logic
  progression.chords.forEach(chordData => {
    const chord = generateChord(chordData.root, chordData.type);
    // This would need to be implemented with the actual tuning and voicing logic
    // For now, we'll create placeholder voicings
    const chordVoicings: ChordVoicing[] = [{
      positions: [],
      inversion: 0,
      difficulty: 'medium',
      chord
    }];
    voicings.push(chordVoicings);
  });
  
  return {
    ...progression,
    voicings
  };
}

// Filter progressions by genre
export function getProgressionsByGenre(genre: string): ProgressionData[] {
  return ALL_PROGRESSIONS.filter(p => p.genre === genre);
}

// Filter progressions by difficulty
export function getProgressionsByDifficulty(difficulty: string): ProgressionData[] {
  return ALL_PROGRESSIONS.filter(p => p.difficulty === difficulty);
}

// Search progressions
export function searchProgressions(query: string): ProgressionData[] {
  const lowercaseQuery = query.toLowerCase();
  return ALL_PROGRESSIONS.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.bands.some(band => band.toLowerCase().includes(lowercaseQuery)) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
