import React, { useState, useEffect, useId } from 'react';
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
  Dumbbell,
  ShieldCheck,
  ChevronRight,
  Flame,
  Activity,
  Award,
  Zap,
  Building2,
  Users,
  Check,
  ExternalLink,
  FileSpreadsheet,
  Trash2,
  SlidersHorizontal,
  HeartPulse,
  Droplets,
  Coffee,
  Lock,
  ArrowRight,
  MessageSquare,
  Search,
  RefreshCw,
  X,
  CreditCard,
  Building,
} from 'lucide-react';

/* =========================================================================
   TYPE DEFINITIONS
   ========================================================================= */

export type ClubLocationId = 'breach-candy' | 'powai' | 'thane';

export interface ClubLocation {
  id: ClubLocationId;
  name: string;
  tagline: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  headConcierge: string;
  conciergeTitle: string;
  operatingHours: string;
  squareFootage: string;
  valetBay: string;
  signatureFacilities: string[];
  heroImage: string;
}

export type AmenityCategory =
  | 'all'
  | 'strength'
  | 'hydrotherapy'
  | 'physio'
  | 'lounge';

export interface Amenity {
  id: string;
  title: string;
  category: 'strength' | 'hydrotherapy' | 'physio' | 'lounge';
  categoryLabel: string;
  badge: string;
  description: string;
  specs: string[];
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

export interface VipLead {
  id: string;
  passId: string;
  name: string;
  phone: string;
  goal: string;
  clubId: ClubLocationId;
  clubName: string;
  preferredDate: string;
  timeSlot: string;
  specialRequests?: string;
  status: 'New Lead' | 'Walkthrough Scheduled' | 'VIP Attended' | 'Converted';
  createdAt: string;
  conciergeAssigned: string;
}

export interface MembershipTier {
  id: 'resident-elite' | 'black-card-vip' | 'corporate-executive';
  name: string;
  tagline: string;
  basePriceInr: number;
  popular?: boolean;
  features: string[];
  badge: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  priceInr: number;
}

/* =========================================================================
   DATA REPOSITORY
   ========================================================================= */

const CLUBS: Record<ClubLocationId, ClubLocation> = {
  'breach-candy': {
    id: 'breach-candy',
    name: 'Breach Candy (South Mumbai)',
    tagline: 'Flagship Oceanfront Sanctuary & Private Reserve',
    area: 'Warden Road, South Mumbai',
    address: 'Hubtown Skybay, 1st & 2nd Floor, Bhulabhai Desai Road, Breach Candy, Mumbai 400026',
    phone: '+91 98920 17777 / 022 2368 7777',
    whatsapp: '919892017777',
    headConcierge: 'Vikramaditya Rathore',
    conciergeTitle: 'Vice President & Head of Sanctuary Services',
    operatingHours: '06:00 AM – 11:00 PM (Daily)',
    squareFootage: '24,000 sq.ft. Oceanfront Compound',
    valetBay: 'Portico Valet Bay 01 & 02',
    signatureFacilities: [
      'Sea-Facing Cardio Deck with Technogym Artis Line',
      'Sub-Zero Cryo Chamber (-110°C Electric Shock)',
      'Authentic Himalayan Pink Salt Sauna & Ice Plunge',
      'Olympic Eleiko Weightlifting Hall',
      'Bespoke Ayurvedic Osteopathy Clinic',
      'Private Portico Valet with EV Fast Charging',
    ],
    heroImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
  },
  'powai': {
    id: 'powai',
    name: 'Powai (Hiranandani Gardens)',
    tagline: 'Biophilic Luxury Arena & Rooftop Hydro Sanctum',
    area: 'Central Avenue, Powai',
    address: 'High Street Building, Opp. Galleria Mall, Central Ave, Hiranandani Gardens, Powai, Mumbai 400076',
    phone: '+91 98920 17778 / 022 2570 8888',
    whatsapp: '919892017778',
    headConcierge: 'Ananya Deshmukh',
    conciergeTitle: 'Senior Patron Concierge & Nutrition Fellow',
    operatingHours: '05:30 AM – 11:30 PM (Daily)',
    squareFootage: '28,000 sq.ft. Tri-Level Penthouse',
    valetBay: 'Galleria Concourse Valet',
    signatureFacilities: [
      '25m Rooftop Hydrotherapy Swimming Arena',
      'Biostrength AI Resistance & Keiser Pneumatics',
      'Hyperbaric O2 Pods (2.0 ATA Pure Oxygen)',
      'Pilates Allegro 2 Reformer Conservatory',
      'Organic Post-Workout Adaptogen Juice Bar',
      'Dedicated C-Suite Private Executive Pods',
    ],
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  'thane': {
    id: 'thane',
    name: 'Thane Platinum Reserve',
    tagline: 'Mega Sports Compound & Olympic High-Performance Hub',
    area: 'Ghodbunder Road, Thane',
    address: 'Platinum Concourse, Kapurbawdi Junction, Ghodbunder Rd, Thane West, Mumbai MMR 400607',
    phone: '+91 98920 17779 / 022 2540 9999',
    whatsapp: '919892017779',
    headConcierge: 'Rajesh Kulkarni',
    conciergeTitle: 'Chief Athletics Director',
    operatingHours: '05:30 AM – 11:00 PM (Daily)',
    squareFootage: '35,000 sq.ft. Multi-Tier Sports Estate',
    valetBay: 'Thane Grand Plaza Entry',
    signatureFacilities: [
      '60m Indoor Tartan Sprint & Prowler Track',
      'Hydromassage Dry Floatation Therapy Beds',
      'Dual Olympic Powerlifting Platforms by Eleiko',
      'Comprehensive 3D Postural & DEXA Scanning Lab',
      'VIP Founders Sauna & Steam Suites',
      'Covered Multi-Level Member Parking',
    ],
    heroImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
  },
};

const AMENITIES: Amenity[] = [
  {
    id: 'technogym-artis',
    title: 'Technogym Artis Line & Biostrength AI',
    category: 'strength',
    categoryLabel: 'Strength & Olympic',
    badge: 'Connected Biometrics',
    description: 'Precision Italian biomechanics with interactive real-time velocity tracking, automated seat calibration, and customized eccentric overload.',
    specs: ['Pure Strength Plate-Loaded', 'Real-time Neuromuscular Feedback', 'Kinesis 360° Cable Stations'],
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cryo-chamber',
    title: 'Whole-Body Cryotherapy (-110°C)',
    category: 'hydrotherapy',
    categoryLabel: 'Hydrotherapy & Spa',
    badge: 'Clinical Recovery',
    description: 'Electric sub-zero whole-body dry cold immersion that triggers systemic vasoconstriction, endorphin release, and accelerated muscle tissue repair.',
    specs: ['-110°C Nitrogen-Free Vapor', '3-Minute Immersion Protocol', 'Immediate DOMS Relief'],
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'himalayan-spa',
    title: 'Himalayan Salt Sauna & Ice Grotto',
    category: 'hydrotherapy',
    categoryLabel: 'Hydrotherapy & Spa',
    badge: 'Contrast Therapy',
    description: 'Authentic pink rock salt walls emitting negative ions paired with 8°C cold plunge tubs for superior autonomic nervous system reset.',
    specs: ['90°C Dry Finnish Heat', 'Khewra Pure Salt Aeration', 'Nordic Cascade Ice Plunge'],
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinical-physio',
    title: 'Clinical Sports Physio & Marma Therapy',
    category: 'physio',
    categoryLabel: 'Clinical Physio',
    badge: 'Pain & Posture Rehab',
    description: 'Orthopedic physiotherapists integrating dry needling, Ayurvedic Marma manipulation, and isokinetic testing for pain-free athletic longevity.',
    specs: ['Dry Needling & Cupping', 'Postural Spinal Decompression', 'Theragun Percussive Release'],
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dexa-lab',
    title: 'DEXA Body Composition & 3D Posture Lab',
    category: 'physio',
    categoryLabel: 'Clinical Physio',
    badge: 'Gold-Standard Diagnostics',
    description: 'Clinical-grade dual-energy X-ray absorptiometry measuring visceral fat, segmental lean mass, and skeletal mineral density.',
    specs: ['99.2% Bone & Visceral Accuracy', '3D Infrared Silhouette Scan', 'Metabolic BMR Calculation'],
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'vip-lounge',
    title: "Founder's Gold Executive Lounge",
    category: 'lounge',
    categoryLabel: 'VIP Lounge',
    badge: 'Patron Privacy',
    description: 'Exclusive sanctuary for patrons and founders featuring barista-curated adaptogenic tonics, high-speed fiber pods, and garment steam valet.',
    specs: ['Himalayan Adaptogen Bar', 'Soundproof Executive Pods', 'Monogrammed Towel Valet'],
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'olympic-platforms',
    title: 'Eleiko Olympic Lifting & Power Arenas',
    category: 'strength',
    categoryLabel: 'Strength & Olympic',
    badge: 'IWF Certified',
    description: 'Swedish IWF-certified competition bars, calibrated rubber disc bumpers, and heavy-duty vibration-damping drop platforms.',
    specs: ['Eleiko 20kg & 15kg Chrome Bars', 'Vibration Absorbent Flooring', 'Full Chalk & Belt Stations'],
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'reformer-pilates',
    title: 'Merrithew & Allegro 2 Reformer Suite',
    category: 'strength',
    categoryLabel: 'Strength & Olympic',
    badge: 'Core Architecture',
    description: 'High-precision spring resistance beds designed for deep pelvic floor strengthening, core stabilization, and spinal elongation.',
    specs: ['Merrithew SPX Max Reformers', 'Tower Attachments & Jumpboards', '1-on-1 Master Instructors'],
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
];

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'resident-elite',
    name: 'Resident Elite',
    tagline: 'Single Club Flagship Membership',
    basePriceInr: 145000,
    badge: 'Essential Luxury',
    features: [
      'Unrestricted access to primary home club',
      'Technogym Artis Line & Olympic Platforms',
      'Unlimited Himalayan Salt Sauna & Steam',
      'Daily monogrammed towel & locker valet',
      'Quarterly InBody 770 composition scan',
      '2 Complimentary VIP Guest Day Passes',
    ],
  },
  {
    id: 'black-card-vip',
    name: 'Black Card VIP',
    tagline: 'Multi-Club Sovereign Residency (Breach Candy, Powai, Thane)',
    basePriceInr: 225000,
    popular: true,
    badge: 'Most Prestigious',
    features: [
      'Unconditional access across all 3 Nitrro flagships',
      'Complimentary Portico Valet parking reserved',
      'Dedicated personal permanent locker with robe',
      'Unlimited Cryotherapy & Hydromassage recovery',
      'Priority booking for peak studio sessions & physio',
      '8 Complimentary VIP Guest Day Passes per year',
      'Direct line to Mr. Davkhare’s Patron Concierge',
    ],
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    tagline: 'Dual-Club Access for Founders & C-Suite',
    basePriceInr: 185000,
    badge: 'Business & Vitality',
    features: [
      'Dual access to Breach Candy & Powai clubs',
      'Access to Executive Lounge & high-speed Wi-Fi pods',
      'Complimentary garment steaming & laundry valet',
      'Bimonthly Physician & Nutrition consultations',
      '4 Complimentary VIP Guest Day Passes',
      'Corporate concierge priority reservations',
    ],
  },
];

const ADD_ONS: AddOn[] = [
  {
    id: 'pt-12',
    name: '12-Pack Master Biomechanist Training',
    description: 'Dedicated 1-on-1 sessions with an Olympic-certified strength coach.',
    priceInr: 48000,
  },
  {
    id: 'cryo-annual',
    name: 'Unlimited Whole-Body Cryo Recovery',
    description: 'Daily -110°C whole body cryotherapy sessions post-workout.',
    priceInr: 36000,
  },
  {
    id: 'dexa-scan',
    name: 'Comprehensive DEXA & 3D Biometric Lab',
    description: '4 quarterly bone density, visceral fat, and posture scans.',
    priceInr: 14000,
  },
  {
    id: 'nutrition-chef',
    name: 'Nutritional Sommelier & Adaptogen Elixirs',
    description: 'Custom macronutrient blueprints & daily adaptogen tonics.',
    priceInr: 24000,
  },
];

const INITIAL_LEADS: VipLead[] = [
  {
    id: 'lead-01',
    passId: 'NIT-BC-8942',
    name: 'Vikram Singhania',
    phone: '+91 98200 45678',
    goal: 'Executive Fat Loss',
    clubId: 'breach-candy',
    clubName: 'Breach Candy (South Mumbai)',
    preferredDate: 'Tomorrow',
    timeSlot: '07:30 AM – 09:00 AM (Morning Peak)',
    specialRequests: 'Portico Valet parking required for Maybach. Interested in Cryo trial.',
    status: 'Walkthrough Scheduled',
    createdAt: '2026-10-06T18:30:00Z',
    conciergeAssigned: 'Vikramaditya Rathore',
  },
  {
    id: 'lead-02',
    passId: 'NIT-PW-7421',
    name: 'Dr. Radhika Merchant',
    phone: '+91 98199 12345',
    goal: 'Posture & Spinal Rehab',
    clubId: 'powai',
    clubName: 'Powai (Hiranandani)',
    preferredDate: 'This Friday',
    timeSlot: '11:00 AM – 12:30 PM (Midday Executive)',
    specialRequests: 'Requesting consultation with Senior Physiotherapist for lumbar disc.',
    status: 'VIP Attended',
    createdAt: '2026-10-05T14:15:00Z',
    conciergeAssigned: 'Ananya Deshmukh',
  },
  {
    id: 'lead-03',
    passId: 'NIT-TH-9012',
    name: 'Karanvir Oberoi',
    phone: '+91 98211 99887',
    goal: 'Hypertrophy & Strength',
    clubId: 'thane',
    clubName: 'Thane Platinum Reserve',
    preferredDate: 'This Saturday',
    timeSlot: '06:00 PM – 07:30 PM (Evening Primetime)',
    specialRequests: 'Looking to test Eleiko platforms and 60m indoor sprint track.',
    status: 'Converted',
    createdAt: '2026-10-04T10:00:00Z',
    conciergeAssigned: 'Rajesh Kulkarni',
  },
];

/* =========================================================================
   QR CODE VECTOR COMPONENT
   ========================================================================= */

function LuxuryQrCode({ passId }: { passId: string }) {
  const seed = passId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Deterministic 15x15 visual pattern for luxury look
  const matrix: boolean[][] = Array.from({ length: 15 }, (_, row) =>
    Array.from({ length: 15 }, (_, col) => {
      // Corner Finder Patterns
      if (
        (row < 4 && col < 4) ||
        (row < 4 && col > 10) ||
        (row > 10 && col < 4)
      ) {
        if (row === 0 || row === 3 || col === 0 || col === 3) return true;
        if (row < 4 && col > 10 && (row === 0 || row === 3 || col === 11 || col === 14)) return true;
        if (row > 10 && col < 4 && (row === 11 || row === 14 || col === 0 || col === 3)) return true;
        if ((row === 1 || row === 2) && (col === 1 || col === 2)) return true;
        if ((row === 1 || row === 2) && (col === 12 || col === 13)) return true;
        if ((row === 12 || row === 13) && (col === 1 || col === 2)) return true;
        return false;
      }
      // Center monogram cutout
      if (row >= 6 && row <= 8 && col >= 6 && col <= 8) return false;
      return (seed * (row + 1) * 31 + col * 17) % 3 === 0;
    })
  );

  return (
    <div className="relative p-2 bg-slate-900 border border-amber-500/50 rounded-lg shadow-inner flex items-center justify-center">
      <svg className="w-28 h-28" viewBox="0 0 15 15" fill="none">
        {matrix.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width="0.9"
                height="0.9"
                rx="0.15"
                fill="#fbbf24"
              />
            ) : null
          )
        )}
      </svg>
      {/* Nitrro Monogram in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-6 h-6 rounded-full bg-slate-950 border border-amber-400 flex items-center justify-center text-[9px] font-bold text-amber-400 tracking-tighter shadow-md">
          N
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN APPLICATION COMPONENT
   ========================================================================= */

export default function App() {
  const idPrefix = useId();

  // Location State
  const [selectedClubId, setSelectedClubId] = useState<ClubLocationId>('breach-candy');
  const currentClub = CLUBS[selectedClubId];

  // Amenity Filter State
  const [activeAmenityCategory, setActiveAmenityCategory] = useState<AmenityCategory>('all');
  const [demoAmenity, setDemoAmenity] = useState<Amenity | null>(null);

  // VIP Pass Generator Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: 'Executive Fat Loss',
    date: 'Tomorrow',
    timeSlot: '07:30 AM – 09:00 AM (Morning Peak)',
    specialRequests: '',
  });
  const [generatedPass, setGeneratedPass] = useState<VipLead | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // Membership Customizer State
  const [selectedTierId, setSelectedTierId] = useState<MembershipTier['id']>('black-card-vip');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['pt-12', 'cryo-annual']);

  // Admin CRM State
  const [isAdminView, setIsAdminView] = useState(false);
  const [leads, setLeads] = useState<VipLead[]>(() => {
    try {
      const stored = localStorage.getItem('nitrro_leads');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_LEADS;
  });
  const [crmFilter, setCrmFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nitrro_leads', JSON.stringify(leads));
    } catch {
      // Ignore
    }
  }, [leads]);

  // Handle URL hash for `#admin`
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Membership Price Calculations
  const currentTier = MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId)!;
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (addOn ? addOn.priceInr : 0);
  }, 0);
  const subTotal = currentTier.basePriceInr + addOnsTotal;
  const gst = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gst;
  const emiPerMonth = Math.round(grandTotal / 12);

  // Toggle Add-On
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  // Generate VIP Pass Handler
  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please enter your full name and WhatsApp contact.');
      return;
    }

    const prefix =
      selectedClubId === 'breach-candy' ? 'NIT-BC' : selectedClubId === 'powai' ? 'NIT-PW' : 'NIT-TH';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passId = `${prefix}-${randomNum}`;

    const newLead: VipLead = {
      id: `lead-${Date.now()}`,
      passId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      goal: formData.goal,
      clubId: selectedClubId,
      clubName: currentClub.name,
      preferredDate: formData.date,
      timeSlot: formData.timeSlot,
      specialRequests: formData.specialRequests || undefined,
      status: 'Walkthrough Scheduled',
      createdAt: new Date().toISOString(),
      conciergeAssigned: currentClub.headConcierge,
    };

    setLeads((prev) => [newLead, ...prev]);
    setGeneratedPass(newLead);
    setIsPassModalOpen(true);
    showToast(`Platinum Pass #${passId} successfully minted!`);
  };

  // Update Lead Status in CRM
  const handleUpdateLeadStatus = (id: string, newStatus: VipLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
    showToast(`Lead updated to: ${newStatus}`);
  };

  // Delete Lead from CRM
  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    showToast('Lead deleted from pipeline.');
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Pass ID',
      'Name',
      'Phone',
      'Club',
      'Goal',
      'Preferred Date',
      'Time Slot',
      'Status',
      'Concierge Assigned',
      'Special Requests',
      'Created At',
    ];

    const rows = leads.map((l) => [
      `"${l.passId}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.clubName}"`,
      `"${l.goal}"`,
      `"${l.preferredDate}"`,
      `"${l.timeSlot}"`,
      `"${l.status}"`,
      `"${l.conciergeAssigned}"`,
      `"${l.specialRequests || ''}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nitrro_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported pipeline leads as CSV.');
  };

  // Format Currency
  const formatInr = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter Amenities
  const filteredAmenities = AMENITIES.filter((a) => {
    if (activeAmenityCategory === 'all') return true;
    return a.category === activeAmenityCategory;
  });

  // Filter Leads for CRM
  const filteredLeads = leads.filter((l) => {
    const matchesFilter = crmFilter === 'All' || l.status === crmFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.passId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.clubName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-300">
      {/* =========================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract with Admin & Club Quick Switch)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-display font-extrabold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-[0.16em] text-white font-bold leading-none">
                  NITRRO
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-amber-400/90 font-semibold mt-1">
                  Wellness & Fitness Hub
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.14em]">
            <a href="#clubs" className="text-slate-300 hover:text-amber-400 transition-colors py-1">
              Clubs
            </a>
            <a href="#amenities" className="text-slate-300 hover:text-amber-400 transition-colors py-1">
              Zones & Spa
            </a>
            <a href="#vip-pass" className="text-slate-300 hover:text-amber-400 transition-colors py-1">
              VIP Day Pass
            </a>
            <a href="#membership" className="text-slate-300 hover:text-amber-400 transition-colors py-1">
              Memberships
            </a>
            <a href="#founder" className="text-slate-300 hover:text-amber-400 transition-colors py-1">
              Heritage
            </a>
          </nav>

          {/* Zone 3: Actions (Club Switcher & Admin CRM Toggle) */}
          <div className="flex items-center space-x-3">
            {/* Admin Toggle */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider rounded border transition-all flex items-center space-x-2 ${
                isAdminView
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800/80 text-amber-400 border-amber-500/30 hover:border-amber-400'
              }`}
              title="Concierge & General Manager CRM"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Concierge CRM</span>
              <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[10px] font-bold">
                {leads.length}
              </span>
            </button>

            {/* Direct Booking CTA */}
            <a
              href="#vip-pass"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded shadow-lg shadow-amber-500/25 transition-all flex items-center space-x-1.5"
            >
              <span>Get VIP Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          VIEW ROUTING: ADMIN DASHBOARD VS MEMBER EXPERIENCE
          ========================================================================= */}
      {isAdminView ? (
        /* =========================================================================
           5. CONCIERGE & GM ADMIN DASHBOARD
           ========================================================================= */
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 animate-fadeIn">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Patron Concierge Management System · Prabodh Davkhare Executive Office</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-white mt-1">
                VIP Lead & Walkthrough Pipeline
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time tracking of VIP day passes, concierge allocations, and walkthrough conversions across Mumbai clubs.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportCsv}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAdminView(false)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-colors"
              >
                Exit to Public Portal
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-lg border-l-4 border-l-amber-500">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Inbound Passes</div>
              <div className="font-display text-3xl text-white mt-2">{leads.length}</div>
              <div className="text-[11px] text-amber-400 mt-1">All Mumbai Enclaves</div>
            </div>
            <div className="glass-card p-5 rounded-lg border-l-4 border-l-sky-500">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Scheduled Walkthroughs</div>
              <div className="font-display text-3xl text-white mt-2">
                {leads.filter((l) => l.status === 'Walkthrough Scheduled').length}
              </div>
              <div className="text-[11px] text-sky-400 mt-1">Active Pipeline</div>
            </div>
            <div className="glass-card p-5 rounded-lg border-l-4 border-l-purple-500">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">VIPs Attended</div>
              <div className="font-display text-3xl text-white mt-2">
                {leads.filter((l) => l.status === 'VIP Attended').length}
              </div>
              <div className="text-[11px] text-purple-400 mt-1">Met with Concierge</div>
            </div>
            <div className="glass-card p-5 rounded-lg border-l-4 border-l-emerald-500">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Converted Members</div>
              <div className="font-display text-3xl text-white mt-2">
                {leads.filter((l) => l.status === 'Converted').length}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">Active Patrons</div>
            </div>
          </div>

          {/* Pipeline Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {['All', 'Walkthrough Scheduled', 'VIP Attended', 'Converted', 'New Lead'].map((st) => (
                <button
                  key={st}
                  onClick={() => setCrmFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap transition-colors ${
                    crmFilter === st
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {st} {st !== 'All' ? `(${leads.filter((l) => l.status === st).length})` : ''}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, pass ID, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="glass-card rounded-lg overflow-hidden border border-amber-500/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Pass ID</th>
                    <th className="py-3.5 px-4">Member Name & Contact</th>
                    <th className="py-3.5 px-4">Club Location</th>
                    <th className="py-3.5 px-4">Goal & Slot</th>
                    <th className="py-3.5 px-4">Pipeline Status</th>
                    <th className="py-3.5 px-4">Assigned Concierge</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                        No VIP leads matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${lead.name}, this is ${lead.conciergeAssigned} from Nitrro Wellness & Fitness Hub. We have confirmed your VIP walkthrough pass #${lead.passId} at our ${lead.clubName} club. We look forward to welcoming you!`
                      )}`;

                      return (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-amber-400">
                            {lead.passId}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-white text-sm">{lead.name}</div>
                            <div className="text-slate-400 text-xs mt-0.5">{lead.phone}</div>
                            {lead.specialRequests && (
                              <div className="text-[11px] text-amber-300/80 italic mt-1 max-w-xs truncate">
                                Note: {lead.specialRequests}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-200 font-medium">{lead.clubName}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-amber-300 font-medium">{lead.goal}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">
                              {lead.preferredDate} · {lead.timeSlot.split(' ')[0]}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLeadStatus(lead.id, e.target.value as VipLead['status'])
                              }
                              className={`text-[11px] font-semibold py-1 px-2.5 rounded border focus:outline-none bg-slate-900 ${
                                lead.status === 'Converted'
                                  ? 'text-emerald-300 border-emerald-500/50'
                                  : lead.status === 'VIP Attended'
                                  ? 'text-purple-300 border-purple-500/50'
                                  : lead.status === 'Walkthrough Scheduled'
                                  ? 'text-sky-300 border-sky-500/50'
                                  : 'text-amber-300 border-amber-500/50'
                              }`}
                            >
                              <option value="New Lead">New Lead</option>
                              <option value="Walkthrough Scheduled">Walkthrough Scheduled</option>
                              <option value="VIP Attended">VIP Attended</option>
                              <option value="Converted">Converted</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-slate-300 font-medium">
                            {lead.conciergeAssigned}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => {
                                  setGeneratedPass(lead);
                                  setIsPassModalOpen(true);
                                }}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded transition-colors"
                                title="View VIP Pass"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           PUBLIC FACING MEMBER PORTAL
           ========================================================================= */
        <main className="flex-1 w-full space-y-24 pb-20">
          {/* =========================================================================
              HERO SECTION WITH BRAND POSITIONING
              ========================================================================= */}
          <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-amber-500/15">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  <Award className="w-3.5 h-3.5" />
                  <span>Founded by Prabodh Davkhare · Asia&apos;s Leading Luxury Gym Chain</span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
                  Where Aristocratic Hospitality Meets{' '}
                  <span className="gold-gradient-text">Elite Human Performance</span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                  Experience Mumbai&apos;s most celebrated luxury athletic sanctuary. Home to Bollywood
                  luminaries, industry titans, and Olympic athletes across our flagship estates in
                  Breach Candy, Powai, and Thane.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#vip-pass"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded shadow-xl shadow-amber-500/25 transition-all flex items-center space-x-2"
                  >
                    <span>Claim 1-Day VIP Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#clubs"
                    className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-amber-500/40 font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded transition-all flex items-center space-x-2"
                  >
                    <span>Explore Flagship Clubs</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>ISO 9001:2008 Certified Standards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="w-4 h-4 text-amber-400" />
                    <span>Official Technogym Artis Line</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Sub-Zero Cryotherapy (-110°C)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              1. CLUB LOCATION SWITCHER (Breach Candy, Powai, Thane)
              ========================================================================= */}
          <section id="clubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  01 · Flagship Sanctums
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white mt-1">
                  Select Your Nitrro Enclave
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Explore bespoke architectural features, contact lines, and head concierges for our Mumbai hubs.
                </p>
              </div>

              {/* Location Switcher Segmented Control */}
              <div className="flex p-1 bg-slate-950/80 border border-amber-500/30 rounded-lg">
                {(Object.keys(CLUBS) as ClubLocationId[]).map((clubId) => {
                  const club = CLUBS[clubId];
                  const isActive = selectedClubId === clubId;
                  return (
                    <button
                      key={clubId}
                      onClick={() => setSelectedClubId(clubId)}
                      className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {club.name.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Active Location Showcase Card */}
            <div className="glass-card rounded-xl overflow-hidden border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
              {/* Media Column */}
              <div className="lg:col-span-5 relative min-h-[340px] bg-slate-950">
                <img
                  src={currentClub.heroImage}
                  alt={currentClub.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  {currentClub.squareFootage}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                    Signature Enclave
                  </div>
                  <h3 className="font-display text-2xl text-white font-bold">{currentClub.name}</h3>
                </div>
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="text-xs text-amber-300 font-medium italic">
                      “{currentClub.tagline}”
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentClub.operatingHours}</span>
                    </div>
                  </div>

                  {/* Address & Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Address & Entry</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-light">{currentClub.address}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct Concierge Lines</span>
                      </div>
                      <p className="text-slate-300 font-medium">{currentClub.phone}</p>
                      <p className="text-emerald-400 text-[11px]">WhatsApp: +{currentClub.whatsapp}</p>
                    </div>
                  </div>

                  {/* Concierge Lead */}
                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">
                        Assigned Head Concierge
                      </div>
                      <div className="font-display text-base text-white">{currentClub.headConcierge}</div>
                      <div className="text-xs text-amber-400/90">{currentClub.conciergeTitle}</div>
                    </div>
                    <a
                      href={`https://wa.me/${currentClub.whatsapp}?text=${encodeURIComponent(
                        `Hello ${currentClub.headConcierge}, I am inquiring about membership and a private walkthrough at Nitrro ${currentClub.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>

                  {/* Signature Highlights */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Signature Club Highlights
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentClub.signatureFacilities.map((facility) => (
                        <div key={facility} className="flex items-center space-x-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Valet Services: <span className="text-white font-medium">{currentClub.valetBay}</span>
                  </div>
                  <a
                    href="#vip-pass"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev }));
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <span>Book Walkthrough at {currentClub.name.split(' (')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              2. INTERACTIVE ZONE WALKTHROUGH SHOWCASE
              ========================================================================= */}
          <section id="amenities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  02 · Signature Facilities
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white mt-1">
                  Interactive Zone Walkthrough
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  From Olympic weightlifting halls to sub-zero cryotherapy, explore the precision engineering behind Nitrro.
                </p>
              </div>

              {/* Amenity Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Amenities' },
                  { id: 'strength', label: 'Strength & Olympic' },
                  { id: 'hydrotherapy', label: 'Hydrotherapy & Spa' },
                  { id: 'physio', label: 'Clinical Physio' },
                  { id: 'lounge', label: 'VIP Lounge' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAmenityCategory(tab.id as AmenityCategory)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all ${
                      activeAmenityCategory === tab.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenity Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAmenities.map((amenity) => {
                const IconComponent = amenity.icon;
                return (
                  <div
                    key={amenity.id}
                    className="glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col justify-between group border border-amber-500/25"
                  >
                    {/* Image Header */}
                    <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        {amenity.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/90 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[10px] uppercase tracking-wider text-amber-400/90 font-semibold">
                          {amenity.categoryLabel}
                        </div>
                        <h3 className="font-display text-lg text-white font-bold group-hover:text-amber-400 transition-colors">
                          {amenity.title}
                        </h3>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                          {amenity.description}
                        </p>

                        {/* Specs Bullets */}
                        <div className="pt-2 space-y-1">
                          {amenity.specs.map((spec) => (
                            <div key={spec} className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                              <span className="text-amber-400">✦</span>
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800">
                        <button
                          onClick={() => setDemoAmenity(amenity)}
                          className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                        >
                          <span>Request Zone Demo</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =========================================================================
              3. 1-CLICK VIP DAY PASS & WALKTHROUGH GENERATOR
              ========================================================================= */}
          <section id="vip-pass" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Explainer & Benefits */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    03 · Private Invitation
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl text-white mt-1">
                    1-Click VIP Day Pass & Guided Walkthrough
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Experience Nitrro with a complimentary 1-day executive residency. Your personalized
                    pass grants full club privileges, contrast therapy suite access, and a guided tour
                    with the head concierge.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-4 rounded-lg flex items-start space-x-3 border border-amber-500/20">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Full Access Privileges</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Test our Technogym Artis cardio deck, Olympic Eleiko zones, and recovery suites without restriction.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-lg flex items-start space-x-3 border border-amber-500/20">
                    <Droplets className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Contrast Spa & Cryo Trial</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Includes a complimentary session in our Himalayan Pink Salt Sauna and cold plunge circuit.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-lg flex items-start space-x-3 border border-amber-500/20">
                    <User className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Dedicated Concierge Escort</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Met by our Senior Club Director at the portico with reserved parking and monogrammed towels.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 text-xs text-slate-400">
                  <span className="text-amber-400 font-semibold">Notice:</span> VIP Day Passes are strictly limited to
                  10 patrons per club daily to maintain privacy and uncrowded luxury.
                </div>
              </div>

              {/* Right Column: Intake Form */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-xl border border-amber-500/40 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <h3 className="font-display text-xl text-white font-bold">Generate Platinum Pass</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Instant biometric credential generated in your name</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xs">
                    VIP
                  </div>
                </div>

                <form onSubmit={handleGeneratePass} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${idPrefix}-patron-name`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        Patron Full Name *
                      </label>
                      <input
                        id={`${idPrefix}-patron-name`}
                        type="text"
                        required
                        placeholder="e.g. Vikram Singhania"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${idPrefix}-whatsapp-number`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        id={`${idPrefix}-whatsapp-number`}
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${idPrefix}-select-club-enclave`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        Select Club Enclave
                      </label>
                      <select
                        id={`${idPrefix}-select-club-enclave`}
                        value={selectedClubId}
                        onChange={(e) => setSelectedClubId(e.target.value as ClubLocationId)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option value="breach-candy">Breach Candy (South Mumbai)</option>
                        <option value="powai">Powai (Hiranandani Gardens)</option>
                        <option value="thane">Thane Platinum Reserve</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${idPrefix}-fitness-vitality-goal`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        Fitness & Vitality Goal
                      </label>
                      <select
                        id={`${idPrefix}-fitness-vitality-goal`}
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option value="Executive Fat Loss">Executive Fat Loss & Conditioning</option>
                        <option value="Hypertrophy & Strength">Hypertrophy & Biomechanics</option>
                        <option value="Posture & Spinal Rehab">Posture Rehab & Clinical Physio</option>
                        <option value="Luxury Wellness & Longevity">Luxury Wellness, Spa & Longevity</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${idPrefix}-preferred-walkthrough-date`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        Preferred Date
                      </label>
                      <select
                        id={`${idPrefix}-preferred-walkthrough-date`}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option value="Today">Today (Subject to Concierge Availability)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Friday">This Friday</option>
                        <option value="This Saturday">This Saturday</option>
                        <option value="Next Week Monday">Next Week Monday</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${idPrefix}-preferred-time-window`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                        Time Window
                      </label>
                      <select
                        id={`${idPrefix}-preferred-time-window`}
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option value="07:30 AM – 09:00 AM (Morning Peak)">07:30 AM – 09:00 AM (Morning Peak)</option>
                        <option value="11:30 AM – 01:00 PM (Midday Executive)">11:30 AM – 01:00 PM (Midday Executive)</option>
                        <option value="05:30 PM – 07:00 PM (Evening Primetime)">05:30 PM – 07:00 PM (Evening Primetime)</option>
                        <option value="08:00 PM – 09:30 PM (Night Sanctuary)">08:00 PM – 09:30 PM (Night Sanctuary)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${idPrefix}-special-concierge-requests`} className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                      Special Concierge Requests (Optional)
                    </label>
                    <input
                      id={`${idPrefix}-special-concierge-requests`}
                      type="text"
                      placeholder="e.g. Need Portico Valet reserved, interested in Cryo trial, meeting with head physio"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Mint My Nitrro VIP Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2">
                      Instant WhatsApp confirmation with Mr. Davkhare’s concierge team
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. MEMBERSHIP TIER & PERSONAL TRAINING CUSTOMIZER
              ========================================================================= */}
          <section id="membership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  04 · Membership Customizer
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white mt-1">
                  Tailor Your Nitrro Residency
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Select your core tier and stack clinical longevity add-ons with dynamic live pricing in INR (₹).
                </p>
              </div>

              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Hidden Fees · Includes 18% GST Breakdown</span>
              </div>
            </div>

            {/* Core Tiers Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MEMBERSHIP_TIERS.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`cursor-pointer rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all relative border ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                        : 'glass-card border-slate-700/80 hover:border-amber-500/40 opacity-90'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                        Most Prestigious Choice
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                          {tier.badge}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-400 bg-amber-500 text-slate-950'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-2xl text-white font-bold">{tier.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 italic">{tier.tagline}</p>
                      </div>

                      <div className="pt-2">
                        <div className="text-3xl font-display text-white font-bold">
                          {formatInr(tier.basePriceInr)}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Annual Contribution + Taxes</div>
                      </div>

                      <div className="pt-4 border-t border-slate-700/60 space-y-2.5">
                        {tier.features.map((feature) => (
                          <div key={feature} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-amber-400 shrink-0 mt-0.5">✦</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        className={`w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        {isSelected ? 'Tier Selected' : 'Select Tier'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add-ons & Live Price Calculator Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add-ons Selector */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-white font-bold">
                      Bespoke Performance Add-ons
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Stack master personal training and longevity recovery suites
                    </p>
                  </div>
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADD_ONS.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.id);
                    return (
                      <div
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`cursor-pointer p-4 rounded-lg border transition-all flex flex-col justify-between space-y-2 ${
                          isChecked
                            ? 'bg-slate-800/90 border-amber-400 shadow-md shadow-amber-500/10'
                            : 'glass-card border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-white leading-snug">{addOn.name}</h4>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                              isChecked
                                ? 'border-amber-400 bg-amber-500 text-slate-950'
                                : 'border-slate-600'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                          {addOn.description}
                        </p>
                        <div className="text-xs font-semibold text-amber-400 pt-1">
                          +{formatInr(addOn.priceInr)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Calculator Summary Box */}
              <div className="lg:col-span-5 glass-card p-6 sm:p-7 rounded-xl border border-amber-500/40 shadow-2xl space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                    Live Investment Quotation
                  </div>
                  <h3 className="font-display text-xl text-white font-bold mt-0.5">
                    {currentTier.name} Package
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Base Tier ({currentTier.name}):</span>
                    <span className="font-semibold text-white">{formatInr(currentTier.basePriceInr)}</span>
                  </div>

                  {selectedAddOns.map((id) => {
                    const item = ADD_ONS.find((a) => a.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>+ {item.name}:</span>
                        <span className="text-amber-300">{formatInr(item.priceInr)}</span>
                      </div>
                    );
                  })}

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span>{formatInr(subTotal)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>GST (18% Statutory Luxury Fitness):</span>
                    <span>{formatInr(gst)}</span>
                  </div>

                  <div className="pt-3 border-t border-amber-500/30 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Total Annual Investment</div>
                      <div className="font-display text-2xl text-amber-400 font-bold">{formatInr(grandTotal)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Flexible 12M EMI</div>
                      <div className="text-xs text-white font-semibold">~{formatInr(emiPerMonth)} / mo</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      showToast(`Invitation locked for ${currentTier.name}! Concierge notified.`);
                      setFormData((prev) => ({
                        ...prev,
                        specialRequests: `Interested in ${currentTier.name} membership with ${selectedAddOns.length} add-ons (Total: ${formatInr(
                          grandTotal
                        )})`,
                      }));
                      const vipSection = document.getElementById('vip-pass');
                      if (vipSection) vipSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Lock In Private Invitation</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Secures preferred rate lock for 14 days · No upfront payment required
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              HERITAGE & FOUNDER'S NOTE: PRABODH DAVKHARE
              ========================================================================= */}
          <section id="founder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
            <div className="glass-card rounded-2xl p-8 sm:p-12 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>The Nitrro Heritage · Founded by Prabodh Davkhare</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl text-white font-bold leading-tight">
                  “We Did Not Simply Build Gyms; We Created an Aristocratic Benchmark of Holistic Human Vitality.”
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  Born from a vision to redefine fitness hospitality in India, Nitrro blends clinical
                  sports science, authentic Himalayan thermal therapy, and six-star member discretion.
                  Every detail—from Italian imported biomechanics to the air purity index inside our
                  chambers—is curated to serve the uncompromising standards of Mumbai’s leaders.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                  <div>
                    <span className="text-white font-semibold">Prabodh Davkhare</span>
                    <span className="text-amber-400 block text-[11px]">Chairman & Managing Director</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <div>
                    <span className="text-white font-semibold">Award Winner</span>
                    <span className="text-slate-400 block text-[11px]">Best Luxury Fitness Chain in Asia</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <div>
                    <span className="text-white font-semibold">ISO 9001:2008</span>
                    <span className="text-slate-400 block text-[11px]">Certified Global Quality Management</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-xl border border-amber-500/20 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-700 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-display text-3xl text-amber-400 font-bold">
                    PD
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-lg text-white">Patron Concierge Desk</h4>
                  <p className="text-xs text-slate-400 mt-1">Direct line to Mr. Davkhare’s Executive Team</p>
                </div>
                <a
                  href="https://wa.me/919892017777?text=Hello%20Nitrro%20Team%2C%20I%20am%20interested%20in%20a%20private%20invitation%20and%20direct%20membership%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: +91 98920 17777</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          FOOTER (Quiet Luxury & Anti-Slop Compliant)
          ========================================================================= */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-display font-bold flex items-center justify-center text-sm">
                  N
                </div>
                <span className="font-display text-base text-white tracking-wider font-bold">
                  NITRRO WELLNESS
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Founded by Prabodh Davkhare. Asia’s premier luxury fitness and biometric wellness chain.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Breach Candy</h4>
              <p className="text-slate-400 leading-relaxed font-light">
                Hubtown Skybay, Bhulabhai Desai Rd, Warden Road, South Mumbai
              </p>
              <p className="text-amber-400 mt-1">+91 98920 17777</p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Powai Gardens</h4>
              <p className="text-slate-400 leading-relaxed font-light">
                High Street, Central Avenue, Hiranandani Gardens, Powai
              </p>
              <p className="text-amber-400 mt-1">+91 98920 17778</p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Thane Platinum</h4>
              <p className="text-slate-400 leading-relaxed font-light">
                Platinum Concourse, Kapurbawdi Junction, Ghodbunder Rd, Thane West
              </p>
              <p className="text-amber-400 mt-1">+91 98920 17779</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Nitrro Wellness & Fitness Hub. All rights reserved. Registered ISO 9001:2008.
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsAdminView(true)} className="hover:text-amber-400 transition-colors">
                Staff CRM Console
              </button>
              <span>·</span>
              <a href="https://nitrro.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                Official Nitrro Website
              </a>
              <span>·</span>
              <span>Discretion Guaranteed</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL: ANIMATED NITRRO PLATINUM VIP PASS DISPLAY
          ========================================================================= */}
      {isPassModalOpen && generatedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden border border-amber-500/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            {/* Top Amber Accent Line */}
            <div className="w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

            {/* Modal Header */}
            <div className="p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Nitrro Official Biometric Credential
                </span>
              </div>
              <button
                onClick={() => setIsPassModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Printable Pass Body */}
            <div id="vip-printable-pass" className="p-6 space-y-6 bg-slate-950/90">
              {/* Pass Header Banner */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-2xl font-bold tracking-wider text-white">
                    NITRRO <span className="text-amber-400">PLATINUM PASS</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">
                    1-Day VIP Residency · {generatedPass.clubName}
                  </div>
                </div>

                <div className="px-3 py-1 bg-amber-500/20 border border-amber-500 rounded text-amber-300 font-mono text-xs font-bold">
                  {generatedPass.passId}
                </div>
              </div>

              {/* QR Code and Member Data Split */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-900/90 p-4 rounded-xl border border-amber-500/30">
                <div className="sm:col-span-5 flex justify-center">
                  <LuxuryQrCode passId={generatedPass.passId} />
                </div>

                <div className="sm:col-span-7 space-y-2 text-xs">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Patron Name</div>
                    <div className="font-display text-lg text-white font-bold">{generatedPass.name}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">Scheduled Date</div>
                      <div className="text-amber-300 font-semibold">{generatedPass.preferredDate}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">Target Goal</div>
                      <div className="text-white font-medium">{generatedPass.goal}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Walkthrough Slot</div>
                    <div className="text-slate-200 font-medium text-[11px]">{generatedPass.timeSlot}</div>
                  </div>
                </div>
              </div>

              {/* Concierge & Validation Info */}
              <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Assigned Concierge Escort:</span>
                  <span className="text-amber-400 font-semibold">{generatedPass.conciergeAssigned}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Portico Valet Bay:</span>
                  <span className="text-white">Reserved under patron name</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Credential Status:</span>
                  <span className="text-emerald-400 font-semibold">Active & Pre-Cleared</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/919892017777?text=${encodeURIComponent(
                    `Hello Nitrro Concierge Team, I have generated my VIP Day Pass #${generatedPass.passId} for ${generatedPass.name} at ${generatedPass.clubName} for ${generatedPass.preferredDate} (${generatedPass.timeSlot}). Please confirm my walkthrough with Mr. Davkhare's concierge team.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm Walkthrough on WhatsApp (+91 98920 17777)</span>
                </a>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(
                          `Nitrro VIP Pass #${generatedPass.passId} for ${generatedPass.name} at ${generatedPass.clubName}`
                        );
                        showToast('Pass details copied to clipboard!');
                      }
                    }}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Pass ID</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: REQUEST ZONE DEMO
          ========================================================================= */}
      {demoAmenity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md glass-card rounded-xl p-6 border border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  Zone Walkthrough Demonstration
                </div>
                <h3 className="font-display text-xl text-white font-bold mt-0.5">{demoAmenity.title}</h3>
              </div>
              <button
                onClick={() => setDemoAmenity(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="leading-relaxed font-light">{demoAmenity.description}</p>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                <span className="text-amber-400 font-semibold text-[11px] block">
                  Included in Demo Session:
                </span>
                {demoAmenity.specs.map((s) => (
                  <div key={s} className="flex items-center space-x-1.5 text-slate-400">
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    specialRequests: `Interested in private demonstration of ${demoAmenity.title}`,
                  }));
                  setDemoAmenity(null);
                  const vipSection = document.getElementById('vip-pass');
                  if (vipSection) vipSection.scrollIntoView({ behavior: 'smooth' });
                  showToast(`Added ${demoAmenity.title} demo request to VIP pass form!`);
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Add to VIP Pass Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING TOAST NOTIFICATION
          ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className="glass-card px-5 py-3 rounded-lg border border-amber-500/60 shadow-2xl flex items-center space-x-3 text-xs">
            <span className="text-amber-400">✦</span>
            <span className="text-white font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs pl-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
