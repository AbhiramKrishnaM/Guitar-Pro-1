import { generateChord, findChordVoicings } from './musicTheory';
import type { ProgressionData, ChordVoicing } from './progressionLibrary';
import type { Tuning } from '../types/music';

/**
 * Converts a progression from the library into chord voicings that can be loaded into the guitar
 */
export function loadProgressionToGuitar(
  progression: ProgressionData,
  tuning: Tuning,
  voicingFlexibility: 'strict' | 'flexible' | 'all' = 'flexible'
): ChordVoicing[] {
  const chordVoicings: ChordVoicing[] = [];

  for (const chordData of progression.chords) {
    try {
      // Generate the chord object from the progression data
      const chord = generateChord(chordData.root, chordData.type);
      
      // Find voicings for this chord
      const voicings = findChordVoicings(chord, tuning, 24, voicingFlexibility);
      
      if (voicings.length > 0) {
        // Use the first (usually best) voicing for each chord
        chordVoicings.push(voicings[0]);
      } else {
        console.warn(`No voicings found for chord ${chord.symbol}`);
        // Create a fallback voicing with empty positions
        chordVoicings.push({
          positions: [],
          inversion: 0,
          difficulty: 'medium',
          chord
        });
      }
    } catch (error) {
      console.error(`Error generating chord ${chordData.symbol}:`, error);
      // Create a fallback voicing
      chordVoicings.push({
        positions: [],
        inversion: 0,
        difficulty: 'medium',
        chord: {
          root: chordData.root,
          type: chordData.type,
          notes: [chordData.root], // Fallback to just the root note
          symbol: chordData.symbol
        }
      });
    }
  }

  return chordVoicings;
}

/**
 * Loads a progression and navigates to the guitar page
 */
export function loadProgressionAndNavigate(
  progression: ProgressionData,
  tuning: Tuning,
  dispatch: (action: any) => void,
  navigate: (path: string) => void
) {
  try {
    // Generate chord voicings
    const voicings = loadProgressionToGuitar(progression, tuning);
    
    // Determine appropriate chord type filter based on the progression's chords
    const chordTypes = new Set<string>();
    progression.chords.forEach(chord => {
      if (chord.type.includes('7')) chordTypes.add('7th');
      if (chord.type.includes('9')) chordTypes.add('9th');
      if (chord.type.includes('11')) chordTypes.add('11th');
      if (chord.type.includes('13')) chordTypes.add('13th');
      if (chord.type.includes('sus') || chord.type.includes('add')) chordTypes.add('sus');
      if (chord.type.includes('maj') || chord.type.includes('min') || chord.type.includes('dom')) {
        if (!chord.type.includes('7') && !chord.type.includes('9') && !chord.type.includes('11') && !chord.type.includes('13')) {
          chordTypes.add('triad');
        }
      }
    });
    
    // If no specific chord types found, default to triads and sevenths
    const chordTypeFilter = chordTypes.size > 0 ? Array.from(chordTypes) : ['triad', '7th'];
    
    // Set the key and mode from the progression
    dispatch({
      type: 'SET_KEY',
      payload: progression.key.name
    });
    
    dispatch({
      type: 'SET_MODE',
      payload: progression.mode
    });
    
    // Set the chord type filter to include the types used in this progression
    dispatch({
      type: 'SET_CHORD_TYPE_FILTER',
      payload: chordTypeFilter
    });
    
    // Load the progression into the guitar context
    dispatch({
      type: 'LOAD_PROGRESSION',
      payload: voicings
    });
    
    // Navigate to the home page where the guitar is
    navigate('/');
    
    // Show success notification
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        message: `Loaded "${progression.name}" progression with ${voicings.length} chords`,
        type: 'success'
      }
    });
  } catch (error) {
    console.error('Error loading progression:', error);
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        message: 'Error loading progression. Please try again.',
        type: 'error'
      }
    });
  }
}
