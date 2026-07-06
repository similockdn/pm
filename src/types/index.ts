export type Role = 'admin' | 'principal' | 'vice_principal' | 'council' | 'team_leader' | 'teacher' | 'staff' | 'accountant' | 'viewer';
export type EvalStatus = 'draft' | 'submitted' | 'peer_reviewed' | 'team_reviewed' | 'council_reviewed' | 'approved' | 'locked' | 'returned';
export type Rating = 'HTXSNV' | 'HTTNV' | 'HTNV' | 'KHTNV';

export interface StaffMember {
  id: string;
  code: string;
  fullName: string;
  department: string;
  position: string;
  role: Role;
  email: string;
  phone?: string;
  isPartyMember?: boolean;
  employmentType: 'Biên chế' | 'Hợp đồng' | 'Khác';
}

export interface CriteriaGroup {
  id: string;
  name: string;
  maxScore: number;
  order: number;
}

export interface CriteriaItem {
  id: string;
  groupId: string;
  name: string;
  maxScore: number;
  description?: string;
  requiredEvidence?: boolean;
}

export interface Evaluation {
  id: string;
  staffId: string;
  month: number;
  schoolYear: string;
  commonScore: number;
  taskScore: number;
  bonusScore: number;
  penaltyScore: number;
  totalScore: number;
  rating: Rating;
  status: EvalStatus;
  selfComment: string;
  teamComment?: string;
  councilComment?: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  before?: unknown;
  after?: unknown;
  createdAt: string;
}
