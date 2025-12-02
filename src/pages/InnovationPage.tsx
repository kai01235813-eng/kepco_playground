import type React from 'react';
import IdeaZone from '../components/IdeaZone/IdeaZone';

const InnovationPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">아이디어 Zone</h1>
          <p className="mt-1 text-xs text-slate-300">
            익명으로 아이디어를 올리고, 댓글로 피드백을 주고받는 공간입니다.
          </p>
        </div>
        <span className="coin-badge">💡 익명 아이디어 보드</span>
      </section>

      <IdeaZone />
    </div>
  );
};

export default InnovationPage;
