import React, { useState } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { TabParadigm } from './components/TabParadigm';
import { TabStandards } from './components/TabStandards';
import { TabVendors } from './components/TabVendors';
import { TabSimulator } from './components/TabSimulator';
import { TabCalculator } from './components/TabCalculator';
import { TabProducts } from './components/TabProducts';
import { Rocket, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tab5' | 'tab6'>('tab1');

  const tabs = [
    { id: 'tab1', label: '1. 기술 패러다임 (제논 vs LED)' },
    { id: 'tab2', label: '2. KS & 경찰청 성능규격' },
    { id: 'tab3', label: '3. 주요 3사 장비 스펙 비교' },
    { id: 'tab4', label: '4. 현장 난제 & AI 시뮬레이터' },
    { id: 'tab5', label: '5. 펄스 & 모션블러 계산기' },
    { id: 'tab6', label: '6. 백색 조명 제품 (Alibaba Scene)' }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <Header currentTab={activeTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full space-y-6">
        {/* KPI Top Cards */}
        <KpiCards onSelectTab={(tabId: any) => setActiveTab(tabId)} />

        {/* Tab Navigation & Content Container */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Navigation Bar */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6">
            <nav className="flex space-x-2 sm:space-x-6 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-none py-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-1 border-b-2 transition whitespace-nowrap font-bold flex items-center gap-1.5 ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                    {tab.id === 'tab4' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Tab Panel */}
          <div className="p-4 sm:p-6 lg:p-7">
            {activeTab === 'tab1' && <TabParadigm />}
            {activeTab === 'tab2' && <TabStandards />}
            {activeTab === 'tab3' && <TabVendors />}
            {activeTab === 'tab4' && <TabSimulator />}
            {activeTab === 'tab5' && <TabCalculator />}
            {activeTab === 'tab6' && <TabProducts />}
          </div>
        </section>

        {/* Strategic Roadmap & Conclusion Box */}
        <section className="bg-slate-900 text-slate-300 rounded-xl p-5 sm:p-6 border border-slate-800 space-y-3.5 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-400" />
              결론 및 차세대 지능형 적응 광학(Adaptive Optics) 진화 방향
            </h3>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Future ITS 2030 Roadmap
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            무인교통단속장비용 LED 조명은 단순한 야간 보조 전등을 넘어 엣지 AI, 60GHz 레이더, 국정원 암호화 칩셋과 유기적으로 
            연동되는 ITS 지능형 광학 인프라의 핵심 축으로 완전히 진화했습니다. 
            향후 C-ITS 및 완전자율주행 시대를 맞아, 광학 시스템은 기상 센서 및 LiDAR 포인트 클라우드와 실시간 융합되어 
            차량 접근 1프레임 앞서 안개·우천·반사필름 특성을 선제 예측하고 PWM 발광 펄스를 마이크로초 단위로 미세 조율하는 
            <strong>지능형 적응 광학(Adaptive Optics)</strong>으로 거듭날 것입니다. 
            또한 국가 인증 규격 역시 고정 실험실 챔버 시험을 넘어 실도로 가혹 환경 기반의 동적 인증 프로토콜로 체질을 개선해야 할 것입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">초정밀 마이크로초 펄스</strong>
                <span className="text-[11px] text-slate-400">글로벌 셔터 노출과 1µs 이내 하드웨어 직결 동기화</span>
              </div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">AI 반사필름 과노출 억제</strong>
                <span className="text-[11px] text-slate-400">재귀반사 특성 사전 감지 및 Smart IR 자동 디밍</span>
              </div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">에너지 70% 절감 & 친환경</strong>
                <span className="text-[11px] text-slate-400">RoHS 완전 준수 무수은 LED 및 저발열 회로 구현</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-4 px-4 text-center text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>무인교통단속장비용 LED 조명 및 적외선 광학 시스템 기술 분석 보고서</span>
          <span className="text-slate-600 font-mono text-[11px]">
            Interactive ITS Engineering Dashboard | React & Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
