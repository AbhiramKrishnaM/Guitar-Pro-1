import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { Fretboard } from './Fretboard';
import { findChordVoicings } from '../../lib/musicTheory';
import { Switch } from '../ui/switch';
import type { FretPosition, ChordVoicing } from '../../types/music';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FretboardContainer() {
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

  const handleRootPositionClick = (position: FretPosition) => {
    dispatch(guitarActions.setRootPosition(position));
  };

  const handleRootPositionToggle = () => {
    dispatch(guitarActions.setRootPositionMode(!state.rootPositionMode));
  };

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Fretboard</h2>
        
        <div className="flex items-center gap-4">
          {/* Root Position Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Root Position</span>
            <Switch
              checked={state.rootPositionMode}
              onCheckedChange={handleRootPositionToggle}
            />
          </div>
          
          {/* Selected Chord Info and Navigation */}
          {state.selectedChord && voicings.length > 0 && (
            <div className="flex items-center gap-4">
              {/* Selected Chord Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <div className="text-sm font-semibold text-blue-800">
                  {state.selectedChord.symbol}
                </div>
                <div className="text-xs text-blue-600">
                  {state.selectedChord.notes.map(note => note.name).join(', ')}
                </div>
              </div>
              
              {/* Voicing Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePreviousVoicing}
                  disabled={currentVoicingIndex === 0}
                  className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Previous voicing"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <span className="text-sm text-gray-600 font-medium">
                  {currentVoicingIndex + 1} of {voicings.length}
                </span>
                
                <button
                  onClick={handleNextVoicing}
                  disabled={currentVoicingIndex === voicings.length - 1}
                  className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Next voicing"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full">
        <Fretboard 
          tuning={state.tuning}
          selectedVoicing={state.selectedVoicing?.positions || []}
          selectedChord={state.selectedChord}
          rootPositionMode={state.rootPositionMode}
          selectedRootPosition={state.rootPosition}
          onRootPositionClick={handleRootPositionClick}
        />
      </div>
    </div>
  );
}
