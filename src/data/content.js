// 페이지 내용. 근거: 제조사 매뉴얼(SUMI THE CELLJET Cosmetic Delivery System User Manual 260613)
// ※ 핸드피스 LED: 매뉴얼은 레드(630nm)지만 2026-10-16 대표님 확인으로 블루 LED로 변경됨 (파장 미확인이라 숫자 표기 안 함)
// 표현 기준: 트렌드24 「더셀젯 표현 대조표」 — 질병·치료·의료 표현, 근거 없는 수치·후기 금지

export const stats = [
  { value: '20~25', unit: 'MPa', label: '분사 압력', sub: '전자기 제트 방식' },
  { value: '최대 5', unit: 'Hz', label: '연속 샷', sub: '바디 모드는 단발' },
  { value: '0.5', unit: 'cc', label: '전용 카트리지', sub: '끝까지 일정한 압력' },
  { value: '4 × 9', unit: '', label: '모드 × 강도 단계', sub: '모드마다 9단계' },
];

export const techs = [
  {
    no: '01',
    title: '듀얼 펄스 정밀 시스템',
    en: 'Dual Pulse Precision System',
    desc: '한 번의 분사를 두 번의 짧은 마이크로 버스트로 나눠 전달합니다. 앰플이 튀거나 흘러 버려지는 양을 줄이고, 분사량을 더 세밀하게 조절할 수 있습니다.',
    img: '/images/celljet-nozzle.webp',
    alt: '더셀젯 핸드피스 노즐과 전용 카트리지',
  },
  {
    no: '02',
    title: '풀샷 퍼포먼스',
    en: 'Full-Shot Performance',
    desc: '0.5cc 카트리지가 비어 가는 동안에도 압력이 일정하게 유지됩니다. 첫 샷부터 마지막 샷까지 같은 힘으로, 앰플을 남김없이 사용할 수 있습니다.',
    img: '/images/celljet-handpiece-use.webp',
    alt: '더셀젯 본체와 핸드피스를 손에 든 모습',
  },
  {
    no: '03',
    title: '핸드피스 터치 센서 (진동 · 블루 LED)',
    en: 'Vibration & LED Touch Control',
    desc: '핸드피스의 터치 센서로 저주파 진동과 블루 LED를 각각 켜고 끌 수 있습니다. 진동은 분사 순간의 부담감을 덜어 주고, LED 빛은 핸드피스가 피부에 제대로 닿았는지 확인하는 가이드가 됩니다.',
    img: '/images/celljet-touch.webp',
    alt: '더셀젯 핸드피스의 진동·LED 터치 센서',
  },
  {
    no: '04',
    title: '스마트 안정화 시스템',
    en: 'Smart Stabilization System',
    desc: '핸드피스 내부 온도와 전류를 실시간으로 확인하고, 이상이 감지되면 즉시 작동을 멈춥니다. 압력 점검 화면과 사용 기록(로그), PIN 잠금 기능으로 장비를 체계적으로 관리할 수 있습니다.',
    img: '/images/celljet-ui.webp',
    alt: '더셀젯 10.1인치 터치스크린 조작 화면',
  },
];

export const modes = [
  {
    key: 'FACE & NECK',
    name: '얼굴 · 목 모드',
    desc: '얇고 민감한 얼굴·목 피부에 맞춰, 앰플이 부드럽고 자연스럽게 퍼지도록 설계된 모드입니다.',
  },
  {
    key: 'SCALP',
    name: '두피 모드',
    desc: '두피 환경에 맞춰 보정된 모드로, 두피·모발 케어 앰플을 정확하게 전달합니다.',
  },
  {
    key: 'BODY',
    name: '바디 모드',
    desc: '넓은 부위와 점도가 높은 제형을 위한 모드입니다. 안전을 위해 트리거를 누를 때마다 1회씩만 분사됩니다.',
  },
  {
    key: 'SPECIAL',
    name: '스페셜 모드',
    desc: '고기능 앰플과 특수 제형을 섬세하고 정밀하게 전달하도록 맞춘 모드입니다.',
  },
];

export const modeNotes = [
  '모드마다 9단계 강도 조절',
  '초당 1~5회 연속 샷 설정',
  '자주 쓰는 설정 5개 저장 (메모리 1~5)',
  '전원을 켠 뒤 누적 샷 수 표시',
];

export const components = [
  { name: '본체', desc: '10.1인치 터치스크린, 4가지 모드 · 9단계 강도 · 메모리 5개' },
  { name: '핸드피스', desc: '자동 분사 건 타입, 진동 · 블루 LED 터치 센서, 수명 약 100만 샷' },
  { name: '전용 부속품', desc: '0.5cc 전용 실린지 · 어댑터 · 실린지 캡 (시중 제품과 호환 가능)' },
];

