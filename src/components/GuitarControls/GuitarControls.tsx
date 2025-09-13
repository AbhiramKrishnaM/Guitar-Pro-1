import React from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { getTuningsForGuitarType, getAllKeys, getAllModes } from '../../lib/musicTheory';

export function GuitarControls() {
  const { state, dispatch } = useGuitar();
  
  const availableTunings = getTuningsForGuitarType(state.guitarType);
  const availableKeys = getAllKeys();
  const availableModes = getAllModes();

  const handleGuitarTypeChange = (type: '6-string' | '7-string') => {
    dispatch(guitarActions.setGuitarType(type));
  };

  const handleTuningChange = (tuningId: string) => {
    const tuning = availableTunings.find(t => t.id === tuningId);
    if (tuning) {
      dispatch(guitarActions.setTuning(tuning));
    }
  };

  const handleKeyChange = (keyName: string) => {
    dispatch(guitarActions.setKey(keyName));
  };

  const handleModeChange = (mode: string) => {
    dispatch(guitarActions.setMode(mode));
  };

  return (
    <div className="guitar-controls bg-white p-6 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Guitar Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Guitar Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Guitar Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleGuitarTypeChange('6-string')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                state.guitarType === '6-string'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              6-String
            </button>
            <button
              onClick={() => handleGuitarTypeChange('7-string')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                state.guitarType === '7-string'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              7-String
            </button>
          </div>
        </div>

        {/* Tuning Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tuning
          </label>
          <select
            value={state.tuning.id}
            onChange={(e) => handleTuningChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availableTunings.map((tuning) => (
              <option key={tuning.id} value={tuning.id}>
                {tuning.name}
              </option>
            ))}
          </select>
        </div>

        {/* Key Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Key
          </label>
          <select
            value={state.key.name}
            onChange={(e) => handleKeyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availableKeys.map((key) => (
              <option key={key.name} value={key.name}>
                {key.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mode Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mode
          </label>
          <select
            value={state.mode}
            onChange={(e) => handleModeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availableModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Settings Display */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Settings</h3>
        <div className="text-sm text-gray-600">
          <p><span className="font-medium">Guitar:</span> {state.guitarType}</p>
          <p><span className="font-medium">Tuning:</span> {state.tuning.name}</p>
          <p><span className="font-medium">Key:</span> {state.key.name} {state.mode}</p>
          {state.selectedChord && (
            <p><span className="font-medium">Selected Chord:</span> {state.selectedChord.symbol}</p>
          )}
        </div>
      </div>
    </div>
  );
}
