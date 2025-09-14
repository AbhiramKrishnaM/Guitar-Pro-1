import { GuitarControls } from '../components/GuitarControls/GuitarControls';
import { FretboardContainer } from '../components/Fretboard/FretboardContainer';
import { ProgressionCreator } from '../components/ProgressionCreator/ProgressionCreator';

export function Home() {
  return (
    <div className="space-y-6">
      {/* Guitar Controls */}
      <GuitarControls />

      {/* Fretboard - Full Width */}
      <FretboardContainer />

      {/* Main Content - Now simplified with floating navbar for chord access */}

      {/* Progression Creator - Full Width */}
      <ProgressionCreator />
    </div>
  );
}
