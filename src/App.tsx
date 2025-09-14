import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GuitarProvider } from './contexts/GuitarContext';
import { FloatingNavbar } from './components/FloatingNavbar/FloatingNavbar';
import { RightFloatingNavbar } from './components/RightFloatingNavbar/RightFloatingNavbar';
import { Notification } from './components/Notification/Notification';
import { Home } from './pages/Home';
import { ProgressionLibraryPage } from './pages/ProgressionLibraryPage';
import { ProgressionDetailPage } from './pages/ProgressionDetailPage';

function App() {
  return (
    <GuitarProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Floating Navbar */}
          <FloatingNavbar />
          
          {/* Right Floating Navbar */}
          <RightFloatingNavbar />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="container mx-auto px-4 py-6">
                  <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      Guitar Chord & Progression Creator
                    </h1>
                    <p className="text-gray-600">
                      Explore chords, create progressions, and master the fretboard
                    </p>
                  </header>
                  <Home />
                </div>
              } 
            />
            <Route path="/progressions" element={<ProgressionLibraryPage />} />
            <Route path="/progressions/:id" element={<ProgressionDetailPage />} />
          </Routes>
          
          {/* Notification */}
          <Notification />
        </div>
      </Router>
    </GuitarProvider>
  );
}

export default App;
