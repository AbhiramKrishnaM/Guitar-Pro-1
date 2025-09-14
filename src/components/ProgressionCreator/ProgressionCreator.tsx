import React from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import type { ChordVoicing } from '../../types/music';

function SortableItem({ 
  id, 
  voicing, 
  index, 
  onRemove, 
  onChordClick,
  chordSymbol 
}: { 
  id: string; 
  voicing: ChordVoicing; 
  index: number; 
  onRemove: (index: number) => void; 
  onChordClick: (voicing: ChordVoicing) => void;
  chordSymbol: string; 
}) {
  const {
    // attributes,
    // listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const handleChordClick = (e: React.MouseEvent) => {
    // Prevent drag when clicking on chord
    e.stopPropagation();
    e.preventDefault();
    onChordClick(voicing);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    // Prevent drag when clicking remove button
    e.stopPropagation();
    e.preventDefault();
    onRemove(index);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-3 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
        isDragging ? 'rotate-2 scale-105' : ''
      }`}
      onClick={handleChordClick}
      title="Click to view on fretboard"
      // Temporarily disable drag and drop to test clicks
      // {...attributes}
      // {...listeners}
    >
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="text-sm font-medium text-gray-800">
            {chordSymbol}
          </div>
          <div className="text-xs text-gray-600">
            {voicing.difficulty}
          </div>
        </div>
        <button
          onClick={handleRemoveClick}
          className="ml-2 text-red-500 hover:text-red-700 text-sm hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
          title="Remove chord"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function DroppableArea({ children }: { children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'progression',
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 transition-colors ${
        isOver 
          ? 'border-blue-400 bg-blue-100' 
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      {children}
    </div>
  );
}

export function ProgressionCreator() {
  const { state, dispatch } = useGuitar();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeIndex = state.progression.findIndex((_, index) => index.toString() === active.id);
    const overIndex = state.progression.findIndex((_, index) => index.toString() === over.id);

    if (activeIndex !== overIndex) {
      // Simple array reordering without external library
      const newProgression = [...state.progression];
      const [removed] = newProgression.splice(activeIndex, 1);
      newProgression.splice(overIndex, 0, removed);
      
    }
  };

  const handleRemoveChord = (index: number) => {
    dispatch(guitarActions.removeChordFromProgression(index));
  };

  const handleChordClick = (voicing: ChordVoicing) => {
    // Set the chord and voicing to display on the fretboard
    dispatch(guitarActions.setSelectedChord(voicing.chord));
    dispatch(guitarActions.setSelectedVoicing(voicing));
  };

  const handleClearProgression = () => {
    dispatch(guitarActions.clearProgression());
  };

  const handleSaveProgression = () => {
    if (state.progression.length === 0) return;

    const progression = {
      id: Date.now().toString(),
      name: `Progression in ${state.key.name} ${state.mode}`,
      chords: state.progression,
      key: state.key,
      mode: state.mode
    };

    dispatch(guitarActions.saveProgression(progression));
  };


  return (
    <div className="progression-creator bg-white p-4 rounded-lg shadow-lg border">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-gray-800">Chord Progression</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleClearProgression}
            disabled={state.progression.length === 0}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSaveProgression}
            disabled={state.progression.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea>
          {state.progression.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <p className="text-base mb-1">No chords in progression</p>
              <p className="text-sm">Add chords from the chord palette above</p>
            </div>
          ) : (
            <SortableContext items={state.progression.map((_, index) => index.toString())}>
              <div className="flex flex-wrap gap-3">
                {state.progression.map((voicing, index) => (
                  <SortableItem 
                    key={index} 
                    id={index.toString()} 
                    voicing={voicing} 
                    index={index}
                    onRemove={handleRemoveChord}
                    onChordClick={handleChordClick}
                    chordSymbol={voicing.chord.symbol}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </DroppableArea>
      </DndContext>

      {/* Progression Info */}
      {state.progression.length > 0 && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Progression Info</h3>
          <div className="text-sm text-blue-700">
            <p><span className="font-medium">Key:</span> {state.key.name} {state.mode}</p>
            <p><span className="font-medium">Chords:</span> {state.progression.length}</p>
            <p><span className="font-medium">Difficulty:</span> {
              state.progression.some(v => v.difficulty === 'hard') ? 'Hard' :
              state.progression.some(v => v.difficulty === 'medium') ? 'Medium' : 'Easy'
            }</p>
          </div>
        </div>
      )}
    </div>
  );
}
