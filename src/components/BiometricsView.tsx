import React, { useState } from 'react';
import { BiomarkerItem } from '../types';

interface BiometricsViewProps {
  biomarkers: BiomarkerItem[];
  onScheduleDiagnostic: (panelTitle: string) => void;
}

export const BiometricsView: React.FC<BiometricsViewProps> = ({
  biomarkers,
  onScheduleDiagnostic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cardiovascular', 'Longevity & DNA', 'Metabolic', 'Neuromuscular'];

  const filteredBiomarkers = biomarkers.filter(
    (b) => selectedCategory === 'All' || b.category === selectedCategory
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
            Clinical Longevity & Epigenetics · Nitrro Medical Lab
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f5f0]">
            Biological Age & Performance Biomarkers
          </h1>
          <p className="text-sm text-[#d0c5af]/80 max-w-2xl font-light">
            Continuous optical, metabolic, and biochemical monitoring. Analyzed every 30 days
            by Nitrro’s Medical Council to fine-tune your athletic longevity protocols.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onScheduleDiagnostic('Comprehensive 120-Biomarker Longevity Panel')}
          className="btn-primary-crimson text-xs py-2.5 px-5 self-start md:self-auto"
        >
          Book Medical Consultation
        </button>
      </div>

      {/* Summary Highlight Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="level-2-card p-6 rounded-[0.25rem] border-t-2 border-t-[#d4af37]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
            DNA Methylation Age Delta
          </div>
          <div className="mt-2 font-serif-luxury text-4xl text-[#f7f5f0] tabular-nums">
            -9.9 Years
          </div>
          <div className="text-xs text-[#d4af37] mt-1 font-medium">
            32.1 Epigenetic vs 42.0 Chronological
          </div>
          <p className="text-xs text-[#d0c5af]/70 mt-3 pt-3 border-t border-white/[0.06] leading-relaxed">
            Pace of aging measured at 0.74 biological years per calendar year. Decelerating trend active.
          </p>
        </div>

        <div className="level-2-card p-6 rounded-[0.25rem] border-t-2 border-t-[#d4af37]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
            Cardiovascular Work Capacity
          </div>
          <div className="mt-2 font-serif-luxury text-4xl text-[#f7f5f0] tabular-nums">
            58.4 ml/kg
          </div>
          <div className="text-xs text-[#d4af37] mt-1 font-medium">
            99th Percentile · Elite Aerobic Tier
          </div>
          <p className="text-xs text-[#d0c5af]/70 mt-3 pt-3 border-t border-white/[0.06] leading-relaxed">
            Sustained stroke volume during lactate threshold testing. Zero coronary arterial calcification.
          </p>
        </div>

        <div className="level-2-card p-6 rounded-[0.25rem] border-t-2 border-t-[#d4af37]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold">
            Systemic Inflammatory Index
          </div>
          <div className="mt-2 font-serif-luxury text-4xl text-[#f7f5f0] tabular-nums">
            0.24 mg/L
          </div>
          <div className="text-xs text-[#d4af37] mt-1 font-medium">
            Ultra-Low High-Sensitivity CRP
          </div>
          <p className="text-xs text-[#d0c5af]/70 mt-3 pt-3 border-t border-white/[0.06] leading-relaxed">
            Hyperbaric oxygenation and cold shock protocols maintain low vascular endothelia strain.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`segment-tab ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Biomarker Detailed Table */}
      <div className="level-1-panel rounded-[0.25rem] overflow-hidden border border-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141720] border-b border-white/[0.08] text-[10px] uppercase tracking-[0.14em] text-[#d0c5af]/70 font-semibold">
              <tr>
                <th className="py-4 px-6">Biomarker & Physiological Vector</th>
                <th className="py-4 px-6">Current Reading</th>
                <th className="py-4 px-6">Optimal Reference</th>
                <th className="py-4 px-6">Tier Status</th>
                <th className="py-4 px-6">Medical Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredBiomarkers.map((b) => (
                <tr key={b.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#f7f5f0] text-sm">{b.name}</div>
                    <div className="text-[11px] text-[#d4af37] mt-0.5">{b.category}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-serif-luxury text-lg text-[#f7f5f0] tabular-nums font-semibold">
                      {b.value}
                    </span>{' '}
                    <span className="text-[11px] text-[#d0c5af]/70">{b.unit}</span>
                  </td>
                  <td className="py-4 px-6 text-[#d0c5af]/90 tabular-nums">
                    {b.referenceOptimal}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-[0.2rem] ${
                        b.status === 'Elite'
                          ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/50'
                          : b.status === 'Optimal'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#d0c5af]/80 max-w-sm leading-relaxed">
                    {b.insight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Advisory Card */}
      <div className="level-2-card p-6 sm:p-8 rounded-[0.25rem] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[#d4af37] font-semibold">
            Senior Medical Director Review
          </div>
          <h3 className="font-serif-luxury text-xl text-[#f7f5f0]">
            Biometric Protocol Adjustments for Q4
          </h3>
          <p className="text-xs text-[#d0c5af]/80 max-w-2xl leading-relaxed">
            “Your vascular elasticity and heart rate variability metrics are in ideal resonance.
            We recommend pairing your morning Cryo sessions with 45 minutes of Hyperbaric 2.0 ATA
            twice weekly to sustain cellular methylation speed.”
          </p>
          <div className="text-xs text-[#d4af37] font-medium pt-1">
            Dr. Alistair Vance, MD (Oxon), Fellow in Longevity Medicine
          </div>
        </div>

        <button
          onClick={() => onScheduleDiagnostic('Physician Review & Epigenetic Retest')}
          className="btn-secondary-gold text-xs py-2 px-5 whitespace-nowrap"
        >
          Schedule Re-evaluation
        </button>
      </div>
    </div>
  );
};
