import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const AttendanceCheck = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkAttendanceStatus = async () => {
      const user = getCurrentUser();
      if (!user || !user.employeeId) {
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/attendance/status/${user.employeeId}`);
        if (res.ok) {
          const data = await res.json();
          setChecked(data.checked);
        }
      } catch (e) {
        console.error('Failed to check attendance status:', e);
      }
    };

    checkAttendanceStatus();
    // 30초마다 상태 확인
    const interval = setInterval(checkAttendanceStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAttendanceCheck = async () => {
    const user = getCurrentUser();
    if (!user || !user.employeeId) {
      setMessage('로그인이 필요합니다.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (checked) {
      setMessage('오늘은 이미 출석체크를 완료했습니다.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/attendance/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: user.employeeId })
      });

      if (res.ok) {
        const data = await res.json();
        setChecked(true);
        setMessage(`출석체크 완료! +${data.coinsEarned} KEP 획득!`);
        
        // 사용자 정보 업데이트
        const updatedUser = { ...user, coinBalance: data.newBalance };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // 부모 컴포넌트에 변경 알림
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => setMessage(''), 5000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMessage(errorData.error || '출석체크에 실패했습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (e) {
      console.error('Attendance check error:', e);
      setMessage('출석체크 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const user = getCurrentUser();

  if (!user || !user.employeeId) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-xl border border-kepco-blue/30 bg-slate-950/60 px-4 py-3">
      <button
        onClick={handleAttendanceCheck}
        disabled={checked || loading}
        className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
          checked
            ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
            : loading
            ? 'bg-kepco-blue/50 text-slate-300 cursor-wait'
            : 'bg-kepco-sky/20 text-kepco-sky hover:bg-kepco-sky/30 border border-kepco-sky/40'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-kepco-sky border-t-transparent"></span>
            처리 중...
          </span>
        ) : checked ? (
          <span className="flex items-center justify-center gap-2">
            <span>✓</span>
            오늘 출석체크 완료
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>📅</span>
            출석체크 (+10 KEP)
          </span>
        )}
      </button>
      {message && (
        <p
          className={`text-center text-xs ${
            message.includes('획득') || message.includes('완료')
              ? 'text-emerald-300'
              : 'text-rose-300'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AttendanceCheck;

