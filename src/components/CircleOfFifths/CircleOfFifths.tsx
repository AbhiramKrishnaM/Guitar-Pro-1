import React, { useState, useMemo } from 'react';
import { useGuitar } from '../../contexts/GuitarContext';
import { NOTES, generateDiatonicChords, generateChord, addSemitones, findChordVoicings } from '../../lib/musicTheory';
import type { Note, Chord, ChordVoicing } from '../../types/music';

interface CircleOfFifthsProps {
  onChordSelect?: (chord: Chord) => void;
  onKeySelect?: (key: Note, mode: string) => void;
  onVoicingSelect?: (voicing: ChordVoicing) => void;
}

interface CircleKey {
  note: Note;
  isMajor: boolean;
  angle: number;
  x: number;
  y: number;
  chords: Chord[];
}

export function CircleOfFifths({ onChordSelect, onKeySelect, onVoicingSelect }: CircleOfFifthsProps) {
  const { state } = useGuitar();
  const [selectedKey, setSelectedKey] = useState<Note | null>(state.key);
  const [selectedMode, setSelectedMode] = useState<string>(state.mode);
  const [hoveredKey, setHoveredKey] = useState<Note | null>(null);
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);
  const [chordVoicings, setChordVoicings] = useState<ChordVoicing[]>([]);

  // Circle of Fifths data - major keys in order
  const circleKeys: Note[] = [
    NOTES[0],  // C
    NOTES[7],  // G
    NOTES[2],  // D
    NOTES[9],  // A
    NOTES[4],  // E
    NOTES[11], // B
    NOTES[6],  // F#
    NOTES[1],  // C#
    NOTES[8],  // G#
    NOTES[3],  // D#
    NOTES[10], // A#
    NOTES[5]   // F
  ];

  // Calculate positions for each key on the circle
  const circleData: CircleKey[] = useMemo(() => {
    const radius = 140;
    const centerX = 180;
    const centerY = 180;

    return circleKeys.map((note, index) => {
      const angle = (index * 30) * (Math.PI / 180); // 30 degrees per key
      const x = centerX + radius * Math.cos(angle - Math.PI / 2); // Start from top
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);

      // Generate diatonic chords for this key
      const majorChords = generateDiatonicChords(note, 'Ionian', ['triad']);
      const minorChords = generateDiatonicChords(note, 'Aeolian', ['triad']);

      return {
        note,
        isMajor: true,
        angle: angle * (180 / Math.PI),
        x,
        y,
        chords: majorChords
      };
    });
  }, [circleKeys]);

  // Get relative minor for a major key
  const getRelativeMinor = (majorKey: Note): Note => {
    return addSemitones(majorKey, 9); // Relative minor is 9 semitones up (or 3 down)
  };

  // Get relative major for a minor key
  const getRelativeMajor = (minorKey: Note): Note => {
    return addSemitones(minorKey, 3); // Relative major is 3 semitones up
  };

  // Get suggested chords for the current key and mode
  const suggestedChords = useMemo(() => {
    if (!selectedKey) return [];
    
    const chords = generateDiatonicChords(selectedKey, selectedMode, ['triad', '7th']);
    return chords;
  }, [selectedKey, selectedMode]);

  // Get transition suggestions (neighboring keys in circle of fifths)
  const transitionSuggestions = useMemo(() => {
    if (!selectedKey) return [];
    
    const currentIndex = circleKeys.findIndex(key => key.semitone === selectedKey.semitone);
    if (currentIndex === -1) return [];

    const suggestions = [];
    
    // Clockwise neighbor (dominant)
    const dominantIndex = (currentIndex + 1) % circleKeys.length;
    suggestions.push({
      key: circleKeys[dominantIndex],
      relationship: 'Dominant',
      description: 'Perfect 5th up'
    });

    // Counter-clockwise neighbor (subdominant)
    const subdominantIndex = (currentIndex - 1 + circleKeys.length) % circleKeys.length;
    suggestions.push({
      key: circleKeys[subdominantIndex],
      relationship: 'Subdominant',
      description: 'Perfect 5th down'
    });

    // Relative minor/major
    if (selectedMode === 'Ionian') {
      const relativeMinor = getRelativeMinor(selectedKey);
      suggestions.push({
        key: relativeMinor,
        relationship: 'Relative Minor',
        description: 'Parallel minor key'
      });
    } else if (selectedMode === 'Aeolian') {
      const relativeMajor = getRelativeMajor(selectedKey);
      suggestions.push({
        key: relativeMajor,
        relationship: 'Relative Major',
        description: 'Parallel major key'
      });
    }

    return suggestions;
  }, [selectedKey, selectedMode, circleKeys]);

  const handleKeyClick = (key: CircleKey) => {
    setSelectedKey(key.note);
    setSelectedMode('Ionian');
    onKeySelect?.(key.note, 'Ionian');
  };

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    if (selectedKey) {
      onKeySelect?.(selectedKey, mode);
    }
  };

  const handleChordClick = (chord: Chord) => {
    setSelectedChord(chord);
    onChordSelect?.(chord);
    
    // Generate voicings for this chord
    const voicings = findChordVoicings(chord, state.tuning, 24, 'flexible');
    setChordVoicings(voicings.slice(0, 6)); // Show top 6 voicings
  };

  const handleVoicingClick = (voicing: ChordVoicing) => {
    onVoicingSelect?.(voicing);
  };

  const handleTransitionClick = (key: Note) => {
    setSelectedKey(key);
    onKeySelect?.(key, selectedMode);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Circle of Fifths</h2>
        <p className="text-gray-600">Click on keys to explore chord progressions and transitions</p>
      </div>

      <div className="space-y-6">
        {/* Circle of Fifths Visualization */}
        <div className="flex justify-center">
          <div className="relative w-96 h-96">
            <svg width="360" height="360" className="absolute inset-0">
              {/* Circle background */}
              <circle
                cx="180"
                cy="180"
                r="140"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              
              {/* Key segments */}
              {circleData.map((key, index) => {
                const isSelected = selectedKey?.semitone === key.note.semitone;
                const isHovered = hoveredKey?.semitone === key.note.semitone;
                
                return (
                  <g key={key.note.name}>
                    {/* Segment background */}
                    <path
                      d={`M 180 180 L ${key.x} ${key.y} A 140 140 0 0 1 ${
                        circleData[(index + 1) % circleData.length].x
                      } ${
                        circleData[(index + 1) % circleData.length].y
                      } Z`}
                      fill={
                        isSelected 
                          ? '#3b82f6' 
                          : isHovered 
                            ? '#dbeafe' 
                            : index % 2 === 0 
                              ? '#f9fafb' 
                              : '#f3f4f6'
                      }
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      className="cursor-pointer transition-colors"
                      onClick={() => handleKeyClick(key)}
                      onMouseEnter={() => setHoveredKey(key.note)}
                      onMouseLeave={() => setHoveredKey(null)}
                    />
                    
                    {/* Key label */}
                    <text
                      x={key.x}
                      y={key.y - 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-base font-bold ${
                        isSelected ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {key.note.name}
                    </text>
                    
                    {/* Mode indicator */}
                    <text
                      x={key.x}
                      y={key.y + 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-xs ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {key.isMajor ? 'maj' : 'min'}
                    </text>
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle
                cx="180"
                cy="180"
                r="50"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              
              {/* Center text */}
              <text
                x="180"
                y="180"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold text-gray-800"
              >
                {selectedKey?.name || 'C'}
              </text>
            </svg>
          </div>
        </div>

        {/* Controls and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key and Mode Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Key & Mode</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key
                </label>
                <select
                  value={selectedKey?.name || 'C'}
                  onChange={(e) => {
                    const key = NOTES.find(n => n.name === e.target.value);
                    if (key) {
                      setSelectedKey(key);
                      onKeySelect?.(key, selectedMode);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {NOTES.map(note => (
                    <option key={note.name} value={note.name}>
                      {note.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode
                </label>
                <select
                  value={selectedMode}
                  onChange={(e) => handleModeChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Ionian">Ionian (Major)</option>
                  <option value="Dorian">Dorian</option>
                  <option value="Phrygian">Phrygian</option>
                  <option value="Lydian">Lydian</option>
                  <option value="Mixolydian">Mixolydian</option>
                  <option value="Aeolian">Aeolian (Minor)</option>
                  <option value="Locrian">Locrian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Suggested Chords */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Diatonic Chords in {selectedKey?.name} {selectedMode}</h3>
            <div className="grid grid-cols-2 gap-2">
              {suggestedChords.slice(0, 8).map((chord, index) => (
                <button
                  key={`${chord.symbol}-${index}`}
                  onClick={() => handleChordClick(chord)}
                  className={`p-2 text-sm border rounded transition-colors ${
                    selectedChord?.symbol === chord.symbol
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  {chord.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Chord Voicings */}
          {selectedChord && chordVoicings.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Chord Voicings for {selectedChord.symbol}</h3>
              <div className="space-y-2">
                {chordVoicings.map((voicing, index) => (
                  <button
                    key={index}
                    onClick={() => handleVoicingClick(voicing)}
                    className="w-full p-3 text-left bg-white border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">
                          {voicing.chord.symbol} {voicing.inversion > 0 ? `(${voicing.inversion}${voicing.inversion === 1 ? 'st' : voicing.inversion === 2 ? 'nd' : 'rd'} inversion)` : ''}
                        </div>
                        <div className="text-sm text-gray-600">
                          Difficulty: {voicing.difficulty} • {voicing.positions.length} notes
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {voicing.positions.map(pos => `${pos.string + 1}${pos.fret}`).join(' ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Key Transitions - Full Width at Bottom */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Key Transitions</h3>
          <div className="flex flex-wrap gap-3">
            {transitionSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleTransitionClick(suggestion.key)}
                className="flex-1 min-w-48 p-3 text-left bg-white border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="font-medium text-gray-800">
                  {suggestion.key.name} {suggestion.relationship}
                </div>
                <div className="text-sm text-gray-600">
                  {suggestion.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
