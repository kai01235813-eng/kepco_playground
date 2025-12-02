import type React from 'react';
import { useState, useEffect } from 'react';

interface WalletInfo {
  address: string;
  isConnected: boolean;
}

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect
}) => {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    isConnected: false
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 연결 상태 확인
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          if (accounts.length > 0) {
            setWallet({
              address: accounts[0],
              isConnected: true
            });
            onConnect?.(accounts[0]);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Failed to check wallet connection:', e);
        }
      }
    };
    void checkConnection();

    // 계정 변경 감지
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setWallet({ address: '', isConnected: false });
          onDisconnect?.();
        } else {
          setWallet({ address: accounts[0], isConnected: true });
          onConnect?.(accounts[0]);
        }
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, [onConnect, onDisconnect]);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert(
        '메타마스크가 설치되어 있지 않습니다. 메타마스크를 설치해주세요.\n\nhttps://metamask.io/'
      );
      return;
    }

    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnected: true
        });
        setShowModal(false);
        onConnect?.(accounts[0]);
        alert(`지갑 연결 완료!\n주소: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Wallet connection error:', error);
      if ((error as { code?: number })?.code === 4001) {
        alert('메타마스크 연결이 거부되었습니다.');
      } else {
        alert('지갑 연결에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({ address: '', isConnected: false });
    setShowModal(false);
    onDisconnect?.();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-lg border border-cyan-300/50 bg-slate-900/60 px-4 py-2 font-medium text-cyan-200 transition hover:border-cyan-200 hover:bg-slate-900"
      >
        {wallet.isConnected ? `🦊 ${formatAddress(wallet.address)}` : '지갑연동'}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-panel relative w-96 max-w-[90vw] rounded-2xl border border-kepco-blue/50 p-6 text-xs">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
            <h3 className="mb-4 text-lg font-semibold text-slate-50">
              지갑 연결
            </h3>
            {wallet.isConnected ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
                  <p className="mb-2 text-[11px] text-slate-400">연결된 지갑</p>
                  <p className="font-mono text-sm font-semibold text-kepco-sky">
                    {wallet.address}
                  </p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="w-full rounded-lg border border-rose-500/60 bg-rose-500/20 px-4 py-2 font-semibold text-rose-300 transition hover:bg-rose-500/30"
                >
                  연결 해제
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-slate-300">
                  KEPCO SW Playground에 접속하려면 메타마스크 지갑을 연결해주세요.
                </p>
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="w-full rounded-lg bg-kepco-sky px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-kepco-sky/40 transition hover:bg-kepco-blue disabled:opacity-50"
                >
                  {loading ? '연결 중...' : '🦊 메타마스크 연결'}
                </button>
                {typeof window.ethereum === 'undefined' && (
                  <p className="text-center text-[11px] text-rose-300">
                    메타마스크가 설치되어 있지 않습니다.
                    <a
                      href="https://metamask.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-kepco-sky underline"
                    >
                      설치하기
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      on: (event: string, handler: (accounts: string[]) => void) => void;
      removeAllListeners: (event: string) => void;
    };
  }
}

export default WalletConnect;

