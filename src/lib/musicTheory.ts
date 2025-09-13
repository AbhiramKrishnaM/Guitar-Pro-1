import type { Note, Chord, Tuning, FretPosition, ChordVoicing } from '../types/music';

// Musical constants
export const NOTES: Note[] = [
  { name: 'C', semitone: 0, accidental: 'natural' },
  { name: 'C#', semitone: 1, accidental: 'sharp' },
  { name: 'D', semitone: 2, accidental: 'natural' },
  { name: 'D#', semitone: 3, accidental: 'sharp' },
  { name: 'E', semitone: 4, accidental: 'natural' },
  { name: 'F', semitone: 5, accidental: 'natural' },
  { name: 'F#', semitone: 6, accidental: 'sharp' },
  { name: 'G', semitone: 7, accidental: 'natural' },
  { name: 'G#', semitone: 8, accidental: 'sharp' },
  { name: 'A', semitone: 9, accidental: 'natural' },
  { name: 'A#', semitone: 10, accidental: 'sharp' },
  { name: 'B', semitone: 11, accidental: 'natural' }
];

// Chord type definitions with semitone intervals
export const CHORD_TYPES = {
  'maj': [0, 4, 7],
  'min': [0, 3, 7],
  'aug': [0, 4, 8],
  'dim': [0, 3, 6],
  'maj7': [0, 4, 7, 11],
  'min7': [0, 3, 7, 10],
  'dom7': [0, 4, 7, 10],
  'min7b5': [0, 3, 6, 10],
  'dim7': [0, 3, 6, 9],
  'maj9': [0, 4, 7, 11, 2],
  'min9': [0, 3, 7, 10, 2],
  'dom9': [0, 4, 7, 10, 2],
  'maj11': [0, 4, 7, 11, 2, 5],
  'min11': [0, 3, 7, 10, 2, 5],
  'dom13': [0, 4, 7, 10, 2, 5, 9]
};

// Mode definitions with semitone intervals from root
export const MODES = {
  'Ionian': [0, 2, 4, 5, 7, 9, 11],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Phrygian': [0, 1, 3, 5, 7, 8, 10],
  'Lydian': [0, 2, 4, 6, 7, 9, 11],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'Aeolian': [0, 2, 3, 5, 7, 8, 10],
  'Locrian': [0, 1, 3, 5, 6, 8, 10]
};

// Standard tunings
export const STANDARD_TUNINGS: Tuning[] = [
  {
    id: 'e-standard-6',
    name: 'E Standard',
    guitarType: '6-string',
    strings: [
      { name: 'E', semitone: 4 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 }
    ]
  },
  {
    id: 'drop-d-6',
    name: 'Drop D',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 }
    ]
  },
  {
    id: 'd-standard-6',
    name: 'D Standard',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 },
      { name: 'F', semitone: 5 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 }
    ]
  },
  {
    id: 'b-standard-7',
    name: 'B Standard (7-string)',
    guitarType: '7-string',
    strings: [
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 }
    ]
  }
];

// Utility functions
export function getNoteBySemitone(semitone: number): Note {
  return NOTES[semitone % 12];
}

export function getSemitoneDifference(note1: Note, note2: Note): number {
  return (note2.semitone - note1.semitone + 12) % 12;
}

export function addSemitones(note: Note, semitones: number): Note {
  const newSemitone = (note.semitone + semitones) % 12;
  return getNoteBySemitone(newSemitone);
}

// Chord generation
export function generateChord(root: Note, chordType: string): Chord {
  const intervals = CHORD_TYPES[chordType as keyof typeof CHORD_TYPES];
  if (!intervals) {
    throw new Error(`Unknown chord type: ${chordType}`);
  }

  const notes = intervals.map(interval => addSemitones(root, interval));
  const symbol = `${root.name}${chordType}`;

  return {
    root,
    type: chordType,
    notes,
    symbol
  };
}

