import type React from 'react';

const CoinEconomySection: React.FC = () => {
  const totalSupply = 1_000_000;
  const circulating = 420_500;
  const last24hIssued = 4_320;
  const last24hBurned = 780;

  const issuedRatio = (last24hIssued / (last24hIssued + last24hBurned)) * 100;

  return (
    <section className="glass-panel flex flex-col gap-4 p-5">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="section-title">코인 경제 현황</h2>
          <p className="mt-1 text-xs text-slate-400">
            KEP코인 발행·유통량과 최근 24시간의 지급/소각 흐름을 요약합니다.
          </p>
        </div>
        <button className="rounded-lg border border-slate-700/80 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition hover:border-cyan-400/80 hover:text-cyan-200">
          장부 보기
        </button>
      </header>

      <div className="grid gap-3 text-xs text-slate-200 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
          <p className="text-[11px] text-slate-400">총 발행량</p>
          <p className="mt-1 text-lg font-semibold text-cyan-200">
            {totalSupply.toLocaleString()} KEP
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            거버넌스에 의해 상한 조정 가능
          </p>
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
          <p className="text-[11px] text-slate-400">유통량</p>
          <p className="mt-1 text-lg font-semibold text-emerald-200">
            {circulating.toLocaleString()} KEP
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            전체의 {Math.round((circulating / totalSupply) * 100)}% 유통 중
          </p>
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
          <p className="text-[11px] text-slate-400">최근 24h 순 발행</p>
          <p className="mt-1 text-lg font-semibold text-sky-200">
            +{(last24hIssued - last24hBurned).toLocaleString()} KEP
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            지급 {last24hIssued.toLocaleString()} · 소각{' '}
            {last24hBurned.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <p className="mb-2 text-[11px] text-slate-400">
          24시간 지급/사용 흐름 (간단 시각화)
        </p>
        <div className="relative h-28 overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3">
          <div className="absolute inset-x-4 top-6 flex h-14 items-end justify-between gap-1">
            {Array.from({ length: 16 }).map((_, idx) => {
              const base = 0.35 + Math.sin(idx / 2) * 0.2 + (idx % 3 === 0 ? 0.1 : 0);
              const height = Math.max(0.12, Math.min(0.9, base));
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="w-1.5 rounded-t-full bg-gradient-to-t from-cyan-500/40 via-cyan-400/70 to-sky-300"
                  style={{ height: `${height * 100}%` }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0">
            <div className="absolute inset-x-4 bottom-6 h-px bg-gradient-to-r from-slate-700/40 via-slate-600/40 to-slate-700/40" />
          </div>

          <div className="relative flex items-center justify-between text-[10px] text-slate-400">
            <span>24h 전</span>
            <span>지금</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>지급 비율 {issuedRatio.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              <span>소각 비율 {(100 - issuedRatio).toFixed(1)}%</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500">
            (Demo 데이터 · 실시간 연동 예정)
          </span>
        </div>
      </div>
    </section>
  );
};

export default CoinEconomySection;


