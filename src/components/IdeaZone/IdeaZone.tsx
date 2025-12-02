import type React from 'react';
import { useEffect, useState } from 'react';
import type { IdeaPost } from './types';
import { API_BASE } from './types';
import PostForm from './PostForm';
import PostDetail from './PostDetail';

const IdeaZone: React.FC = () => {
  const [posts, setPosts] = useState<IdeaPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts`);
      if (!res.ok) throw new Error('failed to load posts');
      const data = (await res.json()) as IdeaPost[];
      setPosts(data);
      if (!selectedId && data.length > 0) {
        setSelectedId(data[0].id);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = async (
    title: string,
    content: string,
    password?: string
  ) => {
    if (!password) return;
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, password })
      });
      if (!res.ok) {
        alert('아이디어 등록에 실패했습니다.');
        return;
      }
      const created = (await res.json()) as IdeaPost;
      setPosts((prev) => [created, ...prev]);
      setSelectedId(created.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <div className="glass-panel flex min-h-[420px] flex-1 gap-4 p-4 text-xs">
      <div className="flex w-64 flex-shrink-0 flex-col gap-3 border-r border-slate-800/80 pr-3">
        <div>
          <h2 className="section-title">아이디어 목록</h2>
          <p className="mt-1 text-[11px] text-slate-400">
            모든 글은 익명 아이디어이며, 비밀번호로만 수정/삭제할 수 있습니다.
          </p>
        </div>
        <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800/80 bg-slate-950/70">
          {loading && posts.length === 0 ? (
            <div className="p-2 text-[11px] text-slate-400">불러오는 중...</div>
          ) : posts.length === 0 ? (
            <div className="p-2 text-[11px] text-slate-500">
              아직 등록된 아이디어가 없습니다. 첫 번째 아이디어를 남겨보세요!
            </div>
          ) : (
            <ul className="divide-y divide-slate-800/80">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className={`cursor-pointer px-2 py-2 text-[11px] ${
                    selectedId === post.id
                      ? 'bg-kepco-blue/20 text-kepco-sky'
                      : 'hover:bg-slate-900/80'
                  }`}
                  onClick={() => setSelectedId(post.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-semibold">{post.title}</p>
                      <p className="truncate text-[10px] text-slate-400">
                        {new Date(post.createdAt).toLocaleString('ko-KR')}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 text-[10px] ${
                        (post.net_score || 0) > 0
                          ? 'text-emerald-300'
                          : (post.net_score || 0) < 0
                          ? 'text-rose-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {(post.net_score || 0) >= 0 ? '+' : ''}
                      {post.net_score || 0}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <PostForm mode="create" onSubmit={handleCreatePost} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <PostDetail
          postId={selectedId}
          onDeleted={() => {
            if (!selectedId) return;
            setPosts((prev) => {
              const remaining = prev.filter((p) => p.id !== selectedId);
              setSelectedId(remaining.length > 0 ? remaining[0].id : null);
              return remaining;
            });
          }}
          onUpdated={() => {
            void loadPosts();
          }}
        />
      </div>
    </div>
  );
};

export default IdeaZone;




