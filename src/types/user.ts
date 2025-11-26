export type Department =
  | 'fire'
  | 'police'
  | 'ems'
  | 'dispatch'
  | 'administration';

export interface DepartmentInfo {
  id: Department;
  label: string;
  description: string;
  color: string;
  dashboardPath: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'fire',
    label: 'Fire Department',
    description: 'Fire suppression, rescue operations, and hazmat response',
    color: '#DC2626',
    dashboardPath: '/dashboard/fire',
  },
  {
    id: 'police',
    label: 'Police Department',
    description: 'Law enforcement and public safety',
    color: '#2563EB',
    dashboardPath: '/dashboard/police',
  },
  {
    id: 'ems',
    label: 'EMS / Paramedics',
    description: 'Emergency medical services and patient transport',
    color: '#059669',
    dashboardPath: '/dashboard/ems',
  },
  {
    id: 'dispatch',
    label: '911 Dispatch Center',
    description: 'Emergency call handling and multi-agency coordination',
    color: '#CA8A04',
    dashboardPath: '/dashboard/dispatch',
  },
  {
    id: 'administration',
    label: 'City / County Administration',
    description: 'Government oversight, policy, and resource allocation',
    color: '#64748B',
    dashboardPath: '/dashboard/admin',
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
