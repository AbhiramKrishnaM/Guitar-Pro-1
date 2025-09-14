import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Guitar, Zap } from 'lucide-react';
import { ALL_PROGRESSIONS } from '../../lib/progressionLibrary';
import { loadProgressionAndNavigate } from '../../lib/progressionLoader';
import { useGuitar } from '../../contexts/GuitarContext';

export function ProgressionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useGuitar();
  
  // Find the progression by ID
  const progression = ALL_PROGRESSIONS.find(p => p.id === id);

  if (!progression) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Progression Not Found</h1>
          <p className="text-gray-600 mb-6">The chord progression you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/progressions')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGenreIcon = (genre: string) => {
    switch (genre) {
      case 'progressive-metal': return <Zap className="w-5 h-5" />;
      case 'math-rock': return <Music className="w-5 h-5" />;
      default: return <Guitar className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/progressions')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Library</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {progression.name}
                </h1>
                <div className="flex items-center space-x-3 text-lg text-gray-600">
                  {getGenreIcon(progression.genre)}
                  <span className="capitalize">
                    {progression.genre.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(progression.difficulty)}`}>
                {progression.difficulty}
              </span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {progression.description}
            </p>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key & Mode</h3>
              <p className="text-2xl font-bold text-blue-600">
                {progression.key.name} {progression.mode}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Difficulty</h3>
              <span className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${getDifficultyColor(progression.difficulty)}`}>
                {progression.difficulty}
              </span>
            </div>
          </div>

          {/* Chord Progression */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Chord Progression</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {progression.chords.map((chord, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-xl p-6 mb-3 hover:bg-blue-200 transition-colors cursor-pointer">
                    <div className="text-2xl font-bold text-blue-800 mb-1">
                      {chord.symbol}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {chord.roman}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Bands */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Featured Bands</h3>
            <div className="flex flex-wrap gap-3">
              {progression.bands.map((band, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  {band}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {progression.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-lg font-medium hover:bg-purple-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/progressions')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Back to Library
            </button>
            <button
              onClick={() => {
                loadProgressionAndNavigate(progression, state.tuning, dispatch, navigate);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Load in Guitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
