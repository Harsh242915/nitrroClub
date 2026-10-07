export type Enclave = 'breach-candy' | 'powai';

export type MembershipTier = 'Obsidian Sanctum' | 'Sovereign Founder' | 'Powai Penthouse Estate';

export interface MemberProfile {
  title: string;
  name: string;
  archetype: string;
  tier: MembershipTier;
  memberId: string;
  enclave: Enclave;
  lockerNumber: string;
  guestPassesRemaining: number;
  monogramInitials: string;
  biometrics: {
    readinessScore: number;
    hrvMs: number;
    sleepEfficiency: number;
    epigeneticAge: number;
    chronologicalAge: number;
    vo2Max: number;
    cellularVitalityScore: number;
    cortisolStatus: string;
  };
}

export type SuiteCategory = 'all' | 'cryo-thermal' | 'hydrotherapy' | 'biomechanical' | 'longevity';

export interface SanctuarySuite {
  id: string;
  name: string;
  subtitle: string;
  category: 'cryo-thermal' | 'hydrotherapy' | 'biomechanical' | 'longevity';
  durationMinutes: number;
  specification: string;
  enclave: 'both' | Enclave;
  description: string;
  protocols: string[];
  imageUrl: string;
  accentNote: string;
}

export interface Booking {
  id: string;
  suiteId: string;
  suiteName: string;
  time: string;
  date: string;
  enclave: Enclave;
  status: 'Confirmed' | 'Active' | 'Completed';
  butlerNotes: string;
  preparationSpec: string;
}

export interface ConciergeRequest {
  id: string;
  category: 'tonic' | 'valet' | 'nutrition' | 'osteopath' | 'chamber-prep';
  title: string;
  details: string;
  time: string;
  status: 'Received' | 'In Preparation' | 'Dispatched' | 'Ready at Portico' | 'Delivered' | 'Scheduled';
}

export interface BiomarkerItem {
  name: string;
  category: 'Cardiovascular' | 'Longevity & DNA' | 'Metabolic' | 'Neuromuscular';
  value: string;
  unit: string;
  referenceOptimal: string;
  status: 'Optimal' | 'Elite' | 'Surveillance';
  insight: string;
}
