import { X, Music, Guitar, Zap } from 'lucide-react';
import { loadProgressionAndNavigate } from '../../lib/progressionLoader';
import { useGuitar } from '../../contexts/GuitarContext';
import { useNavigate } from 'react-router-dom';
import type { ProgressionData } from '../../lib/progressionLibrary';

interface ProgressionModalProps {
  progression: ProgressionData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressionModal({ progression, isOpen, onClose }: ProgressionModalProps) {
  const { state, dispatch } = useGuitar();
  const navigate = useNavigate();
  
  if (!isOpen || !progression) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getGenreIcon(progression.genre)}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {progression.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(progression.difficulty)}`}>
                    {progression.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">
                  {progression.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key & Mode</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {progression.key.name} {progression.mode}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Genre</h3>
                <div className="flex items-center space-x-2">
                  {getGenreIcon(progression.genre)}
                  <span className="text-xl font-medium text-gray-700 capitalize">
                    {progression.genre.replace('-', ' ')}
                  </span>
                </div>
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
                onClick={() => {
                  loadProgressionAndNavigate(progression, state.tuning, dispatch, navigate);
                  onClose(); // Close the modal after loading
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Load in Guitar
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
