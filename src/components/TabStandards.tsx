import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Search, Filter, ShieldCheck, CheckCircle2, AlertCircle, FileText, Info } from 'lucide-react';
import { standardsData, lumenMaintenancePoints } from '../data/standardsData';
import { StandardCriterion } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const TabStandards: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCriterion, setSelectedCriterion] = useState<StandardCriterion | null>(standardsData[0]);

  const categories = [
    { id: 'all', label: '전체 규격' },
    { id: 'optical', label: '광학 성능' },
    { id: 'vibration', label: '진동/내구성' },
    { id: 'electrical', label: '전기 안전' },
    { id: 'environment', label: '환경 신뢰성' }
  ];

  const filteredData = standardsData.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.criterion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.basis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const chartData = {
    labels: lumenMaintenancePoints.map((p) => p.label),
    datasets: [
      {
        label: 'LED 광속 유지율 실측치 (%)',
        data: lumenMaintenancePoints.map((p) => p.rate),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'KS 최소 적합 기준선 (70%)',
        data: lumenMaintenancePoints.map((p) => p.standard),
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [6, 6],
        borderWidth: 2,
        fill: false,
        pointRadius: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 11, family: 'sans-serif', weight: 'bold' as const },
          boxWidth: 14,
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        min: 50,
        max: 105,
        ticks: { font: { size: 10 }, stepSize: 10 },
        grid: { color: 'rgba(226, 232, 240, 0.6)' }
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Overview Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50/40 border border-blue-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              대한민국 KS 국가표준 & 경찰청 무인교통단속장비 종합 검증 체계
            </h3>
            <p className="text-slate-600 leading-relaxed">
              도로교통공단 및 경찰청은 무인교통단속장비의 신뢰성을 담보하기 위해 -20℃~+50℃의 가혹한 야외 환경과 
              상시 진동 속에서도 초기 광도의 70% 이상을 유지하도록 규정하고 있습니다. 
              조사각 오차 1.5 mrad 이내, 3,000Hz 이상 무깜빡임(플리커 프리), 20 스위프 진동 시험 등 엄격한 적합 판정 매트릭스를 적용합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Table & Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Table & Filter */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span>📋</span> KS 및 경찰청 종합 시험 규격 검증 매트릭스
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  총 {standardsData.length}개 핵심 검사항목 (필터링: {filteredData.length}건)
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="규격 항목 / 근거 검색..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-40">평가 항목</th>
                    <th className="p-3">대한민국 규격 세부 기준 (KS / 경찰청)</th>
                    <th className="p-3 w-36">관련 근거</th>
                    <th className="p-3 w-24 text-center">합격 등급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => {
                      const isSelected = selectedCriterion?.id === row.id;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedCriterion(row)}
                          className={`cursor-pointer transition ${
                            isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-3">
                            <span className="text-blue-700 font-bold block">{row.item}</span>
                            <span className="text-[10px] text-slate-400">{row.categoryLabel}</span>
                          </td>
                          <td className="p-3 text-slate-800 leading-relaxed">{row.criterion}</td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">{row.basis}</td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {row.complianceLevel}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400">
                        검색 조건에 일치하는 규격 항목이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Active Selected Detail Box */}
            {selectedCriterion && (
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    선택 규격 실무 해설: {selectedCriterion.item}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{selectedCriterion.basis}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {selectedCriterion.detailNote}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Lumen Maintenance Line Chart */}
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>📈</span> 광속 유지율 추이 (시간 경과 기준)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                정격 6,000시간 에이징 시 70% 유지 의무
              </p>
            </div>

            <div className="h-[280px] w-full pt-1">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">6,000시간 시험점:</span>
                <span className="font-mono text-emerald-600 font-bold">81.3% 유지 (통과)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">KS 인증 최소 기준:</span>
                <span className="font-mono text-red-600 font-bold">70.0% 임계선</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 leading-tight border-t border-slate-200">
                알루미늄 다이캐스팅 방열 하우징과 고열전도성 메탈 PCB(MCPCB)를 채택하여 10,000시간 가동 시에도 74% 이상을 안정적으로 유지합니다.
              </p>
            </div>
          </div>

          {/* Quick Standards Checklist */}
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-sm space-y-2 text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              성능시험 통과 3대 필수 요건
            </span>
            <ul className="space-y-1.5 text-slate-300 text-[11px] pl-1">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span><strong>진동 후 각도 편차:</strong> 상/하/좌/우 1.5 mrad(약 0.086°) 이내 고정</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span><strong>열안정화:</strong> 15분 워밍업 후 1시간 당 온도 상승 &lt; 5 K 유지</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span><strong>외함 방수방진:</strong> IP66/IP67 인증으로 수분 유입 원천 차단</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
