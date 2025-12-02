import type React from 'react';
import { useState } from 'react';
import type { Post } from './useLocalStorage';

interface PostListProps {
  posts: Post[];
  emptyText: string;
  onRequestEdit: (id: string, password: string) => void;
  onRequestDelete: (id: string, password: string) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  emptyText,
  onRequestEdit,
  onRequestDelete
}) => {
  const [passwordMap, setPasswordMap] = useState<Record<string, string>>({});

  const handleChangePassword = (id: string, value: string) => {
    setPasswordMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = (id: string) => {
    const pw = passwordMap[id] ?? '';
    if (!pw.trim()) return;
    onRequestEdit(id, pw);
  };

  const handleDelete = (id: string) => {
    const pw = passwordMap[id] ?? '';
    if (!pw.trim()) return;
    onRequestDelete(id, pw);
  };

  if (posts.length === 0) {
    return (
      <p className="mt-2 text-[11px] text-slate-500">
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="mt-2 space-y-2 text-[11px]">
      {posts.map((post) => (
        <li
          key={post.id}
          className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-2"
        >
          <p className="whitespace-pre-wrap text-slate-100">
            {post.content}
          </p>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>
              {new Date(post.createdAt).toLocaleString('ko-KR', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="password"
              className="h-6 flex-1 rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[10px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="수정/삭제 비밀번호 입력"
              value={passwordMap[post.id] ?? ''}
              onChange={(e) => handleChangePassword(post.id, e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleEdit(post.id)}
              className="rounded-lg border border-slate-700/80 px-2 py-0.5 text-[10px] text-slate-200 hover:border-kepco-sky/60"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => handleDelete(post.id)}
              className="rounded-lg border border-rose-500/60 px-2 py-0.5 text-[10px] text-rose-300 hover:bg-rose-500/20"
            >
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;


