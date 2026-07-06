import { departments, schoolYears } from '../data/seed';

export default function SettingsPage() {
  return (
    <section className="page">
      <div className="panel"><h2>Danh mục hệ thống</h2><div className="settings-grid"><div><h3>Năm học</h3>{schoolYears.map((x) => <span className="chip" key={x}>{x}</span>)}</div><div><h3>Tổ/Phòng ban</h3>{departments.map((x) => <span className="chip" key={x}>{x}</span>)}</div><div><h3>Phân quyền</h3>{['admin','principal','vice_principal','council','team_leader','teacher','staff','accountant','viewer'].map((x) => <span className="chip" key={x}>{x}</span>)}</div></div></div>
      <div className="panel"><h2>Checklist trước triển khai</h2><ol><li>Dán Firebase config vào file .env hoặc src/firebase/config.ts.</li><li>Bật Authentication Email/Password.</li><li>Publish Firestore Rules và Storage Rules.</li><li>Tạo tài khoản Admin đầu tiên trong collection users.</li><li>Chạy npm install, npm run build trước khi upload GitHub Pages.</li></ol></div>
    </section>
  );
}
