import type React from 'react';
import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

type KnowledgePost = {
  id: string;
  category: 'guide' | 'qna' | 'template';
  title: string;
  content: string;
  employeeId: string;
  employeeName: string;
  fileName: string | null;
  createdAt: number;
  updatedAt: number | null;
};

type Category = 'guide' | 'qna' | 'template';

const KnowledgeHubPage: React.FC = () => {
  const [posts, setPosts] = useState<KnowledgePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<KnowledgePost | null>(null);
  const [formData, setFormData] = useState({
    category: 'guide' as Category,
    title: '',
    content: '',
    file: null as File | null
  });

  // 로그인한 사용자 정보 (항상 최신 상태 가져오기)
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };
  
  const [user, setUser] = useState(getUser());

  // 사용자 정보 업데이트를 위한 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };
    
    // localStorage 변경 감지 (같은 탭 내)
    window.addEventListener('storage', handleStorageChange);
    
    // 커스텀 이벤트로 같은 탭 내 변경 감지
    const interval = setInterval(() => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    void loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all'
        ? `${API_BASE}/knowledge-posts`
        : `${API_BASE}/knowledge-posts?category=${selectedCategory}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.employeeId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      let fileData = null;
      let fileName = null;
      if (formData.file) {
        fileData = await fileToBase64(formData.file);
        fileName = formData.file.name;
      }

      const url = editingPost
        ? `${API_BASE}/knowledge-posts/${editingPost.id}`
        : `${API_BASE}/knowledge-posts`;
      
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost
        ? {
            title: formData.title,
            content: formData.content,
            employeeId: user.employeeId,
            fileName,
            fileData
          }
        : {
            category: formData.category,
            title: formData.title,
            content: formData.content,
            employeeId: user.employeeId,
            fileName,
            fileData
          };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        void loadPosts();
        setShowForm(false);
        setEditingPost(null);
        setFormData({ category: 'guide', title: '', content: '', file: null });
      } else {
        const error = await res.json();
        alert(error.error || '게시글 저장에 실패했습니다.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save post:', error);
      alert('게시글 저장 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (post: KnowledgePost) => {
    if (!user || user.employeeId !== post.employeeId) {
      alert('본인의 게시글만 수정할 수 있습니다.');
      return;
    }
    setEditingPost(post);
    setFormData({
      category: post.category,
      title: post.title,
      content: post.content,
      file: null
    });
    setShowForm(true);
  };

  const handleDelete = async (post: KnowledgePost) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (user.employeeId !== post.employeeId && !user.isAdmin) {
      alert('본인의 게시글만 삭제할 수 있습니다.');
      return;
    }
    
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/knowledge-posts/${post.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: user.employeeId })
      });

      if (res.ok || res.status === 204) {
        void loadPosts();
      } else {
        const error = await res.json();
        alert(error.error || '게시글 삭제에 실패했습니다.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete post:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDownloadFile = (post: KnowledgePost) => {
    if (!post.fileName) return;
    window.open(`${API_BASE}/knowledge-posts/${post.id}/file`, '_blank');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 예시 데이터
  const examplePosts: KnowledgePost[] = [
    {
      id: 'example-1',
      category: 'guide',
      title: '사내 Github + VPN 개발 환경 설정 가이드',
      content: 'Node, Python, 사내 프록시 설정과 필수 보안 수칙을 정리한 구조화된 문서입니다.',
      employeeId: '(예시)',
      employeeName: '(예시)',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-2',
      category: 'guide',
      title: '소스코드/데이터 반출 금지 체크리스트',
      content: '외부 오픈소스 활용 시 라이선스, 데이터 마스킹, 로그 관리 등 필수 확인 항목.',
      employeeId: '(예시)',
      employeeName: '(예시)',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-3',
      category: 'qna',
      title: '사내 프록시 환경에서 npm 설치가 너무 느린데, 팁이 있을까요?',
      content: '',
      employeeId: '(예시)',
      employeeName: '익명 · DX-초보',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-4',
      category: 'qna',
      title: '배전계통 데이터 샘플은 어디서 받을 수 있나요?',
      content: '',
      employeeId: '(예시)',
      employeeName: '실명 · Grid-Lab',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-5',
      category: 'template',
      title: 'Python 데이터 정제 스켈레톤',
      content: '★ 4.8 · 다운로드 120',
      employeeId: '(예시)',
      employeeName: '(예시)',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-6',
      category: 'template',
      title: '월간 설비 점검 대시보드',
      content: '★ 4.5 · 다운로드 87',
      employeeId: '(예시)',
      employeeName: '(예시)',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    },
    {
      id: 'example-7',
      category: 'template',
      title: 'DX PoC 결과 보고서 포맷',
      content: '★ 4.9 · 다운로드 45',
      employeeId: '(예시)',
      employeeName: '(예시)',
      fileName: null,
      createdAt: Date.now(),
      updatedAt: null
    }
  ];

  const displayPosts = selectedCategory === 'all'
    ? [...examplePosts, ...posts]
    : [...examplePosts.filter(p => p.category === selectedCategory), ...posts.filter(p => p.category === selectedCategory)];

  const categoryLabels = {
    guide: '가이드 문서 (Markdown)',
    qna: 'Q&A / 팁 게시판',
    template: '템플릿 아카이브'
  };

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

      {/* 카테고리 필터 */}
      <section className="glass-panel p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedCategory === 'all'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            전체
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('guide')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedCategory === 'guide'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            가이드 문서
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('qna')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedCategory === 'qna'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            Q&A / 팁
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('template')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedCategory === 'template'
                ? 'bg-kepco-blue/40 text-slate-50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            템플릿
          </button>
          <button
            type="button"
            onClick={() => {
              if (!user || !user.employeeId) {
                alert('로그인이 필요합니다. 먼저 로그인해주세요.');
                return;
              }
              setShowForm(true);
              setEditingPost(null);
              setFormData({ category: selectedCategory !== 'all' ? selectedCategory : 'guide', title: '', content: '', file: null });
            }}
            className="ml-auto px-4 py-2 rounded-lg text-xs font-medium bg-kepco-sky/30 text-kepco-sky hover:bg-kepco-sky/40 transition-colors border border-kepco-sky/40"
          >
            + 새 글 작성
          </button>
        </div>
      </section>

      {/* 게시글 작성/수정 폼 */}
      {showForm && (
        <section className="glass-panel p-5">
          <h2 className="section-title mb-4">
            {editingPost ? '게시글 수정' : '새 글 작성'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
            {!editingPost && (
              <div>
                <label className="block mb-1 text-slate-300">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-slate-200 focus:border-kepco-sky focus:outline-none"
                  required
                >
                  <option value="guide">가이드 문서</option>
                  <option value="qna">Q&A / 팁</option>
                  <option value="template">템플릿</option>
                </select>
              </div>
            )}
            <div>
              <label className="block mb-1 text-slate-300">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-slate-200 focus:border-kepco-sky focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-300">내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-slate-200 focus:border-kepco-sky focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-300">파일 첨부 (선택)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-slate-200 focus:border-kepco-sky focus:outline-none"
              />
              {formData.file && (
                <p className="mt-1 text-[11px] text-slate-400">선택된 파일: {formData.file.name}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-kepco-blue/60 text-slate-50 hover:bg-kepco-blue/80 transition-colors"
              >
                {editingPost ? '수정' : '등록'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                  setFormData({ category: 'guide', title: '', content: '', file: null });
                }}
                className="px-4 py-2 rounded-lg bg-slate-800/60 text-slate-300 hover:bg-slate-800/80 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </section>
      )}

      {/* 게시글 목록 */}
      {loading ? (
        <section className="glass-panel p-8">
          <div className="text-center text-sm text-slate-400">로딩 중...</div>
        </section>
      ) : (
        <section className="glass-panel grid gap-4 p-5 md:grid-cols-[1.6fr_1.4fr]">
          <div className="flex flex-col gap-3 text-xs">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="section-title">{selectedCategory === 'all' ? '전체 게시글' : categoryLabels[selectedCategory]}</h2>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedCategory === 'guide' && '개발 환경 설정, 정보보안, 사내 규정 문서를 검색/열람합니다.'}
                  {selectedCategory === 'qna' && '궁금한 점을 질문하고 답변을 주고받는 공간입니다.'}
                  {selectedCategory === 'template' && '코드/엑셀/보고서 템플릿을 업로드하고 다운로드할 수 있습니다.'}
                </p>
              </div>
            </header>
            <div className="grid gap-3 md:grid-cols-2">
              {displayPosts
                .filter(p => selectedCategory === 'all' ? true : p.category === selectedCategory)
                .slice(0, selectedCategory === 'template' ? 6 : 4)
                .map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-[11px] text-slate-400">
                        {post.employeeName} {post.employeeId !== '(예시)' && `(${post.employeeId})`}
                      </p>
                      {user && (user.employeeId === post.employeeId || user.isAdmin) && post.employeeId !== '(예시)' && (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEdit(post)}
                            className="text-[10px] text-slate-400 hover:text-kepco-sky"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            className="text-[10px] text-slate-400 hover:text-rose-400"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-50 mb-1">
                      {post.title}
                    </p>
                    {post.content && (
                      <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                        {post.content}
                      </p>
                    )}
                    {post.fileName && (
                      <button
                        type="button"
                        onClick={() => handleDownloadFile(post)}
                        className="mt-2 text-[10px] text-kepco-sky hover:underline"
                      >
                        📎 {post.fileName}
                      </button>
                    )}
                    <p className="mt-2 text-[10px] text-slate-500">
                      {formatDate(post.createdAt)}
                      {post.updatedAt && ' (수정됨)'}
                    </p>
                  </article>
                ))}
            </div>
          </div>

          {selectedCategory === 'qna' && (
            <div className="flex flex-col gap-3 text-xs">
              <h2 className="section-title">Q&A / 팁 게시판</h2>
              <div className="flex flex-col gap-2">
                {displayPosts
                  .filter(p => p.category === 'qna')
                  .slice(0, 5)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3"
                    >
                      <p className="text-[11px] text-slate-400 mb-1">
                        {post.employeeName} {post.employeeId !== '(예시)' && `(${post.employeeId})`}
                      </p>
                      <p className="text-sm font-semibold text-slate-100">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default KnowledgeHubPage;
