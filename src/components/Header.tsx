import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Download, Sliders, RefreshCw, Cpu } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onResetSimulator?: () => void;
  onPrintReport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetSimulator, onPrintReport }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [syncCount, setSyncCount] = useState<number>(1429);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('ko-KR', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(() => {
      updateTime();
      setSyncCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 border border-blue-400/30">
              <Activity className="w-5 h-5 text-blue-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  무인교통단속장비 광학·조명 기술분석 대시보드
                </h1>
                <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  ITS Pro Spec
                </span>
              </div>
              <p className="text-xs text-slate-400">
                지능형 교통 시스템(ITS) LED 스트로보 & 적외선 광학 아키텍처 기술 보고서
              </p>
            </div>
          </div>

          {/* Right Status & Actions */}
          <div className="flex items-center flex-wrap justify-center gap-2">
            {/* Live Status Badge */}
            <div className="flex items-center space-x-2 text-xs bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-slate-200 font-medium font-mono">ITS 규격 v2.4 연동</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-mono text-[11px]">{timeStr || 'LIVE'}</span>
            </div>

            {/* Quick action: Print/Export Summary */}
            <button
              onClick={onPrintReport || (() => window.print())}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition shadow-sm font-medium"
              title="기술 분석 보고서 요약 인쇄"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>보고서 출력</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
