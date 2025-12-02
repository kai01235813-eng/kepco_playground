import { useState } from 'react';

const RewardsPage = () => {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setOpenStep(openStep === step ? null : step);
  };

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <header className="mb-8">
        <div className="glass-panel p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-300 mb-3">
            KEP코인 보상 시스템
          </h1>
          <p className="text-xl text-slate-200 font-semibold mb-2">
            당신의 기여가 KEPCO의 동력이 됩니다
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            KEP는 단순한 코인이 아닙니다. 그것은 KEPCO의 미래 에너지 네트워크를 구축하는 핵심 동력입니다.
          </p>
        </div>
      </header>

      {/* Section 1: 왜 KEPCO에 코인이 필요한가요? */}
      <section className="glass-panel p-6 mb-8">
        <h2 className="section-title mb-4 text-2xl font-bold text-kepco-sky">
          왜 KEPCO에 코인이 필요한가요? (미래 비전)
        </h2>
        <div className="space-y-4 text-slate-300">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              현재의 도전 과제
            </h3>
            <p className="leading-relaxed">
              신재생에너지, 전기차(EV), 에너지 저장 시스템(ESS) 등 분산 에너지원의 급격한 증가로 
              기존의 중앙집중식 전력망 관리 방식은 비효율적이고 비용이 증가하고 있습니다. 
              전통적인 방식으로는 이들 분산 자원을 효과적으로 통합하고 관리하기 어렵습니다.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-r from-kepco-blue/20 to-kepco-cyan/20 border border-kepco-sky/30">
            <h3 className="text-lg font-semibold text-kepco-sky mb-3 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              KEP의 해결책
            </h3>
            <p className="leading-relaxed">
              KEP와 블록체인 플랫폼을 통해 <strong className="text-kepco-sky">신뢰를 구축</strong>하고, 
              <strong className="text-kepco-sky"> 개인 간(P2P) 전력 거래</strong>를 가능하게 하여 
              <strong className="text-kepco-sky"> 망 수수료를 절감</strong>하고 에너지 거래의 
              투명성과 효율성을 극대화합니다. KEP는 이 미래 에너지 네트워크의 기반이 되며, 
              모든 참여자가 공정하게 기여에 대한 보상을 받을 수 있도록 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: KEP 보상은 어떻게 운영되나요? */}
      <section className="glass-panel p-6">
        <h2 className="section-title mb-6 text-2xl font-bold text-kepco-sky">
          KEP 보상은 어떻게 운영되나요? (4단계 로드맵)
        </h2>
        
        <div className="space-y-4">
          {/* 1단계 */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleStep(1)}
              className="w-full p-5 text-left bg-slate-900/50 hover:bg-slate-900/70 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">커뮤니티 활동 보상</h3>
                  <p className="text-sm text-slate-400">현재 운영 중</p>
                </div>
              </div>
              <span className="text-2xl text-slate-400">
                {openStep === 1 ? '−' : '+'}
              </span>
            </button>
            {openStep === 1 && (
              <div className="p-5 bg-slate-900/30 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed mb-4">
                  현재는 <strong className="text-cyan-300">Playground 내 SW 개발 활동, 아이디어 제안, 투표 참여 등</strong> 
                  커뮤니티 기여 활동에 KEP를 지급합니다. 
                </p>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">📌 현재 상태</p>
                  <p className="text-slate-300">
                    현재는 <strong className="text-amber-300">실제 금전적 가치는 없는</strong> 활동 지표입니다. 
                    하지만 이는 미래 에너지 네트워크로의 여정의 첫 단계입니다.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                    SW 개발 활동
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                    아이디어 제안
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                    투표 참여
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                    커뮤니티 기여
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 2단계 */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleStep(2)}
              className="w-full p-5 text-left bg-slate-900/50 hover:bg-slate-900/70 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">회사 지원 연동</h3>
                  <p className="text-sm text-slate-400">단기 목표</p>
                </div>
              </div>
              <span className="text-2xl text-slate-400">
                {openStep === 2 ? '−' : '+'}
              </span>
            </button>
            {openStep === 2 && (
              <div className="p-5 bg-slate-900/30 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed mb-4">
                  커뮤니티가 활성화되면 <strong className="text-indigo-300">회사 차원의 지원</strong>을 받아 
                  KEP를 <strong className="text-indigo-300">실질적인 내부 혜택</strong>과 연동하여 가치를 부여합니다.
                </p>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-4">
                  <p className="text-sm text-slate-400 mb-2">🎯 연동 혜택 예시</p>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>유료 교육 및 교육 과정 수강권</li>
                    <li>사내 복지 포인트 전환</li>
                    <li>회사 식당/카페 할인 쿠폰</li>
                    <li>사내 이벤트 참여 우선권</li>
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                    실질 가치 부여
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                    회사 지원
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                    복지 연동
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3단계 */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleStep(3)}
              className="w-full p-5 text-left bg-slate-900/50 hover:bg-slate-900/70 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">회사 기여도 전반 연동</h3>
                  <p className="text-sm text-slate-400">중기 목표</p>
                </div>
              </div>
              <span className="text-2xl text-slate-400">
                {openStep === 3 ? '−' : '+'}
              </span>
            </button>
            {openStep === 3 && (
              <div className="p-5 bg-slate-900/30 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed mb-4">
                  사내 공모전 수상, 혁신 프로젝트 참여 등 <strong className="text-purple-300">회사 생활 전반의 기여도</strong>에 
                  따라 KEP를 지급하는 시스템으로 확대하여, 직원의 모든 혁신 활동을 보상합니다.
                </p>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-4">
                  <p className="text-sm text-slate-400 mb-2">🏆 확대 적용 분야</p>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>사내 공모전 수상 및 입상</li>
                    <li>혁신 프로젝트 참여 및 성과</li>
                    <li>특허 출원 및 기술 개발</li>
                    <li>업무 효율화 제안 및 실행</li>
                    <li>동료 멘토링 및 지식 공유</li>
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                    전사 통합
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                    혁신 보상
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                    종합 평가
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 4단계 */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleStep(4)}
              className="w-full p-5 text-left bg-slate-900/50 hover:bg-slate-900/70 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">에너지 네트워크 체인 통합</h3>
                  <p className="text-sm text-slate-400">장기 목표 (10년 후)</p>
                </div>
              </div>
              <span className="text-2xl text-slate-400">
                {openStep === 4 ? '−' : '+'}
              </span>
            </button>
            {openStep === 4 && (
              <div className="p-5 bg-slate-900/30 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed mb-4">
                  KEP 플랫폼이 재생에너지 발전, ESS, EV 충전 네트워크와 통합됩니다. 
                  KEP는 실제 에너지 거래 및 데이터 기록의 
                  <strong className="text-amber-300"> 핵심 유틸리티 코인</strong>으로 진화하며, 
                  <strong className="text-amber-300"> 10년 후 민간 확대</strong>의 기반을 마련합니다.
                </p>
                <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 mb-4">
                  <p className="text-sm text-amber-300 mb-2">🌟 미래 비전</p>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>재생에너지 발전소와의 블록체인 기반 거래</li>
                    <li>ESS(에너지 저장 시스템) 운영 및 거래</li>
                    <li>EV 충전 인프라 네트워크 통합</li>
                    <li>P2P 전력 거래 플랫폼 운영</li>
                    <li>망 수수료 절감 및 투명한 거래 기록</li>
                    <li>민간 확대를 통한 공공 에너지 플랫폼 구축</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-4">
                  <p className="text-sm text-slate-400 mb-2">💡 핵심 가치</p>
                  <p className="text-slate-300">
                    KEP는 단순한 보상 도구를 넘어, <strong className="text-amber-300">미래 에너지 그리드의 디지털 화폐</strong>가 됩니다. 
                    모든 에너지 거래와 기여가 투명하게 기록되고, 참여자 모두가 공정하게 보상받는 
                    새로운 에너지 생태계의 기반이 됩니다.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                    에너지 거래
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                    블록체인 통합
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                    민간 확대
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                    P2P 거래
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="glass-panel p-6 bg-gradient-to-r from-kepco-blue/20 to-kepco-cyan/20 border border-kepco-sky/30">
        <div className="text-center">
          <h3 className="text-xl font-bold text-kepco-sky mb-3">
            지금 바로 시작하세요!
          </h3>
          <p className="text-slate-300 mb-4">
            KEP코인 보상 시스템에 참여하여 미래 에너지 네트워크의 일원이 되어보세요.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/innovation"
              className="px-6 py-3 rounded-lg bg-kepco-blue/30 hover:bg-kepco-blue/40 text-kepco-sky font-medium transition-colors border border-kepco-sky/40"
            >
              💡 아이디어 제안하기
            </a>
            <a
              href="/playground"
              className="px-6 py-3 rounded-lg bg-kepco-blue/30 hover:bg-kepco-blue/40 text-kepco-sky font-medium transition-colors border border-kepco-sky/40"
            >
              🎮 개발 프로젝트 시작하기
            </a>
            <a
              href="/tokenomics"
              className="px-6 py-3 rounded-lg bg-kepco-blue/30 hover:bg-kepco-blue/40 text-kepco-sky font-medium transition-colors border border-kepco-sky/40"
            >
              💰 토크노믹스 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;

