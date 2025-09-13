import React from 'react';
import { useGuitar } from '../../contexts/GuitarContext';
import { Fretboard } from './Fretboard';

export function FretboardContainer() {
  const { state } = useGuitar();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Fretboard</h2>
      <div className="w-full">
        <Fretboard 
          tuning={state.tuning}
          selectedVoicing={state.selectedVoicing?.positions || []}
        />
      </div>
    </div>
  );
}
