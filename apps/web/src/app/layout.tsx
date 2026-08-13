import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StoneScanner — AI Geological Identification & Knowledge Platform',
  description: 'Multimodal geological scanner, crystal identification, Neo4j knowledge graph, and marketplace platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </main>
          <footer className="glass-panel border-t border-[var(--border-glass)] py-6 mt-12 text-center text-xs text-[var(--text-muted)] font-mono">
            StoneScanner Enterprise v2.4 Platform &copy; 2026 — AI Geological Identification & Knowledge Infrastructure
          </footer>
        </div>
      </body>
    </html>
  );
}
