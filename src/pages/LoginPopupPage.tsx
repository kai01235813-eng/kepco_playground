import type React from 'react';
import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const LoginPopupPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showFindPassword, setShowFindPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hint, setHint] = useState('');
  const [foundPassword, setFoundPassword] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // 팝업 창에서 열렸는지 확인
    if (window.opener) {
      // 팝업 창 스타일 적용
      document.body.style.margin = '0';
      document.body.style.padding = '20px';
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({ ...data, coinBalance: data.coinBalance || 0 }));
        
        // 팝업 창에서 열렸다면 부모 창 새로고침
        if (window.opener) {
          window.opener.location.reload();
          window.close();
        } else {
          // 일반 페이지라면 새로고침
          window.location.href = '/';
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || '로그인에 실패했습니다.');
      }
    } catch (e) {
      console.error('Login error:', e);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!employeeId || !password || !name) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password, name })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({ ...data, coinBalance: data.coinBalance || 0 }));
        
        // 팝업 창에서 열렸다면 부모 창 새로고침
        if (window.opener) {
          window.opener.location.reload();
          window.close();
        } else {
          // 일반 페이지라면 새로고침
          window.location.href = '/';
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || '회원가입에 실패했습니다.');
      }
    } catch (e) {
      console.error('Signup error:', e);
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoundPassword(null);
    
    if (!employeeId || !hint) {
      setError('사번과 힌트를 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/find-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, hint })
      });
      
      if (res.ok) {
        const data = await res.json();
        setFoundPassword(data.password);
        setError('');
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || '비밀번호 찾기에 실패했습니다.');
        setFoundPassword(null);
      }
    } catch (e) {
      console.error('Find password error:', e);
      setError('비밀번호 찾기 중 오류가 발생했습니다.');
      setFoundPassword(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kepco-navyDeep via-slate-950 to-slate-900 text-slate-100 grid-bg">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-kepco-sky/15 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-kepco-blue/25 blur-3xl"></div>
      </div>
      <div className="relative flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md">
          <div className="glass-panel rounded-2xl border border-kepco-blue/50 p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-kepco-blue/20 ring-2 ring-kepco-sky/60">
                  <span className="text-xl font-extrabold text-kepco-sky">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-50">
                  {isSignUp ? '회원가입' : '간편로그인'}
                </h3>
              </div>
              {(window.opener || window.location.pathname === '/login') && (
                <button
                  onClick={() => {
                    if (window.opener) {
                      window.close();
                    } else {
                      window.location.href = '/';
                    }
                  }}
                  className="text-slate-400 hover:text-slate-200 text-2xl"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="mb-6 flex gap-2 border-b border-slate-700/80">
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setShowFindPassword(false);
                  setError('');
                  setFoundPassword(null);
                }}
                className={`pb-2 text-sm transition ${
                  !isSignUp && !showFindPassword
                    ? 'border-b-2 border-kepco-sky font-semibold text-kepco-sky'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setShowFindPassword(false);
                  setError('');
                  setFoundPassword(null);
                }}
                className={`pb-2 text-sm transition ${
                  isSignUp && !showFindPassword
                    ? 'border-b-2 border-kepco-sky font-semibold text-kepco-sky'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                회원가입
              </button>
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setShowFindPassword(true);
                  setError('');
                  setFoundPassword(null);
                }}
                className={`pb-2 text-sm transition ${
                  showFindPassword
                    ? 'border-b-2 border-kepco-sky font-semibold text-kepco-sky'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                비밀번호 찾기
              </button>
            </div>
            
            {error && (
              <div className="mb-4 rounded-lg bg-rose-500/20 border border-rose-500/50 px-3 py-2 text-sm text-rose-300">
                {error}
              </div>
            )}
            
            {foundPassword && (
              <div className="mb-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 px-3 py-2 text-sm text-emerald-300">
                <p className="font-semibold mb-1">✅ 비밀번호를 찾았습니다!</p>
                <p className="text-xs">사번: {employeeId}</p>
                <p className="text-xs">비밀번호: <span className="font-mono font-bold">{foundPassword}</span></p>
              </div>
            )}
            
            {showFindPassword ? (
              <form onSubmit={handleFindPassword} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">사번</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                    placeholder="사번을 입력하세요"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">힌트</label>
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                    placeholder="힌트를 입력하세요 (힌트: 1111)"
                  />
                  <p className="mt-1 text-xs text-slate-500">힌트: 1111</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-kepco-sky px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-kepco-sky/40 transition hover:bg-kepco-blue disabled:opacity-50"
                >
                  {loading ? '찾는 중...' : '비밀번호 찾기'}
                </button>
              </form>
            ) : (
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">사번</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                    placeholder="사번을 입력하세요"
                  />
                </div>
                
                {isSignUp && (
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">이름</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                )}
                
                <div>
                  <label className="mb-2 block text-sm text-slate-300">비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-kepco-sky px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-kepco-sky/40 transition hover:bg-kepco-blue disabled:opacity-50"
                >
                  {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopupPage;
