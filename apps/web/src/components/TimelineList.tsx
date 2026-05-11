'use client';

import { useState } from 'react';
import type { DifficultyLevel, PaginatedResponse, TimelineEvent } from '@afropedia/shared';
import { api } from '@/lib/api';
import { DifficultySelector } from './DifficultySelector';
import { TimelineEventCard } from './TimelineEventCard';

interface TimelineListProps {
  initial: PaginatedResponse<TimelineEvent>;
}

export function TimelineList({ initial }: TimelineListProps) {
  const [events, setEvents] = useState<TimelineEvent[]>(initial.data);
  const [page, setPage] = useState(initial.page);
  const [totalPages] = useState(initial.totalPages);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  const [loading, setLoading] = useState(false);

  const hasMore = page < totalPages;

  async function loadMore() {
    setLoading(true);
    try {
      const next = await api.get<PaginatedResponse<TimelineEvent>>(
        `/timeline?page=${page + 1}&pageSize=${initial.pageSize}`,
      );
      setEvents((prev) => [...prev, ...next.data]);
      setPage(next.page);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
      </div>

      <ul className="timeline-list">
        {events.map((event) => (
          <TimelineEventCard key={event.id} event={event} difficulty={difficulty} />
        ))}
      </ul>

      {hasMore && (
        <div className="timeline-load-more">
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Load more events'}
          </button>
        </div>
      )}

      {!hasMore && events.length > 0 && (
        <p className="timeline-end">You've reached the end of the timeline.</p>
      )}
    </div>
  );
}
