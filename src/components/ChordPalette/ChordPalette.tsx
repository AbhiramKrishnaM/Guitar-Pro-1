import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { findChordVoicings } from '../../lib/musicTheory';
import type { ChordVoicing } from '../../types/music';

interface ChordPaletteProps {
  onBackToChords?: () => void;
  showBackButton?: boolean;
}

export function ChordPalette({ onBackToChords, showBackButton = false }: ChordPaletteProps = {}) {
  const { state, dispatch } = useGuitar();
  const [voicings, setVoicings] = useState<ChordVoicing[]>([]);
  const [currentVoicingIndex, setCurrentVoicingIndex] = useState(0);

  // Memoize voicings calculation to prevent unnecessary recalculations
  const chordVoicings = useMemo(() => {
    if (!state.selectedChord) return [];
    return findChordVoicings(state.selectedChord, state.tuning, 24, state.voicingFlexibility, state.rootPosition);
  }, [state.selectedChord, state.tuning, state.voicingFlexibility, state.rootPosition]);

  // Find voicings when selected chord changes
  useEffect(() => {
    if (state.selectedChord) {
      // Filter out hard voicings as they're physically impossible to play
      const playableVoicings = chordVoicings.filter(voicing => voicing.difficulty !== 'hard');
      setVoicings(playableVoicings);
      setCurrentVoicingIndex(0);
      
      // Auto-select first voicing
      if (playableVoicings.length > 0) {
        dispatch(guitarActions.setSelectedVoicing(playableVoicings[0]));
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

  const handleFlexibilityChange = useCallback((flexibility: 'strict' | 'flexible' | 'all') => {
    dispatch(guitarActions.setVoicingFlexibility(flexibility));
  }, [dispatch]);

  const handleRootPositionModeToggle = useCallback(() => {
    dispatch(guitarActions.setRootPositionMode(!state.rootPositionMode));
  }, [dispatch, state.rootPositionMode]);

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* {showBackButton && onBackToChords && (
            <button
              onClick={onBackToChords}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="Back to chord selection"
            >
              <ArrowLeft size={16} />
              Back to Chords
            </button>
          )} */}
          <h2 className="text-2xl font-bold text-gray-800">
            {state.selectedChord.symbol} Voicings
          </h2>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Root Position Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Root Position Mode:</span>
            <button
              onClick={handleRootPositionModeToggle}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                state.rootPositionMode
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Click on fretboard to select root note position"
            >
              {state.rootPositionMode ? 'ON' : 'OFF'}
            </button>
          </div>
          
          {/* Voicing Flexibility Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Voicing Type:</span>
            <div className="flex gap-1">
              {(['strict', 'flexible', 'all'] as const).map(flexibility => (
                <button
                  key={flexibility}
                  onClick={() => handleFlexibilityChange(flexibility)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                    state.voicingFlexibility === flexibility
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title={
                    flexibility === 'strict' ? 'Show only complete chord voicings' :
                    flexibility === 'flexible' ? 'Show voicings with at least 3 notes including root' :
                    'Show all possible note combinations'
                  }
                >
                  {flexibility}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Root Position Mode Instructions */}
      {state.rootPositionMode && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Root Position Mode:</strong> Click on any orange circle on the fretboard to select a root note position. 
            Voicings will be generated based on your selected position.
            {state.rootPosition && (
              <span className="ml-2">
                Selected: {state.rootPosition.note.name} at string {state.rootPosition.string + 1}, fret {state.rootPosition.fret}
              </span>
            )}
          </p>
        </div>
      )}

      {voicings.length === 0 ? (
        <p className="text-gray-600">
          {state.rootPositionMode && state.rootPosition 
            ? `No voicings found for this chord with root at string ${state.rootPosition.string + 1}, fret ${state.rootPosition.fret}`
            : 'No voicings found for this chord in the current tuning'
          }
        </p>
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

              <div className="flex gap-2">
                <button
                  onClick={handleAddToProgression}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Progression
                </button>
                {showBackButton && onBackToChords && (
                  <button
                    onClick={onBackToChords}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Try Another Chord
                  </button>
                )}
              </div>
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
