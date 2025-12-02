import type React from 'react';

const QuickLinks: React.FC = () => {
  const links = [
    { label: '아이디어 제출', description: '새로운 DX 아이디어 등록', icon: '💡' },
    { label: '내 지갑 보기', description: '보유 KEP 및 트랜잭션', icon: '👛' },
    { label: '개발 환경 가이드', description: '로컬/사내 개발 환경 설정', icon: '🛠️' }
  ];

  return (
    <section className="glass-panel flex items-center justify-between gap-4 p-4 text-xs">
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <button
            key={link.label}
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-left text-slate-200 transition hover:border-cyan-400/70 hover:bg-slate-900/80 hover:text-cyan-100"
          >
            <span className="text-base">{link.icon}</span>
            <div>
              <p className="text-[11px] font-semibold">{link.label}</p>
              <p className="text-[10px] text-slate-400">{link.description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="hidden flex-col items-end text-[10px] text-slate-400 md:flex">
        <span>사내 Github 연동 및 보안 규정 준수를 위한 안내는</span>
        <span className="text-cyan-300">Knowledge Hub &gt; 개발 가이드</span>
      </div>
    </section>
  );
};

export default QuickLinks;


