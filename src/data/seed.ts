import type { CriteriaGroup, CriteriaItem, Evaluation, StaffMember } from '../types';

export const schoolName = 'THCS Trưng Vương Đà Nẵng';
export const departments = ['Ban Giám hiệu', 'Tổ Toán - Tin', 'Tổ Ngữ văn', 'Tổ Ngoại ngữ', 'Tổ Khoa học tự nhiên', 'Tổ Khoa học xã hội', 'Tổ Văn phòng'];
export const schoolYears = ['2025-2026', '2026-2027'];

export const staffSeed: StaffMember[] = [
  { id: 'u1', code: 'CB001', fullName: 'Nguyễn Thị Minh An', department: 'Ban Giám hiệu', position: 'Hiệu trưởng', role: 'principal', email: 'hieutruong@trungvuong.edu.vn', employmentType: 'Biên chế', isPartyMember: true },
  { id: 'u2', code: 'CB002', fullName: 'Trần Văn Bình', department: 'Tổ Toán - Tin', position: 'Tổ trưởng', role: 'team_leader', email: 'binh@trungvuong.edu.vn', employmentType: 'Biên chế' },
  { id: 'u3', code: 'CB003', fullName: 'Lê Thị Cẩm Tú', department: 'Tổ Ngữ văn', position: 'Giáo viên', role: 'teacher', email: 'tu@trungvuong.edu.vn', employmentType: 'Biên chế' },
  { id: 'u4', code: 'CB004', fullName: 'Phạm Quốc Huy', department: 'Tổ Văn phòng', position: 'Kế toán', role: 'accountant', email: 'huy@trungvuong.edu.vn', employmentType: 'Hợp đồng' }
];

export const criteriaGroups: CriteriaGroup[] = [
  { id: 'common', name: 'Tiêu chí chung', maxScore: 30, order: 1 },
  { id: 'result', name: 'Kết quả thực hiện nhiệm vụ', maxScore: 70, order: 2 },
  { id: 'bonus', name: 'Điểm cộng/trừ', maxScore: 6, order: 3 }
];

export const criteriaItems: CriteriaItem[] = [
  { id: 'c1', groupId: 'common', name: 'Phẩm chất chính trị, đạo đức, lối sống', maxScore: 10, requiredEvidence: false },
  { id: 'c2', groupId: 'common', name: 'Ý thức kỷ luật, kỷ cương', maxScore: 5, requiredEvidence: false },
  { id: 'c3', groupId: 'common', name: 'Năng lực chuyên môn, nghiệp vụ', maxScore: 10, requiredEvidence: true },
  { id: 'c4', groupId: 'common', name: 'Thái độ phục vụ và phối hợp', maxScore: 5, requiredEvidence: false },
  { id: 'r1', groupId: 'result', name: 'Khối lượng tiết dạy / nhiệm vụ được giao', maxScore: 25, requiredEvidence: true },
  { id: 'r2', groupId: 'result', name: 'Chất lượng bài giảng / sản phẩm công việc', maxScore: 25, requiredEvidence: true },
  { id: 'r3', groupId: 'result', name: 'Tiến độ hoàn thành hồ sơ sổ sách', maxScore: 20, requiredEvidence: true }
];

export const evaluationSeed: Evaluation[] = [
  { id: 'e1', staffId: 'u1', month: 8, schoolYear: '2025-2026', commonScore: 29, taskScore: 67, bonusScore: 2, penaltyScore: 0, totalScore: 98, rating: 'HTXSNV', status: 'approved', selfComment: 'Hoàn thành tốt nhiệm vụ quản lý.', updatedAt: new Date().toISOString() },
  { id: 'e2', staffId: 'u2', month: 8, schoolYear: '2025-2026', commonScore: 28, taskScore: 63, bonusScore: 0, penaltyScore: 0, totalScore: 91, rating: 'HTTNV', status: 'team_reviewed', selfComment: 'Hoàn thành kế hoạch chuyên môn.', updatedAt: new Date().toISOString() },
  { id: 'e3', staffId: 'u3', month: 8, schoolYear: '2025-2026', commonScore: 27, taskScore: 60, bonusScore: 0, penaltyScore: 1, totalScore: 86, rating: 'HTTNV', status: 'submitted', selfComment: 'Cần bổ sung minh chứng.', updatedAt: new Date().toISOString() },
  { id: 'e4', staffId: 'u4', month: 8, schoolYear: '2025-2026', commonScore: 25, taskScore: 58, bonusScore: 0, penaltyScore: 0, totalScore: 83, rating: 'HTNV', status: 'draft', selfComment: 'Đang cập nhật.', updatedAt: new Date().toISOString() }
];
