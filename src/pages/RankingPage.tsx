import React, { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

type RankingEntry = {
  employeeId: string;
  name: string;
  coinBalance: number;
  rank: number;
};

type RankingMode = 'live' | 'daily';

const RankingPage: React.FC = () => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<RankingMode>('live');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const loadLiveRankings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/rankings/live`);
      if (!res.ok) throw new Error('Failed to load rankings');
      const data = (await res.json()) as RankingEntry[];
      setRankings(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load live rankings:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadDailyRankings = async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/rankings/daily/${date}`);
      if (!res.ok) throw new Error('Failed to load daily rankings');
      const data = (await res.json()) as { date: string; rankings: RankingEntry[] };
      setRankings(data.rankings || []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load daily rankings:', e);
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'live') {
      void loadLiveRankings();
      // 5초마다 실시간 랭킹 갱신
      const interval = setInterval(() => {
        void loadLiveRankings();
      }, 5000);
      return () => clearInterval(interval);
    } else {
      void loadDailyRankings(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, selectedDate]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50 ring-2 ring-yellow-300">
          <span className="text-xl font-bold text-slate-900">🥇</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg shadow-gray-400/50 ring-2 ring-gray-200">
          <span className="text-xl font-bold text-slate-900">🥈</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-700/50 ring-2 ring-amber-500">
          <span className="text-xl font-bold text-slate-50">🥉</span>
        </div>
      );
    }
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/70 ring-1 ring-slate-600">
        <span className="text-sm font-bold text-slate-300">{rank}</span>
      </div>
    );
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5';
    if (rank === 2) return 'border-gray-400/50 bg-gradient-to-r from-gray-400/10 to-gray-500/5';
    if (rank === 3) return 'border-amber-600/50 bg-gradient-to-r from-amber-600/10 to-amber-700/5';
    if (rank <= 10) return 'border-cyan-500/30 bg-slate-900/70';
    return 'border-slate-800/70 bg-slate-900/70';
  };

  const currentUser = getCurrentUser();
  const userRank = currentUser
    ? rankings.findIndex((r) => r.employeeId === currentUser.employeeId) + 1
    : 0;
  const userEntry = currentUser
    ? rankings.find((r) => r.employeeId === currentUser.employeeId)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-50">🏆 PLAYER 랭킹</h1>
        <p className="mt-2 text-sm text-slate-400">
          누적 코인 적립량을 기준으로 한 실시간 랭킹입니다.
        </p>
      </div>

      {/* 모드 선택 및 날짜 선택 */}
      <div className="glass-panel flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('live')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              mode === 'live'
                ? 'bg-kepco-sky text-slate-900'
                : 'border border-slate-700/70 bg-slate-950/40 text-slate-300 hover:bg-slate-900/70'
            }`}
          >
            ⚡ 실시간 랭킹
          </button>
          <button
            onClick={() => setMode('daily')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              mode === 'daily'
                ? 'bg-kepco-sky text-slate-900'
                : 'border border-slate-700/70 bg-slate-950/40 text-slate-300 hover:bg-slate-900/70'
            }`}
          >
            📅 일일 랭킹
          </button>
        </div>

        {mode === 'daily' && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="rounded-lg border border-slate-700/70 bg-slate-950/40 px-3 py-2 text-sm text-slate-300 focus:border-kepco-sky focus:outline-none"
          />
        )}

        {mode === 'live' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            실시간 동기화
          </span>
        )}
      </div>

      {/* 내 랭킹 표시 (로그인한 경우) */}
      {currentUser && userEntry && (
        <div className={`glass-panel rounded-xl border-2 ${getRankColor(userRank)} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getRankBadge(userRank)}
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  {userEntry.name} ({userEntry.employeeId})
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {userRank}위 · {userEntry.coinBalance.toLocaleString()} KEP코인
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-kepco-sky">{userEntry.coinBalance.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400">보유 코인</p>
            </div>
          </div>
        </div>
      )}

      {/* 랭킹 리스트 */}
      <div className="glass-panel flex flex-col gap-3 p-5">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="section-title">랭킹 목록</h2>
            <p className="mt-1 text-xs text-slate-400">
              {mode === 'live'
                ? '실시간으로 업데이트되는 코인 보유량 기준 랭킹입니다.'
                : `${selectedDate}일의 일일 랭킹 스냅샷입니다.`}
            </p>
          </div>
          <span className="text-xs text-slate-500">총 {rankings.length}명</span>
        </header>

        <div className="relative max-h-[600px] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-900 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="no-scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-1">
            {loading && rankings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">불러오는 중...</div>
            ) : rankings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                {mode === 'daily' ? '해당 날짜의 랭킹 데이터가 없습니다.' : '랭킹 데이터가 없습니다.'}
              </div>
            ) : (
              rankings.map((entry, index) => {
                const isCurrentUser = currentUser && entry.employeeId === currentUser.employeeId;
                return (
                  <div
                    key={`${entry.employeeId}-${index}`}
                    className={`flex items-center justify-between rounded-xl border-2 ${getRankColor(
                      entry.rank
                    )} p-4 transition hover:scale-[1.01] ${
                      isCurrentUser ? 'ring-2 ring-kepco-sky/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {getRankBadge(entry.rank)}
                      <div>
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-50">
                          {entry.name}
                          {isCurrentUser && (
                            <span className="rounded-full bg-kepco-sky/20 px-2 py-0.5 text-[10px] text-kepco-sky">
                              나
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">{entry.employeeId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-300">
                          {entry.coinBalance.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500">KEP코인</p>
                      </div>
                      {entry.rank <= 3 && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/70">
                          <span className="text-lg">
                            {entry.rank === 1 ? '👑' : entry.rank === 2 ? '⭐' : '✨'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;

