import type React from 'react';
import { useState } from 'react';

interface PostFormProps {
  mode: 'create' | 'edit';
  initialTitle?: string;
  initialContent?: string;
  initialUrl?: string;
  onSubmit: (title: string, content: string, password?: string, url?: string) => void;
  onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  mode,
  initialTitle = '',
  initialContent = '',
  initialUrl = '',
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [url, setUrl] = useState(initialUrl);
  const [password, setPassword] = useState('');

  const isCreate = mode === 'create';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (isCreate && !password.trim()) return;
    onSubmit(title.trim(), content.trim(), isCreate ? password : undefined, url.trim() || undefined);
    if (isCreate) {
      setTitle('');
      setContent('');
      setUrl('');
      setPassword('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 text-[11px]"
    >
      <p className="text-[11px] font-medium text-slate-200">
        {isCreate ? '새 아이디어 등록' : '아이디어 수정'}
      </p>
      <input
        className="h-8 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
        placeholder="제목 (예: V2G 시스템 시뮬레이션)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="h-24 w-full resize-none rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
        placeholder="내용을 입력하세요. 링크와 설명을 자유롭게 적어주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="url"
        className="h-8 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
        placeholder="체험 링크 (선택사항, 예: https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
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