// 아톤플러스 앰플: 제품명·용량만 사실로 표기. 관리 목적은 순한 표현으로 (효능 주장 금지)
export const ampoules = [
  { code: 'CS', name: 'Clear Skin Solution', vol: '5ml × 6 vial', care: '맑은 피부톤 케어', color: '#5B6472' },
  { code: 'FS', name: 'Firming & Elasticity Solution', vol: '2ml × 6 vial', care: '탄력 케어', color: '#B08A2E' },
  { code: 'HS', name: 'Hair Strengthening Solution', vol: '2ml × 6 vial', care: '두피 · 모발 케어', color: '#1E2A5E' },
  { code: 'LS', name: 'Lifting & Firming Solution', vol: '5ml × 6 vial', care: '바디 탄력 케어', color: '#1F6FC5' },
  { code: 'MS', name: 'Moisturizing Glow Solution', vol: '3ml × 6 vial', care: '보습 · 윤기 케어', color: '#D9622B' },
  { code: 'RS', name: 'Relief Solution', vol: '5ml × 6 vial', care: '민감 피부 진정 케어', color: '#C62A35' },
];

export const safety = [
  '교육받은 전문가만 사용하는 전문가용 미용기기입니다.',
  '눈 주위·눈꺼풀 등 민감한 부위에는 사용하지 않으며, 얼굴 관리 시 보호 안경을 착용합니다.',
  '핸드피스 온도가 약 70℃에 이르면 자동으로 작동을 멈춥니다. 10~20분 쉬면 다시 사용할 수 있습니다.',
  '핸드피스 누적 100만 샷에 가까워지면 교체 안내가 표시됩니다.',
  '구입일로부터 1년간 무상 보증 (소모품 제외, 정식 유통 제품에 한함).',
];

export const certs = [
  {
    badge: 'KC',
    title: 'KC 적합등록',
    org: '전기 안전 · 전자파 적합성 (대한민국)',
    num: 'R-R-IL6-SUMI THE CELLJET',
    desc: 'K 60335-1 / K 60335-2-23 기준 전기 안전과 전자파 적합성을 갖춘 제품입니다.',
  },
  {
    badge: 'CE',
    title: 'CE (LVD · EMC)',
    org: '유럽 저전압 지침 · 전자파 적합성 지침',
    num: '2014/35/EU · 2014/30/EU',
    desc: '유럽의 전기 안전, 전자파 적합성 기준에 맞춰 만든 제품입니다.',
  },
  {
    badge: 'RoHS',
    title: 'RoHS',
    org: '유해물질 사용 제한 지침',
    num: '2011/65/EU',
    desc: '환경 유해물질 사용 제한 기준을 따릅니다.',
  },
  {
    badge: '특허',
    title: '특허 3건 등록',
    org: '대한민국 특허청 · 지식재산처',
    num: '제10-2290085호 · 제10-2290090호 · 제10-2931832호',
    desc: '니들프리(무바늘) 전달 방식에 관한 등록 특허입니다.',
  },
];

export const faqs = [
  {
    q: '더셀젯은 어떤 기기인가요?',
    a: '더셀젯(THE CELLJET)은 바늘 없이 솔레노이드 전자기 제트 방식으로 화장품 앰플을 피부에 전달하는 전문가용 미용기기(Cosmetic Delivery System)입니다. 국내 제조사 아이레이저랩(I LASER LAB)이 만듭니다.',
  },
  {
    q: '의료기기인가요?',
    a: '아닙니다. 더셀젯은 미용 목적의 기기로, 질병의 진단이나 치료를 위한 기기가 아닙니다. KC 적합등록(전기 안전, 전자파)과 CE(LVD, EMC) 기준을 갖추고 있습니다.',
  },
  {
    q: '어디에서, 누가 사용하나요?',
    a: '피부관리실, 에스테틱 센터, 클리닉 관리실 등에서 교육을 받은 전문가가 사용합니다. 도입하시면 사용 교육도 함께 안내해 드립니다.',
  },
  {
    q: '어떤 부위에 사용할 수 있나요?',
    a: '얼굴·목, 두피, 바디, 스페셜(고기능 앰플용) 4가지 모드가 있습니다. 모드마다 강도를 9단계로 조절할 수 있습니다. 단, 눈 주위와 눈꺼풀 같은 민감한 부위에는 사용하지 않습니다.',
  },
  {
    q: '어떤 앰플을 사용하나요?',
    a: '더셀젯 전용 아톤플러스(ATON PLUS) 앰플 6종(CS, FS, HS, LS, MS, RS)이 있습니다. 0.5cc 전용 실린지, 어댑터, 캡을 사용하며 시중 제품과도 호환됩니다.',
  },
  {
    q: '보증과 A/S는 어떻게 되나요?',
    a: '구입일로부터 1년간 전자부품, 전원부, 솔레노이드 등 주요 부품을 무상 보증합니다. 카트리지, 앰플, 케이블 같은 소모품은 제외되며, 정식 유통 경로로 구입한 제품에 한합니다. 핸드피스 수명은 약 100만 샷입니다.',
  },
  {
    q: '장비를 직접 보고 상담받을 수 있나요?',
    a: '네. 카카오톡 채널 「THE CELLJET」 채팅, 문자, 전화(010-7781-6533), 아래 상담 신청 양식 중 편한 방법으로 연락 주세요. 장비 시연과 도입 상담 일정을 잡아 드립니다.',
  },
];

