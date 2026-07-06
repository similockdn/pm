import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import StaffPage from './pages/StaffPage';
import CriteriaPage from './pages/CriteriaPage';
import EvaluationPage from './pages/EvaluationPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/criteria" element={<CriteriaPage />} />
        <Route path="/evaluations" element={<EvaluationPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
