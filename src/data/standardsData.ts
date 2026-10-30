import { StandardCriterion } from '../types';

export const standardsData: StandardCriterion[] = [
  {
    id: 'ks-1',
    category: 'optical',
    categoryLabel: '광학 성능',
    item: '광속 유지율 및 장기 에이징',
    criterion: '정격 수명의 25%(최대 6,000시간) 도달 시 초기 광속의 70%(또는 50%) 이상을 반드시 유지',
    basis: 'KS C 7651 / 경찰청 무인단속장비 표준규격',
    complianceLevel: '필수 합격 기준',
    detailNote: '시간 경과에 따른 접합부(Junction) 열화로 인한 광손실을 측정하여 야간 번호판 식별 불량 사전 차단'
  },
  {
    id: 'ks-2',
    category: 'optical',
    categoryLabel: '광학 성능',
    item: '열적 안정화 조건',
    criterion: '전원 인가 후 최소 15분 대기, 시간당 온도 상승폭 5 K 이하 안정화 후 색온도 및 광학 측정',
    basis: 'KS A 0076 (광원 및 조명기구 광학 측정 표준)',
    complianceLevel: '측정 신뢰도 보증',
    detailNote: '초기 점등 시 열팽창 및 LED 순방향 전압 변동에 따른 측정 왜곡 방지 규정'
  },
  {
    id: 'ks-3',
    category: 'optical',
    categoryLabel: '광학 성능',
    item: '조광 제어 (Dimming)',
    criterion: '200Hz PWM 제어 시 광출력 주파수 60Hz 이상 유지, 정상 광도의 40~70% 안정적 디밍 출동',
    basis: '도로교통공단 성능인증지침',
    complianceLevel: '실시간 가변 통과',
    detailNote: '주변 조도 및 차로별 접근 차량 반사도에 맞춰 펄스 폭을 조절하여 운전자 눈부심 방지'
  },
  {
    id: 'ks-4',
    category: 'vibration',
    categoryLabel: '진동/내구성',
    item: '가속도 진동 시험',
    criterion: '10~150Hz 범위, 3축(X·Y·Z), 4.905 m/s² (0.5g) 가속도 진폭, 축당 20 스위프 사이클 후 기능 이상 없을 것',
    basis: 'KS C 0220 / 내환경 환경시험 규격',
    complianceLevel: '구조 무결성 인증',
    detailNote: '대형 화물차 주행 시 교량 및 가선 지주대에서 전달되는 저주파 고진폭 진동 환경 내구성 보증'
  },
  {
    id: 'ks-5',
    category: 'vibration',
    categoryLabel: '진동/내구성',
    item: '광학적 흔들림 및 조사각 편차',
    criterion: '진동 및 가혹 환경 시험 전/후 빔 이동 방향 상방향 1.0~1.5 mrad 이내 유지 (초정밀 조사 편차 극소화)',
    basis: '튜닝 광원 지주대 결합 기준',
    complianceLevel: '0.1° 이하 이탈 억제',
    detailNote: '단속 영역(차로 중심) 밖으로 조사각이 틀어져 위반 차량 포착 누락 및 인접 차로 간섭 방지'
  },
  {
    id: 'ks-6',
    category: 'electrical',
    categoryLabel: '전기 안전',
    item: '이동식 배터리 안전성 및 보호',
    criterion: '소비전류 오차 ±20% 이내, 셀 당 전압 1.0V 이하 과방전 시 자동 차단 및 사용자 경고 회로 즉각 작동',
    basis: '경찰청 이동식 무인단속장비 표준 규격',
    complianceLevel: '배터리 팩 보호 필수',
    detailNote: '야외 현장 이동식 장비의 리튬 배터리 폭발, 스웰링 방지 및 과전류 쇼트 차단 회로 탑재 의무'
  },
  {
    id: 'ks-7',
    category: 'environment',
    categoryLabel: '환경 신뢰성',
    item: '온습도 극한 가혹 시험',
    criterion: '동작 온도 -20℃ ~ +50℃, 보관 온도 -30℃ ~ +70℃, 상대습도 95%(40℃)에서 정상 발광 및 통신 유지',
    basis: '경찰청 외함 내환경 표준지침',
    complianceLevel: '동절기/혹서기 무중단',
    detailNote: '결로 방지를 위한 내장 고효율 히터 및 방열 핀, 브리더(Gore-tex 통기 멤브레인) 적용 여부 검증'
  },
  {
    id: 'ks-8',
    category: 'environment',
    categoryLabel: '환경 신뢰성',
    item: '외함 방수방진 등급',
    criterion: '조명 발광 유닛 및 카메라 하우징 IP66 이상 (고압 분사수 차단 및 방진 밀폐)',
    basis: 'KS C IEC 60529',
    complianceLevel: 'IP66 적합',
    detailNote: '도로변 비산 먼지, 매연 침투 방지 및 폭우 시 침수 방지 보증'
  }
];

export const lumenMaintenancePoints = [
  { hours: 0, label: '0시간 (초기)', rate: 100, standard: 70 },
  { hours: 1000, label: '1,000시간', rate: 96.5, standard: 70 },
  { hours: 2500, label: '2,500시간', rate: 91.2, standard: 70 },
  { hours: 4000, label: '4,000시간', rate: 86.4, standard: 70 },
  { hours: 6000, label: '6,000시간 (KS인증점)', rate: 81.3, standard: 70 },
  { hours: 8000, label: '8,000시간', rate: 77.2, standard: 70 },
  { hours: 10000, label: '10,000시간', rate: 74.0, standard: 70 }
];
