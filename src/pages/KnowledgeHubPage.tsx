import type React from 'react';

const KnowledgeHubPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">지식 공유</h1>
          <p className="mt-1 text-xs text-slate-300">
            개발 환경, 보안, 사내 규정부터 현업 꿀팁까지 — 한전 DX를 위한 지식 허브입니다.
          </p>
        </div>
        <span className="coin-badge">📚 오늘의 DX TMI 모드</span>
      </section>

      <section className="glass-panel grid gap-4 p-5 md:grid-cols-[1.6fr_1.4fr]">
        <div className="flex flex-col gap-3 text-xs">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="section-title">가이드 문서 (Markdown)</h2>
              <p className="mt-1 text-xs text-slate-400">
                개발 환경 설정, 정보보안, 사내 규정 문서를 검색/열람합니다. (Demo UI)
              </p>
            </div>
            <input
              className="h-8 rounded-full border border-slate-700/60 bg-slate-900/70 px-3 text-[11px] text-slate-200 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="문서 검색 (예: VPN, Git 정책)"
            />
          </header>
          <div className="grid gap-3 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="mb-1 text-[11px] text-slate-400">개발 환경</p>
              <p className="text-sm font-semibold text-slate-50">
                사내 Github + VPN 개발 환경 설정 가이드
              </p>
              <p className="mt-1 text-slate-300">
                Node, Python, 사내 프록시 설정과 필수 보안 수칙을 정리한 구조화된 문서입니다.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="mb-1 text-[11px] text-slate-400">정보보안</p>
              <p className="text-sm font-semibold text-slate-50">
                소스코드/데이터 반출 금지 체크리스트
              </p>
              <p className="mt-1 text-slate-300">
                외부 오픈소스 활용 시 라이선스, 데이터 마스킹, 로그 관리 등 필수 확인 항목.
              </p>
            </article>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <h2 className="section-title">Q&amp;A / 팁 게시판</h2>
          <div className="flex flex-col gap-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">익명 · DX-초보</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                사내 프록시 환경에서 npm 설치가 너무 느린데, 팁이 있을까요?
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">실명 · Grid-Lab</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                배전계통 데이터 샘플은 어디서 받을 수 있나요?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel flex flex-col gap-3 p-5 text-xs">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="section-title">템플릿 아카이브</h2>
            <p className="mt-1 text-xs text-slate-400">
              코드/엑셀/보고서 템플릿을 업로드하고 평점을 줄 수 있습니다. (Demo UI)
            </p>
          </div>
        </header>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
            <p className="text-[11px] text-slate-400">코드 템플릿</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              Python 데이터 정제 스켈레톤
            </p>
            <p className="mt-1 text-[11px] text-slate-500">★ 4.8 · 다운로드 120</p>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
            <p className="text-[11px] text-slate-400">엑셀 템플릿</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              월간 설비 점검 대시보드
            </p>
            <p className="mt-1 text-[11px] text-slate-500">★ 4.5 · 다운로드 87</p>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
            <p className="text-[11px] text-slate-400">보고서 템플릿</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              DX PoC 결과 보고서 포맷
            </p>
            <p className="mt-1 text-[11px] text-slate-500">★ 4.9 · 다운로드 45</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeHubPage;


