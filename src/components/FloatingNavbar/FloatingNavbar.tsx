import { useState, useEffect } from 'react';
import { Music, Guitar, X, Layers } from 'lucide-react';
import { ChordDiscovery } from '../ChordDiscovery/ChordDiscovery';
import { ChordPalette } from '../ChordPalette/ChordPalette';
import { useGuitar } from '../../contexts/GuitarContext';

interface FloatingNavbarProps {
  className?: string;
}

type TabType = 'chords' | 'voicings' | 'explorer';

export function FloatingNavbar({ className = '' }: FloatingNavbarProps) {
  const { state } = useGuitar();
  const [isChordsOpen, setIsChordsOpen] = useState(false);
  const [isVoicingsOpen, setIsVoicingsOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chords');
  const [lastSelectedChordId, setLastSelectedChordId] = useState<string | null>(null);

  // Auto-switch to voicings tab when a chord is selected (only once per chord)
  useEffect(() => {
    const currentChordId = state.selectedChord ? `${state.selectedChord.root.name}-${state.selectedChord.type}` : null;
    
    if (isExplorerOpen && state.selectedChord && activeTab === 'chords' && lastSelectedChordId !== currentChordId) {
      setActiveTab('voicings');
      setLastSelectedChordId(currentChordId);
    }
  }, [state.selectedChord, isExplorerOpen, activeTab, lastSelectedChordId]);

  const toggleChords = () => {
    setIsChordsOpen(!isChordsOpen);
    if (isVoicingsOpen) setIsVoicingsOpen(false);
    if (isExplorerOpen) setIsExplorerOpen(false);
  };

  const toggleVoicings = () => {
    setIsVoicingsOpen(!isVoicingsOpen);
    if (isChordsOpen) setIsChordsOpen(false);
    if (isExplorerOpen) setIsExplorerOpen(false);
  };

  const toggleExplorer = () => {
    setIsExplorerOpen(!isExplorerOpen);
    if (isChordsOpen) setIsChordsOpen(false);
    if (isVoicingsOpen) setIsVoicingsOpen(false);
    if (!isExplorerOpen) {
      setActiveTab('chords'); // Reset to chords tab when opening
      setLastSelectedChordId(null); // Reset chord tracking when opening
    }
  };

  const closeOverlay = () => {
    setIsChordsOpen(false);
    setIsVoicingsOpen(false);
    setIsExplorerOpen(false);
  };

  return (
    <>
      {/* Floating Navbar */}
      <div className={`fixed left-2 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
        <div className="flex flex-col space-y-3 ml-2">
          {/* Chord Explorer Button */}
          <button
            onClick={toggleExplorer}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
              isExplorerOpen
                ? 'bg-purple-600 text-white scale-110'
                : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600'
            }`}
            title="Chord Explorer - Browse chords and voicings"
          >
            <Layers size={20} />
          </button>

          {/* Chords Button */}
          {/* <button
            onClick={toggleChords}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
              isChordsOpen
                ? 'bg-blue-600 text-white scale-110'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            title="Chords in C Ionian"
          >
            <Music size={20} />
          </button> */}

          {/* Voicings Button */}
          {/* <button
            onClick={toggleVoicings}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
              isVoicingsOpen
                ? 'bg-blue-600 text-white scale-110'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            title="Chord Voicings"
          >
            <Guitar size={20} />
          </button> */}
        </div>
      </div>

      {/* Chords Overlay */}
      {isChordsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
          {/* Overlay Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden mb-8 pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Chords in C Ionian</h2>
              <button
                onClick={closeOverlay}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <ChordDiscovery />
            </div>
          </div>
        </div>
      )}

      {/* Voicings Overlay */}
      {isVoicingsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
          {/* Overlay Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[80vh] overflow-hidden mb-8 pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Chord Voicings</h2>
              <button
                onClick={closeOverlay}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <ChordPalette />
            </div>
          </div>
        </div>
      )}

      {/* Chord Explorer Overlay */}
      {isExplorerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
          {/* Overlay Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[85vh] overflow-hidden mb-8 pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Chord Explorer</h2>
              <button
                onClick={closeOverlay}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b bg-gray-50">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('chords')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'chords'
                      ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Music size={16} className="inline mr-2" />
                  Browse Chords
                </button>
                <button
                  onClick={() => setActiveTab('voicings')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'voicings'
                      ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Guitar size={16} className="inline mr-2" />
                  View Voicings
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 max-h-[calc(85vh-120px)] overflow-y-auto">
              {activeTab === 'chords' && <ChordDiscovery />}
              {activeTab === 'voicings' && (
                <ChordPalette 
                  showBackButton={true}
                  onBackToChords={() => setActiveTab('chords')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
