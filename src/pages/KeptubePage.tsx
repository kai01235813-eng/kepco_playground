import type React from 'react';
import { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

type Video = {
  videoId: string;
  title: string;
  published: string;
  author: string;
};

const KeptubePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/keptube/videos`);
        if (!res.ok) {
          throw new Error('동영상 정보를 가져오는데 실패했습니다.');
        }
        const data = await res.json();
        if (data.success && data.videos) {
          setVideos(data.videos);
        } else {
          throw new Error(data.error || '동영상 정보를 가져올 수 없습니다.');
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load videos:', e);
        setError(e instanceof Error ? e.message : '동영상을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    void loadVideos();
    
    // 5분마다 갱신
    const interval = setInterval(() => {
      void loadVideos();
    }, 300000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel flex items-center justify-between p-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">KEPTUBE</h1>
          <p className="mt-1 text-xs text-slate-300">
            에너지인사이트 채널의 최신 동영상을 확인하세요.
          </p>
        </div>
        <span className="coin-badge">📺 에너지인사이트</span>
      </section>

      {loading && videos.length === 0 ? (
        <section className="glass-panel p-8">
          <div className="text-center text-sm text-slate-400">
            동영상을 불러오는 중...
          </div>
        </section>
      ) : error ? (
        <section className="glass-panel p-8">
          <div className="text-center text-sm text-rose-300">
            {error}
          </div>
        </section>
      ) : videos.length === 0 ? (
        <section className="glass-panel p-8">
          <div className="text-center text-sm text-slate-400">
            동영상이 없습니다.
          </div>
        </section>
      ) : (
        <section className="glass-panel p-5">
          <div className="mb-4">
            <h2 className="section-title">최신 동영상</h2>
            <p className="mt-1 text-xs text-slate-400">
              좌우로 스크롤하여 모든 동영상을 확인하세요.
            </p>
          </div>
          
          {/* 가로 스크롤 컨테이너 */}
          <div className="horizontal-scroll-wrapper flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className="flex-shrink-0"
              >
                <div className="w-80 rounded-xl border border-slate-800/70 bg-slate-950/60 overflow-hidden">
                  {/* 유튜브 영상 */}
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  
                  {/* 영상 정보 */}
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-50 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {new Date(video.published).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default KeptubePage;

