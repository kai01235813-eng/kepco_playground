import type React from 'react';
import { useState } from 'react';
import { API_BASE } from '../config/api';

type HotIdea = {
  id: string;
  postId: string;
  weekStartDate: string;
  title: string;
  authorId?: string;
};

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hotIdeas, setHotIdeas] = useState<HotIdea[]>([]);
  const [rankingSnapshotLoading, setRankingSnapshotLoading] = useState(false);

  const handleSelectHotIdeas = async () => {
    if (!window.confirm('HOT 아이디어 TOP3를 선발하시겠습니까?')) {
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/hot-ideas/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('선발에 실패했습니다.');
      }

      const data = await res.json();
      setMessage({
        type: 'success',
        text: `성공! ${data.selected?.length || 0}개의 아이디어가 선발되었습니다.`
      });
      
      // 선발된 아이디어 목록 새로고침
      void loadHotIdeas();
    } catch (e) {
      setMessage({
        type: 'error',
        text: e instanceof Error ? e.message : '선발 중 오류가 발생했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadHotIdeas = async () => {
    try {
      const res = await fetch(`${API_BASE}/hot-ideas`);
      if (!res.ok) return;
      const data = await res.json();
      setHotIdeas(data.ideas || []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load hot ideas:', e);
    }
  };

  const handleCreateRankingSnapshot = async () => {
    if (!window.confirm('일일 랭킹 스냅샷을 생성하시겠습니까? (매일 자정에 자동 실행됩니다)')) {
      return;
    }

    setRankingSnapshotLoading(true);
    try {
      const res = await fetch(`${API_BASE}/rankings/daily/snapshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('스냅샷 생성에 실패했습니다.');
      }

      const data = await res.json();
      setMessage({
        type: 'success',
        text: `일일 랭킹 스냅샷이 생성되었습니다. (${data.count}명)`
      });
    } catch (e) {
      setMessage({
        type: 'error',
        text: e instanceof Error ? e.message : '스냅샷 생성 중 오류가 발생했습니다.'
      });
    } finally {
      setRankingSnapshotLoading(false);
    }
  };

  // 컴포넌트 마운트 시 현재 선발된 아이디어 로드
  React.useEffect(() => {
    void loadHotIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-50">관리자 페이지</h1>
        <p className="mt-2 text-sm text-slate-400">
          HOT 아이디어 TOP3 선발 및 관리
        </p>
      </div>

      <div className="glass-panel flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">HOT 아이디어 TOP3 선발</h2>
          <p className="mt-1 text-xs text-slate-400">
            최근 7일간 투표 점수가 가장 높은 아이디어 3개를 선발합니다.
            <br />
            선발된 아이디어 작성자에게 자동으로 50코인이 지급됩니다.
          </p>
        </div>

        {message && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                : 'border-rose-500/50 bg-rose-500/10 text-rose-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={handleSelectHotIdeas}
          disabled={loading}
          className={`rounded-lg px-4 py-3 font-semibold text-slate-50 transition ${
            loading
              ? 'cursor-not-allowed bg-slate-700/50'
              : 'bg-kepco-sky hover:bg-kepco-blue'
          }`}
        >
          {loading ? '선발 중...' : '🎯 HOT 아이디어 TOP3 선발하기'}
        </button>
      </div>

      <div className="glass-panel flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">현재 주간 HOT 아이디어</h2>
          <p className="mt-1 text-xs text-slate-400">
            이번 주에 선발된 HOT 아이디어 목록입니다.
          </p>
        </div>

        {hotIdeas.length === 0 ? (
          <div className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-4 py-8 text-center text-sm text-slate-400">
            아직 선발된 HOT 아이디어가 없습니다.
            <br />
            위의 버튼을 눌러 선발해주세요.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {hotIdeas.map((idea, index) => (
              <div
                key={idea.id}
                className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300 ring-1 ring-amber-400/50">
                    #{index + 1} HOT
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(idea.weekStartDate).toLocaleDateString('ko-KR')} 주간
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-50">
                  {idea.title}
                </h3>
                {idea.authorId && (
                  <p className="mt-2 text-[10px] text-slate-400">
                    작성자: {idea.authorId} (50코인 지급 완료)
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => void loadHotIdeas()}
          className="rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900/70"
        >
          🔄 새로고침
        </button>
      </div>

      <div className="glass-panel flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">일일 랭킹 스냅샷</h2>
          <p className="mt-1 text-xs text-slate-400">
            매일 자정에 자동으로 생성되며, 일일 랭킹 페이지에서 확인할 수 있습니다.
            <br />
            수동으로 생성하려면 아래 버튼을 클릭하세요.
          </p>
        </div>

        <button
          onClick={handleCreateRankingSnapshot}
          disabled={rankingSnapshotLoading}
          className={`rounded-lg px-4 py-3 font-semibold text-slate-50 transition ${
            rankingSnapshotLoading
              ? 'cursor-not-allowed bg-slate-700/50'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {rankingSnapshotLoading ? '생성 중...' : '📸 일일 랭킹 스냅샷 생성하기'}
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

