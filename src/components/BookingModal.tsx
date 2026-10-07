import React, { useState } from 'react';
import { SanctuarySuite, Enclave, Booking } from '../types';

interface BookingModalProps {
  suite: SanctuarySuite | null;
  currentEnclave: Enclave;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  suite,
  currentEnclave,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedTime, setSelectedTime] = useState('02:00 PM – 02:45 PM');
  const [acousticFrequency, setAcousticFrequency] = useState('432Hz Solfeggio Cellular Healing');
  const [butlerPreparation, setButlerPreparation] = useState(
    'Pre-cool and prepare fresh Egyptian cotton linens and cold-pressed citrus water'
  );

  if (!isOpen || !suite) return null;

  const timeSlots = [
    '10:30 AM – 11:15 AM',
    '01:00 PM – 01:45 PM',
    '02:00 PM – 02:45 PM',
    '04:30 PM – 05:15 PM',
    '06:00 PM – 06:45 PM',
    '07:30 PM – 08:15 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      suiteId: suite.id,
      suiteName: suite.name,
      time: selectedTime,
      date: 'Today',
      enclave: currentEnclave,
      status: 'Confirmed',
      butlerNotes: `Calibration: ${suite.specification}. Acoustic: ${acousticFrequency}.`,
      preparationSpec: butlerPreparation,
    };
    onConfirm(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl level-2-card rounded-[0.375rem] overflow-hidden border border-[#d4af37]/45 shadow-[0_32px_64px_rgba(0,0,0,0.85)]">
        {/* Top Gold Hairline */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#d4af37] font-semibold">
              Chamber Reservation · {currentEnclave === 'breach-candy' ? 'Breach Candy' : 'Powai'}
            </div>
            <h2 className="font-serif-luxury text-2xl text-[#f7f5f0] mt-1">
              {suite.name}
            </h2>
            <div className="text-xs text-[#d0c5af]/80 mt-0.5">
              {suite.specification} · {suite.durationMinutes} Minutes Solitary Access
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#d0c5af]/60 hover:text-[#f7f5f0] text-sm p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-2">
              Select Desired Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-2.5 rounded-[0.25rem] text-[11px] font-medium border text-center transition-all ${
                    selectedTime === slot
                      ? 'border-[#d4af37] bg-[#d4af37] text-[#10131a] font-bold'
                      : 'border-white/[0.08] bg-[#1a1d26] text-[#d0c5af]/80 hover:border-white/20'
                  }`}
                >
                  {slot.split(' – ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-2">
              Acoustic Resonance Frequency
            </label>
            <select
              value={acousticFrequency}
              onChange={(e) => setAcousticFrequency(e.target.value)}
              className="input-reserve w-full"
            >
              <option value="432Hz Solfeggio Cellular Healing" className="bg-[#191c23]">
                432Hz Solfeggio (Cellular DNA Healing & Calm)
              </option>
              <option value="528Hz Transformation & DNA Repair" className="bg-[#191c23]">
                528Hz Miracle Tone (Deep Neuromuscular Restoration)
              </option>
              <option value="Gamma 40Hz Cognitive Synapse Stimulus" className="bg-[#191c23]">
                Gamma 40Hz (Cognitive Peak Focus & Lucid Recovery)
              </option>
              <option value="Absolute Sensory Silence (Mute)" className="bg-[#191c23]">
                Absolute Sensory Silence
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] text-[#d0c5af] font-semibold mb-2">
              Bespoke Butler Instructions Prior to Session
            </label>
            <textarea
              rows={2}
              value={butlerPreparation}
              onChange={(e) => setButlerPreparation(e.target.value)}
              className="input-reserve w-full"
            />
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-gold text-xs py-2.5 px-4"
            >
              Dismiss
            </button>
            <button
              type="submit"
              className="btn-primary-crimson text-xs py-2.5 px-6"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
