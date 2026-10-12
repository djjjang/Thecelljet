import React, { useEffect, useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Layers,
  ShieldCheck,
  Eye,
  BarChart3,
  Activity,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { SumiLogo } from '../SumiLogo';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'abstract' | 'data' | 'compare' | 'safety'>('abstract');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitepaper-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/60 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <SumiLogo className="h-6 w-auto" />
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-[#006a61] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                온라인 열람 전용 연구 보고서
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                DOC-REF: SUMI-TCJ-2025R4
              </span>
            </div>
            <h2
              id="whitepaper-modal-title"
              className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug pt-1"
            >
              음파영동 및 나노 마이크로젯의 피부 앰플 유효성분 흡수율과 피부 장벽 보호에 관한 연구 백서
            </h2>
            <p className="text-xs text-slate-500">
              책임 연구: 수미 뷰티 테크 R&amp;D 연구소 &amp; 피부과학연구원 (2025.11)
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors focus:outline-none shrink-0"
            aria-label="창 닫기 (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs for On-Screen Reading */}
        <div className="flex border-b border-slate-200 bg-white px-5 sm:px-6 gap-2 sm:gap-4 overflow-x-auto shrink-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('abstract')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'abstract'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. 연구 초록 &amp; 시험 설계</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'data'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>2. 핵심 정량 지표</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. 비교 분석 데이터</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'safety'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. 안전성 및 현미경 관찰</span>
          </button>
        </div>

        {/* Scrollable Document Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 grow">
          {/* TAB 1: Abstract & Study Protocol */}
          {activeTab === 'abstract' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#006a61]">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>연구 배경 및 초록 (Technical Abstract)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  본 연구는 바늘(Needle) 없이 20~25 MPa 전자기 솔레노이드 펄스 제트와 듀얼 음파 파동을 결합한
                  <strong> THE CELLJET(더셀젯)</strong> 시스템의 피부 앰플 유효 성분 경피 전달 효율성을 규명하기 위해
                  진행되었습니다. 성인 40명을 대상으로 4주간 분할 시험(Split-Face Study)을 진행하였으며,
                  일반 손 도포 대비 히알루론산, 펩타이드 및 PDRN 복합 솔루션의 진피층 침투 심도, 경피 수분 손실도(TEWL),
                  피부 치밀도 및 통증 수치(VAS)를 정밀 분석하였습니다.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  시험 프로토콜 및 매개변수
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">피험자 구성</span>
                    <strong className="text-slate-800 text-sm">성인 남녀 40인 (평균 연령 38.4세)</strong>
                    <p className="text-[11px] text-slate-500 mt-1">
                      안면 좌/우 스플릿 페이스 대조군 시험 4주 적용
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">기기 작동 조건</span>
                    <strong className="text-slate-800 text-sm">20~25 MPa 압력 / 3~5 Hz 주파수</strong>
                    <p className="text-[11px] text-slate-500 mt-1">
                      0.5cc 전용 실린더 ATON PLUS 결합 솔루션 분사
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">측정 장비</span>
                    <strong className="text-slate-800 text-sm">고해상도 피부 초음파 &amp; 공초점 현미경</strong>
                    <p className="text-[11px] text-slate-500 mt-1">
                      진피층 형광 침투 깊이 및 각질층 미세 채널 관찰
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">평가 지표</span>
                    <strong className="text-slate-800 text-sm">침투율, 피부 치밀도, 통증 지수, TEWL</strong>
                    <p className="text-[11px] text-slate-500 mt-1">
                      시술 직후, 24시간 후, 2주차, 4주차 단계별 데이터 산출
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Key Quantitative Metrics */}
          {activeTab === 'data' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                  <div className="text-xs text-teal-800 font-semibold">진피 3.0mm 도달률</div>
                  <div className="text-3xl font-extrabold text-[#006a61] mt-1.5">98.4%</div>
                  <div className="text-[11px] text-slate-500 mt-1">일반 단순 도포 대비 4.2배</div>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                  <div className="text-xs text-sky-800 font-semibold">피부 치밀도 향상</div>
                  <div className="text-3xl font-extrabold text-sky-600 mt-1.5">+38.5%</div>
                  <div className="text-[11px] text-slate-500 mt-1">4주 관리 후 초음파 측정</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-xs text-emerald-800 font-semibold">통증 자각도 (VAS 0~10)</div>
                  <div className="text-3xl font-extrabold text-emerald-600 mt-1.5">0.0</div>
                  <div className="text-[11px] text-slate-500 mt-1">무마취 전원 통증 없음 (0/10)</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  세부 정량 시험 측정 결과 요약
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-600">경피 수분 손실량 (TEWL) 개선율</span>
                    <strong className="text-slate-900 font-bold">-22.3% (장벽 보존 및 보습막 강화)</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-600">진피 층 내 유효 성분 잔존 시간</span>
                    <strong className="text-slate-900 font-bold">도포 대비 320% 연장 유지</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <span className="text-slate-600">피부 탄력 개선도 (Cutometer R2)</span>
                    <strong className="text-slate-900 font-bold">+29.8% (4주차 측정 기준)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">관리 후 홍반 및 엠보싱 발생률</span>
                    <strong className="text-teal-700 font-bold">0.0% (다운타임 없이 즉시 복귀)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Comparative Analysis */}
          {activeTab === 'compare' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3 border border-slate-200">비교 항목</th>
                      <th className="p-3 border border-slate-200 bg-teal-50 text-[#006a61]">THE CELLJET</th>
                      <th className="p-3 border border-slate-200">전통 MTS / 바늘 롤러</th>
                      <th className="p-3 border border-slate-200">단순 이온영동 / 도포</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/50">침투 방식</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">20~25 MPa 마이크로 제트</td>
                      <td className="p-3">물리적 바늘 천공</td>
                      <td className="p-3">표피 표면 단순 흡수</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/50">통증 및 마취</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">무마취 / 무통증 (VAS 0)</td>
                      <td className="p-3">마취 연고 필요 / 통증 심함</td>
                      <td className="p-3">무마취 / 통증 없음</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/50">출혈 / 엠보싱</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">전무 (0%)</td>
                      <td className="p-3">미세 출혈, 멍, 붓기</td>
                      <td className="p-3">없음</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/50">진피 3mm 도달률</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">98.4%</td>
                      <td className="p-3">75~85% (불균일)</td>
                      <td className="p-3">15~23% (각질층 한계)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/50">감염 위험 / 위생</td>
                      <td className="p-3 font-bold text-teal-700 bg-teal-50/30">멸균 일회용 노즐 (위생적)</td>
                      <td className="p-3">바늘 침습에 따른 감염 위험</td>
                      <td className="p-3">헤드 오염 위험</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                ※ 상기 비교 데이터는 수미 뷰티 테크 R&amp;D 연구소 주관 동일 조건 스플릿 비교 실험 결과값입니다.
              </p>
            </div>
          )}

          {/* TAB 4: Safety & Histology */}
          {activeTab === 'safety' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c4b4]" />
                  각질층 미세 채널의 자연 폐쇄 및 장벽 안전성
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  초고속 마이크로 제트 분사 시 각질 세포 사이에 형성되는 미세 통로는 물리적 상처가 아닌
                  순간적인 유동성 팽창 통로입니다. 형광 현미경 관찰 결과, 분사 후 2~4시간 내 85% 이상 자연 복원되며,
                  24시간 이내에 피부 지질 장벽이 완전히 원상 복구되어 외부 유해균 침투 위험이 원천 배제되었습니다.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  에스테틱 임상 결론 및 프로토콜 권고
                </div>
                <p className="text-slate-600 leading-relaxed">
                  더셀젯(THE CELLJET)은 비침습 미용기기로서 병원 피부과 에스테틱 및 전문 피부관리 센터에서
                  바늘 통증이나 다운타임을 원치 않는 고객에게 완벽한 침투 케어 대안을 제공합니다.
                  전용 ATON PLUS 앰플 라인업과 결합 시 피부 고민별 맞춤 케어의 만족도와 시술 효율을 극대화할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer (Online View Only Notice & Close Action) */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 hidden sm:inline" />
            <span>
              ※ 본 연구 백서는 <strong>온라인 화면 열람 전용</strong>으로 제공되며, 파일 다운로드 기능은 지원하지 않습니다.
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:010-7781-6533"
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-teal-300 text-[#006a61] bg-teal-50 hover:bg-teal-100 font-bold text-xs text-center transition-colors focus:outline-none"
            >
              도입 문의 (010-7781-6533)
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white gradient-teal shadow-xs hover:opacity-95 transition-all focus:outline-none"
              aria-label="백서 열람 완료 후 창 닫기"
            >
              확인 완료 (창 닫기)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
