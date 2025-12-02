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

type Admin = {
  employeeId: string;
  name: string;
  createdAt: number;
};

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hotIdeas, setHotIdeas] = useState<HotIdea[]>([]);
  const [rankingSnapshotLoading, setRankingSnapshotLoading] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [adminCount, setAdminCount] = useState({ current: 0, max: 5 });
  const [newAdminId, setNewAdminId] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

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

  const loadAdmins = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/list`);
      if (!res.ok) return;
      const data = await res.json();
      setAdmins(data.admins || []);
      setAdminCount({ current: data.count || 0, max: data.maxCount || 5 });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load admins:', e);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminId.trim()) {
      setMessage({ type: 'error', text: '사번을 입력해주세요.' });
      return;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setMessage({ type: 'error', text: '로그인이 필요합니다.' });
      return;
    }

    const user = JSON.parse(userStr);
    if (!user.employeeId) {
      setMessage({ type: 'error', text: '로그인 정보를 확인할 수 없습니다.' });
      return;
    }

    setAdminLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/admin/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: newAdminId.trim(),
          requesterId: user.employeeId
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '관리자 추가에 실패했습니다.');
      }

      setMessage({
        type: 'success',
        text: `관리자가 추가되었습니다: ${data.admin.name} (${data.admin.employeeId})`
      });
      setNewAdminId('');
      void loadAdmins();
    } catch (e) {
      setMessage({
        type: 'error',
        text: e instanceof Error ? e.message : '관리자 추가 중 오류가 발생했습니다.'
      });
    } finally {
      setAdminLoading(false);
    }
  };

  const handleRemoveAdmin = async (employeeId: string, name: string) => {
    if (!window.confirm(`${name} (${employeeId})님의 관리자 권한을 제거하시겠습니까?`)) {
      return;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setMessage({ type: 'error', text: '로그인이 필요합니다.' });
      return;
    }

    const user = JSON.parse(userStr);
    if (!user.employeeId) {
      setMessage({ type: 'error', text: '로그인 정보를 확인할 수 없습니다.' });
      return;
    }

    setAdminLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/admin/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          requesterId: user.employeeId
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '관리자 제거에 실패했습니다.');
      }

      setMessage({
        type: 'success',
        text: `관리자 권한이 제거되었습니다: ${data.removed.name} (${data.removed.employeeId})`
      });
      void loadAdmins();
    } catch (e) {
      setMessage({
        type: 'error',
        text: e instanceof Error ? e.message : '관리자 제거 중 오류가 발생했습니다.'
      });
    } finally {
      setAdminLoading(false);
    }
  };

  // 컴포넌트 마운트 시 현재 선발된 아이디어 및 관리자 목록 로드
  React.useEffect(() => {
    void loadHotIdeas();
    void loadAdmins();
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

      <div className="glass-panel flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">관리자 관리</h2>
          <p className="mt-1 text-xs text-slate-400">
            관리자는 게시글/댓글 삭제 시 마스터 비밀번호(9999) 없이도 삭제할 수 있습니다.
            <br />
            관리자는 최대 {adminCount.max}명까지 지정할 수 있습니다. (현재: {adminCount.current}명)
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

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="사번 입력"
            value={newAdminId}
            onChange={(e) => setNewAdminId(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void handleAddAdmin();
              }
            }}
            className="flex-1 rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
            disabled={adminLoading || adminCount.current >= adminCount.max}
          />
          <button
            onClick={handleAddAdmin}
            disabled={adminLoading || adminCount.current >= adminCount.max}
            className={`rounded-lg px-4 py-2 font-semibold text-slate-50 transition ${
              adminLoading || adminCount.current >= adminCount.max
                ? 'cursor-not-allowed bg-slate-700/50'
                : 'bg-kepco-sky hover:bg-kepco-blue'
            }`}
          >
            {adminLoading ? '추가 중...' : '➕ 관리자 추가'}
          </button>
        </div>

        {adminCount.current >= adminCount.max && (
          <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            ⚠️ 관리자 수가 최대치({adminCount.max}명)에 도달했습니다.
          </div>
        )}

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">현재 관리자 목록</h3>
          {admins.length === 0 ? (
            <div className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-4 py-8 text-center text-sm text-slate-400">
              관리자가 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {admins.map((admin) => (
                <div
                  key={admin.employeeId}
                  className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/70 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-50">{admin.name}</p>
                    <p className="text-xs text-slate-400">사번: {admin.employeeId}</p>
                    <p className="text-xs text-slate-500">
                      등록일: {new Date(admin.createdAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAdmin(admin.employeeId, admin.name)}
                    disabled={adminLoading}
                    className="rounded-lg border border-rose-500/60 px-3 py-1.5 text-xs text-rose-300 transition hover:bg-rose-500/20 disabled:opacity-50"
                  >
                    제거
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => void loadAdmins()}
          className="rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900/70"
        >
          🔄 새로고침
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

