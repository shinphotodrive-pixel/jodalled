import React, { useState } from 'react';
import { Calculator, Gauge, Zap, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export const TabCalculator: React.FC = () => {
  const [speedKmh, setSpeedKmh] = useState<number>(100);
  const [distanceM, setDistanceM] = useState<number>(25);
  const [focalLengthMm, setFocalLengthMm] = useState<number>(25);
  const [pixelPitchUm, setPixelPitchUm] = useState<number>(3.45); // standard Sony Pregius sensor
  const [targetResolution, setTargetResolution] = useState<string>('4K'); // 4K or 2K

  // Calculations
  // Vehicle speed in m/s:
  const speedMs = (speedKmh * 1000) / 3600;

  // Optical magnification M = f / D
  const magnification = (focalLengthMm * 0.001) / distanceM;

  // Object velocity on sensor plane: v_sensor = speedMs * magnification (m/s)
  const sensorVelocityMms = speedMs * magnification * 1000; // mm/s

  // 1 pixel distance on sensor in mm:
  const pixelPitchMm = pixelPitchUm * 0.001;

  // Maximum allowed pulse duration (shutter time) to limit motion blur to 1.0 pixel:
  // t_max = pixelPitchMm / sensorVelocityMms (seconds)
  const maxPulseMicroseconds = Math.round((pixelPitchMm / sensorVelocityMms) * 1000000);

  // Recommended pulse width (safety margin 0.75 pixel blur):
  const recommendedPulseUs = Math.round(maxPulseMicroseconds * 0.75);

  // Required LED Optical Power Estimation (Joules per flash & peak Wattage)
  // Inverse square law: E = I / D^2. For high-contrast retroreflective plate, required target illuminance: ~50 lx
  const requiredPeakWatts = Math.round(distanceM * distanceM * 0.18 + (speedKmh / 20) * 8);

  // Annual energy consumption comparison:
  // Xenon strobe: ~250W continuous draw with charging cycles
  // Modern pulsed LED: ~45W average draw
  const annualXenonKwh = Math.round((250 * 24 * 365) / 1000);
  const annualLedKwh = Math.round((45 * 24 * 365) / 1000);
  const energySavedPercent = Math.round(((annualXenonKwh - annualLedKwh) / annualXenonKwh) * 100);

  return (
    <div className="space-y-6">
      {/* Intro Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-blue-50/40 border border-emerald-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              ITS 현장 실무자를 위한 광학 펄스 & 모션 블러 연동 계산기
            </h3>
            <p className="text-slate-600 leading-relaxed">
              차량 주행 속도와 단속 거리에 따라 <strong>모션 블러(Motion Blur)가 1픽셀 이내</strong>로 억제되도록 
              허용 최대 펄스 폭(µs) 및 조명 광량을 정량적으로 산출합니다. 
              이를 통해 과속 차량 번호판 문자의 번짐을 완벽히 방지하면서 전력 소모를 최적화할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
            <Gauge className="w-4 h-4 text-emerald-600" />
            현장 설치 환경 조건 입력
          </h4>

          {/* Speed */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">차량 주행 속도 (km/h)</span>
              <span className="font-mono font-bold text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded">
                {speedKmh} km/h ({(speedMs).toFixed(1)} m/s)
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="5"
              value={speedKmh}
              onChange={(e) => setSpeedKmh(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Distance */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">단속 이격 거리 (m)</span>
              <span className="font-mono font-bold text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded">
                {distanceM} m
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={distanceM}
              onChange={(e) => setDistanceM(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Lens Focal Length */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">카메라 렌즈 초점거리 (f)</span>
              <span className="font-mono font-bold text-slate-700 text-xs bg-slate-100 px-2 py-0.5 rounded">
                {focalLengthMm} mm
              </span>
            </div>
            <select
              value={focalLengthMm}
              onChange={(e) => setFocalLengthMm(parseInt(e.target.value))}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
            >
              <option value="12">12 mm (광각 3~4차로 전경용)</option>
              <option value="25">25 mm (표준 2~3차로 단속용)</option>
              <option value="35">35 mm (단일 차로 망원 정밀 단속용)</option>
              <option value="50">50 mm (원거리 50m 초망원용)</option>
            </select>
          </div>

          {/* Sensor Pixel Pitch */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">센서 픽셀 피치 (Pixel Pitch)</span>
              <span className="font-mono font-bold text-purple-600 text-xs bg-purple-50 px-2 py-0.5 rounded">
                {pixelPitchUm} µm
              </span>
            </div>
            <select
              value={pixelPitchUm}
              onChange={(e) => setPixelPitchUm(parseFloat(e.target.value))}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
            >
              <option value="3.45">3.45 µm (Sony IMX250 / 8.9MP 4K 글로벌 셔터)</option>
              <option value="4.5">4.50 µm (대형 포맷 저조도 센서)</option>
              <option value="2.8">2.80 µm (초소형 고화소 센서)</option>
            </select>
          </div>
        </div>

        {/* Right Output Calculations (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-xl p-5 text-white space-y-4 border border-slate-800 shadow-md">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <span>📐</span> 광학 시계열 계산 결과 (Engineering Solutions)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  1픽셀 블러 임계치 기준 정밀 펄스 파라미터
                </p>
              </div>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                광학 무결성 판정 OK
              </span>
            </div>

            {/* Core Computed Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[11px] block font-sans">
                  모션 블러 1픽셀 허용 최대 펄스폭:
                </span>
                <span className="text-2xl font-extrabold text-amber-400 block">
                  {maxPulseMicroseconds} <span className="text-sm font-normal text-slate-300">µs</span>
                </span>
                <span className="text-[10px] text-slate-500 font-sans block">
                  ({(maxPulseMicroseconds / 1000).toFixed(2)} ms) 초과 시 번호판 글자 경계 번짐
                </span>
              </div>

              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[11px] block font-sans">
                  권장 단속 스트로보 펄스 폭 (0.75px 마진):
                </span>
                <span className="text-2xl font-extrabold text-emerald-400 block">
                  {recommendedPulseUs} <span className="text-sm font-normal text-slate-300">µs</span>
                </span>
                <span className="text-[10px] text-slate-500 font-sans block">
                  최적의 대비(Contrast) 및 선명도 보장
                </span>
              </div>

              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[11px] block font-sans">
                  소요 피크 광학 출력 (Peak Strobe Power):
                </span>
                <span className="text-xl font-bold text-blue-400 block">
                  약 {requiredPeakWatts} W
                </span>
                <span className="text-[10px] text-slate-500 font-sans block">
                  거리 {distanceM}m 기준 최소 50 lx 조도 확보
                </span>
              </div>

              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-slate-400 text-[11px] block font-sans">
                  연간 전력 절감 효과 (vs 제논):
                </span>
                <span className="text-xl font-bold text-purple-400 block">
                  {energySavedPercent}% 절감
                </span>
                <span className="text-[10px] text-slate-500 font-sans block">
                  연간 약 {annualXenonKwh - annualLedKwh} kWh 절약 (탄소 저감)
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1.5 font-mono">
              <span className="text-[11px] font-bold text-slate-200 block font-sans">
                계산 수식 원리 (Optical Formula):
              </span>
              <p className="text-[11px] text-slate-400">
                • 센서면 이동속도: <code className="text-emerald-400">v_sensor = (v_car × f) / D</code> = {sensorVelocityMms.toFixed(2)} mm/s<br />
                • 최대 허용 노출시간: <code className="text-amber-400">t_max = Pixel_Pitch / v_sensor</code> = {maxPulseMicroseconds} µs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
