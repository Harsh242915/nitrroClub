import React from 'react';
import { Enclave } from '../types';

interface TopNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentEnclave: Enclave;
  onToggleEnclave: (enclave: Enclave) => void;
  onOpenOnboarding: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  currentEnclave,
  onToggleEnclave,
  onOpenOnboarding,
}) => {
  const navItems = [
    { id: 'dossier', label: 'Dossier' },
    { id: 'suites', label: 'Private Suites' },
    { id: 'biometrics', label: 'Biometrics' },
    { id: 'concierge', label: 'Concierge Butler' },
    { id: 'pass', label: 'Reserve Keycard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#10131a]/95 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in high-contrast Bodoni serif) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('dossier');
          }}
          className="font-serif-luxury text-2xl tracking-[0.14em] text-[#f7f5f0] hover:text-[#f2ca50] transition-colors whitespace-nowrap"
        >
          NITRRO <span className="text-[#d4af37] font-light">SANCTUARY</span>
        </a>

        {/* Zone 2: 4-5 Clean Text Nav Links with subtle hover underlines */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.14em]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#f2ca50] font-bold'
                    : 'text-[#d0c5af]/80 hover:text-[#f7f5f0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center space-x-3">
          {/* Enclave Selector Segmented Toggle */}
          <div className="flex items-center p-0.5 bg-[#191c23] border border-white/[0.12] rounded-[0.25rem]">
            <button
              onClick={() => onToggleEnclave('breach-candy')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[0.2rem] transition-colors ${
                currentEnclave === 'breach-candy'
                  ? 'bg-[#d4af37] text-[#10131a]'
                  : 'text-[#d0c5af]/70 hover:text-[#f7f5f0]'
              }`}
            >
              Breach Candy
            </button>
            <button
              onClick={() => onToggleEnclave('powai')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[0.2rem] transition-colors ${
                currentEnclave === 'powai'
                  ? 'bg-[#d4af37] text-[#10131a]'
                  : 'text-[#d0c5af]/70 hover:text-[#f7f5f0]'
              }`}
            >
              Powai
            </button>
          </div>

          {/* Primary VIP Intake Modal Trigger */}
          <button
            onClick={onOpenOnboarding}
            className="btn-primary-crimson text-xs py-2 px-3.5 hidden sm:inline-flex"
          >
            VIP Intake
          </button>
        </div>
      </div>

      {/* Mobile Subnav Row */}
      <div className="flex md:hidden overflow-x-auto border-t border-white/[0.06] px-4 py-2 space-x-4 bg-[#141720]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap py-1 ${
                isActive ? 'text-[#f2ca50] border-b-2 border-[#d4af37]' : 'text-[#d0c5af]/70'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
