import { useAppStore } from '../store/appStore';

export default function ReportsPage() {
  const { evaluations, staff } = useAppStore();
  return (
    <section className="page panel">
      <div className="section-head"><h2>Báo cáo tổng hợp</h2><div><button>Xuất Excel</button><button>Xuất PDF</button></div></div>
      <table><thead><tr><th>Tổ/Phòng ban</th><th>Tổng người</th><th>Đã đánh giá</th><th>Điểm TB</th><th>HTXSNV</th><th>HTTNV</th><th>HTNV</th></tr></thead>
      <tbody>{Array.from(new Set(staff.map((s) => s.department))).map((dep) => {
        const members = staff.filter((s) => s.department === dep);
        const evs = evaluations.filter((e) => members.some((m) => m.id === e.staffId));
        const avg = evs.length ? Math.round(evs.reduce((sum, e) => sum + e.totalScore, 0) / evs.length) : 0;
        return <tr key={dep}><td>{dep}</td><td>{members.length}</td><td>{evs.length}</td><td>{avg}</td><td>{evs.filter((e) => e.rating === 'HTXSNV').length}</td><td>{evs.filter((e) => e.rating === 'HTTNV').length}</td><td>{evs.filter((e) => e.rating === 'HTNV').length}</td></tr>;
      })}</tbody></table>
    </section>
  );
}
