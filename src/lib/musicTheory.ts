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
  'dom11': [0, 4, 7, 10, 2, 5],
  'maj13': [0, 4, 7, 11, 2, 5, 9],
  'min13': [0, 3, 7, 10, 2, 5, 9],
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
  // 6-string tunings
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
    id: 'asharp-f-6',
    name: 'A# F A# D# G C',
    guitarType: '6-string',
    strings: [
      { name: 'A#', semitone: 10 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 }
    ]
  },
  {
    id: 'dsharp-gsharp-6',
    name: 'D# G# C# F# A# D#',
    guitarType: '6-string',
    strings: [
      { name: 'D#', semitone: 3 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 },
      { name: 'F#', semitone: 6 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 }
    ]
  },
  {
    id: 'd-a-d-g-a-d-6',
    name: 'D A D G A D',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 }
    ]
  },
  {
    id: 'csharp-gsharp-6',
    name: 'C# G# C# F# G# C#',
    guitarType: '6-string',
    strings: [
      { name: 'C#', semitone: 1 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 },
      { name: 'F#', semitone: 6 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 }
    ]
  },
  {
    id: 'c-g-c-f-a-d-6',
    name: 'C G C F A D',
    guitarType: '6-string',
    strings: [
      { name: 'C', semitone: 0 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 },
      { name: 'F', semitone: 5 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 }
    ]
  },
  {
    id: 'd-a-d-fsharp-a-e-6',
    name: 'D A D F# A E',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'F#', semitone: 6 },
      { name: 'A', semitone: 9 },
      { name: 'E', semitone: 4 }
    ]
  },
  {
    id: 'd-a-d-fsharp-b-d-6',
    name: 'D A D F# B D',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'F#', semitone: 6 },
      { name: 'B', semitone: 11 },
      { name: 'D', semitone: 2 }
    ]
  },
  {
    id: 'f-a-c-g-c-e-6',
    name: 'F A C G C E',
    guitarType: '6-string',
    strings: [
      { name: 'F', semitone: 5 },
      { name: 'A', semitone: 9 },
      { name: 'C', semitone: 0 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 },
      { name: 'E', semitone: 4 }
    ]
  },
  {
    id: 'd-a-d-fsharp-b-e-6',
    name: 'D A D F# B E',
    guitarType: '6-string',
    strings: [
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'F#', semitone: 6 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 }
    ]
  },
  // 7-string tunings
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
  },
  {
    id: 'dsharp-asharp-7',
    name: 'D# A# D# G# C# F A#',
    guitarType: '7-string',
    strings: [
      { name: 'D#', semitone: 3 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 }
    ]
  },
  {
    id: 'fsharp-csharp-7',
    name: 'F# C# F# B E G# C#',
    guitarType: '7-string',
    strings: [
      { name: 'F#', semitone: 6 },
      { name: 'C#', semitone: 1 },
      { name: 'F#', semitone: 6 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 }
    ]
  },
  {
    id: 'e-b-e-a-d-fsharp-b-7',
    name: 'E B E A D F# B',
    guitarType: '7-string',
    strings: [
      { name: 'E', semitone: 4 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'F#', semitone: 6 },
      { name: 'B', semitone: 11 }
    ]
  },
  {
    id: 'gsharp-dsharp-7',
    name: 'G# D# G# C# F A# D#',
    guitarType: '7-string',
    strings: [
      { name: 'G#', semitone: 8 },
      { name: 'D#', semitone: 3 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 }
    ]
  },
  {
    id: 'f-c-f-asharp-dsharp-g-c-7',
    name: 'F C F A# D# G C',
    guitarType: '7-string',
    strings: [
      { name: 'F', semitone: 5 },
      { name: 'C', semitone: 0 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 }
    ]
  },
  {
    id: 'f-c-f-asharp-d-g-c-7',
    name: 'F C F A# D G C',
    guitarType: '7-string',
    strings: [
      { name: 'F', semitone: 5 },
      { name: 'C', semitone: 0 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'C', semitone: 0 }
    ]
  },
  {
    id: 'asharp-f-asharp-dsharp-f-asharp-dsharp-7',
    name: 'A# F A# D# F A# D#',
    guitarType: '7-string',
    strings: [
      { name: 'A#', semitone: 10 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 }
    ]
  },
  {
    id: 'f-asharp-f-asharp-dsharp-f-asharp-dsharp-7',
    name: 'F A# F A# D# F A# D#',
    guitarType: '7-string',
    strings: [
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 },
      { name: 'F', semitone: 5 },
      { name: 'A#', semitone: 10 },
      { name: 'D#', semitone: 3 }
    ]
  },
  {
    id: 'gsharp-dsharp-gsharp-csharp-dsharp-gsharp-csharp-7',
    name: 'G# D# G# C# D# G# C#',
    guitarType: '7-string',
    strings: [
      { name: 'G#', semitone: 8 },
      { name: 'D#', semitone: 3 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 },
      { name: 'D#', semitone: 3 },
      { name: 'G#', semitone: 8 },
      { name: 'C#', semitone: 1 }
    ]
  },
  {
    id: 'a-e-a-d-g-b-e-7',
    name: 'A E A D G B E',
    guitarType: '7-string',
    strings: [
      { name: 'A', semitone: 9 },
      { name: 'E', semitone: 4 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'G', semitone: 7 },
      { name: 'B', semitone: 11 },
      { name: 'E', semitone: 4 }
    ]
  },
  {
    id: 'a-d-a-d-fsharp-b-e-7',
    name: 'A D A D F# B E',
    guitarType: '7-string',
    strings: [
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'A', semitone: 9 },
      { name: 'D', semitone: 2 },
      { name: 'F#', semitone: 6 },
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
      } else if (chordType === '11th') {
        // 11th chords (simplified - using 7th chord types with 11th extensions)
        if (rootToThird === 4 && rootToFifth === 7) {
          chordSymbol = rootToSeventh === 11 ? 'maj11' : 'dom11';
        } else if (rootToThird === 3 && rootToFifth === 7) {
          chordSymbol = 'min11';
        } else {
          chordSymbol = 'maj11'; // fallback
        }
      } else if (chordType === '13th') {
        // 13th chords (simplified - using 7th chord types with 13th extensions)
        if (rootToThird === 4 && rootToFifth === 7) {
          chordSymbol = rootToSeventh === 11 ? 'maj13' : 'dom13';
        } else if (rootToThird === 3 && rootToFifth === 7) {
          chordSymbol = 'min13';
        } else {
          chordSymbol = 'maj13'; // fallback
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

// Find all positions of a specific note on the fretboard
export function findNotePositions(note: Note, tuning: Tuning, maxFret: number = 24): FretPosition[] {
  const positions: FretPosition[] = [];
  const stringCount = tuning.strings.length;
  
  for (let stringIndex = 0; stringIndex < stringCount; stringIndex++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const fretNote = getNoteAtFret(tuning, stringIndex, fret);
      if (fretNote.semitone === note.semitone) {
        positions.push({
          string: stringIndex,
          fret,
          note: fretNote
        });
      }
    }
  }
  
  return positions;
}

// Find chord voicings on fretboard
export function findChordVoicings(chord: Chord, tuning: Tuning, maxFret: number = 24, _flexibility: 'strict' | 'flexible' | 'all' = 'strict', rootPosition?: FretPosition): ChordVoicing[] {
  const voicings: ChordVoicing[] = [];
  const stringCount = tuning.strings.length;
  const maxVoicings = 50;
  
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
  
  // Sort positions for each note to prioritize lower frets and better string positions
  for (const semitone in chordNotePositions) {
    chordNotePositions[semitone].sort((a, b) => {
      // Prioritize lower frets
      if (a.fret !== b.fret) return a.fret - b.fret;
      // For same fret, prioritize higher string (lower pitch)
      return b.string - a.string;
    });
  }
  
  // If root position is specified, filter root note positions to only include the specified position
  if (rootPosition) {
    chordNotePositions[chord.root.semitone] = [rootPosition];
  }
  
  // Generate playable chord voicings with improved algorithm
  function generatePlayableVoicings(): void {
    // Try different starting positions to find the best voicings
    const rootPositions = chordNotePositions[chord.root.semitone] || [];
    
    for (const rootPos of rootPositions) {
      // Start with root note
      const usedStrings = new Set([rootPos.string]);
      const currentPositions = [rootPos];
      
      // Try to add other chord notes in order of importance
      const remainingNotes = chord.notes.filter(note => note.semitone !== chord.root.semitone);
      
      // Sort remaining notes by importance (3rd, 7th, 5th, then extensions)
      const noteImportance = (note: Note) => {
        const interval = (note.semitone - chord.root.semitone + 12) % 12;
        if (interval === 3 || interval === 4) return 1; // 3rd
        if (interval === 7) return 2; // 5th
        if (interval === 10 || interval === 11) return 3; // 7th
        if (interval === 2 || interval === 5 || interval === 9) return 4; // 9th, 11th, 13th
        return 5; // other extensions
      };
      
      remainingNotes.sort((a, b) => noteImportance(a) - noteImportance(b));
      
      // Try to add notes one by one, ensuring playability
      for (const note of remainingNotes) {
        const positions = chordNotePositions[note.semitone] || [];
        
        // Find the best position for this note that maintains playability
        let bestPosition: FretPosition | null = null;
        let bestScore = -1;
        
        for (const pos of positions) {
          if (usedStrings.has(pos.string)) continue;
          
          // Calculate playability score
          const testPositions = [...currentPositions, pos];
          const frets = testPositions.map(p => p.fret);
          const minFret = Math.min(...frets);
          const maxFret = Math.max(...frets);
          const fretSpan = maxFret - minFret;
          
          // Skip if fret span is too large (more than 3 semitones for playability)
          if (fretSpan > 3) continue;
          
          // Calculate score based on fret span and string distribution
          let score = 0;
          
          // Prefer smaller fret spans
          score += (4 - fretSpan) * 10;
          
          // Prefer using different strings
          score += (6 - usedStrings.size) * 5;
          
          // Prefer lower frets
          score += (24 - pos.fret) * 2;
          
          // Prefer positions that create good voice leading
          const avgFret = frets.reduce((sum, f) => sum + f, 0) / frets.length;
          const fretDistance = Math.abs(pos.fret - avgFret);
          score += (3 - fretDistance) * 3;
          
          if (score > bestScore) {
            bestScore = score;
            bestPosition = pos;
          }
        }
        
        if (bestPosition) {
          currentPositions.push(bestPosition);
          usedStrings.add(bestPosition.string);
        }
      }
      
      // If we have at least 3 notes and all chord notes are represented, create a voicing
      if (currentPositions.length >= 3) {
        // Check if we have all required chord notes
        const uniqueNotes = new Set(currentPositions.map(pos => pos.note.semitone));
        const chordNoteSemitones = new Set(chord.notes.map(note => note.semitone));
        const hasAllChordNotes = Array.from(chordNoteSemitones).every(semitone => 
          uniqueNotes.has(semitone)
        );
        
        if (hasAllChordNotes) {
          // Calculate inversion
          const sortedPositions = [...currentPositions].sort((a, b) => {
            if (a.string !== b.string) {
              return b.string - a.string; // Higher string number first (bass strings)
            }
            return a.fret - b.fret; // Lower fret first for same string
          });
          
          const bassNote = sortedPositions[0].note;
          const bassChordIndex = chord.notes.findIndex(note => note.semitone === bassNote.semitone);
          
          // Determine difficulty based on fret span
          const frets = currentPositions.map(pos => pos.fret);
          const minFret = Math.min(...frets);
          const maxFret = Math.max(...frets);
          const fretSpan = maxFret - minFret;
          
          let difficulty: 'easy' | 'medium' | 'hard';
          if (fretSpan <= 1) {
            difficulty = 'easy';
          } else if (fretSpan <= 3) {
            difficulty = 'medium';
          } else {
            difficulty = 'hard';
          }
          
          voicings.push({
            positions: [...currentPositions],
            inversion: bassChordIndex,
            difficulty,
            chord: chord
          });
        }
      }
    }
  }
  
  // Generate voicings using the improved algorithm
  generatePlayableVoicings();
  
  // If we don't have enough voicings, try with more flexible approach
  if (voicings.length < 5) {
    // Try generating voicings with more permissive rules
    const allPositions: FretPosition[] = [];
    for (const semitone in chordNotePositions) {
      allPositions.push(...chordNotePositions[semitone]);
    }
    
    // Generate combinations of positions
    function generateCombinations(positions: FretPosition[], current: FretPosition[], startIndex: number): void {
      if (current.length >= 3 && current.length <= 6) {
        // Check if this combination is playable
        const frets = current.map(pos => pos.fret);
        const minFret = Math.min(...frets);
        const maxFret = Math.max(...frets);
        const fretSpan = maxFret - minFret;
        
        if (fretSpan <= 4) { // Allow up to 4 fret span for more options
          // Check if we have different chord notes
          const uniqueNotes = new Set(current.map(pos => pos.note.semitone));
          const chordNoteSemitones = new Set(chord.notes.map(note => note.semitone));
          
          // Check if this voicing contains all required chord notes
          const hasAllChordNotes = Array.from(chordNoteSemitones).every(semitone => 
            uniqueNotes.has(semitone)
          );
          
          if (uniqueNotes.size >= 3 && hasAllChordNotes) {
            // Calculate inversion
            const sortedPositions = [...current].sort((a, b) => {
              if (a.string !== b.string) {
                return b.string - a.string;
              }
              return a.fret - b.fret;
            });
            
            const bassNote = sortedPositions[0].note;
            const bassChordIndex = chord.notes.findIndex(note => note.semitone === bassNote.semitone);
            
            let difficulty: 'easy' | 'medium' | 'hard';
            if (fretSpan <= 1) {
              difficulty = 'easy';
            } else if (fretSpan <= 3) {
              difficulty = 'medium';
            } else {
              difficulty = 'hard';
            }
            
            voicings.push({
              positions: [...current],
              inversion: bassChordIndex,
              difficulty,
              chord: chord
            });
          }
        }
      }
      
      if (current.length < 6 && voicings.length < maxVoicings) {
        for (let i = startIndex; i < positions.length; i++) {
          const pos = positions[i];
          // Skip if we already have a note on this string
          if (current.some(p => p.string === pos.string)) continue;
          
          generateCombinations(positions, [...current, pos], i + 1);
        }
      }
    }
    
    generateCombinations(allPositions, [], 0);
  }
  
  // Remove duplicates and sort by difficulty
  const uniqueVoicings = voicings.filter((voicing, index, self) => 
    index === self.findIndex(v => 
      v.positions.length === voicing.positions.length &&
      v.positions.every((pos, i) => 
        pos.string === voicing.positions[i].string && 
        pos.fret === voicing.positions[i].fret
      )
    )
  );
  
  return uniqueVoicings
    .sort((a, b) => {
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    })
    .slice(0, maxVoicings);
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
