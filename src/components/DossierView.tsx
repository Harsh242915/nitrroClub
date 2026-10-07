import React from 'react';
import { MemberProfile, Booking, Enclave } from '../types';

interface DossierViewProps {
  member: MemberProfile;
  enclave: Enclave;
  bookings: Booking[];
  onNavigateToSuites: () => void;
  onNavigateToBiometrics: () => void;
  onQuickButlerAction: (type: string, title: string, details: string) => void;
  onUpdateBookingStatus: (id: string, status: 'Confirmed' | 'Active' | 'Completed') => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  member,
  enclave,
  bookings,
  onNavigateToSuites,
  onNavigateToBiometrics,
  onQuickButlerAction,
  onUpdateBookingStatus,
}) => {
  const enclaveTitle =
    enclave === 'breach-candy'
      ? 'Breach Candy Sanctum · Warden Road'
      : 'Powai Penthouse Estate · Hiranandani';

  return (
    <div className="space-y-10">
      {/* Editorial Hero Dossier Banner */}
      <section className="relative overflow-hidden level-2-card p-6 sm:p-10 border border-[#d4af37]/35 rounded-[0.375rem]">
        {/* Subtle decorative gold crest watermark in the background */}
        <div className="absolute right-4 top-4 text-[#d4af37]/10 pointer-events-none select-none">
          <svg className="w-56 h-56" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center space-x-3 text-xs tracking-[0.16em] uppercase text-[#d4af37] font-semibold">
            <span>Private Reserve Dossier</span>
            <span aria-hidden="true">·</span>
            <span>{enclaveTitle}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#f7f5f0] tracking-tight leading-tight">
            Welcome, {member.name}
          </h1>

          <p className="text-[#d0c5af]/90 text-sm sm:text-base leading-relaxed font-light">
            Your physiological markers confirm elite autonomic recovery following yesterday’s sessions.
            Your private grotto and cryogenic pods have been reserved for today’s protocol sequence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2 text-[#d0c5af]">
              <span className="text-[#f2ca50] font-semibold">Tier:</span>
              <span>{member.tier}</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center space-x-2 text-[#d0c5af]">
              <span className="text-[#f2ca50] font-semibold">Locker Sanctum:</span>
              <span>{member.lockerNumber}</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center space-x-2 text-[#d0c5af]">
              <span className="text-[#f2ca50] font-semibold">Guest Privileges:</span>
              <span>{member.guestPassesRemaining} Allocations Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Biometric Vitality & Autonomic Readiness Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Daily Readiness Gauge */}
        <div className="level-1-panel p-5 rounded-[0.25rem] flex flex-col justify-between border-l-2 border-l-[#d4af37]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
                Daily Readiness
              </span>
              <span className="text-[11px] text-[#d4af37] font-medium">Optimal Band</span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="font-serif-luxury text-4xl text-[#f7f5f0]">
                {member.biometrics.readinessScore}
              </span>
              <span className="text-xs text-[#d0c5af]/70">/ 100</span>
            </div>
          </div>
          <p className="text-[11px] text-[#d0c5af]/80 mt-3 pt-3 border-t border-white/[0.06]">
            High parasympathetic resilience. Ready for maximal neuromuscular recruitment.
          </p>
        </div>

        {/* Nocturnal HRV */}
        <div className="level-1-panel p-5 rounded-[0.25rem] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
                Nocturnal HRV
              </span>
              <span className="text-[11px] text-[#d4af37] font-medium">+12% vs 30d Avg</span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="font-serif-luxury text-4xl text-[#f7f5f0]">
                {member.biometrics.hrvMs}
              </span>
              <span className="text-xs text-[#d0c5af]/70">ms rMSSD</span>
            </div>
          </div>
          <p className="text-[11px] text-[#d0c5af]/80 mt-3 pt-3 border-t border-white/[0.06]">
            Autonomic nervous recovery benchmarked in top 2% of private reserve cohort.
          </p>
        </div>

        {/* Epigenetic Biological Age */}
        <div className="level-1-panel p-5 rounded-[0.25rem] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
                Epigenetic Age
              </span>
              <span className="text-[11px] text-[#d4af37] font-medium">-10.0 Yrs Bio</span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="font-serif-luxury text-4xl text-[#f7f5f0]">
                {member.biometrics.epigeneticAge}
              </span>
              <span className="text-xs text-[#d0c5af]/70">yrs (42.0 chrono)</span>
            </div>
          </div>
          <p className="text-[11px] text-[#d0c5af]/80 mt-3 pt-3 border-t border-white/[0.06]">
            Cellular telomere length sustained via ongoing cold shock and hyperbaric cycles.
          </p>
        </div>

        {/* Maximal VO2 Efficiency */}
        <div className="level-1-panel p-5 rounded-[0.25rem] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
                Aerobic VO2 Max
              </span>
              <span className="text-[11px] text-[#d4af37] font-medium">Olympic Tier</span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="font-serif-luxury text-4xl text-[#f7f5f0]">
                {member.biometrics.vo2Max}
              </span>
              <span className="text-xs text-[#d0c5af]/70">ml/kg/min</span>
            </div>
          </div>
          <button
            onClick={onNavigateToBiometrics}
            className="text-[11px] text-[#f2ca50] hover:text-[#f7f5f0] text-left mt-3 pt-3 border-t border-white/[0.06] transition-colors"
          >
            Review Longevity Panel →
          </button>
        </div>
      </section>

      {/* Today's Sanctuary Schedule */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div>
            <h2 className="font-serif-luxury text-2xl text-[#f7f5f0]">
              Today’s Reserved Protocol Itinerary
            </h2>
            <div className="text-xs text-[#d0c5af]/70 mt-1">
              <span>{enclaveTitle}</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Dedicated Concierge Service Active</span>
            </div>
          </div>
          <button
            onClick={onNavigateToSuites}
            className="btn-secondary-gold text-xs py-2 px-4"
          >
            Reserve Chamber +
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="level-2-card p-6 rounded-[0.25rem] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#f2ca50] font-medium">{b.time}</span>
                  <span
                    className={`text-[10px] uppercase tracking-[0.14em] font-semibold ${
                      b.status === 'Active'
                        ? 'text-[#e63946]'
                        : b.status === 'Completed'
                        ? 'text-[#d0c5af]/60'
                        : 'text-[#d4af37]'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-xl text-[#f7f5f0]">
                  {b.suiteName}
                </h3>
                <p className="text-xs text-[#d0c5af]/80 leading-relaxed">
                  {b.butlerNotes}
                </p>
                <div className="text-[11px] text-[#e8d390]/90 italic bg-[#10131a]/60 p-2.5 rounded border border-white/[0.06]">
                  “{b.preparationSpec}”
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                {b.status === 'Active' ? (
                  <button
                    onClick={() => onUpdateBookingStatus(b.id, 'Completed')}
                    className="btn-primary-crimson text-xs py-1.5 px-3"
                  >
                    Conclude Session
                  </button>
                ) : b.status === 'Confirmed' ? (
                  <button
                    onClick={() => onUpdateBookingStatus(b.id, 'Active')}
                    className="btn-secondary-gold text-xs py-1.5 px-3"
                  >
                    Check In Now
                  </button>
                ) : (
                  <span className="text-xs text-[#d0c5af]/50">Session Finished</span>
                )}

                <button
                  onClick={() =>
                    onQuickButlerAction(
                      'chamber-prep',
                      `Adjust Chamber Parameters: ${b.suiteName}`,
                      `Calibrate temperature and notify butler for booking ${b.id}`
                    )
                  }
                  className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
                >
                  Notify Butler
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immediate VIP Concierge Butler Dispatch */}
      <section className="level-1-panel p-6 sm:p-8 rounded-[0.25rem] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#f7f5f0]">
              Instant Concierge Dispatch
            </h2>
            <p className="text-xs text-[#d0c5af]/80 mt-1">
              One-touch dispatch directly to the private butler stationed at your enclave.
            </p>
          </div>
          <div className="text-xs text-[#d4af37] font-semibold tracking-[0.12em] uppercase">
            Private Butler on Duty: Master Sommelier & Biomechanist
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() =>
              onQuickButlerAction(
                'tonic',
                'Himalayan Adaptogen & Cold Brew Tonic',
                'Double shot espresso, fermented cordyceps, Himalayan shilajit, organic raw milk froth.'
              )
            }
            className="text-left p-4 rounded-[0.25rem] bg-[#1a1d26] hover:bg-[#252a38] border border-white/[0.08] hover:border-[#d4af37]/60 transition-all group"
          >
            <div className="text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
              01 · Nutrition Bar
            </div>
            <div className="font-serif-luxury text-base text-[#f7f5f0] mt-1 group-hover:text-[#f2ca50]">
              Summon Adaptogen Tonic
            </div>
            <div className="text-xs text-[#d0c5af]/70 mt-1">
              Cordyceps & Shilajit pre-workout infusion delivered to suite
            </div>
          </button>

          <button
            onClick={() =>
              onQuickButlerAction(
                'valet',
                'Portico Maybach Chauffeur Summon',
                'Breach Candy departure gate portico valet alerted for ready vehicle.'
              )
            }
            className="text-left p-4 rounded-[0.25rem] bg-[#1a1d26] hover:bg-[#252a38] border border-white/[0.08] hover:border-[#d4af37]/60 transition-all group"
          >
            <div className="text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
              02 · Private Valet
            </div>
            <div className="font-serif-luxury text-base text-[#f7f5f0] mt-1 group-hover:text-[#f2ca50]">
              Portico Valet Ready
            </div>
            <div className="text-xs text-[#d0c5af]/70 mt-1">
              Vehicle air-conditioned and positioned at private estate exit
            </div>
          </button>

          <button
            onClick={() =>
              onQuickButlerAction(
                'chamber-prep',
                'Pre-Cool Cryo Suite to -110°C',
                'Concierge instructed to engage cryogenic compression for arrival.'
              )
            }
            className="text-left p-4 rounded-[0.25rem] bg-[#1a1d26] hover:bg-[#252a38] border border-white/[0.08] hover:border-[#d4af37]/60 transition-all group"
          >
            <div className="text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
              03 · Suite Calibration
            </div>
            <div className="font-serif-luxury text-base text-[#f7f5f0] mt-1 group-hover:text-[#f2ca50]">
              Pre-Cool Cryo Suite
            </div>
            <div className="text-xs text-[#d0c5af]/70 mt-1">
              Initialize -110°C nitrogen-free sub-zero cooling cycle
            </div>
          </button>
        </div>
      </section>

      {/* Enclave Atmosphere Vitals */}
      <section className="level-1-panel p-5 rounded-[0.25rem] flex flex-wrap items-center justify-between gap-4 text-xs text-[#d0c5af]/80">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#34d399]" />
          <span className="font-medium text-[#f7f5f0]">Enclave Air Quality:</span>
          <span>AQI 6 (Medical HEPA + Negative Ionization)</span>
        </div>
        <span className="text-white/20 hidden sm:inline">|</span>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-[#f7f5f0]">Acoustic Environment:</span>
          <span>432Hz Solfeggio Harmonic Resonance</span>
        </div>
        <span className="text-white/20 hidden sm:inline">|</span>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-[#f7f5f0]">Thermal Water Purity:</span>
          <span>100% Himalayan Mineral Infused</span>
        </div>
      </section>
    </div>
  );
};
