import { useState, useMemo } from 'react';
import { Search, Filter, Music, Guitar, Zap } from 'lucide-react';
import { ALL_PROGRESSIONS, getProgressionsByGenre, searchProgressions } from '../../lib/progressionLibrary';
import { ProgressionModal } from '../ProgressionModal/ProgressionModal';
import type { ProgressionData } from '../../lib/progressionLibrary';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { createChordForFretboard } from '../../lib/musicTheory';

interface ProgressionLibraryModalProps {
  className?: string;
}

type FilterType = 'all' | 'progressive-metal' | 'math-rock';
type DifficultyType = 'all' | 'beginner' | 'intermediate' | 'advanced';

export function ProgressionLibraryModal({ className = '' }: ProgressionLibraryModalProps) {
  const { state, dispatch } = useGuitar();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<FilterType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyType>('all');
  const [selectedProgression, setSelectedProgression] = useState<ProgressionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter progressions based on search and filters
  const filteredProgressions = useMemo(() => {
    let progressions = ALL_PROGRESSIONS;

    // Apply genre filter
    if (selectedGenre !== 'all') {
      progressions = getProgressionsByGenre(selectedGenre);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      progressions = progressions.filter(p => p.difficulty === selectedDifficulty);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      progressions = searchProgressions(searchQuery);
    }

    return progressions;
  }, [searchQuery, selectedGenre, selectedDifficulty]);

  const handleProgressionClick = (progression: ProgressionData) => {
    setSelectedProgression(progression);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgression(null);
  };

  const handleChordClick = (chordSymbol: string, progression: ProgressionData) => {
    try {
      // Find the chord data from the progression
      const chordData = progression.chords.find(c => c.symbol === chordSymbol);
      if (!chordData) return;
      
      // Use the robust chord creation function
      const { chord, voicings } = createChordForFretboard(chordData.root, chordData.type, state.tuning);
      
      // Set the selected chord and voicing
      dispatch(guitarActions.setSelectedChord(chord));
      if (voicings.length > 0) {
        dispatch(guitarActions.setSelectedVoicing(voicings[0]));
      }
    } catch (error) {
      console.error('Error selecting chord:', error);
    }
  };

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
      case 'progressive-metal': return <Zap className="w-4 h-4" />;
      case 'math-rock': return <Music className="w-4 h-4" />;
      default: return <Guitar className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search progressions, bands, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Genre Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value as FilterType)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Genres</option>
                <option value="progressive-metal">Progressive Metal</option>
                <option value="math-rock">Math Rock</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyType)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Progressions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgressions.map((progression) => (
            <div
              key={progression.id}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProgressionClick(progression)}
            >
              {/* Progression Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {progression.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {getGenreIcon(progression.genre)}
                    <span className="capitalize">
                      {progression.genre.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(progression.difficulty)}`}>
                  {progression.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {progression.description}
              </p>

              {/* Chord Progression */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {progression.chords.map((chord, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChordClick(chord.symbol, progression);
                      }}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {chord.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bands */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Featured in:</p>
                <div className="flex flex-wrap gap-1">
                  {progression.bands.map((band, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                    >
                      {band}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {progression.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProgressions.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No progressions found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

      </div>

      {/* Modal */}
      <ProgressionModal
        progression={selectedProgression}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
