import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, CheckCircle2, TrendingUp, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { BEFORE_AFTER_CASES, COMPARISON_DATA } from '../data/mockData';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = BEFORE_AFTER_CASES[selectedCaseIndex];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPos(Math.round(percentage));
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  // Keyboard navigation for accessible slider control
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <section id="clinical-results" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 mb-3">
            <Activity className="w-3.5 h-3.5 text-[#006a61]" />
            <span>CLINICAL EVIDENCE &amp; COMPARISON</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            스킨케어 관리 전후 비포 &amp; 애프터 대조
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            공인 피부임상연구기관의 4주 피부 변화 관찰 데이터입니다.
            슬라이더를 좌우로 드래그하거나 키보드 방향키로 조절하여, 케어 전후의 수분도 및 피부결 개선 지표를 직접 대조해 보세요.
          </p>
        </div>

        {/* Case Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="임상 사례 선택">
          {BEFORE_AFTER_CASES.map((c, idx) => {
            const isSelected = selectedCaseIndex === idx;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus:outline-none ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                사례 {idx + 1}: {c.title.split('및')[0]}
              </button>
            );
          })}
        </div>

        {/* Slider & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Draggable Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-slate-200"
              tabIndex={0}
              role="slider"
              aria-label="임상 비포/애프터 비교 슬라이더 (좌우 화살표 키로 조작 가능)"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPos}
              onKeyDown={handleKeyDown}
            >
              {/* After Image (Background layer) */}
              <img
                src={currentCase.afterImage}
                alt="케어 4주 후 애프터 결과"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#00c4b4] text-[#00201d] shadow-md z-10 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AFTER (케어 4주 후)
              </div>

              {/* Before Image (Clipped overlay layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt="케어 전 비포 상태"
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-sm shadow-md z-10">
                  BEFORE (케어 전)
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Center Handle Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-xl border-2 border-[#00c4b4] flex items-center justify-center pointer-events-auto">
                  <ArrowLeftRight className="w-4 h-4 text-[#006a61]" />
                </div>
              </div>

              {/* Instruction banner bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs pointer-events-none z-10">
                ← 좌우로 드래그하거나 방향키로 비교하세요 →
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Quantitative Clinical Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-100/70 px-2.5 py-1 rounded-md">
                  {currentCase.protocolUsed}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {currentCase.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  대상: {currentCase.patientInfo} · 케어 주기: {currentCase.treatmentCount}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-semibold text-slate-500">진피 수분 함유량</div>
                  <div className="text-2xl font-extrabold text-[#00c4b4] mt-0.5 flex items-baseline gap-1">
                    {currentCase.metrics.hydration}
                    <TrendingUp className="w-4 h-4 text-teal-500" />
                  </div>
                  <div className="text-[10px] text-slate-400">속건조 즉시 해소 지표</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-semibold text-slate-500">진피 치밀도 (탄력)</div>
                  <div className="text-2xl font-extrabold text-sky-600 mt-0.5 flex items-baseline gap-1">
                    {currentCase.metrics.elasticity}
                    <TrendingUp className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-[10px] text-slate-400">콜라겐 섬유 리모델링</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-semibold text-slate-500">모공 볼륨 축소율</div>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">
                    {currentCase.metrics.poreReduction}
                  </div>
                  <div className="text-[10px] text-slate-400">피부결 요철 정돈</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-semibold text-slate-500">색소/홍반도 개선</div>
                  <div className="text-2xl font-extrabold text-amber-600 mt-0.5">
                    {currentCase.metrics.pigmentReduction}
                  </div>
                  <div className="text-[10px] text-slate-400">안색 균일도 증가</div>
                </div>
              </div>

              {/* Case Summary */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">피부 케어 전문가 소견:</strong> {currentCase.summary}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <CheckCircle2 className="w-4 h-4 text-[#00c4b4]" />
                <span>공인 피부임상연구기관 평가 완료 (표준 시험 가이드라인 준수)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COMPREHENSIVE COMPARISON TABLE (Page 19 of User Manual) */}
        {/* ========================================================= */}
        <div className="mt-16 bg-[#faf8ff] rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-[#005049] border border-teal-300 mb-2">
              <Zap className="w-3.5 h-3.5 text-[#006a61]" />
              <span>TECHNOLOGY COMPARISON ANALYSIS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              기존 관리 방식 대비 더셀젯(THE CELLJET) 비교 분석
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              수술적 절개 및 고열 발생 레이저/에어젯/HIFU 장비와 비교했을 때,
              더셀젯은 통증 제로와 다운타임 제로로 즉각적인 리프팅과 피부 탄력 회복을 실현합니다.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="py-3.5 px-4 font-bold w-24 sm:w-32 border-r border-slate-200 text-center">
                      구분
                    </th>
                    <th className="py-3.5 px-4 font-bold border-r border-slate-200 text-slate-500">
                      수술 / 절개 리프팅
                    </th>
                    <th className="py-3.5 px-4 font-bold border-r border-slate-200 text-slate-600">
                      에어젯 / HIFU 고열 리프팅
                    </th>
                    <th className="py-3.5 px-4 font-extrabold bg-gradient-to-r from-teal-500/10 to-teal-500/20 text-[#006a61] border-l-2 border-teal-500">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span>더셀젯 (THE CELLJET) 파워 효과</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50 hover:bg-slate-50'}
                    >
                      <th className="py-3.5 px-4 font-bold text-slate-800 border-r border-slate-200 text-center bg-slate-50/80">
                        {row.category}
                      </th>
                      <td className="py-3.5 px-4 text-slate-500 border-r border-slate-200 leading-relaxed">
                        {row.surgery}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 border-r border-slate-200 leading-relaxed">
                        {row.airjetHifu}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#005049] bg-teal-50/40 border-l-2 border-teal-500 leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{row.theCelljet}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
