import type React from 'react';
import { useEffect, useState } from 'react';

type PlaygroundApp = {
  id: string;
  title: string;
  url: string;
  description: string;
  createdAt: number;
};

import { API_BASE } from '../config/api';

const PlaygroundPage: React.FC = () => {
  const [apps, setApps] = useState<PlaygroundApp[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/playground-apps`);
        if (!res.ok) return;
        const data = (await res.json()) as PlaygroundApp[];
        setApps(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    void load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/playground-apps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          url: url.trim(),
          description: description.trim()
        })
      });
      if (!res.ok) throw new Error('failed to create app');
      const created = (await res.json()) as PlaygroundApp;
      setApps((prev) => [created, ...prev]);
      setTitle('');
      setUrl('');
      setDescription('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">Playground Zone</h1>
          <p className="mt-1 text-xs text-slate-300">
            한전 직원들이 만든 웹/앱을 직접 체험해보는 공간입니다. 아래 예시처럼
            본인이 만든 서비스를 업로드해 보세요.
          </p>
        </div>
        <span className="coin-badge">🎮 DX Playground</span>
      </section>

      <section className="glass-panel grid gap-4 p-5 md:grid-cols-[1.4fr_1.6fr]">
        <div className="flex flex-col gap-3 text-xs">
          <h2 className="section-title">예시 플레이그라운드</h2>
          <div className="space-y-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3">
              <p className="mb-1 text-[11px] text-slate-400">예시 1</p>
              <p className="text-sm font-semibold text-slate-50">
                KEPCO V2G Game
              </p>
              <p className="mt-1 text-slate-300">
                전기차와 전력망(V2G) 개념을 게임 형태로 체험하는 웹 앱입니다.
              </p>
              <a
                href="https://kepco-v2g-game.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-[11px] text-kepco-sky hover:underline"
              >
                새 창에서 열기 ↗
              </a>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3">
              <p className="mb-1 text-[11px] text-slate-400">예시 2</p>
              <p className="text-sm font-semibold text-slate-50">
                KEPCO VPP Game
              </p>
              <p className="mt-1 text-slate-300">
                가상발전소(VPP)와 계통 운영 원리를 직관적으로 배워보는 시뮬레이터입니다.
              </p>
              <a
                href="https://vpp-game.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-[11px] text-kepco-sky hover:underline"
              >
                새 창에서 열기 ↗
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <h2 className="section-title">내 Playground 업로드</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3"
          >
            <input
              className="h-8 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="프로젝트 이름 (예: KEPCO VPP Game)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="h-8 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="배포 URL (예: https://my-app.vercel.app/)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <textarea
              className="h-20 w-full resize-none rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
              placeholder="간단한 소개 또는 사용 방법을 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-kepco-sky px-3 py-2 text-[11px] font-semibold text-slate-950 shadow-sm shadow-kepco-sky/40 hover:bg-kepco-blue disabled:opacity-50"
            >
              {submitting ? '업로드 중...' : 'Playground 등록'}
            </button>
            <p className="text-[10px] text-slate-500">
              ※ 내부 규정에 맞는 URL만 업로드해 주세요. (예: 사내 VPN에서 접속 가능한
              서비스, 또는 공개 가능한 데모)
            </p>
          </form>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3">
            <p className="mb-2 text-[11px] text-slate-400">
              등록된 Playground 목록 (URL로 이동)
            </p>
            {apps.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                아직 등록된 Playground가 없습니다. 첫 번째 주인공이 되어보세요!
              </p>
            ) : (
              <ul className="space-y-1 text-[11px]">
                {apps.map((app) => (
                  <li key={app.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-100">
                        {app.title}
                      </p>
                      {app.description && (
                        <p className="truncate text-[10px] text-slate-400">
                          {app.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-[10px] text-kepco-sky hover:underline"
                    >
                      열기 ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaygroundPage;


