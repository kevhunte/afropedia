import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Afropedia
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
        The free encyclopedia of the African diaspora.
      </p>
      <nav>
        <Link
          href="/timeline"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#111',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          Explore the Timeline →
        </Link>
      </nav>
    </main>
  );
}
