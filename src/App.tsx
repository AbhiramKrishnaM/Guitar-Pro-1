import { GuitarProvider } from './contexts/GuitarContext';
import { GuitarControls } from './components/GuitarControls/GuitarControls';
import { FretboardContainer } from './components/Fretboard/FretboardContainer';
import { ProgressionCreator } from './components/ProgressionCreator/ProgressionCreator';
import { FloatingNavbar } from './components/FloatingNavbar/FloatingNavbar';
import { Notification } from './components/Notification/Notification';

function App() {
  return (
    <GuitarProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Floating Navbar */}
        <FloatingNavbar />
        
        <div className="container mx-auto px-4 py-6">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Guitar Chord & Progression Creator
            </h1>
            <p className="text-gray-600">
              Explore chords, create progressions, and master the fretboard
            </p>
          </header>

          <div className="space-y-6">
            {/* Guitar Controls */}
            <GuitarControls />

            {/* Fretboard - Full Width */}
            <FretboardContainer />

            {/* Main Content - Now simplified with floating navbar for chord access */}

            {/* Progression Creator - Full Width */}
            <ProgressionCreator />
          </div>
        </div>
        
        {/* Notification */}
        <Notification />
      </div>
    </GuitarProvider>
  );
}

export default App;
