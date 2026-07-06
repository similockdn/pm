import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppStore } from '../store/appStore';

export default function DashboardPage() {
  const { staff, evaluations } = useAppStore();
  const submitted = evaluations.filter((e) => e.status !== 'draft').length;
  const locked = evaluations.filter((e) => e.status === 'locked' || e.status === 'approved').length;
  const excellent = evaluations.filter((e) => e.rating === 'HTXSNV').length;
  const avg = Math.round(evaluations.reduce((s, e) => s + e.totalScore, 0) / evaluations.length);
  const chart = ['HTXSNV', 'HTTNV', 'HTNV', 'KHTNV'].map((r) => ({ name: r, value: evaluations.filter((e) => e.rating === r).length }));
  return (
    <section className="page">
      <div className="cards">
        <div className="card"><span>Tổng CBGVNV</span><strong>{staff.length}</strong><small>Đang quản lý hồ sơ</small></div>
        <div className="card"><span>Đã nộp đánh giá</span><strong>{submitted}</strong><small>Không tính bản nháp</small></div>
        <div className="card"><span>Đã duyệt/chốt</span><strong>{locked}</strong><small>Hội đồng / Hiệu trưởng</small></div>
        <div className="card"><span>HTXSNV</span><strong>{excellent}</strong><small>Kiểm soát quota 20%</small></div>
        <div className="card"><span>Điểm bình quân</span><strong>{avg}</strong><small>Thang điểm 100</small></div>
      </div>
      <div className="grid-2">
        <div className="panel">
          <h2>Thống kê xếp loại</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <h2>Cảnh báo nghiệp vụ</h2>
          <ul className="alerts">
            <li>{evaluations.filter((e) => e.status === 'draft').length} hồ sơ đang nháp, chưa gửi.</li>
            <li>{evaluations.filter((e) => e.totalScore > 100).length} hồ sơ vượt thang điểm.</li>
            <li>{evaluations.filter((e) => e.bonusScore > 6).length} hồ sơ vượt điểm cộng tối đa +6.</li>
            <li>Quota HTXSNV cần kiểm soát: tối đa 10% tổ + 10% hội đồng.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