// Generate diatonic chords for a key and mode
export function generateDiatonicChords(key: Note, mode: string, chordTypes: string[] = ['triad']): Chord[] {
  const modeIntervals = MODES[mode as keyof typeof MODES];
  if (!modeIntervals) {
    throw new Error(`Unknown mode: ${mode}`);
  }

  const chords: Chord[] = [];
  
  // Generate chords for each degree of the mode
  for (let i = 0; i < 7; i++) {
    const root = addSemitones(key, modeIntervals[i]);
    const third = addSemitones(key, modeIntervals[(i + 2) % 7]);
    const fifth = addSemitones(key, modeIntervals[(i + 4) % 7]);
    const seventh = addSemitones(key, modeIntervals[(i + 6) % 7]);
    
    // Determine chord quality based on intervals
    const rootToThird = getSemitoneDifference(root, third);
    const rootToFifth = getSemitoneDifference(root, fifth);
    const rootToSeventh = getSemitoneDifference(root, seventh);
    
    // Generate different chord types based on selection
    for (const chordType of chordTypes) {
      let chordSymbol: string;
      
      if (chordType === 'triad') {
        // Basic triads
        if (rootToThird === 4 && rootToFifth === 7) {
          chordSymbol = 'maj';
        } else if (rootToThird === 3 && rootToFifth === 7) {
          chordSymbol = 'min';
        } else if (rootToThird === 3 && rootToFifth === 6) {
          chordSymbol = 'dim';
        } else if (rootToThird === 4 && rootToFifth === 8) {
          chordSymbol = 'aug';
        } else {
          chordSymbol = 'maj'; // fallback
        }
      } else if (chordType === '7th') {
        // 7th chords
        if (rootToThird === 4 && rootToFifth === 7) {
          chordSymbol = rootToSeventh === 11 ? 'maj7' : 'dom7';
        } else if (rootToThird === 3 && rootToFifth === 7) {
          chordSymbol = 'min7';
        } else if (rootToThird === 3 && rootToFifth === 6) {
          chordSymbol = 'min7b5';
        } else {
          chordSymbol = 'maj7'; // fallback
        }
      } else if (chordType === '9th') {
        // 9th chords (simplified - using 7th chord types with 9th extensions)
        if (rootToThird === 4 && rootToFifth === 7) {
          chordSymbol = rootToSeventh === 11 ? 'maj9' : 'dom9';
        } else if (rootToThird === 3 && rootToFifth === 7) {
          chordSymbol = 'min9';
        } else {
          chordSymbol = 'maj9'; // fallback
        }
      } else {
        continue; // Skip unknown chord types
      }
      
      chords.push(generateChord(root, chordSymbol));
    }
  }
  
  return chords;
}

// Calculate note at specific fret position
export function getNoteAtFret(tuning: Tuning, stringIndex: number, fret: number): Note {
  const openStringNote = tuning.strings[stringIndex];
  return addSemitones(openStringNote, fret);
}

