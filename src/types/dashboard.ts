// Shared dashboard types for all departments

export type Status = 'available' | 'responding' | 'on_scene' | 'busy' | 'offline';
export type Priority = 1 | 2 | 3;

export interface Incident {
  id: string;
  type: string;
  priority: Priority;
  address: string;
  dispatchTime: Date;
  assignedUnits: string[];
  notes: string;
}

export interface Unit {
  id: string;
  callSign: string;
  status: Status;
  location: string;
  personnel?: number;
  officer?: string;
}

// Fire-specific
export interface FireIncident extends Incident {
  alarmLevel: 1 | 2 | 3 | 4 | 5;
}

export interface Apparatus extends Unit {
  type: 'engine' | 'ladder' | 'rescue' | 'battalion' | 'hazmat';
  crew: number;
}

// EMS-specific  
export interface Hospital {
  id: string;
  name: string;
  distance: number;
  eta: number;
  capacity: number;
  status: 'open' | 'busy' | 'divert';
}

// Dispatch-specific
export interface QueuedCall {
  id: string;
  type: string;
  priority: Priority;
  address: string;
  receivedTime: Date;
  status: 'pending' | 'dispatched' | 'en_route' | 'on_scene' | 'closed';
  assignedAgency: ('fire' | 'police' | 'ems')[];
}

// Mock data
export const MOCK_FIRE_INCIDENTS: FireIncident[] = [
  {
    id: 'INC-2847',
    type: 'Structure Fire',
    priority: 1,
    address: '742 Evergreen Terrace',
    dispatchTime: new Date(Date.now() - 8 * 60 * 1000),
    alarmLevel: 2,
    assignedUnits: ['E-12', 'E-15', 'L-7', 'BC-2'],
    notes: 'Two-story residential, smoke showing',
  },
  {
    id: 'INC-2848',
    type: 'Rescue',
    priority: 2,
    address: '1200 Industrial Parkway',
    dispatchTime: new Date(Date.now() - 22 * 60 * 1000),
    alarmLevel: 1,
    assignedUnits: ['R-3', 'E-8'],
    notes: 'Worker trapped, machinery incident',
  },
];

export const MOCK_APPARATUS: Apparatus[] = [
  { id: 'a1', callSign: 'E-12', type: 'engine', status: 'on_scene', location: '742 Evergreen Terrace', crew: 4 },
  { id: 'a2', callSign: 'L-7', type: 'ladder', status: 'on_scene', location: '742 Evergreen Terrace', crew: 4 },
  { id: 'a3', callSign: 'E-8', type: 'engine', status: 'responding', location: 'En route', crew: 4 },
  { id: 'a4', callSign: 'R-3', type: 'rescue', status: 'on_scene', location: '1200 Industrial Parkway', crew: 3 },
  { id: 'a5', callSign: 'E-22', type: 'engine', status: 'available', location: 'Station 22', crew: 4 },
  { id: 'a6', callSign: 'L-11', type: 'ladder', status: 'available', location: 'Station 11', crew: 4 },
];

export const MOCK_POLICE_CALLS: Incident[] = [
  {
    id: 'PD-4521',
    type: 'Burglary',
    priority: 1,
    address: '890 Commerce Street',
    dispatchTime: new Date(Date.now() - 6 * 60 * 1000),
    assignedUnits: ['P-14', 'P-22'],
    notes: 'Silent alarm triggered, rear entrance',
  },
  {
    id: 'PD-4522',
    type: 'Disturbance',
    priority: 2,
    address: '145 Oak Avenue',
    dispatchTime: new Date(Date.now() - 18 * 60 * 1000),
    assignedUnits: ['P-8'],
    notes: 'Noise complaint, multiple callers',
  },
];

export const MOCK_POLICE_UNITS: Unit[] = [
  { id: 'u1', callSign: 'P-14', status: 'on_scene', location: '890 Commerce Street', officer: 'Ofc. Martinez' },
  { id: 'u2', callSign: 'P-22', status: 'on_scene', location: '890 Commerce Street', officer: 'Ofc. Thompson' },
  { id: 'u3', callSign: 'P-8', status: 'on_scene', location: '145 Oak Avenue', officer: 'Ofc. Williams' },
  { id: 'u4', callSign: 'P-5', status: 'available', location: 'Patrol - District 2', officer: 'Ofc. Johnson' },
  { id: 'u5', callSign: 'P-19', status: 'available', location: 'Patrol - District 4', officer: 'Ofc. Brown' },
];

export const MOCK_EMS_CALLS: Incident[] = [
  {
    id: 'EMS-001',
    type: 'Chest Pain',
    priority: 1,
    address: '1847 Oak Street, Apt 4B',
    dispatchTime: new Date(Date.now() - 4 * 60 * 1000),
    assignedUnits: ['M-42'],
    notes: '67yo male, cardiac history, conscious',
  },
  {
    id: 'EMS-002',
    type: 'Fall Injury',
    priority: 2,
    address: '523 Maple Avenue',
    dispatchTime: new Date(Date.now() - 18 * 60 * 1000),
    assignedUnits: ['M-38'],
    notes: '45yo female, possible arm fracture',
  },
];

export const MOCK_HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'Memorial General', distance: 2.4, eta: 8, capacity: 65, status: 'open' },
  { id: 'h2', name: "St. Mary's Medical", distance: 3.1, eta: 12, capacity: 82, status: 'busy' },
  { id: 'h3', name: 'County General', distance: 4.8, eta: 18, capacity: 95, status: 'divert' },
];

export const MOCK_DISPATCH_QUEUE: QueuedCall[] = [
  {
    id: '911-8847',
    type: 'Structure Fire',
    priority: 1,
    address: '742 Evergreen Terrace',
    receivedTime: new Date(Date.now() - 2 * 60 * 1000),
    status: 'dispatched',
    assignedAgency: ['fire', 'ems'],
  },
  {
    id: '911-8848',
    type: 'Chest Pain',
    priority: 1,
    address: '1847 Oak Street',
    receivedTime: new Date(Date.now() - 4 * 60 * 1000),
    status: 'en_route',
    assignedAgency: ['ems'],
  },
  {
    id: '911-8851',
    type: 'Welfare Check',
    priority: 3,
    address: '234 Pine Road',
    receivedTime: new Date(Date.now() - 1 * 60 * 1000),
    status: 'pending',
    assignedAgency: [],
  },
];

