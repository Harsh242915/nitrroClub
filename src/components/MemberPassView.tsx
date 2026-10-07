import React, { useState } from 'react';
import { MemberProfile, Enclave } from '../types';

interface MemberPassViewProps {
  member: MemberProfile;
  currentEnclave: Enclave;
  onUpdateTier: (tier: MemberProfile['tier']) => void;
  onOpenOnboarding: () => void;
}

export const MemberPassView: React.FC<MemberPassViewProps> = ({
  member,
  currentEnclave,
  onUpdateTier,
  onOpenOnboarding,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-(y / rect.height) * 16);
    setRotateY((x / rect.width) * 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const tiers: {
    title: MemberProfile['tier'];
    tagline: string;
    benefits: string[];
    enclaves: string;
  }[] = [
    {
      title: 'Obsidian Sanctum',
      tagline: 'Singular Enclave Residency · Breach Candy',
      benefits: [
        'Dedicated Locker Sanctum with monogrammed linens',
        'Unlimited Sub-Zero Cryo & Himalayan Hydrotherapy',
        'Personal Biomechanist allocation (3 sessions/week)',
        '2 Guest Privileges per month',
      ],
      enclaves: 'Breach Candy Enclave Only',
    },
    {
      title: 'Sovereign Founder',
      tagline: 'Dual Enclave Sovereign Access · Unrestricted',
      benefits: [
        'Unconditional dual-residency: Breach Candy & Powai',
        'Priority booking window (30-day advance lock)',
        'Full 2.0 ATA Hyperbaric & NAD+ Infusion quota',
        'Private Portico Maybach Valet transfers',
        '4 Guest Privileges per month with full suite access',
      ],
      enclaves: 'Breach Candy & Powai Penthouse',
    },
    {
      title: 'Powai Penthouse Estate',
      tagline: 'Suburban Sanctuary & Rooftop Athletic Pavilion',
      benefits: [
        'Access to 25m Olympic Rooftop Hydro-Pool',
        'Private Kinetic Sprint Pavilion & Track',
        'In-house Ayurvedic Osteopath & Recovery Chef',
        '2 Guest Privileges per month',
      ],
      enclaves: 'Powai Estate Only',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
            Digital Identity · Black Titanium Reserve Credential
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f5f0]">
            Nitrro Reserve NFC Keycard
          </h1>
          <p className="text-sm text-[#d0c5af]/80 max-w-2xl font-light">
            Engineered from solid grade-5 titanium and encoded with encrypted biometric tokens.
            Provides seamless facial and RFID entry into Breach Candy and Powai sanctuaries.
          </p>
        </div>

        <button
          onClick={onOpenOnboarding}
          className="btn-secondary-gold text-xs py-2 px-5"
        >
          Re-Issue Biometric Token
        </button>
      </div>

      {/* Titanium Card Stage */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 py-4">
        {/* Interactive 3D Titanium Card */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[480px] h-[290px] sm:h-[300px] rounded-[0.75rem] p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer select-none border border-[#d4af37]/60 shadow-[0_30px_60px_rgba(0,0,0,0.85)] bg-gradient-to-br from-[#1c202b] via-[#10131a] to-[#252b3a]"
        >
          {/* Metallic brushed titanium texture overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Champagne gold ambient glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          {/* Card Top: Brand and Chip */}
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="font-serif-luxury text-xl tracking-[0.18em] text-[#f7f5f0]">
                NITRRO <span className="text-[#d4af37] font-light">SANCTUARY</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#d0c5af]/80 mt-0.5">
                Private Reserve · {currentEnclave === 'breach-candy' ? 'Breach Candy' : 'Powai Estate'}
              </div>
            </div>

            {/* Encrypted Gold EMV / Biometric Microchip */}
            <div className="w-12 h-9 rounded-[0.25rem] bg-gradient-to-tr from-[#c5a059] to-[#f2ca50] p-1 flex flex-col justify-between shadow-inner border border-[#ffe088]/40">
              <div className="flex justify-between h-2 border-b border-[#554300]/40">
                <span className="w-2 border-r border-[#554300]/40" />
                <span className="w-2" />
              </div>
              <div className="flex justify-between h-2">
                <span className="w-2 border-r border-[#554300]/40" />
                <span className="w-2" />
              </div>
            </div>
          </div>

          {/* Card Middle: Member Crest & Monogram */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
                {member.tier}
              </span>
              <div className="font-serif-luxury text-2xl text-[#f7f5f0] tracking-wide">
                {member.name}
              </div>
              <div className="text-[11px] text-[#d0c5af]/80 tracking-wider">
                {member.title}
              </div>
            </div>

            {/* Monogram Seal */}
            <div className="w-14 h-14 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#10131a]/80 backdrop-blur-md shadow-lg text-[#f2ca50] font-serif-luxury text-lg tracking-widest">
              {member.monogramInitials}
            </div>
          </div>

          {/* Card Bottom: Member ID, NFC & Holographic QR */}
          <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/[0.08]">
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#d0c5af]/60">
                Credential Identifier
              </div>
              <div className="font-mono text-xs tracking-[0.15em] text-[#f7f5f0] mt-0.5">
                {member.memberId}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* NFC Wireless Symbol */}
              <svg className="w-5 h-5 text-[#d4af37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9a6 6 0 0 1 6-6" />
                <path d="M6 15a12 12 0 0 1 12-12" />
                <path d="M6 21a18 18 0 0 1 18-18" />
              </svg>

              {/* Encrypted Micro QR */}
              <div className="w-9 h-9 bg-white p-1 rounded-[0.2rem] flex items-center justify-center">
                <div className="w-full h-full bg-[#10131a] flex items-center justify-center text-[7px] font-mono text-[#d4af37] font-bold">
                  NFC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Access Privileges */}
        <div className="level-2-card p-6 sm:p-8 rounded-[0.25rem] max-w-md w-full space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
              Live Reserve Privileges
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#f7f5f0] mt-1">
              Active Access Matrix
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-[#d0c5af]">Biometric Facial Recognition:</span>
              <span className="text-emerald-400 font-medium">Active & Synchronized</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-[#d0c5af]">Private Sanctum Locker:</span>
              <span className="text-[#f7f5f0] font-semibold">{member.lockerNumber}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-[#d0c5af]">Monthly Guest Passes:</span>
              <span className="text-[#f2ca50] font-semibold">
                {member.guestPassesRemaining} Allocations Active
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-[#d0c5af]">Maybach Portico Parking:</span>
              <span className="text-[#f7f5f0]">Valet Bay #04</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-[#d0c5af]">Head Osteopath Assigned:</span>
              <span className="text-[#f7f5f0]">Dr. Raghavan</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('Biometric NFC Keycard re-synchronized with turnstiles.')}
              className="btn-primary-crimson text-xs py-2 px-4 w-full"
            >
              Sync Keycard to Apple Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Membership Tiers Comparison */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-white/[0.08] pb-4">
          <div className="text-xs uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
            Enclave Governance
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#f7f5f0] mt-1">
            Reserve Membership Tiers
          </h2>
          <p className="text-xs text-[#d0c5af]/80 font-light mt-1">
            Membership is strictly by committee recommendation and limited to 150 patrons per enclave.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => {
            const isCurrent = member.tier === t.title;
            return (
              <div
                key={t.title}
                className={`level-2-card p-6 rounded-[0.25rem] flex flex-col justify-between space-y-5 transition-all ${
                  isCurrent ? 'border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.2)]' : 'border-white/[0.1]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
                      {t.enclaves}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#10131a] bg-[#d4af37] font-bold px-2 py-0.5 rounded-[0.2rem]">
                        Current Tier
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#f7f5f0]">
                    {t.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af]/80 italic">
                    {t.tagline}
                  </p>

                  <ul className="pt-2 space-y-2 text-xs text-[#d0c5af]/90">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex items-start space-x-2">
                        <span className="text-[#d4af37] mt-0.5">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  {isCurrent ? (
                    <div className="text-center text-xs text-[#f2ca50] font-semibold py-2">
                      Active Membership
                    </div>
                  ) : (
                    <button
                      onClick={() => onUpdateTier(t.title)}
                      className="btn-secondary-gold text-xs py-2 px-4 w-full"
                    >
                      Request Tier Transition
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
