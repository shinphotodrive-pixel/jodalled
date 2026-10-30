import React, { useState } from 'react';
import {
  ExternalLink,
  Search,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Tag,
  ArrowRight,
  Sun,
  Compass,
  BarChart3,
  ListFilter,
  Check,
  TrendingUp,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { sceneProductsData } from '../data/sceneProductsData';
import { SceneProduct } from '../types';

export const TabProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<SceneProduct>(sceneProductsData[0]);
  const [selectedLedFilter, setSelectedLedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'both' | 'table-focused' | 'cards-focused'>('both');
  const [sortField, setSortField] = useState<'model' | 'ledCount' | 'fluxLmNum' | 'powerWattsNum'>('fluxLmNum');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: '전체 제품군' },
    { id: 'high-power-strobe', label: '초고출력 스트로보' },
    { id: 'dual-hybrid', label: 'IR+화이트 듀얼 복합' },
    { id: 'housing-integrated', label: '하우징 일체형' }
  ];

  const filteredProducts = sceneProductsData
    .filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesLed =
        selectedLedFilter === 'all' ||
        (selectedLedFilter === '40plus' && p.ledCount >= 40) ||
        (selectedLedFilter === '20to39' && p.ledCount >= 20 && p.ledCount < 40) ||
        (selectedLedFilter === 'under20' && p.ledCount < 20);

      const matchesQuery =
        p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameKr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.officialCode && p.officialCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.targetApplications.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesLed && matchesQuery;
    })
    .sort((a, b) => {
      let valA = a[sortField] ?? 0;
      let valB = b[sortField] ?? 0;
      if (typeof valA === 'string') {
        return sortAsc
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const handleSort = (field: 'model' | 'ledCount' | 'fluxLmNum' | 'powerWattsNum') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for metrics
    }
  };

  return (
    <div className="space-y-6">
      {/* Supplier Banner & Alibaba Portal Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-xl p-5 sm:p-6 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Alibaba Global Supplier Catalog
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                Shantou Scene Electronics Co., Ltd. (Scene IR)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>💡</span> Shantou Scene Electronics 백색 조명(White Light Strobe) 제품별 사양 및 공급 규격
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              알리바바 공식 스토어(<strong>ledscene.en.alibaba.com</strong>)에 등록된 지능형 교통 시스템(ITS), 전자경찰(E-Police), 
              차량 번호판 및 운전자 안면 식별(ANPR/LPR) 전용 고성능 <strong>백색광(White LED) 스트로보 및 복합 보조 조명 장치</strong>의 
              모델별 상세 사양, 전원/광학 특성, 동기화 규격 및 직결 URL 링크를 제공합니다.
            </p>
          </div>

          {/* Quick Direct Link CTA Button */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <a
              href="https://ledscene.en.alibaba.com/productlist.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition hover:scale-[1.02]"
            >
              <span>알리바바 전제품 리스트 방문</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="http://www.infrared-ir.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <span>공식 웹사이트</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* NEW: Core Optical Benchmark Matrix Table (대시보드 비교 테이블) */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                주요 조명 규격(광속 · 소비전력 · 발광각) 종합 비교 대시보드
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              현장 도로 규격 설계 시 가장 중요한 <strong>광속(Luminous Flux)</strong>, <strong>평균 및 피크 소비전력(Watt)</strong>, 
              <strong>발광각(Beam Angle)</strong>, <strong>유효 조사거리</strong>를 모델별로 대조할 수 있는 분석 매트릭스입니다. (열 헤더 클릭 시 정렬)
            </p>
          </div>

          {/* Quick Summary Badges */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              최대 광속: <strong className="font-bold">≥ 5,800 lm</strong>
            </span>
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              평균 전력: <strong className="font-bold">20W ~ 45W</strong>
            </span>
            <span className="bg-blue-50 text-blue-900 border border-blue-200/80 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              발광각: <strong className="font-bold">10° ~ 60°</strong>
            </span>
          </div>
        </div>

        {/* Dashboard Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200 select-none">
              <tr>
                <th
                  onClick={() => handleSort('model')}
                  className="p-3.5 cursor-pointer hover:bg-slate-200/70 transition w-44"
                >
                  <div className="flex items-center gap-1">
                    <span>모델명 / 제품명</span>
                    {sortField === 'model' && <span>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
                <th className="p-3.5 w-24">분류</th>
                <th
                  onClick={() => handleSort('ledCount')}
                  className="p-3.5 cursor-pointer hover:bg-slate-200/70 transition w-24 text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>LED 배열</span>
                    {sortField === 'ledCount' && <span>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fluxLmNum')}
                  className="p-3.5 cursor-pointer hover:bg-slate-200/70 transition bg-amber-50/50 text-amber-950 w-36"
                >
                  <div className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>광속 (Luminous Flux)</span>
                    {sortField === 'fluxLmNum' && <span>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('powerWattsNum')}
                  className="p-3.5 cursor-pointer hover:bg-slate-200/70 transition bg-emerald-50/50 text-emerald-950 w-36"
                >
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>소비전력 (평균 / 피크)</span>
                    {sortField === 'powerWattsNum' && <span>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
                <th className="p-3.5 bg-blue-50/50 text-blue-950 w-36">
                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>발광각 (Beam Angle)</span>
                  </div>
                </th>
                <th className="p-3.5 w-32">조사 거리</th>
                <th className="p-3.5 w-32">트리거 동기화</th>
                <th className="p-3.5 w-24 text-center">알리바바 링크</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sceneProductsData.map((prod) => {
                const isSelected = activeProduct.id === prod.id;
                return (
                  <tr
                    key={prod.id}
                    onClick={() => setActiveProduct(prod)}
                    className={`cursor-pointer transition ${
                      isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Model */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {isSelected && <span className="w-1.5 h-4 bg-blue-600 rounded-full shrink-0" />}
                        <div>
                          <strong className="text-slate-900 text-xs block">{prod.model}</strong>
                          <span className="text-[11px] text-slate-500 font-normal line-clamp-1">{prod.nameKr}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3.5">
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {prod.categoryLabel}
                      </span>
                    </td>

                    {/* LED Count */}
                    <td className="p-3.5 text-center font-mono text-slate-700 font-bold">
                      {prod.ledCount}구
                    </td>

                    {/* Luminous Flux */}
                    <td className="p-3.5 bg-amber-50/30">
                      <div className="space-y-0.5">
                        <strong className="text-amber-900 font-extrabold text-xs block font-mono">
                          {prod.luminousFlux}
                        </strong>
                        <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, ((prod.fluxLmNum || 3000) / 6000) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Power */}
                    <td className="p-3.5 bg-emerald-50/30 font-mono">
                      <strong className="text-emerald-800 text-xs block font-bold">
                        {prod.averagePower}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">피크 {prod.peakPower}</span>
                    </td>

                    {/* Beam Angle */}
                    <td className="p-3.5 bg-blue-50/30">
                      <span className="text-blue-900 font-bold text-xs font-mono block">
                        {prod.beamAngle}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {prod.beamAngle.includes('10°') ? '원거리 스팟형' : '와이드 확산형'}
                      </span>
                    </td>

                    {/* Distance */}
                    <td className="p-3.5 font-mono text-slate-700">
                      {prod.effectiveDistance}
                    </td>

                    {/* Trigger */}
                    <td className="p-3.5 text-[11px] text-slate-600">
                      {prod.triggerSync.split('(')[0]}
                    </td>

                    {/* Alibaba Link */}
                    <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={prod.alibabaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded transition shadow-2xs"
                      >
                        <span>이동</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Insight */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">💡 실무 엔지니어링 가이드:</span>
            <span>고속도로 다차선(3차선)은 10° 렌즈·42구(S-SZN3142-W)가 필수이며, 도심 교차로·스쿨존은 28구(S-SZN3128-W) 또는 듀얼 하이브리드가 추천됩니다.</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px] shrink-0">클릭하여 우측 상세 스펙 뷰 연동</span>
        </div>
      </section>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Tag className="w-3 h-3 opacity-70" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="모델명, 규격, 적용처 검색..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
            />
          </div>
        </div>

        {/* LED Count Sub-filter */}
        <div className="flex items-center gap-2 text-xs pt-2 border-t border-slate-100">
          <span className="text-slate-500 font-medium text-[11px]">LED 구수(배열) 필터:</span>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { id: 'all', label: '전체' },
              { id: '40plus', label: '40구 이상 (대형 다차로)' },
              { id: '20to39', label: '20~39구 (표준 2차로)' },
              { id: 'under20', label: '20구 미만 (콤팩트/단일)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedLedFilter(f.id)}
                className={`text-[11px] px-2.5 py-0.5 rounded-full border transition ${
                  selectedLedFilter === f.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="ml-auto text-[11px] text-slate-400">
            총 {filteredProducts.length}개 모델 검색됨
          </span>
        </div>
      </div>

      {/* Main Content Layout: Product Grid + Active Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Product Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => {
              const isSelected = activeProduct.id === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => setActiveProduct(prod)}
                  className={`bg-white rounded-xl p-4 border-2 transition cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md relative ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/10'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {prod.categoryLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {prod.ledCount} LEDs
                      </span>
                    </div>

                    {/* Model & Name */}
                    <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">
                      {prod.model}
                    </h4>
                    {prod.officialCode && (
                      <span className="text-[10px] font-mono text-slate-400 block">
                        [{prod.officialCode}]
                      </span>
                    )}
                    <p className="text-xs font-medium text-slate-600 mt-1 line-clamp-2 leading-snug">
                      {prod.nameKr}
                    </p>

                    {/* Quick Specs Chips with Flux and Angle */}
                    <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] font-mono">
                      <div className="bg-amber-50/70 p-1.5 rounded border border-amber-100">
                        <span className="text-amber-800/70 block text-[9px] font-sans font-semibold">광속 (Flux)</span>
                        <strong className="text-amber-950 text-[10px]">{prod.luminousFlux.split(' ')[0]} lm</strong>
                      </div>
                      <div className="bg-emerald-50/70 p-1.5 rounded border border-emerald-100">
                        <span className="text-emerald-800/70 block text-[9px] font-sans font-semibold">소비전력</span>
                        <strong className="text-emerald-900 text-[10px]">{prod.averagePower}</strong>
                      </div>
                      <div className="bg-blue-50/70 p-1.5 rounded border border-blue-100">
                        <span className="text-blue-800/70 block text-[9px] font-sans font-semibold">발광각</span>
                        <strong className="text-blue-900 text-[10px]">{prod.beamAngle}</strong>
                      </div>
                      <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[9px] font-sans">조사거리</span>
                        <strong className="text-slate-800 text-[10px]">{prod.effectiveDistance}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={`font-bold ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                      {isSelected ? '선택됨 ✓' : '상세 스펙 확인 &rarr;'}
                    </span>
                    <a
                      href={prod.alibabaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded font-semibold transition"
                      title="알리바바 상품 리스트 열기"
                    >
                      <span>Alibaba URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
              검색 조건에 맞는 제품이 없습니다. 검색어를 변경해 보세요.
            </div>
          )}
        </div>

        {/* Right: Detailed Product Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 sticky top-20">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {activeProduct.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeProduct.ledCount} High-Power LEDs
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mt-1 tracking-tight">
                {activeProduct.model}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {activeProduct.nameKr}
              </p>
            </div>

            <a
              href={activeProduct.alibabaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition"
            >
              <span>알리바바 구매/문의</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Model Description & English naming */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed font-mono">
            <span className="text-slate-400 text-[10px] block font-sans">영문 모델명 및 코드:</span>
            <span className="text-slate-800 font-semibold block">{activeProduct.nameEn}</span>
            {activeProduct.officialCode && (
              <span className="text-[11px] text-blue-700 font-bold block mt-0.5">
                표준 제조 식별코드: {activeProduct.officialCode}
              </span>
            )}
          </div>

          {/* 3 Core Optical Highlights Badge Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
              <span className="text-amber-800 text-[10px] font-semibold block">광속 (Flux)</span>
              <strong className="text-amber-950 text-xs font-mono">{activeProduct.luminousFlux.split(' ')[0]} lm</strong>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              <span className="text-emerald-800 text-[10px] font-semibold block">소비전력</span>
              <strong className="text-emerald-950 text-xs font-mono">{activeProduct.averagePower}</strong>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
              <span className="text-blue-800 text-[10px] font-semibold block">발광각</span>
              <strong className="text-blue-950 text-xs font-mono">{activeProduct.beamAngle.split('/')[0]}</strong>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span>📋</span> 정밀 기술 파라미터 (Datasheet Specifications)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <tbody className="divide-y divide-slate-200">
                  {activeProduct.specsTable.map((spec, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-50">
                      <td className="p-2 font-semibold text-slate-600 bg-slate-50/70 w-36 text-[11px]">
                        {spec.label}
                      </td>
                      <td className="p-2 text-slate-900 font-medium text-[11px]">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-semibold text-slate-600 bg-slate-50/70 text-[11px]">
                      공식 URL 링크
                    </td>
                    <td className="p-2 text-[11px]">
                      <a
                        href={activeProduct.alibabaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        https://ledscene.en.alibaba.com/productlist.html
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Advantages / Features */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              핵심 광학 기술 및 장점
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              {activeProduct.keyFeatures.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Applications */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span>🎯</span> 권장 적용 현장 및 단속 시나리오
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeProduct.targetApplications.map((app, aIdx) => (
                <span
                  key={aIdx}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium"
                >
                  • {app}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Procurement Card */}
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-950 block">제조사 직거래 및 견적 문의</span>
              <span className="text-[11px] text-amber-800">
                Alibaba Trade Assurance 및 OEM/ODM 맞춤 렌즈 각도 제공
              </span>
            </div>
            <a
              href="https://ledscene.en.alibaba.com/productlist.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
            >
              <span>상세 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
