import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  Camera,
  CloudRain,
  Eye,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Zap,
  SplitSquareVertical,
  Activity
} from 'lucide-react';
import { SimulatorState } from '../types';

export const TabSimulator: React.FC = () => {
  const [weather, setWeather] = useState<'clear' | 'fog' | 'rain' | 'tunnel'>('clear');
  const [plateType, setPlateType] = useState<'film' | 'paint' | 'damaged'>('film');
  const [distance, setDistance] = useState<number>(25); // 10m to 50m
  const [vehicleSpeed, setVehicleSpeed] = useState<number>(80); // 30km/h to 180km/h
  const [smartIr, setSmartIr] = useState<boolean>(true);
  const [exir, setExir] = useState<boolean>(true);
  const [aiHdr, setAiHdr] = useState<boolean>(true);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [isStrobing, setIsStrobing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute optical metrics
  let powerPercent = 100;
  let pulseMs = 3.5;
  let isBlooming = false;
  let isBackscatter = weather === 'fog' || weather === 'rain';
  let isTunnelFlare = weather === 'tunnel';
  let recSuccess = true;
  let snrDb = 42;
  let statusMessage = '';

  // Optical physics calculation
  if (plateType === 'film') {
    // Retroreflective film has 20-30 cd/lx*m2
    if (!smartIr && !exir) {
      isBlooming = true;
      recSuccess = false;
      powerPercent = 100;
      pulseMs = 4.5;
      snrDb = 14;
      statusMessage = '반사필름 전반사로 인한 심각한 IR 과노출(Blooming) 번짐 - OCR 판독 불가';
    } else if (smartIr && !exir) {
      powerPercent = Math.round(35 + (distance / 50) * 20);
      pulseMs = 1.2;
      isBlooming = distance < 18; // Close distance still blooms without EXIR barrier
      recSuccess = !isBlooming;
      snrDb = isBlooming ? 22 : 36;
      statusMessage = isBlooming
        ? '근거리 진입으로 렌즈 내부 난반사 발생 (EXIR 필요)'
        : 'Smart IR 조광 제어로 번호판 포화 억제 성공';
    } else if (!smartIr && exir) {
      powerPercent = 65;
      pulseMs = 2.2;
      isBlooming = distance < 22;
      recSuccess = !isBlooming;
      snrDb = isBlooming ? 24 : 38;
      statusMessage = isBlooming
        ? '조광 미제어로 고정 광량 과다 유입 (Smart IR 필요)'
        : 'EXIR 격벽으로 수광부 헤이즈 억제 (경계 판독 가능)';
    } else {
      // Both Smart IR and EXIR active
      powerPercent = Math.round(25 + (distance / 50) * 25);
      pulseMs = 1.0;
      isBlooming = false;
      recSuccess = true;
      snrDb = 46;
      statusMessage = 'Smart IR + EXIR 복합 제어로 반사필름 초고해상도 클린 프레임 획득';
    }
  } else if (plateType === 'paint') {
    // Standard paint plate (3~12 cd)
    powerPercent = Math.round(55 + (distance / 50) * 35);
    pulseMs = 2.8;
    isBlooming = false;
    recSuccess = true;
    snrDb = 38;
    statusMessage = '표준 페인트 도장 번호판 정상 광량 수집 (인식률 99.4%)';
  } else {
    // Damaged/dirty plate
    powerPercent = Math.min(100, Math.round(75 + (distance / 50) * 25));
    pulseMs = 3.8;
    isBlooming = false;
    recSuccess = smartIr && aiHdr;
    snrDb = recSuccess ? 32 : 19;
    statusMessage = recSuccess
      ? '오염 번호판: AI HDR 국소 적응 게인 증폭으로 번호 복원 성공'
      : '오염 번호판: 조도 대비 부족으로 문자 세그먼트 손실';
  }

  // Weather backscatter penalty
  if (isBackscatter && !smartIr) {
    recSuccess = false;
    snrDb = Math.max(10, snrDb - 18);
    statusMessage = '수적/에어로졸 빛 산란(Backscatter)으로 렌즈 전면 백화 현상 (식별 불가)';
  } else if (isBackscatter && smartIr) {
    snrDb = Math.max(25, snrDb - 6);
  }

  // High speed motion blur calculation
  const motionBlurFactor = (vehicleSpeed / 100) * (pulseMs / 2.0);
  if (motionBlurFactor > 2.5 && !aiHdr) {
    recSuccess = false;
    statusMessage += ' (초고속 주행 모션 블러로 판독 실패)';
  }

  // Trigger flash burst
  const handleStrobeTrigger = () => {
    setIsStrobing(true);
    setTimeout(() => setIsStrobing(false), 300);
  };

  // Draw Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Dark Roadway Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Road Perspective lines
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height);
    ctx.lineTo(width * 0.35, height * 0.2);
    ctx.moveTo(width * 0.9, height);
    ctx.lineTo(width * 0.65, height * 0.2);
    ctx.stroke();

    // Road dashed center line
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)';
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Distance scale calculation (car size based on distance)
    const scale = Math.max(0.45, 1.25 - (distance - 10) * 0.018);
    const carW = 280 * scale;
    const carH = 130 * scale;
    const carX = width / 2 - carW / 2;
    const carY = height / 2 - carH / 2 + 15;

    // Vehicle silhouette
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(carX, carY, carW, carH, 12 * scale);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Vehicle Rear Window
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(carX + carW * 0.15, carY + carH * 0.1, carW * 0.7, carH * 0.35, 6 * scale);
    ctx.fill();

    // Tail Lights (Dark red)
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.roundRect(carX + 10 * scale, carY + carH * 0.45, 28 * scale, 16 * scale, 4 * scale);
    ctx.roundRect(carX + carW - 38 * scale, carY + carH * 0.45, 28 * scale, 16 * scale, 4 * scale);
    ctx.fill();

    // License Plate Bounding Box
    const plateW = 140 * scale;
    const plateH = 34 * scale;
    const plateX = width / 2 - plateW / 2;
    const plateY = carY + carH * 0.62;

    // Plate background
    if (plateType === 'film') {
      ctx.fillStyle = isBlooming ? '#ffffff' : '#f8fafc';
    } else if (plateType === 'paint') {
      ctx.fillStyle = '#e2e8f0';
    } else {
      ctx.fillStyle = '#94a3b8'; // Dirty/damaged
    }
    ctx.fillRect(plateX, plateY, plateW, plateH);

    // Plate Border
    ctx.strokeStyle = isBlooming ? '#ffffff' : '#0284c7';
    ctx.lineWidth = 2 * scale;
    ctx.strokeRect(plateX, plateY, plateW, plateH);

    // Plate Text or Blooming Blowout
    if (isBlooming) {
      // Intense radial flare
      const bloomRadius = 75 * scale;
      const flare = ctx.createRadialGradient(
        width / 2,
        plateY + plateH / 2,
        5,
        width / 2,
        plateY + plateH / 2,
        bloomRadius
      );
      flare.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      flare.addColorStop(0.35, 'rgba(255, 255, 255, 0.95)');
      flare.addColorStop(0.7, 'rgba(238, 242, 255, 0.6)');
      flare.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = flare;
      ctx.beginPath();
      ctx.arc(width / 2, plateY + plateH / 2, bloomRadius, 0, Math.PI * 2);
      ctx.fill();

      // Warning text
      ctx.fillStyle = '#ef4444';
      ctx.font = `bold ${Math.max(10, Math.round(12 * scale))}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('[IR BLOOMING 포화]', width / 2, plateY - 12 * scale);
    } else {
      // Crisp License Plate Text
      ctx.fillStyle = '#0f172a';
      ctx.font = `bold ${Math.max(12, Math.round(18 * scale))}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Korean Hologram Emblem on left if film
      if (plateType === 'film') {
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(plateX + 4 * scale, plateY + 4 * scale, 12 * scale, plateH - 8 * scale);
        ctx.fillStyle = '#0f172a';
      }

      ctx.fillText('123가 4567', width / 2 + (plateType === 'film' ? 6 * scale : 0), plateY + plateH / 2 + 1);

      // AI Bounding Box & OCR Detection Tag
      if (recSuccess) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(plateX - 4, plateY - 4, plateW + 8, plateH + 8);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`OCR: '123가 4567' [99.${Math.min(9, Math.round(snrDb))}%]`, plateX - 4, plateY - 8);
      }
    }

    // Weather backscatter rendering (Rain droplets or Fog haze)
    if (isBackscatter) {
      if (weather === 'rain') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        for (let i = 0; i < 60; i++) {
          const rx = (i * 19 + (distance * 7)) % width;
          const ry = (i * 23 + (distance * 11)) % height;
          ctx.beginPath();
          ctx.ellipse(rx, ry, 1, 6, Math.PI / 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Fog hazy layer
        const fogGrad = ctx.createLinearGradient(0, 0, width, height);
        fogGrad.addColorStop(0, 'rgba(203, 213, 225, 0.22)');
        fogGrad.addColorStop(1, 'rgba(148, 163, 184, 0.15)');
        ctx.fillStyle = fogGrad;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // Camera viewfinder HUD overlay
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1;
    // Corners
    const cornerSize = 16;
    ctx.beginPath();
    ctx.moveTo(12, 12 + cornerSize);
    ctx.lineTo(12, 12);
    ctx.lineTo(12 + cornerSize, 12);

    ctx.moveTo(width - 12 - cornerSize, 12);
    ctx.lineTo(width - 12, 12);
    ctx.lineTo(width - 12, 12 + cornerSize);

    ctx.moveTo(12, height - 12 - cornerSize);
    ctx.lineTo(12, height - 12);
    ctx.lineTo(12 + cornerSize, height - 12);

    ctx.moveTo(width - 12 - cornerSize, height - 12);
    ctx.lineTo(width - 12, height - 12);
    ctx.lineTo(width - 12, height - 12 - cornerSize);
    ctx.stroke();

    // Strobe flash burst effect
    if (isStrobing) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(0, 0, width, height);
    }

    // Diagnostics OSD text
    ctx.fillStyle = '#10b981';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`FPS: 60 | RAW IR BUFFER | DIST: ${distance}m | SPEED: ${vehicleSpeed}km/h`, 18, 18);

    ctx.textAlign = 'right';
    ctx.fillText(`SNR: ${snrDb}dB | PWM: 3,200Hz`, width - 18, 18);
  }, [
    weather,
    plateType,
    distance,
    vehicleSpeed,
    smartIr,
    exir,
    aiHdr,
    isBlooming,
    isBackscatter,
    recSuccess,
    snrDb,
    isStrobing
  ]);

  return (
    <div className="space-y-6">
      {/* Intro Overview Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-purple-50/40 border border-blue-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              현장 난제: 신형 반사필름 번호판 과노출(Blooming) & 악천후 빛 산란 억제 시뮬레이터
            </h3>
            <p className="text-slate-600 leading-relaxed">
              신형 재귀반사필름 번호판은 일반 페인트 번호판 대비 반사 성능(20~30 cd/lx·m²)이 6배 이상 높아, 
              기존 고정 광량 조명 조사 시 수광부 CMOS 센서 픽셀이 완전히 포화되어 글자가 하얗게 번지는 <strong>IR Blooming</strong>을 일으킵니다. 
              아래 시뮬레이터에서 기상, 번호판, 거리를 변경하고 <strong>Smart IR</strong>과 <strong>EXIR 격벽</strong> 기술을 적용해 반사광 억제 메커니즘을 실시간 검증해보세요.
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                현장 환경 및 광학 파라미터 제어
              </h4>
              <button
                onClick={() => {
                  setWeather('clear');
                  setPlateType('film');
                  setDistance(25);
                  setVehicleSpeed(80);
                  setSmartIr(true);
                  setExir(true);
                  setAiHdr(true);
                }}
                className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" /> 초기화
              </button>
            </div>

            {/* Weather Condition */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>기상 조건 (Weather Environment)</span>
                <span className="text-[11px] text-blue-600 font-normal">
                  {weather === 'clear' ? '유효 광량 99%' : '산란 발생'}
                </span>
              </label>
              <select
                value={weather}
                onChange={(e: any) => setWeather(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                <option value="clear">☀️ 맑은 밤 (Clear Night) - 대기 투과율 99%</option>
                <option value="fog">🌫️ 짙은 안개 (Heavy Fog) - 백스캐터 빛 산란</option>
                <option value="rain">🌧️ 집중 호우 (Rainstorm) - 빗방울 표면 난반사</option>
                <option value="tunnel">🚇 터널 진출입 (Extreme Contrast) - 고명암비</option>
              </select>
            </div>

            {/* License Plate Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>번호판 재질 (Plate Material)</span>
                <span className="text-[11px] text-purple-600 font-semibold font-mono">
                  {plateType === 'film' ? '28 cd/lx·m² (초고반사)' : '8 cd/lx·m² (일반)'}
                </span>
              </label>
              <select
                value={plateType}
                onChange={(e: any) => setPlateType(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                <option value="film">✨ 신형 재귀반사필름 (20~30 cd/lx·m² 초고반사 - 과노출 주원인)</option>
                <option value="paint">🚗 구형 페인트 도장 (3~12 cd/lx·m² 표준 반사)</option>
                <option value="damaged">⚠️ 오염 / 노후 훼손 번호판 (불균일 저반사 대비)</option>
              </select>
            </div>

            {/* Distance Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">단속 이격 거리 (Target Distance)</span>
                <span className="font-mono font-bold text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded">
                  {distance} m
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10m (초근거리 타들어감 위험)</span>
                <span>25m (표준 단속점)</span>
                <span>50m (원거리)</span>
              </div>
            </div>

            {/* Speed Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">차량 주행 속도 (Vehicle Speed)</span>
                <span className="font-mono font-bold text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded">
                  {vehicleSpeed} km/h
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                step="5"
                value={vehicleSpeed}
                onChange={(e) => setVehicleSpeed(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>30km/h (도심 생활)</span>
                <span>100km/h (고속도로)</span>
                <span>180km/h (초고속 단속)</span>
              </div>
            </div>

            {/* Optical Solution Checkboxes */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 block">광학 억제 솔루션 토글:</span>

              <label className="flex items-start space-x-2.5 text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition border border-slate-100">
                <input
                  type="checkbox"
                  checked={smartIr}
                  onChange={(e) => setSmartIr(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-slate-800 font-bold block">Smart IR (Auto-Dimming µs 펄스 제어)</span>
                  <span className="text-[11px] text-slate-500">
                    차량 거리 및 반사도에 맞춰 발광 듀티비를 마이크로초 단위로 축소
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition border border-slate-100">
                <input
                  type="checkbox"
                  checked={exir}
                  onChange={(e) => setExir(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-slate-800 font-bold block">EXIR 격벽 구조 (발광/수광 물리적 분리)</span>
                  <span className="text-[11px] text-slate-500">
                    커버 글래스 내부 난반사(Internal Reflection) 원천 차단
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition border border-slate-100">
                <input
                  type="checkbox"
                  checked={aiHdr}
                  onChange={(e) => setAiHdr(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-slate-800 font-bold block">AI HDR / Multi-Exposure Shutter Sync</span>
                  <span className="text-[11px] text-slate-500">
                    단일 프레임 내 초단노출 + 장노출 실시간 픽셀 합성으로 동적 명암비 극대화
                  </span>
                </div>
              </label>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleStrobeTrigger}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>단속 스트로보 1회 즉각 발광 테스트 (Flash Trigger)</span>
            </button>
          </div>
        </div>

        {/* Right Canvas & Telemetry Display (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-xl p-4 sm:p-5 text-white space-y-4 border border-slate-800 shadow-lg">
            {/* Camera Frame Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-slate-200 tracking-wide font-mono flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  IR 글로벌 셔터 CMOS 센서 프레임 버퍼 (Frame Simulation)
                </span>
              </div>

              {/* Status Badge */}
              <div className="self-start sm:self-auto">
                {isBlooming ? (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-bold bg-red-600 text-white shadow-sm animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" /> 과노출 판독 불가 (Blooming Fail)
                  </span>
                ) : isBackscatter && !smartIr ? (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-bold bg-amber-500 text-slate-950 shadow-sm">
                    <CloudRain className="w-3.5 h-3.5" /> 안개 빛 산란 판독 실패 (23% Baseline)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-bold bg-emerald-500 text-slate-950 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 정상 픽셀 수집 (인식률 99.2%)
                  </span>
                )}
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="flex items-center justify-center p-3 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={520}
                height={220}
                className="max-w-full h-auto rounded-lg shadow-md border border-slate-800/80"
              />
            </div>

            {/* Telemetry Readouts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-slate-800/90 p-2.5 rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">IR LED Output</span>
                <strong className={`text-sm ${powerPercent > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {powerPercent}% Power
                </strong>
                <span className="text-[10px] text-slate-500 block">동적 조광 가변</span>
              </div>

              <div className="bg-slate-800/90 p-2.5 rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Pulse Width</span>
                <strong className="text-sm text-emerald-400">{pulseMs} ms</strong>
                <span className="text-[10px] text-slate-500 block">셔터 동기화</span>
              </div>

              <div className="bg-slate-800/90 p-2.5 rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Plate Reflectance</span>
                <strong className="text-sm text-amber-400">
                  {plateType === 'film' ? 'High (28 cd)' : 'Normal (8 cd)'}
                </strong>
                <span className="text-[10px] text-slate-500 block">재귀반사도</span>
              </div>

              <div className="bg-slate-800/90 p-2.5 rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Backscatter Level</span>
                <strong className={`text-sm ${isBackscatter ? 'text-amber-400' : 'text-blue-400'}`}>
                  {isBackscatter ? 'High (Fog/Rain)' : 'Low (1%)'}
                </strong>
                <span className="text-[10px] text-slate-500 block">대기 산란율</span>
              </div>
            </div>

            {/* Diagnostic Message Box */}
            <div
              className={`p-3 rounded-lg border text-xs leading-relaxed ${
                isBlooming
                  ? 'bg-red-950/60 border-red-800 text-red-200'
                  : isBackscatter && !smartIr
                  ? 'bg-amber-950/60 border-amber-800 text-amber-200'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>광학계 실시간 진단 분석 로그:</span>
              </div>
              <p className="text-[11px]">{statusMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
