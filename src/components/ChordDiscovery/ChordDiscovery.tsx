import React from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { generateDiatonicChords } from '../../lib/musicTheory';

export function ChordDiscovery() {
  const { state, dispatch } = useGuitar();
  
  // Generate diatonic chords based on current key and mode
  const diatonicChords = generateDiatonicChords(state.key, state.mode);
  
  const handleChordClick = (chord: any) => {
    dispatch(guitarActions.setSelectedChord(chord));
  };

  const getChordQualityColor = (chordType: string) => {
    switch (chordType) {
      case 'maj':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'min':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dim':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'aug':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChordQualityIcon = (chordType: string) => {
    switch (chordType) {
      case 'maj':
        return '△';
      case 'min':
        return 'm';
      case 'dim':
        return '°';
      case 'aug':
        return '+';
      default:
        return '';
    }
  };

  return (
    <div className="chord-discovery bg-white p-6 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Chords in {state.key.name} {state.mode}
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Click on any chord to see its voicings and play it on the fretboard
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {diatonicChords.map((chord, index) => (
          <button
            key={`${chord.root.name}-${chord.type}`}
            onClick={() => handleChordClick(chord)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
              state.selectedChord?.symbol === chord.symbol
                ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50'
                : getChordQualityColor(chord.type)
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">
                {chord.root.name}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <span>{getChordQualityIcon(chord.type)}</span>
                <span>{chord.type}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {index + 1}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Chord Information */}
      {state.selectedChord && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            {state.selectedChord.symbol}
          </h3>
          <div className="text-sm text-blue-700">
            <p><span className="font-medium">Notes:</span> {state.selectedChord.notes.map(note => note.name).join(', ')}</p>
            <p><span className="font-medium">Type:</span> {state.selectedChord.type}</p>
          </div>
        </div>
      )}
    </div>
  );
}
