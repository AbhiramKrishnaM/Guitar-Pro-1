import type { Tuning, FretPosition } from '../../types/music';
import './Fretboard.css';

interface FretboardProps {
  tuning: Tuning;
  selectedVoicing?: FretPosition[];
  onFretClick?: (stringIndex: number, fret: number) => void;
  className?: string;
}

export function Fretboard({ 
  tuning, 
  selectedVoicing = [], 
  onFretClick,
  className = '' 
}: FretboardProps) {
  const stringCount = tuning.strings.length;
  const fretCount = 24; // Display 24 frets
  const stringSpacing = 30;
  const nutWidth = 20;
  const headstockWidth = 60;
  
  // Calculate responsive width - use container width or minimum width
  const minWidth = headstockWidth + nutWidth + (fretCount * 30); // 30px per fret for better visibility
  const endPadding = 20; // Add padding at the end to prevent cropping
  const totalWidth = Math.max(minWidth, 1200) + endPadding; // At least 1200px wide for 24 frets + padding
  const totalHeight = (stringCount - 1) * stringSpacing + 40;

  // Calculate fret positions (they get closer together as you go up the neck)
  const fretPositions = [0]; // Nut position
  const playableWidth = totalWidth - headstockWidth - nutWidth - endPadding;
  
  // Calculate fret positions using the 12th root of 2 formula
  // Scale the formula so that the 24th fret reaches exactly the end (before padding)
  const scaleFactor = playableWidth / (1 - Math.pow(2, -fretCount/12));
  
  for (let i = 1; i <= fretCount; i++) {
    const fretPosition = scaleFactor * (1 - Math.pow(2, -i/12)) + headstockWidth + nutWidth;
    fretPositions.push(fretPosition);
  }


  return (
    <div className={`fretboard-container ${className}`}>
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="fretboard-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Strings */}
        {tuning.strings.map((_, stringIndex) => {
          const y = stringIndex * stringSpacing + 20;
          return (
            <line
              key={stringIndex}
              x1={headstockWidth}
              x2={totalWidth}
              y1={y}
              y2={y}
              stroke="#333"
              strokeWidth={stringIndex === 0 || stringIndex === stringCount - 1 ? 2 : 1.5}
              className="string"
            />
          );
        })}

        {/* Frets */}
        {fretPositions.map((x, fretIndex) => (
          <line
            key={fretIndex}
            x1={x}
            x2={x}
            y1={20}
            y2={totalHeight - 20}
            stroke={fretIndex === 0 ? "#8B4513" : "#666"}
            strokeWidth={fretIndex === 0 ? 4 : 1}
            className="fret"
          />
        ))}

        {/* Fret markers (dots) */}
        {[3, 5, 7, 9, 12, 15, 17, 19, 21, 24].map(fret => {
          if (fret > fretCount) return null;
          const x = fretPositions[fret];
          return (
            <g key={fret}>
              {/* Top dot */}
              <circle
                cx={x}
                cy={15}
                r={3}
                fill="#666"
                className="fret-marker"
              />
              {/* Bottom dot */}
              <circle
                cx={x}
                cy={totalHeight - 15}
                r={3}
                fill="#666"
                className="fret-marker"
              />
              {/* Special marker for 12th and 24th frets */}
              {(fret === 12 || fret === 24) && (
                <>
                  <circle
                    cx={x - 5}
                    cy={15}
                    r={2}
                    fill="#666"
                    className="fret-marker"
                  />
                  <circle
                    cx={x + 5}
                    cy={15}
                    r={2}
                    fill="#666"
                    className="fret-marker"
                  />
                  <circle
                    cx={x - 5}
                    cy={totalHeight - 15}
                    r={2}
                    fill="#666"
                    className="fret-marker"
                  />
                  <circle
                    cx={x + 5}
                    cy={totalHeight - 15}
                    r={2}
                    fill="#666"
                    className="fret-marker"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Selected chord positions */}
        {selectedVoicing.map((position, index) => {
          const x = position.fret === 0 
            ? headstockWidth + nutWidth / 2 
            : fretPositions[position.fret] - (fretPositions[position.fret] - fretPositions[position.fret - 1]) / 2;
          const y = position.string * stringSpacing + 20;
          
          return (
            <g key={index}>
              {/* Finger position circle */}
              <circle
                cx={x}
                cy={y}
                r={8}
                fill="#4F46E5"
                stroke="#312E81"
                strokeWidth={2}
                className="finger-position"
              />
              {/* Note name */}
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
                className="note-label"
              >
                {position.note.name}
              </text>
            </g>
          );
        })}

        {/* Clickable fret areas */}
        {tuning.strings.map((_, stringIndex) => {
          const y = stringIndex * stringSpacing + 20;
          return (
            <g key={`clickable-${stringIndex}`}>
              {fretPositions.map((x, fretIndex) => (
                <rect
                  key={`${stringIndex}-${fretIndex}`}
                  x={fretIndex === 0 ? headstockWidth : fretPositions[fretIndex - 1]}
                  y={y - 15}
                  width={fretIndex === 0 ? nutWidth : x - fretPositions[fretIndex - 1]}
                  height={30}
                  fill="transparent"
                  className="fret-clickable"
                  onClick={() => onFretClick?.(stringIndex, fretIndex)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </g>
          );
        })}

        {/* Fret numbers */}
        {fretPositions.map((x, fretIndex) => (
          <text
            key={`fret-number-${fretIndex}`}
            x={x}
            y={5}
            fontSize="8"
            fill="#666"
            fontWeight="normal"
            textAnchor="middle"
            className="fret-number"
          >
            {fretIndex}
          </text>
        ))}

        {/* String labels (open notes) */}
        {tuning.strings.map((note, stringIndex) => (
          <text
            key={`label-${stringIndex}`}
            x={10}
            y={stringIndex * stringSpacing + 25}
            fontSize="12"
            fill="#333"
            fontWeight="bold"
            className="string-label"
          >
            {note.name}
          </text>
        ))}
      </svg>
    </div>
  );
}
