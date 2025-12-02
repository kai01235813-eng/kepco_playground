import type React from 'react';
import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

interface SimpleLoginProps {
  onLogin?: (employeeId: string, userData: { employeeId: string; name: string }) => void;
}

const SimpleLogin: React.FC<SimpleLoginProps> = ({ onLogin }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // 디버깅: API URL 확인
      // eslint-disable-next-line no-console
      console.log('Login API URL:', `${API_BASE}/auth/login`);
      
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password })
      });
      
      // 디버깅: 응답 상태 확인
      // eslint-disable-next-line no-console
      console.log('Login response status:', res.status, res.statusText);
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({ ...data, coinBalance: data.coinBalance || 0 }));
        onLogin?.(data.employeeId, data);
        setShowModal(false);
        setEmployeeId('');
        setPassword('');
        setTimeout(() => window.location.reload(), 100);
      } else {
        const errorData = await res.json().catch(() => ({}));
        // eslint-disable-next-line no-console
        console.error('Login error:', errorData);
        setError(errorData.error || '로그인에 실패했습니다. 서버 연결을 확인해주세요.');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Login error:', e);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    
    // 디버깅: 폼 데이터 확인
    // eslint-disable-next-line no-console
    console.log('Signup form data:', { employeeId, password, name: name || '(empty)' });
    
    if (!employeeId || !password || !name) {
      const missing = [];
      if (!employeeId) missing.push('사번');
      if (!password) missing.push('비밀번호');
      if (!name) missing.push('이름');
      setError(`${missing.join(', ')}을(를) 입력해주세요.`);
      // eslint-disable-next-line no-console
      console.warn('Validation failed:', missing);
      return;
    }
    setLoading(true);
    try {
      // 디버깅: API URL 확인
      // eslint-disable-next-line no-console
      console.log('Signup API URL:', `${API_BASE}/auth/signup`);
      
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password, name })
      });
      
      // 디버깅: 응답 상태 확인
      // eslint-disable-next-line no-console
      console.log('Signup response status:', res.status, res.statusText);
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({ ...data, coinBalance: data.coinBalance || 0 }));
        onLogin?.(data.employeeId, data);
        setShowModal(false);
        setEmployeeId('');
        setPassword('');
        setName('');
        setIsSignUp(false);
        setTimeout(() => window.location.reload(), 100);
      } else {
        const errorData = await res.json().catch(() => ({}));
        // eslint-disable-next-line no-console
        console.error('Signup error:', errorData);
        setError(errorData.error || '회원가입에 실패했습니다. 서버 연결을 확인해주세요.');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', e);
      const errorMessage = e instanceof Error ? e.message : '서버에 연결할 수 없습니다.';
      // eslint-disable-next-line no-console
      console.error('Signup error details:', errorMessage);
      setError(`네트워크 오류: ${errorMessage}. API 주소를 확인해주세요.`);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-cyan-200">
          {currentUser.name} ({currentUser.employeeId})
        </span>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition hover:bg-slate-800"
        >
          로그아웃
        </button>
      </div>
    );
  }

  const handleOpenPopup = () => {
    const width = 480;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      '/login',
      'loginPopup',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    
    if (!popup) {
      // 팝업이 차단된 경우 모달로 대체
      setShowModal(true);
      alert('팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해주세요.');
    }
  };

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="rounded-lg border border-cyan-300/50 bg-slate-900/60 px-4 py-2 font-medium text-cyan-200 transition hover:border-cyan-200 hover:bg-slate-900"
      >
        간편로그인
      </button>

      {showModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              setError('');
              setIsSignUp(false);
              setEmployeeId('');
              setPassword('');
              setName('');
            }
          }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            className="glass-panel relative my-auto w-full max-w-md rounded-2xl border border-kepco-blue/50 p-6 text-xs z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowModal(false);
                setError('');
                setIsSignUp(false);
                setEmployeeId('');
                setPassword('');
                setName('');
              }}
              className="absolute right-4 top-4 z-10 text-slate-400 hover:text-slate-200 text-xl"
            >
              ✕
            </button>
            <div className="max-h-[80vh] overflow-y-auto pr-2">
              <h3 className="mb-4 text-lg font-semibold text-slate-50">
                {isSignUp ? '회원가입' : '간편로그인'}
              </h3>
              <div className="mb-4 flex gap-2 border-b border-slate-700/80">
                <button
                  onClick={() => {
                    setIsSignUp(false);
                    setError('');
                  }}
                  className={`pb-2 text-sm transition ${
                    !isSignUp
                      ? 'border-b-2 border-kepco-sky font-semibold text-kepco-sky'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  로그인
                </button>
                <button
                  onClick={() => {
                    setIsSignUp(true);
                    setError('');
                  }}
                  className={`pb-2 text-sm transition ${
                    isSignUp
                      ? 'border-b-2 border-kepco-sky font-semibold text-kepco-sky'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  회원가입
                </button>
              </div>
              {error && (
                <div className="mb-3 rounded-lg bg-rose-500/20 border border-rose-500/50 px-3 py-2 text-[11px] text-rose-300">
                  {error}
                </div>
              )}
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-3">
                <div>
                  <label className="mb-1 block text-[11px] text-slate-300">사번</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                    placeholder="사번을 입력하세요"
                  />
                </div>
                {isSignUp && (
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-300">이름</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-[11px] text-slate-300">비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-kepco-sky focus:outline-none"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleLogin;

