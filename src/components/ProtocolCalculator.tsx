import React, { useState } from 'react';
import { Sparkles, Calculator, Check, ArrowRight, ShieldCheck, Clock, AlertCircle, Droplets, Zap, Target } from 'lucide-react';

interface ProtocolCalculatorProps {
  onOpenDemoModal: (protocolSummary?: string) => void;
}

interface ConcernOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const CONCERNS: ConcernOption[] = [
  {
    id: 'sagging',
    label: '안면 주름 & 탄력 리프팅',
    description: '팔자주름, 턱선 V라인 처짐, 눈가·목 잔주름',
    icon: '✨',
  },
  {
    id: 'pigment',
    label: '기미 · 미백 · 색소침착',
    description: '광노화 톤 불균형, 칙칙한 안색, 잡티',
    icon: '🌟',
  },
  {
    id: 'dryness',
    label: '극건성 속당김 & 물광 보습',
    description: '수분 장벽 손상, 푸석거림, 각질 들뜸',
    icon: '💧',
  },
  {
    id: 'scalp-hair',
    label: '두피 환경 개선 & 모발 영양',
    description: '가늘어지는 모발, 두피 열감, 탈모 집중 관리',
    icon: '🌿',
  },
  {
    id: 'body-diet',
    label: '복부 다이어트 & 바디 슬리밍',
    description: '복부 군살, 팔뚝·허벅지 탄력, 림프 순환',
    icon: '🔥',
  },
  {
    id: 'redness',
    label: '민감 진정 & Y존 시크릿 케어',
    description: '자극받은 피부 급속 진정, 서혜부 림프 순환',
    icon: '🛡️',
  },
];

const TARGET_AREAS = [
  { id: 'face-neck', label: '얼굴 & 목 (FACE & NECK)', time: '5~10분' },
  { id: 'scalp', label: '두피 & 헤어라인 (SCALP)', time: '8~12분' },
  { id: 'body', label: '복부 & 바디 라인 (BODY)', time: '10~15분' },
  { id: 'special', label: 'Y존 & 시크릿 부위 (SPECIAL)', time: '5~8분' },
];

