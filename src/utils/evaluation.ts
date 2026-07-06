import type { Rating } from '../types';

export function calcTotal(commonScore: number, taskScore: number, bonusScore: number, penaltyScore: number) {
  const safeBonus = Math.min(Math.max(bonusScore, 0), 6);
  const total = Math.max(0, Math.min(100, commonScore + taskScore + safeBonus - Math.max(penaltyScore, 0)));
  return Math.round(total * 100) / 100;
}

export function resolveRating(totalScore: number): Rating {
  if (totalScore >= 95) return 'HTXSNV';
  if (totalScore >= 80) return 'HTTNV';
  if (totalScore >= 50) return 'HTNV';
  return 'KHTNV';
}

export function validateEvaluation(input: { commonScore: number; taskScore: number; bonusScore: number; penaltyScore: number }) {
  const errors: string[] = [];
  if (input.commonScore < 0 || input.commonScore > 30) errors.push('Tiêu chí chung phải từ 0 đến 30 điểm.');
  if (input.taskScore < 0 || input.taskScore > 70) errors.push('Kết quả nhiệm vụ phải từ 0 đến 70 điểm.');
  if (input.bonusScore < 0 || input.bonusScore > 6) errors.push('Điểm cộng tối đa +6 điểm.');
  if (input.penaltyScore < 0) errors.push('Điểm trừ không được âm.');
  return errors;
}
