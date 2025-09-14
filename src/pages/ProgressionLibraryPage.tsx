import { ProgressionLibrary } from '../components/ProgressionLibrary/ProgressionLibrary';

export function ProgressionLibraryPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Chord Progression Library
          </h1>
          <p className="text-gray-600">
            Explore chord progressions from progressive metal and math rock bands
          </p>
        </header>

        <ProgressionLibrary />
      </div>
    </div>
  );
}
