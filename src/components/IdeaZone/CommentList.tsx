import type React from 'react';
import { useState } from 'react';
import type { IdeaComment } from './types';

interface CommentListProps {
  comments: IdeaComment[];
  onEdit: (id: string, content: string, password: string) => void;
  onDelete: (id: string, password: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onEdit,
  onDelete
}) => {
  const [passwords, setPasswords] = useState<Record<string, string>>({});

  const handleChangePw = (id: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-2 text-[11px]">
      {comments.length === 0 ? (
        <p className="text-slate-500">
          아직 댓글이 없습니다. 첫 번째 피드백을 남겨보세요!
        </p>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-2"
          >
            <p className="whitespace-pre-wrap text-slate-100">{c.content}</p>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>
                {new Date(c.createdAt).toLocaleString('ko-KR', {
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
                placeholder="수정/삭제 비밀번호"
                value={passwords[c.id] ?? ''}
                onChange={(e) => handleChangePw(c.id, e.target.value)}
              />
              <button
                type="button"
                className="rounded-lg border border-slate-700/80 px-2 py-0.5 text-[10px] text-slate-200 hover:border-kepco-sky/60"
                onClick={() => {
                  const pw = passwords[c.id] ?? '';
                  if (!pw.trim()) return;
                  const nextContent = window.prompt(
                    '수정할 내용을 입력하세요.',
                    c.content
                  );
                  if (nextContent != null && nextContent.trim()) {
                    onEdit(c.id, nextContent.trim(), pw);
                  }
                }}
              >
                수정
              </button>
              <button
                type="button"
                className="rounded-lg border border-rose-500/60 px-2 py-0.5 text-[10px] text-rose-300 hover:bg-rose-500/20"
                onClick={() => {
                  const pw = passwords[c.id] ?? '';
                  if (!pw.trim()) return;
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    onDelete(c.id, pw);
                  }
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;




