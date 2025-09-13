import { GuitarProvider } from './contexts/GuitarContext';
import { GuitarControls } from './components/GuitarControls/GuitarControls';
import { FretboardContainer } from './components/Fretboard/FretboardContainer';
import { ChordDiscovery } from './components/ChordDiscovery/ChordDiscovery';
import { ChordPalette } from './components/ChordPalette/ChordPalette';
import { ProgressionCreator } from './components/ProgressionCreator/ProgressionCreator';

function App() {
  return (
    <GuitarProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Guitar Chord & Progression Creator
            </h1>
            <p className="text-gray-600">
              Explore chords, create progressions, and master the fretboard
            </p>
          </header>

          <div className="space-y-8">
            {/* Guitar Controls */}
            <GuitarControls />

            {/* Fretboard - Full Width */}
            <FretboardContainer />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Chord Discovery */}
              <div className="space-y-6">
                <ChordDiscovery />
              </div>

              {/* Right Column - Chord Palette */}
              <div className="space-y-6">
                <ChordPalette />
              </div>
            </div>

            {/* Progression Creator - Full Width */}
            <ProgressionCreator />
          </div>
        </div>
      </div>
    </GuitarProvider>
  );
}

export default App;
