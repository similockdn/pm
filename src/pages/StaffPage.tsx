import { useAppStore } from '../store/appStore';

export default function StaffPage() {
  const { staff, keyword } = useAppStore();
  const rows = staff.filter((s) => `${s.code} ${s.fullName} ${s.department} ${s.position}`.toLowerCase().includes(keyword.toLowerCase()));
  return (
    <section className="page panel">
      <div className="section-head"><h2>Hồ sơ cán bộ, giáo viên, nhân viên</h2><button>+ Thêm hồ sơ</button></div>
      <table><thead><tr><th>Mã CB</th><th>Họ tên</th><th>Tổ/Phòng ban</th><th>Chức vụ</th><th>Vai trò</th><th>Email</th><th>Loại HĐ</th></tr></thead>
      <tbody>{rows.map((s) => <tr key={s.id}><td>{s.code}</td><td>{s.fullName}</td><td>{s.department}</td><td>{s.position}</td><td>{s.role}</td><td>{s.email}</td><td>{s.employmentType}</td></tr>)}</tbody></table>
    </section>
  );
}
