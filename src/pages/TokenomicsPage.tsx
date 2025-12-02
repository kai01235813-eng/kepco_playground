import { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const TokenomicsPage = () => {
  // Distribution Pie Chart Data
  const distributionData = {
    labels: ['보상 풀', '팀 풀', '재무부 풀', '준비금 풀'],
    datasets: [{
      data: [500000000, 250000000, 200000000, 50000000],
      backgroundColor: [
        'rgb(56, 189, 248)',  // cyan
        'rgb(129, 140, 248)', // indigo
        'rgb(196, 181, 253)', // purple
        'rgb(251, 191, 36)'   // amber
      ],
      borderColor: 'rgb(15, 23, 42)',
      borderWidth: 3
    }]
  };

  const distributionOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / 1000000000) * 100).toFixed(1);
            return `${label}: ${(value / 1000000).toFixed(0)}M KEP (${percentage}%)`;
          }
        },
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgb(207, 250, 254)',
        bodyColor: 'rgb(226, 232, 240)',
        borderColor: 'rgb(56, 189, 248)',
        borderWidth: 1
      }
    }
  };

  // Emission vs Burn Chart Data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  });

  const emissionData = {
    labels: last30Days,
    datasets: [
      {
        label: '일일 방출량',
        data: Array.from({ length: 30 }, () => 1250 + Math.random() * 100 - 50),
        borderColor: 'rgb(56, 189, 248)',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: '일일 소각량',
        data: Array.from({ length: 30 }, () => Math.random() * 200),
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const emissionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(226, 232, 240)'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgb(207, 250, 254)',
        bodyColor: 'rgb(226, 232, 240)',
        borderColor: 'rgb(56, 189, 248)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(148, 163, 184)',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgb(148, 163, 184)',
          callback: function(value: any) {
            return value + ' KEP';
          }
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const updateMetrics = () => {
      const circulatingEl = document.getElementById('circulatingSupply');
      const burnedEl = document.getElementById('totalBurned');
      const netRateEl = document.getElementById('netRewardRate');

      if (circulatingEl) {
        const baseCirculating = 50000000;
        const variation = Math.random() * 10000 - 5000;
        const newCirculating = baseCirculating + variation;
        circulatingEl.textContent = Math.floor(newCirculating).toLocaleString();
      }

      if (burnedEl) {
        const baseBurned = 500000;
        const newBurned = baseBurned + Math.random() * 100;
        burnedEl.textContent = Math.floor(newBurned).toLocaleString();
      }

      if (netRateEl) {
        const baseRate = 1250;
        const rateVariation = Math.random() * 50 - 25;
        netRateEl.textContent = '+' + Math.floor(baseRate + rateVariation).toLocaleString();
      }
    };

    const interval = setInterval(updateMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <header className="mb-8">
        <div className="glass-panel p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-300 mb-3">
            KEP 토크노믹스 대시보드
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            KEP코인은 10년 후 민간 전환을 목표로 하는 프라이빗 멤코인입니다. 
            주로 커뮤니티 기여에 대한 보상으로 활용되며, 장기적으로 공공 부문으로 확장될 예정입니다.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            (본 대시보드의 데이터는 시뮬레이션이며, 실제 블록체인 데이터와 연동될 예정입니다.)
          </p>
        </div>
      </header>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Supply */}
        <div className="glass-panel p-5 coin-badge glow-effect">
          <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">총 공급량</p>
          <p className="text-2xl font-bold text-cyan-200">1,000,000,000</p>
          <p className="text-xs text-slate-400 mt-1">KEP</p>
        </div>

        {/* Circulating Supply */}
        <div className="glass-panel p-5 coin-badge">
          <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">유통 공급량</p>
          <p className="text-2xl font-bold text-cyan-200" id="circulatingSupply">50,000,000</p>
          <p className="text-xs text-slate-400 mt-1">KEP (5%)</p>
        </div>

        {/* Total Burned */}
        <div className="glass-panel p-5 coin-badge">
          <p className="text-xs uppercase tracking-wider text-rose-300 mb-2">소각량</p>
          <p className="text-2xl font-bold text-rose-200" id="totalBurned">500,000</p>
          <p className="text-xs text-slate-400 mt-1">KEP</p>
        </div>

        {/* Net Reward Rate */}
        <div className="glass-panel p-5 coin-badge">
          <p className="text-xs uppercase tracking-wider text-emerald-300 mb-2">순 보상률</p>
          <p className="text-2xl font-bold text-emerald-200" id="netRewardRate">+1,250</p>
          <p className="text-xs text-slate-400 mt-1">KEP/일</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Distribution Pie Chart */}
        <div className="lg:col-span-2 glass-panel p-6">
          <h2 className="section-title mb-4">초기 배분 (Initial Distribution)</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-64 h-64 flex items-center justify-center">
              <Doughnut data={distributionData} options={distributionOptions} />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                  <span className="text-sm text-slate-300">보상 풀 (Rewards Pool)</span>
                </div>
                <span className="text-sm font-semibold text-cyan-300">50% (500M KEP)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                  <span className="text-sm text-slate-300">팀 풀 (Team Pool)</span>
                </div>
                <span className="text-sm font-semibold text-indigo-300">25% (250M KEP)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-slate-300">재무부 풀 (Treasury)</span>
                </div>
                <span className="text-sm font-semibold text-purple-300">20% (200M KEP)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-amber-400"></div>
                  <span className="text-sm text-slate-300">준비금 풀 (Reserve)</span>
                </div>
                <span className="text-sm font-semibold text-amber-300">5% (50M KEP)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vesting Status */}
        <div className="glass-panel p-6">
          <h2 className="section-title mb-4">베스팅 현황</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
              <p className="text-xs text-slate-400 mb-1">보상 풀 잔액</p>
              <p className="text-xl font-bold text-cyan-300">450,000,000</p>
              <p className="text-xs text-slate-500 mt-1">KEP</p>
              <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">90% 남음</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
              <p className="text-xs text-slate-400 mb-1">팀 잠금량</p>
              <p className="text-xl font-bold text-indigo-300">200,000,000</p>
              <p className="text-xs text-slate-500 mt-1">KEP</p>
              <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">베스팅 진행 중</p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
              <p className="text-xs text-amber-300 mb-1">준비금 풀 상태</p>
              <p className="text-sm font-semibold text-amber-200">T+10년까지 잠금</p>
              <p className="text-xs text-amber-300/70 mt-1">민간 전환 준비금</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="glass-panel p-6 mb-8">
        <h2 className="section-title mb-6">10년 로드맵</h2>
        <div className="space-y-8">
          {/* Phase 1 */}
          <div className="roadmap-phase">
            <div className="roadmap-dot"></div>
            <div className="ml-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">Phase 1</span>
                <span className="text-sm text-slate-400">T ~ T+10년</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">프라이빗 네트워크 운영 및 내부 성장</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                KEPCO 내부 생태계에서만 운영되는 프라이빗 멤코인으로 시작합니다. 
                커뮤니티 기여자들에게 KEP를 보상으로 지급하며, 내부 사용자 기반을 확대합니다.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">보상 시스템 구축</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">내부 거버넌스 형성</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">커뮤니티 확장</span>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="roadmap-phase">
            <div className="roadmap-dot"></div>
            <div className="ml-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">Phase 2</span>
                <span className="text-sm text-slate-400">T+10년</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">거버넌스 투표 및 민간 전환 결정</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                10년 운영 후, 커뮤니티 거버넌스 투표를 통해 공공 부문으로의 전환 여부를 결정합니다.
                준비금 풀이 해제되며, 전환 시 필요한 자금으로 활용됩니다.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">거버넌스 투표</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">준비금 풀 해제</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">전환 결정</span>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="roadmap-phase">
            <div className="roadmap-dot"></div>
            <div className="ml-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">Phase 3</span>
                <span className="text-sm text-slate-400">T+10년 이후</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">공공 체인 마이그레이션 및 생태계 확장</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                전환 결정 시, 공공 블록체인 네트워크로 마이그레이션하며 더 넓은 생태계로 확장합니다.
                KEPCO의 DX 생태계를 대표하는 토큰으로 성장합니다.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">체인 마이그레이션</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">생태계 확장</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">공공 서비스 통합</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emission vs Burn Chart */}
      <div className="glass-panel p-6">
        <h2 className="section-title mb-4">일일 방출량 vs 소각량</h2>
        <div className="h-64">
          <Line data={emissionData} options={emissionOptions} />
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
