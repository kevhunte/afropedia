'use client';

import type { DifficultyLevel } from '@afropedia/shared';

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (level: DifficultyLevel) => void;
}

const LEVELS: { value: DifficultyLevel; label: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'Simple overview' },
  { value: 'intermediate', label: 'Intermediate', description: 'More context' },
  { value: 'advanced', label: 'Advanced', description: 'Scholarly depth' },
];

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="difficulty-selector" role="group" aria-label="Reading level">
      <span className="difficulty-label">Reading level:</span>
      <div className="difficulty-buttons">
        {LEVELS.map((level) => (
          <button
            key={level.value}
            className={`difficulty-btn ${value === level.value ? 'active' : ''}`}
            onClick={() => onChange(level.value)}
            aria-pressed={value === level.value}
            title={level.description}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
