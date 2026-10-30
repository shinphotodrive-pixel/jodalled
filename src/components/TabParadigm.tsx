import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { AlertCircle, Eye, Sparkles, CheckCircle2, ShieldAlert, Zap, Clock, Info } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WavelengthInfo {
  wavelength: string;
  name: string;
  colorHex: string;
  visibility: string;
  sensorQE: string;
  description: string;
  trafficRole: string;
}

export const TabParadigm: React.FC = () => {
  const [selectedWavelength, setSelectedWavelength] = useState<string>('740');

  const chartData = {
    labels: [
      '수명 (×1000 시간)',
      '전력 효율성 (지수/100)',
      '연속발광 지연 (상대 지연율)',
      '펄스 제어 정밀도 (지수/100)',
      '발열 및 방열 안정성 (지수/100)'
    ],
    datasets: [
      {
        label: '구형 제논 (Xenon 방전관)',
        data: [5, 30, 95, 40, 35],
        backgroundColor: 'rgba(239, 68, 68, 0.75)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1.5,
        borderRadius: 4
      },
      {
        label: '최신 고출력 LED 스트로보',
        data: [50, 90, 5, 98, 92],
        backgroundColor: 'rgba(37, 99, 235, 0.75)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1.5,
        borderRadius: 4
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
          font: { size: 12, family: 'sans-serif', weight: 'bold' as const },
          boxWidth: 14,
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 10,
        cornerRadius: 8,
        titleFont: { size: 12, weight: 'bold' as const },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { font: { size: 11 }, stepSize: 20 },
        grid: { color: 'rgba(226, 232, 240, 0.6)' }
      },
      x: {
        ticks: { font: { size: 11 } },
        grid: { display: false }
      }
    }
  };

  const wavelengths: Record<string, WavelengthInfo> = {
    '450': {
      wavelength: '450nm',
      name: '가시광선 (청색광 / Blue)',
      colorHex: '#3b82f6',
      visibility: '인간 육안 100% 감지 (고위험 눈부심)',
      sensorQE: 'CMOS 센서 감도 60%',
      description: '단파장 산란(Rayleigh Scattering)이 극심하여 야간 주행 시 운전자 시야를 심각하게 교란하며 안개 시 백스캐터가 매우 큼.',
      trafficRole: '야간 단속 장비 사용 전면 금지 대역'
    },
    '550': {
      wavelength: '550nm',
      name: '가시광선 (녹황색 / Human Eye Peak)',
      colorHex: '#10b981',
      visibility: '인간 명소시 감도 100% 최대치',
      sensorQE: '센서 양자효율 85%',
      description: '인간 망막의 추상체 세포가 가장 민감하게 반응하는 파장으로, 야간 순간 발광 시 잔상(Afterimage) 현상이 장시간 남음.',
      trafficRole: '백색 가시광선 스트로보의 주성분이나 눈부심 위험으로 지양'
    },
    '740': {
      wavelength: '740nm',
      name: '근적외선 (NIR / Deep Red Threshold)',
      colorHex: '#e11d48',
      visibility: '희미한 붉은 광선 인지 (약 3% 잔여 감도)',
      sensorQE: '센서 양자효율(QE) 75~82% (초고감도)',
      description: 'CMOS 실리콘 센서의 물리적 양자효율이 가장 높으면서도 운전자 눈부심은 유의미하게 억제함. 단속 지점을 알리는 심리적 과속 억제 기능 병행.',
      trafficRole: '건아정보기술 KLED-STD-1000 등 국도/고속도로 다차로 핵심 채택'
    },
    '850': {
      wavelength: '850nm',
      name: '적외선 (IR / Semi-Covert)',
      colorHex: '#8b5cf6',
      visibility: '정면 직시 시 미세한 적색 발광 다이오드 점만 관측 (<0.1%)',
      sensorQE: '센서 양자효율 45~55%',
      description: '야간 운전자 시야에 사실상 완전히 불가시 영역. 운전자 돌발 반응 및 눈부심 사고 위험 0%. 광학 번호판 고명암비 흑백 촬영 특화.',
      trafficRole: '도심지 교차로, 어린이보호구역(스쿨존), 세오/유니시큐 올인원 표준'
    },
    '940': {
      wavelength: '940nm',
      name: '원적외선 (IR / Completely Covert)',
      colorHex: '#64748b',
      visibility: '인간 육안 감지율 0% (완전 비가시)',
      sensorQE: '센서 양자효율 15~25% (고출력 필요)',
      description: '야간 육안으로 전혀 보이지 않으나 센서 감도가 급격히 하락하여 2배 이상의 LED 발광 출력이 요구됨.',
      trafficRole: '군사/보안 및 초근거리 방범 특화 (단속용은 850nm 선호)'
    }
  };

  const currentWl = wavelengths[selectedWavelength];

  return (
    <div className="space-y-6">
      {/* Intro Overview Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-blue-950 text-sm sm:text-base mb-1">
              기술 패러다임 전환: 제논(Xenon) 방전관에서 초고휘도 고신뢰성 LED 스트로보로
            </h3>
            <p className="text-slate-600 leading-relaxed">
              기존 제논 조명은 강력한 순간 광량을 제공하지만, 수천 볼트 고전압 승압과 커패시터 재충전 지연(Recovery Time, 0.5~2초 소요)으로 인해 
              다차로 연속 과속 차량을 누락 없이 단속하기 불가능했습니다. 
              반면 현대 고출력 LED 스트로보는 <strong>마이크로초(µs) 단위 즉각 응답</strong>, <strong>50,000시간 이상의 장수명</strong>, 
              그리고 카메라 글로벌 셔터와 실시간 하드웨어 트리거 동기화가 가능하여 ITS 핵심 광학계의 표준으로 자리잡았습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts & Epilepsy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>📊</span> 제논 방전관 vs LED 어레이 5대 핵심 정량 비교
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                수명, 전력 효율, 충전 지연시간, 제어 정밀도, 발열 안전성 지표
              </p>
            </div>
            <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-100">
              LED 10배 우위
            </span>
          </div>

          <div className="h-[310px] w-full pt-1">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="p-2.5 bg-red-50/70 border border-red-100 rounded-lg">
              <span className="font-bold text-red-700 block">제논 조명 한계:</span>
              <span className="text-slate-600 text-[11px] leading-tight block mt-0.5">
                커패시터 방전 후 0.5~2.0초 재충전 필요 &rarr; 2차로 연속 위반 차량 누락
              </span>
            </div>
            <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-lg">
              <span className="font-bold text-blue-700 block">LED 스트로보 혁신:</span>
              <span className="text-slate-600 text-[11px] leading-tight block mt-0.5">
                지연 시간 &lt;1µs (재충전 지연 제로) &rarr; 100fps 초고속 연사 무제한 동기화
              </span>
            </div>
          </div>
        </div>

        {/* Right: Epilepsy Protocol & Wavelength */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                광과민성 발작 위험 프로토콜 & 파장 선택
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                운전자 안전 가이드라인 및 적외선(NIR/IR) 전면 전환 사유
              </p>
            </div>
            <span className="text-[11px] bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded border border-red-200">
              위험 대역 회피 의무
            </span>
          </div>

          {/* Epilepsy Risk Warning Box */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                광과민성 간질(Photosensitive Epilepsy) 유발 위험 대역
              </span>
              <span className="bg-red-500 text-white font-extrabold px-2 py-0.5 rounded text-[11px]">
                3Hz ~ 30Hz (특히 15~20Hz)
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              가시광선 스트로보가 1초에 15~20회 깜빡일 경우, 인구 약 4,000명 중 1명에게 뇌파 동조에 따른 급성 간질 발작 및 순간 시각 상실을 초래할 수 있습니다. 
              따라서 국가 표준은 <strong>PWM 주파수를 3,000Hz 이상으로 상향</strong>하고, 가시광선을 배제한 <strong>740nm/850nm 근적외선</strong> 조명을 의무화하고 있습니다.
            </p>
            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900 font-medium">
              <span>단속 스트로보 펄스 폭: <strong className="text-slate-900 font-bold">1.0 ~ 5.0 ms</strong></span>
              <span>PWM 구동 주파수: <strong className="text-slate-900 font-bold">&gt; 3,000 Hz (플리커 프리)</strong></span>
            </div>
          </div>

          {/* Interactive Wavelength Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>광학 파장 대역별 센서 특성 인터랙티브 분석:</span>
              <span className="text-[11px] font-normal text-slate-500">대역 버튼을 클릭하세요</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {Object.keys(wavelengths).map((wlKey) => {
                const item = wavelengths[wlKey];
                const isSelected = selectedWavelength === wlKey;
                return (
                  <button
                    key={wlKey}
                    onClick={() => setSelectedWavelength(wlKey)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">{wlKey}nm</span>
                    <span className="text-xs">{item.wavelength.replace('nm', '')}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Wavelength Detail Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs transition duration-200">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block shadow-sm"
                    style={{ backgroundColor: currentWl.colorHex }}
                  />
                  {currentWl.name} ({currentWl.wavelength})
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {currentWl.trafficRole}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                <div>
                  <span className="font-semibold text-slate-500">육안 시인성: </span>
                  <span className="font-medium text-slate-900">{currentWl.visibility}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">CMOS 감도: </span>
                  <span className="font-medium text-slate-900">{currentWl.sensorQE}</span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px] pt-1">
                {currentWl.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-dive Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>📑</span> 제논(Xenon) vs LED 광학계 정밀 기술 사양 대조표
          </h4>
          <span className="text-xs text-slate-500">ITS 현장 실무 측정치 기준</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-100/70 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-36">항목 구분</th>
                <th className="p-3 bg-red-50/50 text-red-900">구형 제논(Xenon) 방전관</th>
                <th className="p-3 bg-blue-50/50 text-blue-900">최신 고출력 LED 스트로보</th>
                <th className="p-3">ITS 현장 기술적 파급 영향</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">광원 수명 및 교체 주기</td>
                <td className="p-3 text-red-700 font-medium">2,000 ~ 10,000 시간 (약 6개월~1년 주기 교체)</td>
                <td className="p-3 text-blue-700 font-bold">50,000 ~ 100,000 시간 (반영구적, 5~10년 보증)</td>
                <td className="p-3 text-slate-600">도로 통제 비용 절감 및 지주대 고소 작업 안전사고 예방</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">연속 발광 재충전 시간</td>
                <td className="p-3 text-red-700 font-medium">0.5초 ~ 2.0초 (고압 커패시터 재충전 지연)</td>
                <td className="p-3 text-blue-700 font-bold">&lt; 1µs (반도체 PN접합 직접 구동, 지연 전무)</td>
                <td className="p-3 text-slate-600">다차로 연속 꼬리물기 및 초고속 차량 프레임 누락 0% 달성</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">소비 전력 및 전원부</td>
                <td className="p-3 text-red-700 font-medium">펄스 시 수 kW 급전, 평균 소비전력 250~400W</td>
                <td className="p-3 text-blue-700 font-bold">마이크로초 펄스 발광, 평균 50~120W (65% 절감)</td>
                <td className="p-3 text-slate-600">태양광/배터리 이동식 단속기 장시간 운용 가능</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">펄스 폭 미세 제어능력</td>
                <td className="p-3 text-red-700 font-medium">가스 방전 아크 유지 특성상 정밀 펄스 조절 불가</td>
                <td className="p-3 text-blue-700 font-bold">0.1ms 단위 초정밀 PWM 듀티 제어 가능</td>
                <td className="p-3 text-slate-600">차량 속도(60~200km/h)에 따른 모션 블러 최적 억제</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">환경 유해성 및 RoHS</td>
                <td className="p-3 text-red-700 font-medium">수은(Hg) 또는 고압 불활성 기체 봉입 (환경 폐기물)</td>
                <td className="p-3 text-blue-700 font-bold">RoHS 완전 준수, 무수은 친환경 소자</td>
                <td className="p-3 text-slate-600">파손 시 독성 기체 유출 위험 없음, 친환경 스마트시티 적합</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
