import { useState } from 'react';
import { CircleOfFifths } from '../CircleOfFifths/CircleOfFifths';
import { Modal } from '../Modal/Modal';
import { useGuitar } from '../../contexts/GuitarContext';
import { guitarActions } from '../../contexts/GuitarContext';
import type { Chord, ChordVoicing } from '../../types/music';

export function RightFloatingNavbar() {
  const { dispatch } = useGuitar();
  const [isCircleOfFifthsOpen, setIsCircleOfFifthsOpen] = useState(false);

  const handleChordSelect = (chord: Chord) => {
    dispatch(guitarActions.setSelectedChord(chord));
    setIsCircleOfFifthsOpen(false);
  };

  const handleKeySelect = (key: any, mode: string) => {
    dispatch(guitarActions.setKey(key.name));
    dispatch(guitarActions.setMode(mode));
  };

  const handleVoicingSelect = (voicing: ChordVoicing) => {
    dispatch(guitarActions.setSelectedVoicing(voicing));
    setIsCircleOfFifthsOpen(false);
  };

  return (
    <>
      {/* Right Floating Navbar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {/* Circle of Fifths Button */}
          <button
            onClick={() => setIsCircleOfFifthsOpen(true)}
            className="group relative p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            title="Circle of Fifths"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="2" />
              <path d="M12 22a10 10 0 0 1-10-10" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
            </svg>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                Circle of Fifths
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>

          {/* Additional tools can be added here */}
          <button
            className="group relative p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            title="Coming Soon"
            disabled
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                More Tools Coming Soon
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Circle of Fifths Modal */}
      <Modal
        isOpen={isCircleOfFifthsOpen}
        onClose={() => setIsCircleOfFifthsOpen(false)}
        title="Circle of Fifths"
        size="xl"
      >
        <CircleOfFifths
          onChordSelect={handleChordSelect}
          onKeySelect={handleKeySelect}
          onVoicingSelect={handleVoicingSelect}
        />
      </Modal>
    </>
  );
}
