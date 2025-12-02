import type React from 'react';
import { useEffect, useState } from 'react';
import type { IdeaPost, IdeaComment } from './types';
import { API_BASE } from './types';
import CommentList from './CommentList';

interface PostDetailProps {
  postId: string | null;
  onDeleted: () => void;
  onUpdated: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({
  postId,
  onDeleted,
  onUpdated
}) => {
  const [post, setPost] = useState<IdeaPost | null>(null);
  const [comments, setComments] = useState<IdeaComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentPassword, setCommentPassword] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [votedType, setVotedType] = useState<'upvote' | 'downvote' | null>(null);
  const [voting, setVoting] = useState(false);

  const getVoterId = (): string => {
    let voterId = localStorage.getItem('ideaVoterId');
    if (!voterId) {
      voterId = `voter-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem('ideaVoterId', voterId);
    }
    return voterId;
  };

  const checkVoteStatus = async (id: string) => {
    const voterId = getVoterId();
    try {
      // 서버에서 이 게시물에 대한 투표 상태 확인
      const votesRes = await fetch(`${API_BASE}/posts/${id}/votes`);
      if (votesRes.ok) {
        // 로컬 스토리지에서 이 특정 게시물에 투표했는지 확인
        const votedPosts = JSON.parse(
          localStorage.getItem('votedPosts') || '{}'
        ) as Record<string, 'upvote' | 'downvote'>;
        if (votedPosts[id]) {
          setHasVoted(true);
          setVotedType(votedPosts[id]);
        } else {
          setHasVoted(false);
          setVotedType(null);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      // 로컬 스토리지에서 확인
      try {
        const votedPosts = JSON.parse(
          localStorage.getItem('votedPosts') || '{}'
        ) as Record<string, 'upvote' | 'downvote'>;
        if (votedPosts[id]) {
          setHasVoted(true);
          setVotedType(votedPosts[id]);
        } else {
          setHasVoted(false);
          setVotedType(null);
        }
      } catch (parseErr) {
        // eslint-disable-next-line no-console
        console.error(parseErr);
      }
    }
  };

  const load = async (id: string) => {
    setLoading(true);
    try {
      const [postRes, commentRes] = await Promise.all([
        fetch(`${API_BASE}/posts/${id}`),
        fetch(`${API_BASE}/comments?postId=${encodeURIComponent(id)}`)
      ]);
      if (postRes.ok) {
        const p = (await postRes.json()) as IdeaPost;
        setPost(p);
        void checkVoteStatus(id);
      }
      if (commentRes.ok) {
        const cs = (await commentRes.json()) as IdeaComment[];
        setComments(cs);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 게시물이 변경될 때 투표 상태 초기화
    setHasVoted(false);
    setVotedType(null);
    setVoting(false);
    
    if (postId) {
      void load(postId);
    } else {
      setPost(null);
      setComments([]);
    }
  }, [postId]);

  const handleDeletePost = async () => {
    if (!postId) return;
    const pw = window.prompt('이 글의 수정/삭제 비밀번호를 입력하세요.\n(관리자는 마스터 비밀번호 9999 또는 로그인 상태에서 삭제 가능)');
    if (!pw || !pw.trim()) {
      return;
    }
    try {
      // 로그인한 사용자 정보 가져오기
      let employeeId: string | undefined;
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          employeeId = user.employeeId;
        }
      } catch {
        // 로그인 정보가 없으면 무시
      }
      
      const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw.trim(), employeeId })
      });
      if (res.status === 204 || res.ok) {
        alert('아이디어가 삭제되었습니다.');
        onDeleted();
      } else {
        let errorMsg = '삭제에 실패했습니다.';
        try {
          const errorData = await res.json();
          if (errorData.error === 'Invalid password') {
            errorMsg = '비밀번호가 일치하지 않습니다.';
          } else if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }
        alert(errorMsg);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Delete error:', e);
      alert('삭제 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !commentContent.trim() || !commentPassword.trim()) return;
    try {
      // 로그인한 사용자 정보 가져오기
      let employeeId: string | undefined;
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          employeeId = user.employeeId;
        }
      } catch {
        // 로그인 정보가 없으면 무시
      }
      
      const res = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: commentContent.trim(),
          password: commentPassword,
          employeeId
        })
      });
      if (!res.ok) {
        alert('댓글 등록에 실패했습니다.');
        return;
      }
      const created = (await res.json()) as IdeaComment;
      setComments((prev) => [...prev, created]);
      setCommentContent('');
      setCommentPassword('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const handleEditComment = async (
    id: string,
    content: string,
    password: string
  ) => {
    try {
      const res = await fetch(`${API_BASE}/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, password })
      });
      if (!res.ok) {
        alert('댓글 수정에 실패했습니다. 비밀번호를 확인해주세요.');
        return;
      }
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, content } : c))
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const handleDeleteComment = async (id: string, password: string) => {
    try {
      // 로그인한 사용자 정보 가져오기
      let employeeId: string | undefined;
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          employeeId = user.employeeId;
        }
      } catch {
        // 로그인 정보가 없으면 무시
      }
      
      const res = await fetch(`${API_BASE}/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, employeeId })
      });
      if (!res.ok) {
        alert('댓글 삭제에 실패했습니다. 비밀번호를 확인해주세요.\n(관리자는 마스터 비밀번호 9999 또는 로그인 상태에서 삭제 가능)');
        return;
      }
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  if (!postId) {
    return (
      <div className="text-xs text-slate-400">
        왼쪽에서 아이디어를 선택하거나 새 아이디어를 등록해보세요.
      </div>
    );
  }

  if (loading && !post) {
    return <div className="text-xs text-slate-400">불러오는 중...</div>;
  }

  if (!post) {
    return (
      <div className="text-xs text-slate-400">
        선택한 아이디어를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-slate-50">
            {post.title}
          </h2>
          <p className="mt-1 text-[10px] text-slate-400">
            {new Date(post.createdAt).toLocaleString('ko-KR')}
          </p>
          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold ${
                  (post.net_score || 0) > 0
                    ? 'text-emerald-300'
                    : (post.net_score || 0) < 0
                    ? 'text-rose-300'
                    : 'text-slate-400'
                }`}
              >
                순 점수: {post.net_score !== undefined && post.net_score >= 0 ? '+' : ''}
                {post.net_score || 0}점
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">
                찬성 {post.upvotes || 0} · 반대 {post.downvotes || 0}
              </span>
            </div>
            {hasVoted && (
              <span className="text-[10px] text-emerald-300">
                ✓ {votedType === 'upvote' ? '찬성' : '반대'} 투표 완료
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                if (!postId || voting) return;
                setVoting(true);
                try {
                  const voterId = getVoterId();
                  const userStr = localStorage.getItem('user');
                  const user = userStr ? JSON.parse(userStr) : null;
                  const res = await fetch(`${API_BASE}/posts/${postId}/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      voterId,
                      voteType: 'upvote',
                      employeeId: user?.employeeId || null
                    })
                  });
                  if (res.ok) {
                    const data = (await res.json()) as {
                      upvotes: number;
                      downvotes: number;
                      net_score: number;
                    };
                    setPost((prev) =>
                      prev
                        ? {
                            ...prev,
                            upvotes: data.upvotes,
                            downvotes: data.downvotes,
                            net_score: data.net_score
                          }
                        : null
                    );
                    setHasVoted(true);
                    setVotedType('upvote');
                    const votedPosts = JSON.parse(
                      localStorage.getItem('votedPosts') || '{}'
                    ) as Record<string, 'upvote' | 'downvote'>;
                    votedPosts[postId] = 'upvote';
                    localStorage.setItem('votedPosts', JSON.stringify(votedPosts));
                    onUpdated();
                  } else {
                    let errorMsg = '투표에 실패했습니다.';
                    try {
                      const errorData = await res.json();
                      // eslint-disable-next-line no-console
                      console.error('Vote error:', errorData);
                      if (errorData.error) {
                        errorMsg = `투표에 실패했습니다: ${errorData.error}`;
                      }
                    } catch (parseErr) {
                      // eslint-disable-next-line no-console
                      console.error('Failed to parse error response:', parseErr);
                    }
                    alert(errorMsg);
                  }
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error('Vote request failed:', e);
                  alert(`투표 중 오류가 발생했습니다: ${e instanceof Error ? e.message : String(e)}`);
                } finally {
                  setVoting(false);
                }
              }}
              disabled={voting || hasVoted}
              className={`flex-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold shadow-md transition disabled:opacity-50 ${
                votedType === 'upvote'
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40'
                  : 'bg-emerald-500/80 text-slate-950 shadow-emerald-500/30 hover:bg-emerald-400'
              }`}
            >
              {voting ? '투표 중...' : '▲ 찬성'}
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!postId || voting) return;
                setVoting(true);
                try {
                  const voterId = getVoterId();
                  const userStr = localStorage.getItem('user');
                  const user = userStr ? JSON.parse(userStr) : null;
                  const res = await fetch(`${API_BASE}/posts/${postId}/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      voterId,
                      voteType: 'downvote',
                      employeeId: user?.employeeId || null
                    })
                  });
                  if (res.ok) {
                    const data = (await res.json()) as {
                      upvotes: number;
                      downvotes: number;
                      net_score: number;
                    };
                    setPost((prev) =>
                      prev
                        ? {
                            ...prev,
                            upvotes: data.upvotes,
                            downvotes: data.downvotes,
                            net_score: data.net_score
                          }
                        : null
                    );
                    setHasVoted(true);
                    setVotedType('downvote');
                    const votedPosts = JSON.parse(
                      localStorage.getItem('votedPosts') || '{}'
                    ) as Record<string, 'upvote' | 'downvote'>;
                    votedPosts[postId] = 'downvote';
                    localStorage.setItem('votedPosts', JSON.stringify(votedPosts));
                    onUpdated();
                  } else {
                    let errorMsg = '투표에 실패했습니다.';
                    try {
                      const errorData = await res.json();
                      // eslint-disable-next-line no-console
                      console.error('Vote error:', errorData);
                      if (res.status === 409) {
                        errorMsg = '이미 투표하신 아이디어입니다.';
                      } else if (errorData.error) {
                        errorMsg = `투표에 실패했습니다: ${errorData.error}`;
                      }
                    } catch (parseErr) {
                      // eslint-disable-next-line no-console
                      console.error('Failed to parse error response:', parseErr);
                    }
                    alert(errorMsg);
                  }
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error('Vote request failed:', e);
                  alert(`투표 중 오류가 발생했습니다: ${e instanceof Error ? e.message : String(e)}`);
                } finally {
                  setVoting(false);
                }
              }}
              disabled={voting || hasVoted}
              className={`flex-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold shadow-md transition disabled:opacity-50 ${
                votedType === 'downvote'
                  ? 'bg-rose-500 text-slate-950 shadow-rose-500/40'
                  : 'bg-rose-500/80 text-slate-950 shadow-rose-500/30 hover:bg-rose-400'
              }`}
            >
              {voting ? '투표 중...' : '▼ 반대'}
            </button>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-700/80 px-2 py-1 text-[10px] text-slate-200 hover:border-kepco-sky/60"
            onClick={async () => {
              const pw = window.prompt(
                '이 글의 수정 비밀번호를 입력하세요.'
              );
              if (!pw) return;
              const newTitle = window.prompt('새 제목을 입력하세요.', post.title);
              if (!newTitle || !newTitle.trim()) return;
              const newContent = window.prompt(
                '새 내용을 입력하세요.',
                post.content
              );
              if (!newContent || !newContent.trim()) return;
              const newUrl = window.prompt(
                '체험 링크를 입력하세요. (선택사항, 비우려면 확인을 눌러주세요)',
                post.url || ''
              );
              try {
                const res = await fetch(`${API_BASE}/posts/${post.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: newTitle.trim(),
                    content: newContent.trim(),
                    password: pw,
                    url: newUrl ? newUrl.trim() : null
                  })
                });
                if (!res.ok) {
                  alert('수정에 실패했습니다. 비밀번호를 확인해주세요.');
                  return;
                }
                setPost({
                  ...post,
                  title: newTitle.trim(),
                  content: newContent.trim(),
                  url: newUrl ? newUrl.trim() : null
                });
                onUpdated();
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
              }
            }}
          >
            글 수정
          </button>
          <button
            type="button"
            className="rounded-lg border border-rose-500/60 px-2 py-1 text-[10px] text-rose-300 hover:bg-rose-500/20"
            onClick={handleDeletePost}
          >
            글 삭제
          </button>
        </div>
      </div>

      {post.url && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => window.open(post.url!, '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-kepco-sky/50 bg-slate-950/40 px-4 py-2 text-xs font-semibold text-kepco-sky transition hover:bg-kepco-sky/20 hover:text-slate-50"
          >
            <span>🚀</span>
            <span>체험하기</span>
          </button>
        </div>
      )}

      <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 text-[11px] text-slate-100">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="mt-1 border-t border-slate-800/80 pt-2">
        <p className="mb-1 text-[11px] font-semibold text-slate-200">
          익명 피드백 (댓글)
        </p>
        <form
          onSubmit={handleCreateComment}
          className="mb-2 space-y-1 rounded-xl border border-slate-800/80 bg-slate-950/70 p-2"
        >
          <textarea
            className="h-16 w-full resize-none rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
            placeholder="아이디어에 대한 피드백이나 보완점을 자유롭게 남겨주세요."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <div className="mt-1 flex items-center gap-2">
            <input
              type="password"
              className="h-7 flex-1 rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="수정/삭제용 비밀번호"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg bg-kepco-sky px-3 py-1 text-[11px] font-semibold text-slate-950 shadow-sm shadow-kepco-sky/40 hover:bg-kepco-blue"
            >
              댓글 등록
            </button>
          </div>
        </form>

        <CommentList
          comments={comments}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default PostDetail;




