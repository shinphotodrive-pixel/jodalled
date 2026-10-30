import { VendorSpec } from '../types';

export const vendorsData: VendorSpec[] = [
  {
    id: 'geona',
    name: '건아정보기술',
    model: 'KLED-STD-1000',
    badge: '분리형 다차로 특화',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-300',
    themeColor: '#2563eb',
    summary: '8.9MP 초고해상도 4K 카메라 및 듀얼 레이저 비매설 검지기를 기반으로 최대 3개 차로를 동시 단속하는 대용량 분리형 고출력 LED 스트로보 시스템',
    radarScores: [98, 82, 90, 75, 80], // [다차로 커버리지, AI 센서 융합도, 파장/광량 제어, 설치/단일 함체성, 보안/암호화]
    specs: {
      systemType: '고정형 분리 거치식 (카메라, 조명, 제어기 분리)',
      cameraSensor: '8.9M Pixel (4096 × 2160, 4K 초고해상도 글로벌 셔터)',
      lightSource: '72개 High-Power LED 모듈 다면체 집적 어레이',
      wavelength: '740nm 근적외선 (NIR) - 센서 QE 극대화 + 은은한 경고 적색광',
      powerDrive: 'KMSTCTL2 전용 SMPS (24V / 150W 출력, 과전류 보호)',
      controlMech: '듀얼 레이저 궤적 예측 트리거 + AC220V 35kg 팬틸트 원격 제어',
      estimatedCost: '약 3,200만 ~ 3,800만 원 (지주대 및 설치비 포함)',
      keyFeature: '차로별 이격 조사 렌즈 설계로 다차선 동시 속도 위반 프레임 누락 0%'
    },
    highlights: [
      '8.9MP (4K) 카메라 연동 (단일 장비 최대 3차로 동시 감시)',
      '72개 High-Power LED 모듈 직접 집적 어레이',
      '740nm NIR 파장 채택으로 운전자 심리적 과속 억제 유도',
      '듀얼 레이저 비매설 센서와 마이크로초(µs) 단위 정밀 동기화'
    ],
    strengths: [
      '광폭 3차로 고속도로/간선도로에서 탁월한 수직/수평 균일도 제공',
      '원격 팬틸트 초점 및 각도 미세조정으로 유지보수 안전성 확보',
      'CMOS 센서의 740nm 양자 효율(QE) 활용으로 낮은 발광 전력으로도 선명한 번호판 획득'
    ],
    limitations: [
      '카메라, 조명기, 제어반이 분리되어 지주대 배선 및 설치 공사 기간 상대적 소요',
      '도심형 협소 전주 설치 시 공간 제약 발생 가능'
    ],
    recommendedSite: '고속국도, 일반국도 왕복 6~8차로 고속 주행 다차선 구간'
  },
  {
    id: 'seo',
    name: '주식회사 세오',
    model: 'STVM-SVSD60',
    badge: '엣지 AI 일체형',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    themeColor: '#9333ea',
    summary: '60GHz 밀리미터파 레이더와 온디바이스 AI, 하드웨어 암호화 칩셋을 단일 소형 함체에 집약한 차세대 스마트 올인원 단속 장비',
    radarScores: [88, 98, 95, 95, 99],
    specs: {
      systemType: 'All-In-One 단일 함체 일체형 (조명·카메라·레이더 내장)',
      cameraSensor: 'AI 내장 지능형 초고속 이미지 센서 (Dynamic Exposure)',
      lightSource: '고집적 스마트 매트릭스 LED (밀리초 단위 광량 조절)',
      wavelength: '850nm 스마트 적외선 (운전자 눈부심 완전 차단)',
      powerDrive: '고효율 통합 지능형 파워 보드 (저발열 무소음 방열 설계)',
      controlMech: '60GHz 레이더 3D 속도벡터 + AI 비전 실시간 융합 펄스 트래킹',
      estimatedCost: '약 3,600만 원 (조달 우수제품 기준)',
      keyFeature: 'CUBE-HIDE 하드웨어 암호화 칩셋 탑재로 단속 영상 위변조 원천 방지'
    },
    highlights: [
      'All-In-One 단일 함체로 단일 전주 1시간 내 신속 설치 가능',
      '60GHz 레이더 + 온디바이스 AI 매 프레임 광량 동적 자동 제어',
      'CUBE-HIDE 국정원 검증 필 암호화 알고리즘 탑재',
      '광학 노이즈 최소화로 암호화 압축 시 CPU 오버헤드 40% 절감'
    ],
    strengths: [
      '외함 배선 노출이 전혀 없어 악천후 침수 및 케이블 단선 고장율 제로',
      '실시간 차량 거리 및 반사율을 프레임별로 계산하여 과노출(Blooming) 사전 방지',
      '강력한 보안 암호화로 스마트시티 교통망 해킹 위험 완벽 차단'
    ],
    limitations: [
      '단일 함체 구조 특성상 대규모 4차선 이상 초광폭 차로 커버 시 복수 설치 권장',
      '내부 집적도가 높아 단일 컴포넌트 현장 수리보다 모듈 단위 교체 방식 채택'
    ],
    recommendedSite: '도심지 교차로, 어린이 보호구역(스쿨존), 신호·과속 복합 단속 구간'
  },
  {
    id: 'unisecu',
    name: '주식회사 유니시큐',
    model: 'UNI-SRE 시리즈',
    badge: '스마트시티 융합',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    themeColor: '#10b981',
    summary: 'LightHunter 초저조도 특화 광학 기술과 모터 구동 가변초점 스마트 IR을 결합하여 차량 번호판과 보행자 보호를 동시 지원하는 친환경 지능형 장비',
    radarScores: [80, 88, 88, 90, 82],
    specs: {
      systemType: 'IP66 밀폐형 스마트 뷸렛(Bullet) 일체형 하우징',
      cameraSensor: 'LightHunter 고감도 스타라이트 CMOS 센서 (1/1.8" 대형 포맷)',
      lightSource: 'High-Power EXIR 분리형 적외선 LED 어레이',
      wavelength: '850nm / 940nm 듀얼 밴드 옵션 (가변 줌 연동)',
      powerDrive: 'PoE+ / DC 12V 듀얼 전원 지원 (소비전력 28W 이하)',
      controlMech: 'CdS 포토다이오드 주변 조도 감지 + 2.7~13.5mm 전동 모터 줌',
      estimatedCost: '약 1,800만 ~ 2,400만 원 (보급형 및 스마트 횡단보도용)',
      keyFeature: 'Varifocal Smart IR - 렌즈 배율(Zoom)에 맞춰 빔 조사각 자동 동기화'
    },
    highlights: [
      '자율 환경 반응형 CdS 센서로 수동 조작 없는 무인 주야간 자동 전환',
      'IP66 완벽 방수방진 등급의 콤팩트 알루미늄 다이캐스팅 폼팩터',
      'LightHunter 초저조도 기술로 암흑 조건에서도 컬러/흑백 고명암비 보장',
      '스마트 횡단보도 보행자 검지 및 불법 주정차/속도 복합 활용성'
    ],
    strengths: [
      '줌 인/아웃 시 렌즈 화각과 IR 방사각이 1:1 연동되어 화면 중심부 타들어감 완벽 방지',
      'EXIR 구조로 유리창 내부 난반사(Internal Reflection) 원천 격리',
      '뛰어난 가격 경쟁력과 저전력 설계로 지자체 스마트시티 구축에 최적'
    ],
    limitations: [
      '고속 120km/h 이상 고속도로 과속 단속 전용보다는 도심 중저속 환경에 최적화',
      '다차로 광역 동시 단속 시 개별 차로용 카메라 증설 고려'
    ],
    recommendedSite: '스마트 횡단보도, 생활도로 30km/h 제한구역, 지자체 불법주정차/방범 융합 폴'
  }
];

export const radarDimensions = [
  '다차로 커버리지',
  'AI 센서 융합도',
  '파장/광량 제어',
  '설치/단일 함체성',
  '보안/암호화'
];
