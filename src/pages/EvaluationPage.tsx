import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { calcTotal, resolveRating, validateEvaluation } from '../utils/evaluation';

export default function EvaluationPage() {
  const { evaluations, staff, keyword, upsertEvaluation } = useAppStore();
  const [form, setForm] = useState({ staffId: staff[0]?.id || '', commonScore: 30, taskScore: 65, bonusScore: 0, penaltyScore: 0, selfComment: '' });
  const total = calcTotal(form.commonScore, form.taskScore, form.bonusScore, form.penaltyScore);
  const errors = validateEvaluation(form);
  const rows = evaluations.filter((e) => {
    const s = staff.find((x) => x.id === e.staffId);
    return `${s?.fullName} ${s?.department} ${e.status} ${e.rating}`.toLowerCase().includes(keyword.toLowerCase());
  });
  const save = () => {
    if (errors.length) return alert(errors.join('\n'));
    upsertEvaluation({ id: `e${Date.now()}`, staffId: form.staffId, month: 8, schoolYear: '2025-2026', commonScore: form.commonScore, taskScore: form.taskScore, bonusScore: form.bonusScore, penaltyScore: form.penaltyScore, totalScore: total, rating: resolveRating(total), status: 'submitted', selfComment: form.selfComment, updatedAt: new Date().toISOString() });
  };
  return (
    <section className="page">
      <div className="panel">
        <h2>Phiếu đánh giá tháng</h2>
        <div className="form-grid">
          <label>Nhân sự<select value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })}>{staff.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}</select></label>
          <label>Tiêu chí chung /30<input type="number" value={form.commonScore} onChange={(e) => setForm({ ...form, commonScore: Number(e.target.value) })} /></label>
          <label>Kết quả nhiệm vụ /70<input type="number" value={form.taskScore} onChange={(e) => setForm({ ...form, taskScore: Number(e.target.value) })} /></label>
          <label>Điểm cộng tối đa +6<input type="number" value={form.bonusScore} onChange={(e) => setForm({ ...form, bonusScore: Number(e.target.value) })} /></label>
          <label>Điểm trừ<input type="number" value={form.penaltyScore} onChange={(e) => setForm({ ...form, penaltyScore: Number(e.target.value) })} /></label>
          <label>Tổng điểm<input value={`${total} - ${resolveRating(total)}`} readOnly /></label>
        </div>
        <textarea placeholder="Tự nhận xét, khó khăn, kiến nghị..." value={form.selfComment} onChange={(e) => setForm({ ...form, selfComment: e.target.value })} />
        {errors.length > 0 && <div className="error-box">{errors.map((x) => <div key={x}>{x}</div>)}</div>}
        <button onClick={save}>Lưu và gửi đánh giá</button>
      </div>
      <div className="panel">
        <h2>Danh sách đánh giá</h2>
        <table><thead><tr><th>Nhân sự</th><th>Tháng</th><th>30đ</th><th>70đ</th><th>+/-</th><th>Tổng</th><th>Xếp loại</th><th>Trạng thái</th></tr></thead>
        <tbody>{rows.map((e) => { const s = staff.find((x) => x.id === e.staffId); return <tr key={e.id}><td>{s?.fullName}</td><td>{e.month}/{e.schoolYear}</td><td>{e.commonScore}</td><td>{e.taskScore}</td><td>+{e.bonusScore}/-{e.penaltyScore}</td><td>{e.totalScore}</td><td>{e.rating}</td><td><span className="badge">{e.status}</span></td></tr>; })}</tbody></table>
      </div>
    </section>
  );
}
