import React, { useState } from 'react';
import { SanctuarySuite, SuiteCategory, Enclave } from '../types';

interface SuitesViewProps {
  suites: SanctuarySuite[];
  currentEnclave: Enclave;
  onBookSuite: (suite: SanctuarySuite) => void;
}

export const SuitesView: React.FC<SuitesViewProps> = ({
  suites,
  currentEnclave,
  onBookSuite,
}) => {
  const [activeCategory, setActiveCategory] = useState<SuiteCategory>('all');

  const categories: { id: SuiteCategory; label: string }[] = [
    { id: 'all', label: 'All Sanctuary Suites' },
    { id: 'cryo-thermal', label: 'Cryo & Thermal' },
    { id: 'hydrotherapy', label: 'Hydrotherapy Grotto' },
    { id: 'biomechanical', label: 'Biomechanical & Kinetic' },
    { id: 'longevity', label: 'Longevity Diagnostics' },
  ];

  const filteredSuites = suites.filter((suite) => {
    const matchesCategory =
      activeCategory === 'all' || suite.category === activeCategory;
    const matchesEnclave =
      suite.enclave === 'both' || suite.enclave === currentEnclave;
    return matchesCategory && matchesEnclave;
  });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
            Architectural Reserve · Sanctuary Suites
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f5f0]">
            Private Recovery & Athletic Chambers
          </h1>
          <p className="text-sm text-[#d0c5af]/80 max-w-2xl font-light">
            Every chamber is curated for solitary or 1-on-1 private reservation. Fully isolated,
            temperature-calibrated, and served by your personal sanctuary butler.
          </p>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`segment-tab ${activeCategory === c.id ? 'active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuites.map((suite) => (
          <div
            key={suite.id}
            className="level-2-card rounded-[0.25rem] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#d4af37]/80 hover:shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
          >
            {/* Image Container with Fallback Container */}
            <div className="relative h-48 w-full bg-[#191c23] overflow-hidden">
              <img
                src={suite.imageUrl}
                alt={suite.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  // Fallback styling if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Styled CSS/SVG Fallback Container */}
              <div
                style={{ display: 'none' }}
                className="w-full h-full absolute inset-0 bg-gradient-to-br from-[#1f2430] to-[#10131a] flex flex-col items-center justify-center p-4 text-center border-b border-white/[0.08]"
              >
                <div className="w-10 h-10 mb-2 rounded-full border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
                  ✦
                </div>
                <span className="font-serif-luxury text-sm text-[#f7f5f0]">
                  {suite.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#d0c5af]/60 mt-1">
                  Private Sanctuary Chamber
                </span>
              </div>

              {/* Top gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-transparent to-black/40 pointer-events-none" />

              {/* Specification Label */}
              <div className="absolute top-3 left-3 bg-[#10131a]/85 backdrop-blur-md border border-white/[0.12] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f2ca50] rounded-[0.2rem]">
                {suite.specification}
              </div>

              <div className="absolute top-3 right-3 bg-[#10131a]/85 backdrop-blur-md border border-white/[0.12] px-2 py-1 text-[10px] text-[#d0c5af] rounded-[0.2rem]">
                {suite.durationMinutes} Min Session
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
                  {suite.subtitle}
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#f7f5f0] group-hover:text-[#f2ca50] transition-colors">
                  {suite.name}
                </h3>
                <p className="text-xs text-[#d0c5af]/85 leading-relaxed font-light">
                  {suite.description}
                </p>

                {/* Key Protocols Unboxed */}
                <div className="pt-2 text-[11px] text-[#d0c5af]/70 flex flex-wrap items-center gap-2">
                  <span className="text-[#f2ca50] font-medium">Key Vectors:</span>
                  {suite.protocols.map((protocol, idx) => (
                    <React.Fragment key={protocol}>
                      <span>{protocol}</span>
                      {idx < suite.protocols.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="text-[11px] text-[#e8d390]/80 italic">
                  “{suite.accentNote}”
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onBookSuite(suite)}
                    className="btn-primary-crimson text-xs py-2 px-4 flex-1"
                  >
                    Reserve Chamber
                  </button>
                  <button
                    onClick={() => onBookSuite(suite)}
                    className="btn-secondary-gold text-xs py-2 px-3"
                  >
                    Calibrate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
