import React, { useState } from 'react';
import { MemberProfile, Enclave } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: MemberProfile;
  onComplete: (updated: Partial<MemberProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [name, setName] = useState(currentProfile.name);
  const [title, setTitle] = useState(currentProfile.title);
  const [archetype, setArchetype] = useState(currentProfile.archetype);
  const [enclave, setEnclave] = useState<Enclave>(currentProfile.enclave);
  const [tier, setTier] = useState<MemberProfile['tier']>(currentProfile.tier);
  const [monogram, setMonogram] = useState(currentProfile.monogramInitials);
  const [primaryGoal, setPrimaryGoal] = useState('Epigenetic Longevity & Mitochondrial Density');
  const [cryoTolerance, setCryoTolerance] = useState('-110°C Advanced');
  const [dietary, setDietary] = useState('Ketogenic & Pasture-Raised Organic');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        name,
        title,
        archetype,
        enclave,
        tier,
        monogramInitials: monogram.toUpperCase().slice(0, 2),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Level 2 frosted titanium card modal with 2px linear tracker on top */}
      <div className="relative w-full max-w-2xl level-2-card rounded-[0.375rem] overflow-hidden border border-[#d4af37]/45 shadow-[0_32px_64px_rgba(0,0,0,0.85)]">
        
        {/* 2px Linear Progress Tracker along the very top edge */}
        <div className="w-full h-[2px] bg-[#1a1d26] flex">
          {[1, 2, 3, 4].map((s) => {
            const isCompleted = s < step;
            const isActive = s === step;
            return (
              <div
                key={s}
                className={`flex-1 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#d4af37]'
                    : isActive
                    ? 'bg-[#e63946] animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            );
          })}
        </div>

        {/* Top Watermark Crest */}
        <div className="absolute right-4 top-4 text-[#d4af37]/10 pointer-events-none select-none">
          <svg className="w-28 h-28" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.08] relative z-10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37] font-semibold">
              VIP Intake Protocol · Step 0{step} of 0{totalSteps}
            </div>
            <h2 className="font-serif-luxury text-2xl text-[#f7f5f0] mt-1">
              {step === 1 && 'Patron Dossier & Residency Enclave'}
              {step === 2 && 'Athletic & Longevity Directives'}
              {step === 3 && 'Biometric Baseline & Diagnostic Intake'}
              {step === 4 && 'Concierge Directives & Titanium Keycard'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#d0c5af]/60 hover:text-[#f7f5f0] text-sm p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10 max-h-[65vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-reserve w-full"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Executive / Professional Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-reserve w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                  Patron Archetype
                </label>
                <select
                  value={archetype}
                  onChange={(e) => setArchetype(e.target.value)}
                  className="input-reserve w-full"
                >
                  <option value="Venture Founder & Ultra-Marathoner" className="bg-[#191c23]">
                    Venture Founder & Ultra-Marathoner
                  </option>
                  <option value="C-Suite Executive & Endurance Athlete" className="bg-[#191c23]">
                    C-Suite Executive & Endurance Athlete
                  </option>
                  <option value="Private Capitalist & Polo Player" className="bg-[#191c23]">
                    Private Capitalist & Polo Player
                  </option>
                  <option value="Biotech Innovator & Longevity Strategist" className="bg-[#191c23]">
                    Biotech Innovator & Longevity Strategist
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Primary Sanctuary Enclave
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEnclave('breach-candy')}
                      className={`segment-tab flex-1 ${enclave === 'breach-candy' ? 'active' : ''}`}
                    >
                      Breach Candy
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnclave('powai')}
                      className={`segment-tab flex-1 ${enclave === 'powai' ? 'active' : ''}`}
                    >
                      Powai Estate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Selected Tier
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="input-reserve w-full"
                  >
                    <option value="Sovereign Founder" className="bg-[#191c23]">Sovereign Founder (Dual Enclave)</option>
                    <option value="Obsidian Sanctum" className="bg-[#191c23]">Obsidian Sanctum (Breach Candy)</option>
                    <option value="Powai Penthouse Estate" className="bg-[#191c23]">Powai Penthouse Estate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-2">
                  Primary Performance Vector
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    'Epigenetic Longevity & Mitochondrial Density',
                    'High-Velocity Biomechanics & Hypertrophy',
                    'Cognitive Neuro-Agility & Deep Sleep Architecture',
                    'Cardiovascular VO2 Max & Metabolic Flexibility',
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setPrimaryGoal(goal)}
                      className={`text-left p-3.5 rounded-[0.25rem] border transition-all text-xs ${
                        primaryGoal === goal
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f7f5f0]'
                          : 'border-white/[0.08] bg-[#1a1d26]/50 text-[#d0c5af]/80 hover:border-white/20'
                      }`}
                    >
                      <span className="font-semibold">{goal}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                  Weekly Sanctuary Cadence
                </label>
                <select className="input-reserve w-full">
                  <option className="bg-[#191c23]">4 Days / Week (Recommended for Epigenetic Deceleration)</option>
                  <option className="bg-[#191c23]">6 Days / Week (Executive Sovereign Protocol)</option>
                  <option className="bg-[#191c23]">Weekend Immersion Residency</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Cryo Temperature Target
                  </label>
                  <select
                    value={cryoTolerance}
                    onChange={(e) => setCryoTolerance(e.target.value)}
                    className="input-reserve w-full"
                  >
                    <option value="-110°C Advanced" className="bg-[#191c23]">-110°C Advanced Whole Body</option>
                    <option value="-90°C Initial Acclimatization" className="bg-[#191c23]">-90°C Acclimatization</option>
                    <option value="-120°C Cryo-Elite Master" className="bg-[#191c23]">-120°C Cryo-Elite Master</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Hyperbaric Oxygen Preference
                  </label>
                  <select className="input-reserve w-full">
                    <option className="bg-[#191c23]">2.0 ATA Hard-Shell Medical</option>
                    <option className="bg-[#191c23]">1.5 ATA Gentle Cellular Cycle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                  Diagnostic Blood & DNA Sequencing Authorization
                </label>
                <div className="p-3 bg-[#1a1d26] rounded border border-white/[0.08] text-xs text-[#d0c5af]/80 space-y-1">
                  <div className="flex items-center space-x-2 text-[#f2ca50] font-medium">
                    <span>✓ Nitrro Biometric Lab Integration</span>
                  </div>
                  <p className="font-light">
                    Authorizes bi-monthly epigenetic methylation, hormonal panels, and DEXA scans
                    coordinated directly through your personal enclave physician.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Robes & Linen Monogram (2 Letters)
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    className="input-reserve w-full uppercase font-serif-luxury text-lg tracking-widest text-center"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-1.5">
                    Dietary Protocol for Private Chef
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="input-reserve w-full"
                  />
                </div>
              </div>

              {/* Minted Keycard Preview */}
              <div className="p-4 rounded bg-[#10131a] border border-[#d4af37]/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
                    Credential Ready for Minting
                  </div>
                  <div className="font-serif-luxury text-lg text-[#f7f5f0] mt-0.5">
                    {name || 'Patron'} · {monogram}
                  </div>
                  <div className="text-[11px] text-[#d0c5af]/70">
                    NFC Titanium Chip · {enclave === 'breach-candy' ? 'Breach Candy' : 'Powai'}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center font-serif-luxury text-[#f2ca50] font-bold">
                  {monogram}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/[0.08] relative z-10 flex items-center justify-between bg-[#141720]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs uppercase tracking-[0.12em] text-[#d0c5af] hover:text-[#f7f5f0] px-4 py-2 transition-colors"
            >
              ← Previous Step
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="btn-primary-crimson text-xs py-2.5 px-6"
          >
            {step === totalSteps ? 'Activate Titanium Keycard' : 'Save & Proceed →'}
          </button>
        </div>
      </div>
    </div>
  );
};
