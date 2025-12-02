import type React from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import HotIdeasSection from './components/HotIdeasSection';
import ActivityFeed from './components/ActivityFeed';
import CoinEconomySection from './components/CoinEconomySection';
import QuickLinks from './components/QuickLinks';
import InnovationPage from './pages/InnovationPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import GovernancePage from './pages/GovernancePage';
import PlaygroundPage from './pages/PlaygroundPage';
import PurposePage from './pages/PurposePage';
import TokenomicsPage from './pages/TokenomicsPage';
import RewardsPage from './pages/RewardsPage';
import LoginPopupPage from './pages/LoginPopupPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import AnonymousBoard from './components/AnonymousBoard/AnonymousBoard';

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // 로그인 페이지는 독립적인 레이아웃
  if (isLoginPage) {
    return <LoginPopupPage />;
  }

  // 일반 페이지는 기본 레이아웃
  return (
    <div className="min-h-screen bg-gradient-to-br from-kepco-navyDeep via-slate-950 to-slate-900 text-slate-100 grid-bg">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-kepco-sky/15 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-kepco-blue/25 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-6xl gap-5 px-4 py-5 md:px-6 lg:px-8">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                    <div className="flex min-w-0 flex-col gap-4">
                      <HotIdeasSection />
                      <QuickLinks />
                    </div>
                    <div className="flex min-w-0 flex-col gap-4">
                      <ActivityFeed />
                      <CoinEconomySection />
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/innovation" element={<InnovationPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/knowledge" element={<KnowledgeHubPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/tokenomics" element={<TokenomicsPage />} />
            <Route path="/purpose" element={<PurposePage />} />
          </Routes>
        </main>

        <AnonymousBoard />
      </div>
    </div>
  );
};

export default App;


