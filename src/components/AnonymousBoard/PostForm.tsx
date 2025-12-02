import type React from 'react';
import { useState } from 'react';

interface PostFormProps {
  mode: 'create' | 'edit';
  categoryLabel: string;
  initialContent?: string;
  onSubmit: (content: string, password?: string) => void;
  onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  mode,
  categoryLabel,
  initialContent = '',
  onSubmit,
  onCancel
}) => {
  const [content, setContent] = useState(initialContent);
  const [password, setPassword] = useState('');

  const isCreate = mode === 'create';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (isCreate && !password.trim()) return;
    onSubmit(content.trim(), isCreate ? password : undefined);
    if (isCreate) {
      setContent('');
      setPassword('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 text-[11px]"
    >
      <p className="text-[11px] font-medium text-slate-200">
        {categoryLabel}{' '}
        <span className="text-slate-400">
          {isCreate ? '새 글 작성' : '글 수정'}
        </span>
      </p>
      <textarea
        className="h-20 w-full resize-none rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
        placeholder="내용을 입력하세요. (제목 없이 본문만 작성)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {isCreate && (
        <input
          type="password"
          className="h-7 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
          placeholder="수정/삭제에 사용할 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-700/80 px-3 py-1 text-[11px] text-slate-300 hover:border-slate-500"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          className="rounded-lg bg-kepco-sky px-3 py-1 text-[11px] font-semibold text-slate-950 shadow-sm shadow-kepco-sky/40 hover:bg-kepco-blue"
        >
          {isCreate ? '등록' : '수정 완료'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;