// Find chord voicings on fretboard
export function findChordVoicings(chord: Chord, tuning: Tuning, maxFret: number = 24, flexibility: 'strict' | 'flexible' | 'all' = 'strict'): ChordVoicing[] {
  const voicings: ChordVoicing[] = [];
  const stringCount = tuning.strings.length;
  const maxVoicings = 50; // Limit to prevent performance issues
  
  // Create a map of chord note semitones for quick lookup
  const chordNoteSemitones = new Set(chord.notes.map(note => note.semitone));
  
  // Find all possible positions for each chord note
  const chordNotePositions: { [semitone: number]: FretPosition[] } = {};
  
  for (let stringIndex = 0; stringIndex < stringCount; stringIndex++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = getNoteAtFret(tuning, stringIndex, fret);
      if (chordNoteSemitones.has(note.semitone)) {
        if (!chordNotePositions[note.semitone]) {
          chordNotePositions[note.semitone] = [];
        }
        chordNotePositions[note.semitone].push({
          string: stringIndex,
          fret,
          note
        });
      }
    }
  }
  
  // Generate voicings by selecting one position for each chord note
  function generateVoicings(
    chordNotes: Note[],
    currentPositions: FretPosition[],
    usedStrings: Set<number>
  ): void {
    if (voicings.length >= maxVoicings) return; // Early exit if we have enough voicings
    
    if (currentPositions.length >= 2) { // At least 2 notes for a partial chord
      // Check voicing requirements based on flexibility
      let meetsRequirements = false;
      
      if (flexibility === 'strict') {
        // Must have all chord notes
        meetsRequirements = chord.notes.every(chordNote => 
          currentPositions.some(pos => pos.note.semitone === chordNote.semitone)
        );
      } else if (flexibility === 'flexible') {
        // Must have at least 3 notes, including root and one other chord tone
        const hasRoot = currentPositions.some(pos => pos.note.semitone === chord.root.semitone);
        const hasOtherChordTone = chord.notes.some(chordNote => 
          chordNote.semitone !== chord.root.semitone && 
          currentPositions.some(pos => pos.note.semitone === chordNote.semitone)
        );
        meetsRequirements = currentPositions.length >= 3 && hasRoot && hasOtherChordTone;
      } else if (flexibility === 'all') {
        // Any combination of chord notes (at least 2)
        meetsRequirements = currentPositions.some(pos => 
          chord.notes.some(chordNote => pos.note.semitone === chordNote.semitone)
        );
      }
      
      if (meetsRequirements) {
        // Calculate inversion (which chord note is in the bass)
        const bassNote = currentPositions[0].note;
        const bassChordIndex = chord.notes.findIndex(note => note.semitone === bassNote.semitone);
        
        // Determine difficulty based on fret span and finger stretch
        const frets = currentPositions.map(pos => pos.fret);
        const minFret = Math.min(...frets);
        const maxFret = Math.max(...frets);
        const fretSpan = maxFret - minFret;
        
        let difficulty: 'easy' | 'medium' | 'hard';
        if (fretSpan <= 3) {
          difficulty = 'easy';
        } else if (fretSpan <= 5) {
          difficulty = 'medium';
        } else {
          difficulty = 'hard';
        }
        
        voicings.push({
          positions: [...currentPositions],
          inversion: bassChordIndex,
          difficulty
        });
      }
    }
    
    // Try to add more chord notes
    for (const chordNote of chordNotes) {
      const positions = chordNotePositions[chordNote.semitone] || [];
      
      for (const position of positions) {
        // Skip if we already have a note on this string
        if (usedStrings.has(position.string)) continue;
        
        // Skip if this would create too many positions
        if (currentPositions.length >= 6) continue;
        
        generateVoicings(
          chordNotes.filter(note => note.semitone !== chordNote.semitone),
          [...currentPositions, position],
          new Set([...usedStrings, position.string])
        );
      }
    }
  }
  
  // Start generating voicings
  generateVoicings(chord.notes, [], new Set());
  
  // Sort by difficulty and remove duplicates
  return voicings
    .filter((voicing, index, self) => 
      index === self.findIndex(v => 
        v.positions.length === voicing.positions.length &&
        v.positions.every((pos, i) => 
          pos.string === voicing.positions[i].string && 
          pos.fret === voicing.positions[i].fret
        )
      )
    )
    .sort((a, b) => {
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    })
    .slice(0, maxVoicings); // Limit final results
}

// Get all available keys
export function getAllKeys(): Note[] {
  return NOTES;
}

// Get all available modes
export function getAllModes(): string[] {
  return Object.keys(MODES);
}

// Get all available tunings for a guitar type
export function getTuningsForGuitarType(guitarType: '6-string' | '7-string'): Tuning[] {
  return STANDARD_TUNINGS.filter(tuning => tuning.guitarType === guitarType);
}

// Get available chord type categories
export function getChordTypeCategories() {
  return [
    { id: 'triad', name: 'Triads', description: 'Basic 3-note chords' },
    { id: '7th', name: '7th Chords', description: 'Chords with 7th extensions' },
    { id: '9th', name: '9th Chords', description: 'Chords with 9th extensions' },
    { id: '11th', name: '11th Chords', description: 'Chords with 11th extensions' },
    { id: '13th', name: '13th Chords', description: 'Chords with 13th extensions' }
  ];
}
