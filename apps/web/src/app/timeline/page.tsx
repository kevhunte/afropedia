import type { PaginatedResponse, TimelineEvent } from '@afropedia/shared';
import { api } from '@/lib/api';
import { TimelineList } from '@/components/TimelineList';
import './timeline.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Timeline — Afropedia',
  description:
    'An interactive timeline of the African diaspora, from 1400 to the present day.',
};

export default async function TimelinePage() {
  const initial = await api.get<PaginatedResponse<TimelineEvent>>(
    '/timeline?page=1&pageSize=10',
  );

  return (
    <main className="timeline-page">
      <header className="timeline-header">
        <h1 className="timeline-page-title">Timeline</h1>
        <p className="timeline-page-subtitle">
          A history of the African diaspora — from 1400 to the present day.
        </p>
      </header>

      <TimelineList initial={initial} />
    </main>
  );
}
