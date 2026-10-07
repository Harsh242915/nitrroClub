import React, { useState } from 'react';
import { ConciergeRequest, Enclave } from '../types';

interface ConciergeViewProps {
  currentEnclave: Enclave;
  requests: ConciergeRequest[];
  onSubmitRequest: (category: ConciergeRequest['category'], title: string, details: string) => void;
}

export const ConciergeView: React.FC<ConciergeViewProps> = ({
  currentEnclave,
  requests,
  onSubmitRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'custom' | 'active'>('menu');
  const [customCategory, setCustomCategory] = useState<ConciergeRequest['category']>('tonic');
  const [customTitle, setCustomTitle] = useState('');
  const [customDetails, setCustomDetails] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;
    onSubmitRequest(customCategory, customTitle, customDetails || 'Patron requested bespoke preparation.');
    setCustomTitle('');
    setCustomDetails('');
    setActiveTab('active');
  };

  const curatedOfferings = [
    {
      category: 'tonic' as const,
      title: 'Himalayan Shilajit & Raw Ceremonial Cacao',
      description: 'Purified gold-grade Shilajit resin, organic heirloom Ecuador cacao, MCT lipid delivery, raw A2 grass-fed foam.',
      prepTime: '8 minutes',
      note: 'Pre-workout ATP biogenesis & mental focus',
    },
    {
      category: 'tonic' as const,
      title: 'Cordyceps & Lion’s Mane Cold Brew Elixir',
      description: 'Triple-extracted fruiting body mushrooms, single-origin Ethiopian cold brew, cinnamon bark oil.',
      prepTime: '6 minutes',
      note: 'Neurogenic focus & oxygen utilization',
    },
    {
      category: 'nutrition' as const,
      title: 'Wild Alaskan King Salmon & Steamed Bok Choy',
      description: 'Sous-vide 48°C wild caught salmon, organic cold-pressed avocado oil, Himalayan pink salt, ginger ponzu reduction.',
      prepTime: '25 minutes',
      note: 'Post-workout omega-3 phospholipid replenishment',
    },
    {
      category: 'nutrition' as const,
      title: 'Grass-Fed New Zealand Tenderloin & Bone Broth Glaze',
      description: 'Pasture-raised tenderloin medallion, 72-hour simmered grass-fed bone broth reduction, micro-greens.',
      prepTime: '30 minutes',
      note: 'Maximal myofibrillar protein synthesis',
    },
    {
      category: 'valet' as const,
      title: 'Portico Maybach Chauffeur Transfer',
      description: 'Chauffeured Mercedes-Maybach S680 staged at private portico. Climate pre-set to 20°C with mineral water.',
      prepTime: '15 minutes',
      note: `Departure from ${currentEnclave === 'breach-candy' ? 'Breach Candy Gate' : 'Powai Private Terrace'}`,
    },
    {
      category: 'chamber-prep' as const,
      title: 'Sanctum Locker Suite Restock & Steam Valet',
      description: 'Fresh monogrammed 800 GSM Egyptian cotton towels, sanitized titanium compression garments, bespoke bergamot mist.',
      prepTime: '10 minutes',
      note: 'Personal locker refreshed prior to exit',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
            Bespoke Hospitality · Nitrro Private Reserve Butler
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f5f0]">
            Sanctuary Concierge Butler
          </h1>
          <p className="text-sm text-[#d0c5af]/80 max-w-2xl font-light">
            Every patron has a dedicated Butler and Nutritionist assigned. Dispatch culinary,
            adaptogenic, vehicular, or chamber calibration requests with discreet precision.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('menu')}
            className={`segment-tab ${activeTab === 'menu' ? 'active' : ''}`}
          >
            Curated Butler Menu
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`segment-tab ${activeTab === 'custom' ? 'active' : ''}`}
          >
            Custom Dispatch
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`segment-tab ${activeTab === 'active' ? 'active' : ''}`}
          >
            Active Requests ({requests.length})
          </button>
        </div>
      </div>

      {/* Tab: Curated Butler Menu */}
      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedOfferings.map((item) => (
            <div
              key={item.title}
              className="level-2-card p-6 rounded-[0.25rem] flex flex-col justify-between space-y-4 hover:border-[#d4af37]/70 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
                  <span>{item.category}</span>
                  <span className="text-[#d0c5af]/60">{item.prepTime}</span>
                </div>
                <h3 className="font-serif-luxury text-xl text-[#f7f5f0]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#d0c5af]/80 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="text-[11px] text-[#e8d390]/80 italic pt-1">
                  “{item.note}”
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() =>
                    onSubmitRequest(item.category, item.title, `${item.description} (${item.note})`)
                  }
                  className="btn-primary-crimson text-xs py-2 px-4 w-full"
                >
                  Dispatch to Butler
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Custom Request Dispatch */}
      {activeTab === 'custom' && (
        <div className="max-w-2xl mx-auto level-2-card p-8 rounded-[0.25rem] border border-[#d4af37]/30">
          <h2 className="font-serif-luxury text-2xl text-[#f7f5f0] mb-2">
            Discreet Concierge Dispatch
          </h2>
          <p className="text-xs text-[#d0c5af]/80 mb-6 font-light leading-relaxed">
            Specify any request to your head butler—from custom IV formulations to security details,
            specialized osteopathic tools, or private flight coordination.
          </p>

          <form onSubmit={handleCustomSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#d0c5af] font-semibold mb-2">
                Service Domain
              </label>
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value as any)}
                className="input-reserve w-full"
              >
                <option value="tonic" className="bg-[#191c23]">Adaptogen & Elixir Bar</option>
                <option value="nutrition" className="bg-[#191c23]">Private Culinary Chef</option>
                <option value="valet" className="bg-[#191c23]">Portico Valet & Maybach Fleet</option>
                <option value="chamber-prep" className="bg-[#191c23]">Private Suite Calibration</option>
                <option value="osteopath" className="bg-[#191c23]">Private Practitioner Attention</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#d0c5af] font-semibold mb-2">
                Dispatch Summary
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prepare cold-pressed wheatgrass shot upon grotto exit"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="input-reserve w-full"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#d0c5af] font-semibold mb-2">
                Specific Instructions for Head Butler
              </label>
              <textarea
                rows={3}
                placeholder="Specify temperature, dietary sensitivities, or timing requirements..."
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                className="input-reserve w-full"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-primary-crimson text-xs py-3 px-6 w-full">
                Transmit Order to Butler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Active Requests Tracker */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="level-1-panel p-10 rounded-[0.25rem] text-center space-y-3">
              <div className="font-serif-luxury text-xl text-[#f7f5f0]">
                No Pending Butler Dispatches
              </div>
              <p className="text-xs text-[#d0c5af]/70">
                Your butler is on standby. Select from the curated menu or send a custom dispatch.
              </p>
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                className="level-1-panel p-6 rounded-[0.25rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-2 border-l-[#d4af37]"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-[#f2ca50] font-semibold uppercase tracking-[0.12em] text-[10px]">
                      {req.category}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-[#d0c5af]/60">{req.time}</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg text-[#f7f5f0]">
                    {req.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af]/80 font-light max-w-xl">
                    {req.details}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-[0.2rem] ${
                      req.status === 'Ready at Portico' || req.status === 'Delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : req.status === 'In Preparation'
                        ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
