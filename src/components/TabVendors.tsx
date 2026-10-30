import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { vendorsData, radarDimensions } from '../data/vendorData';
import { VendorSpec } from '../types';
import { Building2, Cpu, Check, AlertCircle, MapPin, DollarSign, Layers, ShieldCheck } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const TabVendors: React.FC = () => {
  const [selectedVendorId, setSelectedVendorId] = useState<'geona' | 'seo' | 'unisecu'>('geona');
  const [visibleVendors, setVisibleVendors] = useState<Record<string, boolean>>({
    geona: true,
    seo: true,
    unisecu: true
  });

  const selectedVendor = vendorsData.find((v) => v.id === selectedVendorId) || vendorsData[0];

  const radarData = {
    labels: radarDimensions,
    datasets: [
      {
        label: '건아정보기술 KLED-STD-1000',
        data: vendorsData[0].radarScores,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.22)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointRadius: 4,
        hidden: !visibleVendors.geona
      },
      {
        label: '주식회사 세오 STVM-SVSD60',
        data: vendorsData[1].radarScores,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.22)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointRadius: 4,
        hidden: !visibleVendors.seo
      },
      {
        label: '유니시큐 UNI-SRE 시리즈',
        data: vendorsData[2].radarScores,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.22)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointRadius: 4,
        hidden: !visibleVendors.unisecu
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 11, family: 'sans-serif', weight: 'bold' as const },
          boxWidth: 12,
          padding: 10
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 10,
        cornerRadius: 8
      }
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(226, 232, 240, 0.8)' },
        grid: { color: 'rgba(226, 232, 240, 0.8)' },
        pointLabels: {
          font: { size: 11, weight: 'bold' as const },
          color: '#334155'
        },
        suggestedMin: 50,
        suggestedMax: 100,
        ticks: {
          stepSize: 10,
          font: { size: 9 },
          backdropColor: 'transparent',
          color: '#94a3b8'
        }
      }
    }
  };

  const toggleVendorVisibility = (id: string) => {
    setVisibleVendors((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50/40 to-slate-50 border border-blue-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              국내 무인교통단속 시장 주도 3대 제조사 광학·시스템 아키텍처 비교
            </h3>
            <p className="text-slate-600 leading-relaxed">
              국내 ITS 조달 및 도로 현장에서는 설치 목적과 도로 환경에 따라 3대 기업의 특화 솔루션이 분할 채택되고 있습니다. 
              <strong>건아정보기술</strong>은 고속도로 4K 초고화소 다차로 분리형에 특화되어 있으며, 
              <strong>주식회사 세오</strong>는 60GHz 레이더와 국정원 암호화 칩셋을 집약한 엣지 AI 일체형을 선도하고, 
              <strong>주식회사 유니시큐</strong>는 LightHunter 저조도와 스마트 줌 연동 IR로 스마트시티 횡단보도 융합에 강점을 가집니다.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Vendor Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendorsData.map((vendor, idx) => {
          const isSelected = selectedVendorId === vendor.id;
          return (
            <div
              key={vendor.id}
              onClick={() => setSelectedVendorId(vendor.id)}
              className={`cursor-pointer bg-white p-4 sm:p-5 rounded-xl border-2 transition relative flex flex-col justify-between shadow-sm hover:shadow-md ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${vendor.badgeColor}`}>
                    {vendor.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">{vendor.name}</h4>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{vendor.model}</p>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                  {vendor.summary}
                </p>

                <ul className="mt-3.5 space-y-1.5 text-[11px] text-slate-700">
                  {vendor.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">세부 스펙 분석</span>
                <span className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                  {isSelected ? '선택됨 ✓' : '클릭하여 선택 &rarr;'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Radar Chart & Detailed Spec Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Radar Chart Column */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>🎯</span> 3사 광학·시스템 종합 성능 레이더 비교
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                5대 핵심 지표: 커버리지, 센서융합, 광량제어, 일체형설치, 보안암호화
              </p>
            </div>
          </div>

          {/* Toggle buttons for radar datasets */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-[11px] text-slate-400 self-center">필터:</span>
            {vendorsData.map((v) => (
              <button
                key={v.id}
                onClick={() => toggleVendorVisibility(v.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold border transition ${
                  visibleVendors[v.id]
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          <div className="h-[320px] w-full pt-1">
            <Radar data={radarData} options={radarOptions} />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">분석 시사점:</strong> 건아정보기술은 광역 다차로 촬영에서 98점 최고점, 
            세오는 엣지 AI 융합도(98점) 및 암호화 보안(99점)에서 독보적이며, 
            유니시큐는 콤팩트 규격과 스마트 횡단보도 설치 적합도에서 균형잡힌 성능을 발휘합니다.
          </div>
        </div>

        {/* Selected Vendor Detail Inspector */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{selectedVendor.name}</h3>
                <span className="text-xs font-mono text-slate-500 font-bold">{selectedVendor.model}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">상세 광학 사양 및 현장 운용 가이드</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${selectedVendor.badgeColor}`}>
              {selectedVendor.badge}
            </span>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">구조 형태</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.systemType}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">카메라 센서</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.cameraSensor}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">광원 및 어레이</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.lightSource}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">발광 파장</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.wavelength}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">전원 및 구동</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.powerDrive}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono">도입 예산 범위</span>
              <strong className="text-slate-800 text-[11px]">{selectedVendor.specs.estimatedCost}</strong>
            </div>
          </div>

          {/* Core Mechanism */}
          <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-lg text-xs space-y-1">
            <span className="font-bold text-blue-900 block flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              핵심 동기화 메커니즘
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              {selectedVendor.specs.controlMech}
            </p>
          </div>

          {/* Strengths & Limitations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="space-y-1.5 bg-emerald-50/50 p-3 rounded-lg border border-emerald-200/70">
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 핵심 강점 (Strengths)
              </span>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {selectedVendor.strengths.map((str, sIdx) => (
                  <li key={sIdx}>• {str}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-1.5 bg-amber-50/50 p-3 rounded-lg border border-amber-200/70">
              <span className="font-bold text-amber-900 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> 고려사항 (Limitations)
              </span>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {selectedVendor.limitations.map((lim, lIdx) => (
                  <li key={lim + lIdx}>• {lim}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Deployment Site */}
          <div className="p-2.5 bg-slate-900 text-white rounded-lg text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">최적 권장 설치 장소</span>
              <span className="font-bold text-slate-100">{selectedVendor.recommendedSite}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
