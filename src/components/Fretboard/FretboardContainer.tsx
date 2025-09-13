import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { Fretboard } from './Fretboard';
import type { FretPosition } from '../../types/music';

export function FretboardContainer() {
  const { state, dispatch } = useGuitar();

  const handleRootPositionClick = (position: FretPosition) => {
    dispatch(guitarActions.setRootPosition(position));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Fretboard</h2>
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
