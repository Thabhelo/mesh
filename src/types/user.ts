export type Department =
  | 'fire'
  | 'police'
  | 'ems'
  | 'hospital'
  | 'transit'
  | 'dispatch'
  | 'emergency_management'
  | 'administration';

export interface DepartmentInfo {
  id: Department;
  label: string;
  description: string;
  color: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'fire',
    label: 'Fire Department',
    description: 'Fire suppression, rescue, and prevention services',
    color: '#DC2626',
  },
  {
    id: 'police',
    label: 'Police Department',
    description: 'Law enforcement and public safety',
    color: '#2563EB',
  },
  {
    id: 'ems',
    label: 'EMS / Paramedics',
    description: 'Emergency medical services and ambulance',
    color: '#059669',
  },
  {
    id: 'hospital',
    label: 'Hospital / Healthcare',
    description: 'Emergency rooms and healthcare facilities',
    color: '#7C3AED',
  },
  {
    id: 'transit',
    label: 'Transit Authority',
    description: 'Public transportation and mobility services',
    color: '#0891B2',
  },
  {
    id: 'dispatch',
    label: '911 / Dispatch Center',
    description: 'Emergency call centers and dispatch operations',
    color: '#CA8A04',
  },
  {
    id: 'emergency_management',
    label: 'Emergency Management',
    description: 'Disaster preparedness and response coordination',
    color: '#EA580C',
  },
  {
    id: 'administration',
    label: 'City / County Administration',
    description: 'Government oversight and policy coordination',
    color: '#64748B',
  },
];

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  department: Department | null;
  createdAt: Date;
  updatedAt: Date;
}

export function getDepartmentInfo(departmentId: Department | null): DepartmentInfo | null {
  if (!departmentId) return null;
  return DEPARTMENTS.find((d) => d.id === departmentId) || null;
}