export const ProtocolCalculator: React.FC<ProtocolCalculatorProps> = ({ onOpenDemoModal }) => {
  const [selectedConcern, setSelectedConcern] = useState<string>('sagging');
  const [selectedArea, setSelectedArea] = useState<string>('face-neck');
  const [needleTolerance, setNeedleTolerance] = useState<'zero' | 'low'>('zero');

  // Computed recommendation based on authentic manual modes & ATON PLUS solutions
  const getRecommendation = () => {
    switch (selectedConcern) {
      case 'sagging':
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'FACE & NECK MODE (4~6단계 V라인 / 7~9단계 목주름)',
          ampoule: 'ATON PLUS FS (Firming & Elasticity 2ml × 6 vials)',
          duration: '부위당 5분 이내',
          frequencyCycle: '주 2~3회 집중 케어',
          benefits: '진피 치밀도 +42.5%, 팔자주름 리프팅, V라인 턱선 타이트닝',
          sessionSteps: [
            '1단계: 핸드피스 저주파 미세진동으로 표피 신경 이완 및 통증 분산 (1분)',
            '2단계: 4~5 Hz 듀얼 펄스로 ATON PLUS FS 앰플 0.5cc 전량 3mm 진피 침투 (3분)',
            '3단계: 630nm RED LED 광선 조사로 콜라겐 섬유 활성화 및 탄력 안착 (1분)',
          ],
        };
      case 'pigment':
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'FACE & NECK MODE (1~3단계 미백 / 4~6단계 안색)',
          ampoule: 'ATON PLUS CS (Clear Skin Solution 5ml × 6 vials)',
          duration: '부위당 5분 이내',
          frequencyCycle: '주 2회, 4주 완성 코스',
          benefits: '기미·잡티 색소 침착 -36.0%, 맑고 균일한 안색 투명도 완성',
          sessionSteps: [
            '1단계: 130~150µm 초미세 노즐로 나노 비타민C·PDRN 분사 통로 개방 (1분)',
            '2단계: 글루타치온 복합 ATON PLUS CS 앰플 0.5cc 스플래터 없이 투입 (3분)',
            '3단계: 630nm RED LED로 멜라닌 산화 스트레스 방어 및 광채 정돈 (1분)',
          ],
        };
      case 'dryness':
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'FACE & NECK MODE (1~3단계 수분 밀폐)',
          ampoule: 'ATON PLUS MS (Moisturizing Glow Solution 3ml × 6 vials)',
          duration: '부위당 5분 이내',
          frequencyCycle: '주 2회 권장 (속건조 즉시 해소)',
          benefits: '진피 수분 함유량 +248%, 세안 후 당김 없는 촉촉한 물광 피부',
          sessionSteps: [
            '1단계: 20~25 MPa 공기압으로 고분자 히알루론산 분자 분해 및 전달 (1분)',
            '2단계: PDRN·판테놀 B5 복합 세럼 0.5cc 풀샷 깊숙이 균일 투입 (3분)',
            '3단계: 미세진동 터치로 수분 보호막 밀착 및 광채 코팅 (1분)',
          ],
        };
      case 'scalp-hair':
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'SCALP MODE (1~3단계 헤어라인 / 4~6단계 정수리 / 7~9단계 경추)',
          ampoule: 'ATON PLUS HS (Hair Strengthening 2ml × 6 vials)',
          duration: '8~12분',
          frequencyCycle: '주 1~2회, 8주 집중 프로그램',
          benefits: '두피 혈행 촉진, 모낭 영양 공급, 모발 굵기 및 탄력 강화',
          sessionSteps: [
            '1단계: 경추 및 후두부 주요 혈자리 7~9단계 펄스로 혈행 이완 (3분)',
            '2단계: 정수리·헤어라인에 ATON PLUS HS 펩타이드 앰플 집중 제트 주입 (5분)',
            '3단계: 630nm LED 광선으로 두피 활력 및 모낭 대사 자극 (2분)',
          ],
        };
      case 'body-diet':
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'BODY MODE (1~3단계 림프절 / 4~6단계 국소 / 7~9단계 복부)',
          ampoule: 'ATON PLUS LS (Lifting & Firming Solution 5ml × 6 vials)',
          duration: '10~15분',
          frequencyCycle: '주 2~3회 (1회 케어로도 둘레 감소 체감)',
          benefits: '복부 둘레 감소, 팔뚝·등살 탄력 복원, 림프절 부종 완화',
          sessionSteps: [
            '1단계: 서혜부·액와 림프절 순환 유도 (1~3단계 단발 제어) (3분)',
            '2단계: 복부 군살 부위에 L-카르니틴·브로멜라인 ATON PLUS LS 집중 분사 (8분)',
            '3단계: 미세진동 + 고주파 캐비테이션으로 슬리밍 탄력막 고정 (3분)',
          ],
        };
      case 'redness':
      default:
        return {
          device: 'THE CELLJET (더셀젯)',
          primaryMode: 'SPECIAL MODE (1~3단계 민감 / 4~6단계 Y존 서혜부)',
          ampoule: 'ATON PLUS RS (Relief Solution 5ml × 6 vials)',
          duration: '5~8분',
          frequencyCycle: '주 2회 (민감 스트레스 완화)',
          benefits: '피부 붉은기 지수 -64.5% 즉각 진정, 피부 장벽 복원, 시크릿 순환',
          sessionSteps: [
            '1단계: 비열성 저온 음파 제트로 모세혈관 열감 급속 진정 (2분)',
            '2단계: 병풀·모과·PDRN 복합 ATON PLUS RS 무자극 정밀 흡수 (3분)',
            '3단계: 630nm RED LED로 피부 자생력 강화 및 보호막 형성 (2분)',
          ],
        };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="protocol-calc" className="py-16 lg:py-24 bg-[#faf8ff] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#006a61]" />
            <span>AI CUSTOM CARE PROTOCOL CALCULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            더셀젯 × 아톤플러스 맞춤 케어 프로토콜 설계
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            고객의 주요 피부 고민과 집중 부위를 선택하시면, 더셀젯의 4대 스마트 모드와 최적 호환되는
            아톤플러스(ATON PLUS) PDRN 앰플 및 권장 강도·펄스 단계를 실시간으로 계산해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Input Quiz */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-6">
            
            {/* Step 1: Skin Concern Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                STEP 1. 주요 케어 목적 및 피부 고민 선택
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONCERNS.map((c) => {
                  const isSelected = selectedConcern === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedConcern(c.id)}
                      className={`p-3 rounded-2xl border text-left transition-all focus:outline-none ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/80 shadow-xs ring-2 ring-teal-400/20'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="text-xl mb-1">{c.icon}</div>
                      <div className="font-bold text-xs text-slate-900">{c.label}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {c.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Area Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                STEP 2. 집중 케어 부위 선택
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TARGET_AREAS.map((a) => {
                  const isSelected = selectedArea === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelectedArea(a.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all focus:outline-none ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/80 font-bold text-[#006a61]'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold truncate">{a.label.split('(')[0]}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{a.time} 소요</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Needle Tolerance */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                STEP 3. 통증 민감도 및 당일 일상 복귀 필요 여부
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNeedleTolerance('zero')}
                  className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                    needleTolerance === 'zero'
                      ? 'border-teal-500 bg-teal-50 text-[#006a61] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  주사 바늘 공포증 100% (무통증 필수)
                </button>
                <button
                  type="button"
                  onClick={() => setNeedleTolerance('low')}
                  className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                    needleTolerance === 'low'
                      ? 'border-teal-500 bg-teal-50 text-[#006a61] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  당일 메이크업 필요 (다운타임 0초)
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Instant Recommendation Result Sheet */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#00c4b4]">
                  RECOMMENDED CARE PROTOCOL
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {rec.primaryMode}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pain-Free 0.0 무통증 보장
              </span>
            </div>

            {/* Protocol highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-400">적용 장비 시스템</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">{rec.device}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-400">예상 소요 시간</div>
                <div className="font-bold text-sm text-[#006a61] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {rec.duration}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-400">권장 케어 플랜</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">{rec.frequencyCycle}</div>
              </div>
            </div>

            {/* Optimal Ampoule Formulation */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-900 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-teal-600" />
                  매칭 전용 앰플 (ATON PLUS)
                </span>
                <span className="text-[10px] font-mono text-teal-700 bg-white px-2 py-0.5 rounded font-bold">
                  PDRN 펩타이드 포뮬러
                </span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                {rec.ampoule}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                솔레노이드 20~25 MPa 전자기 제트로 고점도 세럼을 로스 없이 진피 3mm까지 투입하여 {rec.benefits}
              </p>
            </div>

            {/* 3-Step Procedure Workflow */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                단계별 상세 케어 프로세스 (Care Steps)
              </h4>
              <div className="space-y-2">
                {rec.sessionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenDemoModal(
                    `${rec.primaryMode} + ${rec.ampoule} (${CONCERNS.find((c) => c.id === selectedConcern)?.label})`
                  )
                }
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-white gradient-teal shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none"
                aria-label="이 맞춤 케어 프로토콜로 데모 및 상담 신청하기"
              >
                <span>이 추천 프로토콜로 무료 데모 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
