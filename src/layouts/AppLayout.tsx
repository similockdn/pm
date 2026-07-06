import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, ClipboardCheck, FileText, ListChecks, Settings, Users } from 'lucide-react';
import { schoolName } from '../data/seed';
import { useAppStore } from '../store/appStore';

const nav = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/staff', label: 'Hồ sơ cán bộ', icon: Users },
  { to: '/criteria', label: 'Danh mục tiêu chí', icon: ListChecks },
  { to: '/evaluations', label: 'Đánh giá tháng', icon: ClipboardCheck },
  { to: '/reports', label: 'Báo cáo', icon: FileText },
  { to: '/settings', label: 'Cài đặt', icon: Settings }
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { keyword, setKeyword } = useAppStore();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">TV</div>
          <div>
            <strong>{schoolName}</strong>
            <span>Quản lý đánh giá năng lực</span>
          </div>
        </div>
        <nav>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                <Icon size={19} /> {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <h1>{schoolName}</h1>
            <p>Hệ thống đánh giá, xếp loại chất lượng theo hiệu quả công việc</p>
          </div>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm tên, mã CB, tổ, trạng thái..." />
        </header>
        {children}
      </main>
    </div>
  );
}
