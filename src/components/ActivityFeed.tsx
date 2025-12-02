import React, { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

type VoteActivity = {
  id: string;
  postId?: string;
  postTitle?: string;
  activityType: 'vote' | 'attendance' | 'post' | 'comment' | 'hot_idea';
  voteType?: 'upvote' | 'downvote';
  coinsEarned: number;
  createdAt: number;
};

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<VoteActivity[]>([]);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadActivities = async () => {
      const user = getCurrentUser();
      if (!user || !user.employeeId) {
        setActivities([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/vote-history/${user.employeeId}`);
        if (res.ok) {
          const data = (await res.json()) as VoteActivity[];
          setActivities(data);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load vote history:', e);
      } finally {
        setLoading(false);
      }
    };

    void loadActivities();
    // 5초마다 갱신
    const interval = setInterval(() => {
      void loadActivities();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const user = getCurrentUser();
      if (user && user.employeeId) {
        // 투표 내역 다시 로드
        const loadActivities = async () => {
          setLoading(true);
          try {
            const res = await fetch(`${API_BASE}/vote-history/${user.employeeId}`);
            if (res.ok) {
              const data = (await res.json()) as VoteActivity[];
              setActivities(data);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Failed to load vote history:', e);
          } finally {
            setLoading(false);
          }
        };
        void loadActivities();
      } else {
        setActivities([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // localStorage 직접 변경 감지를 위한 polling
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  const user = getCurrentUser();

  if (!user || !user.employeeId) {
    return (
      <section className="glass-panel flex flex-col gap-3 p-5">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="section-title">실시간 기여 피드</h2>
            <p className="mt-1 text-xs text-slate-400">
              로그인 후 투표 내역을 확인할 수 있습니다.
            </p>
          </div>
        </header>
        <div className="flex h-56 items-center justify-center rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-2 text-xs text-slate-400">
          로그인이 필요합니다.
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel flex flex-col gap-3 p-5">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="section-title">실시간 기여 피드</h2>
          <p className="mt-1 text-xs text-slate-400">
            내 활동으로 획득한 KEP코인 내역입니다.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          실시간 동기화
        </span>
      </header>

      <div className="relative h-56 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="no-scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-1 text-xs">
          {loading && activities.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">불러오는 중...</div>
          ) : activities.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              아직 활동 내역이 없습니다.
              <br />
              출석체크, 투표, 글 작성 등으로 코인을 획득할 수 있습니다!
            </div>
          ) : (
            activities.map((activity) => {
              let activityContent: React.ReactNode = '';
              
              switch (activity.activityType) {
                case 'attendance':
                  activityContent = (
                    <>
                      <span className="font-semibold text-emerald-300">출석체크 완료하여</span>
                    </>
                  );
                  break;
                case 'vote':
                  activityContent = (
                    <>
                      <span className="font-semibold text-sky-300">"{activity.postTitle}"</span>에{' '}
                      <span className={activity.voteType === 'upvote' ? 'text-emerald-300' : 'text-rose-300'}>
                        {activity.voteType === 'upvote' ? '찬성' : '반대'}
                      </span>
                      {' '}투표하여
                    </>
                  );
                  break;
                case 'post':
                  activityContent = (
                    <>
                      <span className="font-semibold text-cyan-300">"{activity.postTitle}"</span> 작성하여
                    </>
                  );
                  break;
                case 'comment':
                  activityContent = (
                    <>
                      <span className="font-semibold text-blue-300">{activity.postTitle}</span>
                    </>
                  );
                  break;
                case 'hot_idea':
                  activityContent = (
                    <>
                      <span className="font-semibold text-amber-300">{activity.postTitle}</span>
                    </>
                  );
                  break;
                default:
                  activityContent = <span className="font-semibold text-sky-300">활동하여</span>;
              }
              
              return (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-2 text-slate-200"
                >
                  <div className="flex flex-1 flex-col">
                    <span className="text-[11px]">
                      <span className="font-semibold text-cyan-200">{user.name}</span>님이{' '}
                      {activityContent}{' '}
                      <span className="font-semibold text-emerald-200">
                        KEP코인 {activity.coinsEarned}개
                      </span>{' '}
                      획득
                    </span>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-[10px] text-slate-500">
                    {formatTime(activity.createdAt)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivityFeed;
