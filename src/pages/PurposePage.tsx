import type React from 'react';
import { Link } from 'react-router-dom';

const PurposePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">
            KEPCO SW Playground 제작 목적
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            한전 SW Playground의 설립 목적과 비전을 확인하고, 의견을 공유할 수 있습니다.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-kepco-sky/50 bg-slate-900/60 px-3 py-1.5 text-[11px] font-medium text-kepco-sky transition hover:border-kepco-sky hover:bg-slate-900"
        >
          ← 대시보드로
        </Link>
      </section>

      <section className="glass-panel flex flex-col gap-4 p-6 text-xs">
        <div className="space-y-4 text-slate-200">
          <div>
            <h2 className="mb-3 text-base font-semibold text-slate-50">
              A. 목적: 잠재된 SW 역량을 발휘하고, 코드를 통해 조직 변화를 이끌어낼 직원들의 SW
              실험실입니다.
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              KEPCO SW Playground는 한전 직원들이 자발적으로 소프트웨어 개발과 혁신에 참여할 수
              있는 비공식 DX(Digital Transformation) 생태계 플랫폼입니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-5">
            <h3 className="mb-3 text-sm font-semibold text-kepco-sky">
              핵심 목표
            </h3>
            <ul className="space-y-2 text-[11px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-kepco-blue">•</span>
                <span>
                  <strong className="text-slate-200">자발적 참여 촉진:</strong> 공식 프로젝트
                  외에서도 아이디어를 자유롭게 제안하고 실험할 수 있는 환경 조성
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-kepco-blue">•</span>
                <span>
                  <strong className="text-slate-200">역량 발휘:</strong> 숨겨진 SW 개발 역량을
                  발견하고 발휘할 수 있는 기회 제공
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-kepco-blue">•</span>
                <span>
                  <strong className="text-slate-200">조직 변화:</strong> 코드와 기술로 조직
                  문화와 업무 프로세스에 긍정적인 변화를 이끌어내는 실험 공간
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-kepco-blue">•</span>
                <span>
                  <strong className="text-slate-200">투명한 보상:</strong> 기여도에 따라
                  KEP코인을 획득하고, DAO(Decentralized Autonomous Organization) 개념을
                  적용한 거버넌스 참여
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-5">
            <h3 className="mb-3 text-sm font-semibold text-kepco-sky">
              플랫폼 특징
            </h3>
            <div className="grid gap-4 text-[11px] md:grid-cols-2">
              <div>
                <p className="mb-2 font-semibold text-slate-200">💡 아이디어 Zone</p>
                <p className="text-slate-400">
                  익명으로 아이디어를 제안하고, 피드백을 주고받을 수 있는 공간
                </p>
              </div>
              <div>
                <p className="mb-2 font-semibold text-slate-200">🎮 Playground</p>
                <p className="text-slate-400">
                  개발자들이 만든 웹/앱을 체험하고, 자신의 프로젝트를 공유할 수 있는 Zone
                </p>
              </div>
              <div>
                <p className="mb-2 font-semibold text-slate-200">📚 지식 공유</p>
                <p className="text-slate-400">
                  개발 환경 설정, 정보보안 가이드, 템플릿 아카이브 등 지식 공유 공간
                </p>
              </div>
              <div>
                <p className="mb-2 font-semibold text-slate-200">⚖️ 집단 지성</p>
                <p className="text-slate-400">
                  코인 보상 비율, 신규 기능 채택 등 플랫폼 운영을 함께 결정하는 거버넌스
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-kepco-blue/30 bg-kepco-blue/10 p-4 text-[11px]">
            <p className="mb-2 font-semibold text-kepco-sky">
              전체 목적 읽기 및 의견 공유
            </p>
            <p className="text-slate-300">
              이 페이지의 내용에 대한 의견이나 추가 제안사항이 있으시다면, 좌측 하단의{' '}
              <strong className="text-kepco-sky">익명 게시판</strong>에서 자유롭게 의견을
              남겨주세요. 여러분의 피드백이 더 나은 SW Playground를 만드는 데 큰 도움이
              됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurposePage;

