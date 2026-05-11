'use client';

import { useState } from 'react';
import type { DifficultyLevel, TimelineEvent } from '@afropedia/shared';

interface TimelineEventCardProps {
  event: TimelineEvent;
  difficulty: DifficultyLevel;
}

export function TimelineEventCard({ event, difficulty }: TimelineEventCardProps) {
  const [expanded, setExpanded] = useState(false);

  const yearLabel =
    event.endYear !== undefined ? `${event.year}–${event.endYear}` : String(event.year);

  return (
    <li className="timeline-item">
      <div className="timeline-year">{yearLabel}</div>
      <div className={`timeline-card ${expanded ? 'expanded' : ''}`}>
        <button
          className="timeline-card-header"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          <div className="timeline-card-meta">
            <span className="timeline-region">{event.region}</span>
            <span className="timeline-category">{event.category}</span>
          </div>
          <h2 className="timeline-title">{event.title}</h2>
          <p className="timeline-summary">{event.summary}</p>
          <span className="timeline-toggle-icon" aria-hidden>
            {expanded ? '▲' : '▼'}
          </span>
        </button>

        {expanded && (
          <div className="timeline-card-body">
            <p className="timeline-content">{event.content[difficulty]}</p>

            {event.references.length > 0 && (
              <div className="timeline-references">
                <h3 className="references-heading">Further reading</h3>
                <ul className="references-list">
                  {event.references.map((ref, i) => (
                    <li key={i} className="reference-item">
                      {ref.url !== undefined ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reference-link"
                        >
                          {ref.title}
                        </a>
                      ) : (
                        <span className="reference-title">{ref.title}</span>
                      )}
                      {ref.author !== undefined && (
                        <span className="reference-author"> — {ref.author}</span>
                      )}
                      <span className="reference-type"> [{ref.type}]</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
