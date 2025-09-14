import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { Fretboard } from './Fretboard';
import { findChordVoicings, generateDiatonicChords, getChordTypeCategories } from '../../lib/musicTheory';
import { Switch } from '../ui/switch';
import type { FretPosition, ChordVoicing, Chord } from '../../types/music';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FretboardContainer() {
  const { state, dispatch } = useGuitar();
  const [voicings, setVoicings] = useState<ChordVoicing[]>([]);
  const [currentVoicingIndex, setCurrentVoicingIndex] = useState(0);
  const [scaleChords, setScaleChords] = useState<Chord[]>([]);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [chordTypeCategories] = useState(getChordTypeCategories());
  const [currentChordTypeIndex, setCurrentChordTypeIndex] = useState(0);

  // Memoize scale chords calculation
  const scaleChordsMemo = useMemo(() => {
    return generateDiatonicChords(state.key, state.mode, state.chordTypeFilter);
  }, [state.key, state.mode, state.chordTypeFilter]);

  // Memoize voicings calculation to prevent unnecessary recalculations
  const chordVoicings = useMemo(() => {
    if (!state.selectedChord) return [];
    return findChordVoicings(state.selectedChord, state.tuning, 24, state.voicingFlexibility, state.rootPosition);
  }, [state.selectedChord, state.tuning, state.voicingFlexibility, state.rootPosition]);

  // Update scale chords when key, mode, or chord type filter changes
  useEffect(() => {
    setScaleChords(scaleChordsMemo);
    setCurrentChordIndex(0);
  }, [scaleChordsMemo]);

  // Auto-select first chord when scale changes and no chord is selected
  useEffect(() => {
    if (scaleChords.length > 0 && !state.selectedChord) {
      dispatch(guitarActions.setSelectedChord(scaleChords[0]));
    }
  }, [scaleChords, state.selectedChord, dispatch]);

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

  // Sync current chord index when selected chord changes from external sources
  useEffect(() => {
    if (state.selectedChord && scaleChords.length > 0) {
      const chordIndex = scaleChords.findIndex(c => c.symbol === state.selectedChord?.symbol);
      if (chordIndex !== -1 && chordIndex !== currentChordIndex) {
        setCurrentChordIndex(chordIndex);
      }
    }
  }, [state.selectedChord, scaleChords, currentChordIndex]);

  // Sync current chord type index when chord type filter changes from external sources
  useEffect(() => {
    if (state.chordTypeFilter.length > 0) {
      const chordTypeIndex = chordTypeCategories.findIndex(c => c.id === state.chordTypeFilter[0]);
      if (chordTypeIndex !== -1 && chordTypeIndex !== currentChordTypeIndex) {
        setCurrentChordTypeIndex(chordTypeIndex);
      }
    }
  }, [state.chordTypeFilter, chordTypeCategories]);

  const handleRootPositionClick = (position: FretPosition) => {
    dispatch(guitarActions.setRootPosition(position));
  };

  const handleRootPositionToggle = () => {
    dispatch(guitarActions.setRootPositionMode(!state.rootPositionMode));
  };

  // Chord navigation handlers
  const handlePreviousChord = useCallback(() => {
    if (currentChordIndex > 0) {
      const newIndex = currentChordIndex - 1;
      setCurrentChordIndex(newIndex);
      dispatch(guitarActions.setSelectedChord(scaleChords[newIndex]));
    }
  }, [currentChordIndex, scaleChords, dispatch]);

  const handleNextChord = useCallback(() => {
    if (currentChordIndex < scaleChords.length - 1) {
      const newIndex = currentChordIndex + 1;
      setCurrentChordIndex(newIndex);
      dispatch(guitarActions.setSelectedChord(scaleChords[newIndex]));
    }
  }, [currentChordIndex, scaleChords, dispatch]);

  const handleChordSelect = useCallback((chord: Chord) => {
    const chordIndex = scaleChords.findIndex(c => c.symbol === chord.symbol);
    if (chordIndex !== -1) {
      setCurrentChordIndex(chordIndex);
      dispatch(guitarActions.setSelectedChord(chord));
    }
  }, [scaleChords, dispatch]);

  // Chord type navigation handlers
  const handlePreviousChordType = useCallback(() => {
    if (currentChordTypeIndex > 0) {
      const newIndex = currentChordTypeIndex - 1;
      setCurrentChordTypeIndex(newIndex);
      const newChordType = chordTypeCategories[newIndex].id;
      dispatch(guitarActions.setChordTypeFilter([newChordType]));
    }
  }, [currentChordTypeIndex, chordTypeCategories, dispatch]);

  const handleNextChordType = useCallback(() => {
    if (currentChordTypeIndex < chordTypeCategories.length - 1) {
      const newIndex = currentChordTypeIndex + 1;
      setCurrentChordTypeIndex(newIndex);
      const newChordType = chordTypeCategories[newIndex].id;
      dispatch(guitarActions.setChordTypeFilter([newChordType]));
    }
  }, [currentChordTypeIndex, chordTypeCategories, dispatch]);

  const handleChordTypeSelect = useCallback((chordTypeId: string) => {
    const chordTypeIndex = chordTypeCategories.findIndex(c => c.id === chordTypeId);
    if (chordTypeIndex !== -1 && chordTypeIndex !== currentChordTypeIndex) {
      setCurrentChordTypeIndex(chordTypeIndex);
      dispatch(guitarActions.setChordTypeFilter([chordTypeId]));
    }
  }, [chordTypeCategories, currentChordTypeIndex, dispatch]);

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
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Fretboard</h2>
          
          {/* Chord Selector */}
          {scaleChords.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousChord}
                disabled={currentChordIndex === 0}
                className="p-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous chord"
              >
                <ChevronLeft size={16} />
              </button>
              
              <select
                value={state.selectedChord?.symbol || ''}
                onChange={(e) => {
                  const selectedChord = scaleChords.find(c => c.symbol === e.target.value);
                  if (selectedChord) {
                    handleChordSelect(selectedChord);
                  }
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium min-w-[120px]"
              >
                {scaleChords.map((chord) => (
                  <option key={chord.symbol} value={chord.symbol}>
                    {chord.symbol}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleNextChord}
                disabled={currentChordIndex === scaleChords.length - 1}
                className="p-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next chord"
              >
                <ChevronRight size={16} />
              </button>
              
              <span className="text-sm text-gray-500 font-medium">
                {currentChordIndex + 1} of {scaleChords.length}
              </span>
            </div>
          )}
          
          {/* Chord Type Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousChordType}
              disabled={currentChordTypeIndex === 0}
              className="p-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous chord type"
            >
              <ChevronLeft size={16} />
            </button>
            
            <select
              value={state.chordTypeFilter[0] || ''}
              onChange={(e) => {
                handleChordTypeSelect(e.target.value);
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium min-w-[140px]"
            >
              {chordTypeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleNextChordType}
              disabled={currentChordTypeIndex === chordTypeCategories.length - 1}
              className="p-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next chord type"
            >
              <ChevronRight size={16} />
            </button>
            
            <span className="text-sm text-gray-500 font-medium">
              {currentChordTypeIndex + 1} of {chordTypeCategories.length}
            </span>
          </div>
        </div>
        
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
