import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import PostList from './PostList';
import { useLocalStoragePosts, type PostCategory } from './useLocalStorage';

type TabKey = 'info' | 'suggestion' | 'proposal';

const AnonymousBoard: React.FC = () => {
  const { posts, addPost, updatePost, deletePost, checkPassword } =
    useLocalStoragePosts();
  const [activeTab, setActiveTab] = useState<TabKey>('info');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = (category: PostCategory, content: string, password?: string) => {
    if (!password) return;
    addPost(category, content, password);
  };

  const handleRequestEdit = (id: string, password: string) => {
    if (!checkPassword(id, password)) {
      // 단순 경고만 (추가 알림 UI는 생략)
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setEditingId(id);
  };

  const handleRequestDelete = (id: string, password: string) => {
    if (!checkPassword(id, password)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    deletePost(id);
  };

  const currentEditingPost =
    editingId != null ? posts.find((p) => p.id === editingId) : undefined;

  const suggestionPosts = posts.filter((p) => p.category === 'suggestion');
  const proposalPosts = posts.filter((p) => p.category === 'proposal');

  return (
    <div className="fixed bottom-4 left-4 z-40 w-80 max-w-[90vw] text-xs" data-anonymous-board>
      <div className="glass-panel overflow-hidden border-kepco-blue/50 bg-slate-950/90">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <div>
              <p className="text-[11px] font-semibold text-slate-100">
                익명 게시판
              </p>
              <p className="text-[10px] text-slate-400">
                가볍게 남기고 가는 소통 코너
              </p>
            </div>
          </div>
        </header>

        <div className="flex gap-1 border-b border-slate-800/80 bg-slate-950/60 px-2 py-1">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
              activeTab === 'info'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            A. 목적
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suggestion')}
            className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
              activeTab === 'suggestion'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            B. 건의하기
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('proposal')}
            className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
              activeTab === 'proposal'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            C. 운영 방향
          </button>
        </div>

        <div className="max-h-96 space-y-2 overflow-y-auto px-3 py-2">
          {activeTab === 'info' && (
            <div className="space-y-2 text-[11px] text-slate-200">
              <p className="font-medium">
                <Link
                  to="/purpose"
                  className="text-kepco-sky hover:text-kepco-blue hover:underline"
                >
                  A. 목적: 잠재된 SW 역량을 발휘하고, 코드를 통해 조직 변화를 이끌어낼 직원들의
                  SW 실험실입니다. (전체 목적 읽기 및 의견 공유)
                </Link>
              </p>
              <p className="text-slate-300">
                가볍게 남기는 한 줄 건의부터, 홈페이지 운영 방향에 대한 의견까지
                자유롭게 남겨 주세요. 남겨주신 의견은 더 나은 KEPCO SW
                Playground를 만드는 데 활용됩니다.
              </p>
              <p className="text-slate-400">
                전체 목적과 비전에 대한 자세한 내용은 위 링크를 클릭하여 확인하실 수
                있습니다.
              </p>
            </div>
          )}

          {activeTab === 'suggestion' && (
            <div className="space-y-2">
              <PostForm
                mode={currentEditingPost ? 'edit' : 'create'}
                categoryLabel="B. 건의하기"
                initialContent={currentEditingPost?.content}
                onSubmit={(content, password) => {
                  if (currentEditingPost) {
                    updatePost(currentEditingPost.id, content);
                    setEditingId(null);
                  } else {
                    handleCreate('suggestion', content, password);
                  }
                }}
                onCancel={
                  currentEditingPost
                    ? () => {
                        setEditingId(null);
                      }
                    : undefined
                }
              />
              <PostList
                posts={suggestionPosts}
                emptyText="아직 등록된 건의가 없습니다. 첫 번째 건의를 남겨보세요!"
                onRequestEdit={handleRequestEdit}
                onRequestDelete={handleRequestDelete}
              />
            </div>
          )}

          {activeTab === 'proposal' && (
            <div className="space-y-2">
              <PostForm
                mode={currentEditingPost ? 'edit' : 'create'}
                categoryLabel="C. 홈페이지 운영 방향 제안"
                initialContent={currentEditingPost?.content}
                onSubmit={(content, password) => {
                  if (currentEditingPost) {
                    updatePost(currentEditingPost.id, content);
                    setEditingId(null);
                  } else {
                    handleCreate('proposal', content, password);
                  }
                }}
                onCancel={
                  currentEditingPost
                    ? () => {
                        setEditingId(null);
                      }
                    : undefined
                }
              />
              <PostList
                posts={proposalPosts}
                emptyText="아직 등록된 운영 방향 제안이 없습니다. 방향성을 남겨주세요!"
                onRequestEdit={handleRequestEdit}
                onRequestDelete={handleRequestDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnonymousBoard;


