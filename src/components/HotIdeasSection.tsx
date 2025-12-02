import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';

type Idea = {
  id: string;
  title: string;
  url?: string | null;
  upvotes: number;
  downvotes: number;
  net_score: number;
  createdAt: number;
};

const HotIdeasSection: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHotIdeas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/posts`);
        if (!res.ok) throw new Error('Failed to load ideas');
        const data = (await res.json()) as Idea[];
        // net_score 기준으로 정렬하고 TOP 3만 선택
        const sorted = data
          .sort((a, b) => (b.net_score || 0) - (a.net_score || 0))
          .slice(0, 3);
        setIdeas(sorted);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void loadHotIdeas();
    // 30초마다 갱신
    const interval = setInterval(() => {
      void loadHotIdeas();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="glass-panel flex flex-col gap-4 p-5">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Hot 아이디어 TOP 3</h2>
          <p className="mt-1 text-xs text-slate-400">
            투표와 기여 활동이 가장 활발한 아이디어를 모아 보여줍니다.
          </p>
        </div>
        <button
          onClick={() => navigate('/innovation')}
          className="rounded-lg border border-kepco-blue/70 bg-slate-950/40 px-3 py-1.5 text-[11px] font-medium text-kepco-sky transition hover:bg-kepco-blue/20 hover:text-slate-50"
        >
          아이디어 전체보기
        </button>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {loading && ideas.length === 0 ? (
          <div className="col-span-3 p-4 text-center text-xs text-slate-400">
            Hot 아이디어를 불러오는 중...
          </div>
        ) : ideas.length === 0 ? (
          <div className="col-span-3 p-4 text-center text-xs text-slate-500">
            아직 등록된 아이디어가 없습니다.
          </div>
        ) : (
          ideas.map((idea, index) => (
            <article
              key={idea.id}
              className="group relative flex flex-col rounded-2xl border border-slate-700/70 bg-slate-950/40 p-4 shadow-sm shadow-slate-900/60 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:shadow-cyan-500/20"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300 ring-1 ring-cyan-400/50">
                  #{index + 1} Hot
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                  ▲ 투표 진행 중
                </span>
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-50 group-hover:text-kepco-sky">
                {idea.title}
              </h3>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                <div className="flex flex-col">
                  <span className="text-slate-400">순위 점수</span>
                  <span
                    className={`font-semibold ${
                      idea.net_score > 0
                        ? 'text-emerald-300'
                        : idea.net_score < 0
                        ? 'text-rose-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {idea.net_score >= 0 ? '+' : ''}
                    {idea.net_score}점
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">투표 진행</span>
                  <span className="font-semibold text-cyan-200 text-[10px]">
                    찬성 {idea.upvotes} · 반대 {idea.downvotes}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/innovation')}
                  className="inline-flex items-center justify-center gap-1 rounded-lg bg-kepco-sky px-3 py-1.5 text-[11px] font-semibold text-slate-950 shadow-md shadow-kepco-sky/40 transition group-hover:bg-kepco-blue"
                >
                  <span>🗳️</span>
                  <span>투표하기</span>
                </button>
                <button
                  onClick={() => {
                    if (idea.url) {
                      window.open(idea.url, '_blank', 'noopener,noreferrer');
                    } else {
                      // URL이 없으면 아이디어 상세 페이지로 이동
                      navigate('/innovation');
                    }
                  }}
                  className={`inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition ${
                    idea.url
                      ? 'border-kepco-sky/50 bg-slate-950/40 text-kepco-sky hover:bg-kepco-sky/20 hover:text-slate-50'
                      : 'border-slate-600/50 bg-slate-900/40 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                  }`}
                  title={idea.url ? '체험 링크 열기' : '아이디어 상세 보기'}
                >
                  <span>🚀</span>
                  <span>체험하기</span>
                  {!idea.url && (
                    <span className="ml-1 text-[9px] opacity-70">(준비중)</span>
                  )}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default HotIdeasSection;


