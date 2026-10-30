import React from 'react';
import { Lightbulb, Zap, Radio, Car, ArrowUpRight, TrendingDown, CheckCircle2, AlertTriangle } from 'lucide-react';

interface KpiCardsProps {
  onSelectTab?: (tab: string) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ onSelectTab }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. 광원 수명 */}
      <div 
        onClick={() => onSelectTab && onSelectTab('tab1')}
        className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none transition group-hover:bg-blue-100/60" />
        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            광원 수명 비교
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Lightbulb className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">50,000+</span>
            <span className="text-sm font-bold text-slate-700">시간</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 5~25배 연장
            </span>
            <span className="truncate">제논(2,000~10,000h) 대비</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>MTBF 신뢰도 보증</span>
          <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition">비교 분석 &rarr;</span>
        </div>
      </div>

      {/* 2. 전력 절감 */}
      <div 
        onClick={() => onSelectTab && onSelectTab('tab1')}
        className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition cursor-pointer flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none transition group-hover:bg-emerald-100/60" />
        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            전력 절감 효과
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">60% ~ 75%</span>
            <span className="text-sm font-bold text-slate-700">절감</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
              <TrendingDown className="w-3 h-3 mr-0.5" /> 저발열 설계
            </span>
            <span className="truncate">고전압 커패시터 충전 불필요</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>연간 탄소 배출 감축</span>
          <span className="text-emerald-600 font-semibold group-hover:translate-x-0.5 transition">효율 확인 &rarr;</span>
        </div>
      </div>

      {/* 3. 핵심 파장 */}
      <div 
        onClick={() => onSelectTab && onSelectTab('tab1')}
        className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/50 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none transition group-hover:bg-amber-100/60" />
        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            핵심 IR 파장 대역
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Radio className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-600 tracking-tight">740 / 850</span>
            <span className="text-sm font-bold text-slate-700">nm</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
              NIR 대역
            </span>
            <span className="truncate">CMOS 고양자효율(QE) 촬상</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>광과민성 간질(3~30Hz) 차단</span>
          <span className="text-amber-600 font-semibold group-hover:translate-x-0.5 transition">스펙트럼 &rarr;</span>
        </div>
      </div>

      {/* 4. 현장 번호판 인식률 */}
      <div 
        onClick={() => onSelectTab && onSelectTab('tab4')}
        className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-400 transition cursor-pointer flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none transition group-hover:bg-purple-100/60" />
        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            현장 번호판 인식률
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Car className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-purple-600 tracking-tight">99.2%</span>
            <span className="text-xs font-bold text-red-500 line-through">23.0%</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded text-[11px]">
              Smart IR + EXIR
            </span>
            <span className="truncate">반사필름 과노출 억제 시</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>악천후 산란 백스캐터 방지</span>
          <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition">시뮬레이터 &rarr;</span>
        </div>
      </div>
    </section>
  );
};
