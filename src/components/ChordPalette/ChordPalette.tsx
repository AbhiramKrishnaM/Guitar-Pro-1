import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { findChordVoicings } from '../../lib/musicTheory';
import type { ChordVoicing } from '../../types/music';

export function ChordPalette() {
  const { state, dispatch } = useGuitar();
  const [voicings, setVoicings] = useState<ChordVoicing[]>([]);
  const [currentVoicingIndex, setCurrentVoicingIndex] = useState(0);

  // Memoize voicings calculation to prevent unnecessary recalculations
  const chordVoicings = useMemo(() => {
    if (!state.selectedChord) return [];
    return findChordVoicings(state.selectedChord, state.tuning);
  }, [state.selectedChord, state.tuning]);

  // Find voicings when selected chord changes
  useEffect(() => {
    if (state.selectedChord) {
      setVoicings(chordVoicings);
      setCurrentVoicingIndex(0);
      
      // Auto-select first voicing
      if (chordVoicings.length > 0) {
        dispatch(guitarActions.setSelectedVoicing(chordVoicings[0]));
      }
    } else {
      setVoicings([]);
      setCurrentVoicingIndex(0);
      dispatch(guitarActions.setSelectedVoicing(undefined));
    }
  }, [state.selectedChord, chordVoicings, dispatch]);

  // Update selected voicing when index changes
  useEffect(() => {
    if (voicings.length > 0 && currentVoicingIndex < voicings.length) {
      dispatch(guitarActions.setSelectedVoicing(voicings[currentVoicingIndex]));
    }
  }, [currentVoicingIndex, voicings, dispatch]);

  const handleVoicingClick = useCallback((_voicing: ChordVoicing, index: number) => {
    setCurrentVoicingIndex(index);
  }, []);

  const handlePreviousVoicing = useCallback(() => {
    if (currentVoicingIndex > 0) {
      setCurrentVoicingIndex(currentVoicingIndex - 1);
    }
  }, [currentVoicingIndex]);

  const handleNextVoicing = useCallback(() => {
    if (currentVoicingIndex < voicings.length - 1) {
      setCurrentVoicingIndex(currentVoicingIndex + 1);
    }
  }, [currentVoicingIndex, voicings.length]);

  const handleAddToProgression = useCallback(() => {
    if (state.selectedVoicing) {
      dispatch(guitarActions.addChordToProgression(state.selectedVoicing));
    }
  }, [state.selectedVoicing, dispatch]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!state.selectedChord) {
    return (
      <div className="chord-palette bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Chord Voicings</h2>
        <p className="text-gray-600">Select a chord to see its voicings</p>
      </div>
    );
  }

  return (
    <div className="chord-palette bg-white p-6 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {state.selectedChord.symbol} Voicings
      </h2>

      {voicings.length === 0 ? (
        <p className="text-gray-600">No voicings found for this chord in the current tuning</p>
      ) : (
        <>
          {/* Voicing Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousVoicing}
              disabled={currentVoicingIndex === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            <span className="text-sm text-gray-600">
              {currentVoicingIndex + 1} of {voicings.length}
            </span>
            
            <button
              onClick={handleNextVoicing}
              disabled={currentVoicingIndex === voicings.length - 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          {/* Current Voicing Info */}
          {state.selectedVoicing && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-blue-800">
                  Voicing {currentVoicingIndex + 1}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(state.selectedVoicing.difficulty)}`}>
                  {state.selectedVoicing.difficulty}
                </span>
              </div>
              
              <div className="text-sm text-blue-700 mb-3">
                <p><span className="font-medium">Inversion:</span> {state.selectedVoicing.inversion}</p>
                <p><span className="font-medium">Positions:</span> {state.selectedVoicing.positions.map(pos => `${pos.note.name} (${pos.string + 1}/${pos.fret})`).join(', ')}</p>
              </div>

              <button
                onClick={handleAddToProgression}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Progression
              </button>
            </div>
          )}

          {/* All Voicings Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {voicings.map((voicing, index) => (
              <button
                key={index}
                onClick={() => handleVoicingClick(voicing, index)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  index === currentVoicingIndex
                    ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    Voicing {index + 1}
                  </div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(voicing.difficulty)}`}>
                    {voicing.difficulty}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Inv. {voicing.inversion}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
