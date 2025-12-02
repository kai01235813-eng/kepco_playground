import type React from 'react';

const GovernancePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">집단 지성</h1>
          <p className="mt-1 text-xs text-slate-300">
            코인 보상 비율, 신규 기능 채택 등 DX 생태계를 구성원들이 함께 결정합니다.
          </p>
        </div>
        <span className="coin-badge">⚖️ 코인 민주주의 모드</span>
      </section>

      <section className="glass-panel grid gap-4 p-5 md:grid-cols-[1.5fr_1.5fr]">
        <div className="flex flex-col gap-3 text-xs">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="section-title">투표 목록</h2>
              <p className="mt-1 text-xs text-slate-400">
                진행 중/완료된 거버넌스 안건을 확인합니다. (Demo UI)
              </p>
            </div>
          </header>
          <div className="flex flex-col gap-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="text-[11px] text-emerald-300">진행 중 · 마감 D-3</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                다음 분기 KEP코인 보상 비율 조정
              </p>
              <p className="mt-1 text-slate-300">
                Issue/PR/리뷰 각각에 대한 코인 가중치를 어떻게 조정할지에 대한 안건입니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">완료 · 가결</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                신규 Innovation 레포지토리 생성 기준
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <h2 className="section-title">투표 상세 (예시)</h2>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <p className="mb-1 text-[11px] text-slate-400">내 투표권</p>
            <p className="text-sm font-semibold text-slate-100">
              보유 KEP 대비 투표 반영 비율: 1 KEP = 1 Vote
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              (실제 로직: Coin Ledger 기반 온체인 계산 예정)
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <p className="mb-2 text-[11px] text-slate-400">투명한 회계 장부 (샘플)</p>
            <div className="grid grid-cols-4 gap-1 text-[10px] text-slate-300">
              <span className="text-slate-500">일시</span>
              <span className="text-slate-500">변동량</span>
              <span className="text-slate-500">사유</span>
              <span className="text-slate-500">타입</span>

              <span>2025-12-01 10:30</span>
              <span className="text-emerald-300">+50 KEP</span>
              <span>Bug Fix #12</span>
              <span>지급</span>

              <span>2025-12-01 11:05</span>
              <span className="text-emerald-300">+30 KEP</span>
              <span>PR Merge #45</span>
              <span>지급</span>

              <span>2025-12-01 15:20</span>
              <span className="text-rose-300">-20 KEP</span>
              <span>거버넌스 투표 참여</span>
              <span>사용</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernancePage;


