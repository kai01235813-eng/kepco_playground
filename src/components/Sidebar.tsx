import type React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const linkBase =
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 ring-transparent transition';

  return (
    <aside className="glass-panel flex w-64 flex-col gap-6 p-6">
      <Link
        to="/"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-kepco-blue/20 ring-2 ring-kepco-sky/60">
          <span className="text-xl font-extrabold text-kepco-sky">⚡</span>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-kepco-sky">
            KEPCO DX
          </p>
          <p className="text-sm font-semibold text-slate-50">
            SW Playground
          </p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 text-sm">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Navigation
        </p>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-kepco-blue/30 text-xs">
            🏠
          </span>
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/playground"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            🎮
          </span>
          <span>Playground</span>
        </NavLink>
        <NavLink
          to="/innovation"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            💡
          </span>
          <span>아이디어 Zone</span>
        </NavLink>
        <NavLink
          to="/knowledge"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            📚
          </span>
          <span>지식 공유</span>
        </NavLink>
        <NavLink
          to="/governance"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            ⚖️
          </span>
          <span>집단 지성</span>
        </NavLink>
        <NavLink
          to="/rewards"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            🎁
          </span>
          <span>보상시스템</span>
        </NavLink>
        <NavLink
          to="/tokenomics"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-kepco-blue/20 text-kepco-sky ring-kepco-sky/60'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-kepco-sky'
            }`
          }
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs">
            💰
          </span>
          <span>토크노믹스</span>
        </NavLink>
      </nav>

      <div className="mt-auto rounded-xl border border-slate-700/70 bg-gradient-to-r from-kepco-navy via-slate-900/60 to-kepco-blue/40 px-4 py-3 text-xs text-slate-300">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-kepco-sky">
          Grid Mood
        </p>
        <p className="mb-1 text-[11px] leading-relaxed text-slate-200">
          오늘도 전력망은 안정적 ⚡ 아이디어와 코드로 DX 그리드를 함께
          채워보세요.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

