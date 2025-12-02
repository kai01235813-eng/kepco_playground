import type React from 'react';
import { useState, useEffect } from 'react';
import WalletConnect from './WalletConnect';
import SimpleLogin from './SimpleLogin';
import AttendanceCheck from './AttendanceCheck';

interface HeroSectionProps {
  onShowPurpose?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShowPurpose }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [user, setUser] = useState<{ employeeId: string; name: string; coinBalance: number } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
        }
      } catch {
        // ignore
      }
    };
    loadUser();
    // localStorage 변경 감지
    const interval = setInterval(loadUser, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShowPurpose = () => {
    if (onShowPurpose) {
      onShowPurpose();
    } else {
      // 익명 게시판 위젯이 보이도록 스크롤하거나 하이라이트
      const boardElement = document.querySelector('[data-anonymous-board]');
      if (boardElement) {
        boardElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // 잠시 하이라이트 효과
        boardElement.classList.add('ring-2', 'ring-kepco-sky', 'ring-opacity-75');
        setTimeout(() => {
          boardElement.classList.remove('ring-2', 'ring-kepco-sky', 'ring-opacity-75');
        }, 2000);
      } else {
        alert('좌측 하단의 익명 게시판에서 홈페이지 제작 목적을 확인할 수 있습니다.');
      }
    }
  };

  return (
    <section className="glass-panel relative overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-kepco-sky/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-kepco-blue/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),transparent_55%)]" />
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
            Welcome back
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-50 md:text-3xl">
            <div>Connect Your Passion.</div>
            <div className="bg-gradient-to-r from-kepco-sky via-kepco-blue to-indigo-300 bg-clip-text text-transparent">
              Power the KEPCO.
            </div>
          </h1>
          <p className="mt-2 max-w-xl text-xs text-slate-300 md:text-sm">
            한전 DX 생태계에 참여해 보세요. 당신의 잠재된 <strong className="text-kepco-sky">열정</strong>과
            기여만으로도 KEP코인을 획득하고, 미래 에너지 그리드를 함께 설계하여{' '}
            <strong className="text-kepco-blue">KEPCO의 동력</strong>이 될 수 있습니다.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={handleShowPurpose}
              className="rounded-lg bg-kepco-sky px-4 py-2 font-semibold text-slate-950 shadow-lg shadow-kepco-sky/40 transition hover:bg-kepco-blue"
            >
              홈페이지 제작 목적
            </button>
            <SimpleLogin
              onLogin={(employeeId, userData) => {
                // eslint-disable-next-line no-console
                console.log('Logged in:', userData);
                window.location.reload();
              }}
            />
            <WalletConnect
              onConnect={(address) => {
                setWalletAddress(address);
              }}
              onDisconnect={() => {
                setWalletAddress('');
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-start justify-end gap-3 md:mt-0 md:w-72">
          <div className="flex w-full items-center justify-between rounded-2xl border border-kepco-blue/50 bg-slate-950/80 px-4 py-3 shadow-inner shadow-kepco-sky/40">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-300">
                KEP코인
              </p>
              <p className="mt-1 text-xl font-semibold text-cyan-200">
                {user ? user.coinBalance.toLocaleString() : '0'} 개
              </p>
              <p className="text-[11px] text-slate-400">
                {user ? '로그인한 사용자의 코인 잔액' : '로그인 후 코인을 획득하세요'}
              </p>
            </div>
            <div className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-kepco-blue to-kepco-sky text-slate-950 shadow-lg shadow-kepco-sky/50">
              <span className="text-xs font-bold tracking-wide">KEP</span>
              <span className="text-[9px] font-semibold">Wallet</span>
              <span className="absolute -top-1 -right-1 animate-bounce text-base">
                ✨
              </span>
            </div>
          </div>
          <AttendanceCheck />
          <div className="flex w-full items-center justify-between text-[11px] text-slate-300">
            <div className="flex flex-col">
              <span className="text-slate-400">이번 주 기여</span>
              <span className="font-semibold text-cyan-200">+5 PR · +2 이슈</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>온체인 정산 완료</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


