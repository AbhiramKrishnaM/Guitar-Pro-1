# Guitar Chord & Progression Creator App

## Project Description

### Objective

To develop a web application using React that serves as a comprehensive tool for guitarists. The app will allow users to explore, create, and visualize chords and chord progressions on both 6-string and 7-string guitars, adapting to custom tunings. The core functionality includes a dynamic fretboard UI, a chord library with inversions, and a drag-and-drop progression builder.

## Key Features

### Guitar Selection
- Users can choose between a 6-string or 7-string guitar.

### Tuning Management
- Pre-populated list of standard tunings (e.g., E standard, Drop D, D standard).
- Ability to add, edit, and save custom tunings using the browser's local storage.

### Dynamic Fretboard Visualization
A visual representation of the guitar fretboard that adapts in real-time to the selected guitar type and tuning.

- Displays the notes of selected chords.
- Highlights the root, third, and fifth of the chord.
- Shows fretting positions for selected chords and their inversions.

### Key & Mode Selection
- Users can select a musical key (e.g., C, G, A#).
- Users can select a mode (e.g., Ionian, Dorian, Phrygian).

### Chord Discovery
- Based on the selected key and mode, the app will display a list of available triadic chords (e.g., C major, D minor, E minor).
- Clicking a triad chord button will open a chord palette.

### Chord Palette & Inversions
- The palette will display all possible chord voicings for the selected triad, including extended chords (e.g., maj7, min9, dom13) and their inversions.
- Clicking on a specific voicing will display it on the fretboard UI.
- Navigation arrows will allow users to cycle through different inversions of a selected chord.

### Progression Creator
- A dedicated UI at the bottom of the screen.
- Users can drag and drop chords from the fretboard UI into this section to build a chord progression.
- The progression will be represented as a sequence of chord blocks.

## Technical Specification

### Implementation Details

#### 1. Data Structures & Logic

**Tuning Data:** An array or object storing string notes for each tuning. Custom tunings will be saved in the browser's localStorage API.

**Fretboard Logic:** The core of the app. This requires a mathematical model to calculate note positions.

- Each string is represented as a sequence of notes.
- Note on a fret = Open String Note + (Fret Number) semitones.
- A simple semitone-based lookup is sufficient.

**Musical Theory Engine:**

- **Key & Mode:** A lookup table or algorithm to generate the diatonic chords (triads) for a given key and mode.
- **Chord Generation:** An algorithm that takes a root note and chord type (e.g., min7, maj9) and generates the required notes (e.g., root, third, fifth, seventh, ninth).
- **Voicing & Inversion:** The most complex part. The app must have an algorithm to find all playable voicings of a chord on the fretboard, considering the current tuning. This involves searching for combinations of notes on different strings that match the chord notes.

  Inversions are found by simply changing the bass note of the chord to the third, fifth, or seventh. The voicing algorithm needs to find the most ergonomic (playable) ways to play these inversions.

#### 2. UI/UX & Front-End

- **Framework:** The application will be built using React with functional components and React Hooks (useState, useEffect, useContext, etc.) for state management.
- **Fretboard UI:** A scalable vector graphic (SVG) or a Canvas-based rendering will be used to draw the fretboard, frets, and strings. React libraries like react-svg or react-canvas can be considered, but a custom SVG component is likely the most flexible option.
- **Draggable Elements:** The chord representation on the fretboard UI should be a draggable element that can be moved to the progression creator UI. This will require a library like react-beautiful-dnd or react-dnd for handling the drag-and-drop gestures.
- **State Management:** For a project of this size, using React's built-in Context API for global state management (e.g., current tuning, selected key/mode) would be a good approach, avoiding the need for a more complex library like Redux.

## Project Timeline (High-Level)

### Phase 1: Core Functionality (4-6 weeks)

- **Weeks 1-2:** Set up the React project (create-react-app or Vite). Develop the basic UI for guitar selection and tuning. Implement the static fretboard SVG component.
- **Weeks 3-4:** Develop the core musical theory engine as a set of JavaScript utility functions. This includes the logic for generating chords based on key/mode and the algorithm for finding playable voicings and inversions.
- **Weeks 5-6:** Build the dynamic fretboard React component that displays chords correctly based on the selected tuning. Implement the chord discovery and palette UI components.

### Phase 2: Progression Creator & Enhancements (3-4 weeks)

- **Weeks 7-8:** Implement the drag-and-drop functionality using a React D&D library. Build the UI for the progression creator component.
- **Weeks 9-10:** Refine the UI/UX. Perform extensive testing to ensure all chord voicings and inversions are correct and display properly on different tunings.
- **Week 11:** Final bug fixes and preparation for deployment to a hosting service like Netlify or Vercel.

**Total Development Time:** ~11-12 weeks

This timeline is a realistic estimate for a small team or a single developer with a strong understanding of React. The use of a single codebase for the web means no separate deployment pipelines are needed for iOS and Android, simplifying the process.