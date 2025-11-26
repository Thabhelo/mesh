// EMS Dashboard Types

export type CallPriority = 'critical' | 'urgent' | 'routine';
export type UnitStatus = 'available' | 'responding' | 'on_scene' | 'transporting' | 'at_hospital' | 'offline';
export type HospitalStatus = 'open' | 'busy' | 'divert';

export interface ActiveCall {
  id: string;
  type: string;
  priority: CallPriority;
  address: string;
  coordinates: { lat: number; lng: number };
  dispatchTime: Date;
  eta: number; // minutes
  notes: string;
  callerInfo?: string;
}

export interface Unit {
  id: string;
  callSign: string;
  type: 'ems' | 'fire' | 'police';
  status: UnitStatus;
  distance: number; // miles
  coordinates: { lat: number; lng: number };
  crew?: string[];
  currentCall?: string;
}

export interface Hospital {
  id: string;
  name: string;
  distance: number; // miles
  eta: number; // minutes
  capacity: number; // 0-100 percentage
  status: HospitalStatus;
  traumaLevel?: 1 | 2 | 3 | 4 | 5;
  specialties: string[];
  divertReason?: string;
}

export interface ShiftStats {
  callsToday: number;
  avgResponseTime: number; // minutes
  peakHours: string;
  hourlyPattern: number[]; // 24 values for each hour
}

export interface Message {
  id: string;
  from: string;
  fromUnit: string;
  content: string;
  timestamp: Date;
  priority: 'normal' | 'urgent';
  read: boolean;
}

export interface PatientHandoff {
  id: string;
  patientAge: number;
  patientSex: 'M' | 'F' | 'O';
  chiefComplaint: string;
  vitals: {
    bp: string;
    pulse: number;
    respRate: number;
    spo2: number;
    gcs: number;
  };
  interventions: string[];
  hospital: string;
  eta: number;
}

// Mock data generators
export const MOCK_ACTIVE_CALL: ActiveCall = {
  id: 'call-001',
  type: 'Chest Pain',
  priority: 'critical',
  address: '1847 Oak Street, Apt 4B',
  coordinates: { lat: 40.7128, lng: -74.006 },
  dispatchTime: new Date(Date.now() - 4 * 60 * 1000),
  eta: 4,
  notes: '67yo male, history of cardiac issues, conscious and breathing',
  callerInfo: 'Spouse on scene',
};

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Memorial General',
    distance: 2.4,
    eta: 8,
    capacity: 65,
    status: 'open',
    traumaLevel: 1,
    specialties: ['Cardiac', 'Stroke', 'Trauma'],
  },
  {
    id: 'hosp-2',
    name: "St. Mary's Medical",
    distance: 3.1,
    eta: 12,
    capacity: 82,
    status: 'busy',
    traumaLevel: 2,
    specialties: ['Cardiac', 'Pediatric'],
  },
  {
    id: 'hosp-3',
    name: 'County General',
    distance: 4.8,
    eta: 18,
    capacity: 95,
    status: 'divert',
    traumaLevel: 3,
    specialties: ['General'],
    divertReason: 'ED at capacity',
  },
  {
    id: 'hosp-4',
    name: 'University Hospital',
    distance: 5.2,
    eta: 20,
    capacity: 45,
    status: 'open',
    traumaLevel: 1,
    specialties: ['Trauma', 'Burn', 'Neuro', 'Cardiac'],
  },
];

export const MOCK_UNITS: Unit[] = [
  { id: 'u1', callSign: 'M-38', type: 'ems', status: 'available', distance: 0.8, coordinates: { lat: 40.715, lng: -74.01 } },
  { id: 'u2', callSign: 'M-51', type: 'ems', status: 'on_scene', distance: 1.2, coordinates: { lat: 40.718, lng: -74.002 } },
  { id: 'u3', callSign: 'F-12', type: 'fire', status: 'responding', distance: 0.3, coordinates: { lat: 40.712, lng: -74.008 } },
  { id: 'u4', callSign: 'M-44', type: 'ems', status: 'transporting', distance: 2.1, coordinates: { lat: 40.722, lng: -73.998 } },
  { id: 'u5', callSign: 'P-7', type: 'police', status: 'on_scene', distance: 0.5, coordinates: { lat: 40.713, lng: -74.005 } },
  { id: 'u6', callSign: 'M-29', type: 'ems', status: 'at_hospital', distance: 3.2, coordinates: { lat: 40.725, lng: -74.015 } },
];

export const MOCK_SHIFT_STATS: ShiftStats = {
  callsToday: 12,
  avgResponseTime: 6.2,
  peakHours: '3-5 PM',
  hourlyPattern: [2, 1, 1, 0, 1, 2, 3, 5, 7, 8, 6, 5, 4, 5, 6, 8, 9, 7, 5, 4, 3, 3, 2, 2],
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    from: 'Dispatch',
    fromUnit: 'Central',
    content: 'Multi-vehicle accident reported on I-95 South. Additional units may be requested.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    priority: 'urgent',
    read: false,
  },
  {
    id: 'msg-2',
    from: 'Memorial ED',
    fromUnit: 'Hospital',
    content: 'Cardiac cath lab ready for incoming STEMI patient.',
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
    priority: 'normal',
    read: true,
  },
  {
    id: 'msg-3',
    from: 'Lt. Rodriguez',
    fromUnit: 'M-51',
    content: 'Scene secured. PD on site. Safe to approach.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    priority: 'normal',
    read: true,
  },
];