// 전체 사양 (매뉴얼 Chapter 7 그대로)
export const specSheet = [
  ['제품명', 'Cosmetic Delivery System'],
  ['모델', 'SUMI THE CELLJET'],
  ['제조사 · 원산지', 'I LASER LAB (아이레이저랩) · 대한민국'],
  ['작동 방식', '솔레노이드 구동 전자기 제트'],
  ['분사 압력', '약 20~25 MPa'],
  ['펄스 지속 시간', '7~17 ms (36단계 제어)'],
  ['최대 연속 샷', '최대 5 Hz (바디 모드 1 Hz 단발)'],
  ['노즐 지름', '약 130~150 ㎛'],
  ['강도', '모드별 9단계'],
  ['메모리', '5개 설정 저장'],
  ['조작부', '10.1인치 컬러 LCD 터치스크린'],
  ['전원 입력', 'AC 100~240V, 50/60Hz'],
  ['최대 순간 소비전력', '360W'],
  ['무게', '약 4kg'],
  ['소음', '65dB 미만'],
  ['사용 환경', '10~30℃, 습도 80% 이하'],
  ['보호 기능', '스마트 안정화 · 온도 감시 (약 70℃ 자동 정지)'],
  ['핸드피스 수명', '약 100만 샷'],
  ['안전 등급', 'Class I / Type B'],
  ['인증', 'KC 적합등록(R-R-IL6-SUMI THE CELLJET), CE(LVD·EMC), RoHS'],
  ['보증', '구입일로부터 12개월 (소모품 제외)'],
];

// 앰플 주요 원료: 소개서 p.28~32에 적힌 원료명만 (효능 문구 없음). FS·MS는 소개서에 원료표가 없음
export const ampouleIngredients = {
  CS: ['PDRN (Sodium DNA)', 'Vitamin C Derivative', 'Niacinamide', 'Glutathione', 'Arbutin'],
  FS: ['PDRN (Sodium DNA)'],
  HS: ['PDRN (Sodium DNA)', 'PVM/MA Copolymer', 'Hydrolyzed Collagen', 'Acetyl Hexapeptide-8', 'Allantoin'],
  LS: ['PDRN (Sodium DNA)', 'Acetyl Hexapeptide-8', 'Beta-Glucan', 'Bromelain', 'Carnitine'],
  MS: ['PDRN (Sodium DNA)'],
  RS: ['PDRN (Sodium DNA)', 'Centella Asiatica Extract', 'Chaenomeles Sinensis Extract', 'Paeonia Lactiflora Extract'],
};

export const accessories = [
  { img: '/images/acc-syringe.webp', name: '전용 실린지 (0.5cc)', desc: '앰플을 담는 0.5cc 카트리지' },
  { img: '/images/acc-adapter.webp', name: '전용 어댑터', desc: '더셀젯 맞춤 전용 부속품' },
  { img: '/images/acc-cap.webp', name: '전용 실린지 캡', desc: '더셀젯 맞춤 전용 부속품' },
];

// 전후 비교 사례. ⚠️ 아래 항목이 모두 채워지고 consent가 true인 사례만 화면에 나온다
// 사진은 public/images/ba/ 에 넣는다. 기준: 02_고객사/더셀젯/전후사진_가이드.md
// 예시:
// {
//   area: '얼굴 (볼 · 턱선)',            // 관리 부위
//   before: '/images/ba/case1-before.webp',
//   after: '/images/ba/case1-after.webp',
//   sessions: '1회',                      // 관리 횟수
//   period: '관리 직후',                  // 전·후 촬영 간격 (예: 관리 직후, 4주 후)
//   shotDate: '2026-10-20',               // 촬영일
//   place: '',                            // 촬영 장소 (선택)
//   ampoule: 'ATON PLUS MS',              // 사용 앰플 (선택)
//   mode: 'FACE & NECK · 5단계',          // 모드·강도 (선택)
//   consent: true,                        // 본인 사진 게재 동의서 받음
// },
export const beforeAfter = [];
