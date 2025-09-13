// Core musical data types and interfaces

export interface Note {
  name: string;
  semitone: number;
  accidental?: 'sharp' | 'flat' | 'natural';
}

export interface Tuning {
  id: string;
  name: string;
  strings: Note[];
  guitarType: '6-string' | '7-string';
}

export interface FretPosition {
  string: number; // 0-based string index
  fret: number;   // 0 = open string, 1 = first fret, etc.
  note: Note;
}

export interface Chord {
  root: Note;
  type: string;
  notes: Note[];
  symbol: string; // e.g., "Cmaj7", "Dm", "G7"
}

export interface ChordVoicing {
  positions: FretPosition[];
  inversion: number;
  difficulty: 'easy' | 'medium' | 'hard';
  fingering?: number[]; // Suggested finger numbers (1-4, 0 = open)
}

export interface ChordProgression {
  id: string;
  name: string;
  chords: ChordVoicing[];
  key: Note;
  mode: string;
}

export interface KeyMode {
  key: Note;
  mode: string;
  chords: Chord[];
}

export interface GuitarSettings {
  guitarType: '6-string' | '7-string';
  tuning: Tuning;
  key: Note;
  mode: string;
  selectedChord?: Chord;
  selectedVoicing?: ChordVoicing;
  chordTypeFilter: string[]; // e.g., ['triad', '7th', '9th'] to show which chord types
  voicingFlexibility: 'strict' | 'flexible' | 'all'; // How many chord notes must be present
}
