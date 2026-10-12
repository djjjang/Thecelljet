import React, { useState } from 'react';
import { Zap, Radio, Gauge, Sparkles, CheckCircle2, ChevronRight, FileCheck } from 'lucide-react';
import { TECH_INNOVATIONS } from '../data/mockData';

interface TechInnovationsProps {
  onOpenWhitepaperModal: () => void;
}

export const TechInnovations: React.FC<TechInnovationsProps> = ({ onOpenWhitepaperModal }) => {
  const [activeTechId, setActiveTechId] = useState<string>(TECH_INNOVATIONS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-teal-600" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-sky-600" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  const currentTech = TECH_INNOVATIONS.find((t) => t.id === activeTechId) || TECH_INNOVATIONS[0];

  return (
    <section id="technology" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#006a61]" />
            <span>PATENTED CORE TECHNOLOGIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            더셀젯(THE CELLJET) 4대 핵심 원천 특허 기술
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            제조원 아이레이저랩(I LASER LAB)의 독자적 솔레노이드 공기압 제어와 핸드피스 원형 터치 모듈로,
            표피 손상과 통증 없이 유효 앰플을 피부 깊숙이 안정적으로 침투시키는 5세대 비침습 스킨케어 기술입니다.
          </p>
        </div>

        {/* 4 Cards Grid & Interactive Detail Pane */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TECH_INNOVATIONS.map((tech) => {
            const isActive = tech.id === activeTechId;
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => setActiveTechId(tech.id)}
                className={`p-6 rounded-2xl text-left transition-all border flex flex-col justify-between h-full focus:outline-none ${
                  isActive
                    ? 'border-teal-500 bg-teal-50/60 shadow-md ring-2 ring-teal-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
                aria-pressed={isActive}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-teal-600">
                      TECH {tech.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getIcon(tech.iconName)}
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {tech.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    {tech.patentNo}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className={isActive ? 'text-[#006a61]' : 'text-slate-500'}>
                    {isActive ? '상세 기술 확인 중' : '클릭하여 분석'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'translate-x-1 text-[#006a61]' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Focused Detailed Spec Panel */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-teal-600 text-white text-xs font-mono font-bold">
                  {currentTech.patentNo}
                </span>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {currentTech.subTitle}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                {currentTech.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentTech.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentTech.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Clinical Benefit Highlight */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">전문가 및 고객 핵심 편익</div>
                  <div className="text-xs text-slate-600 mt-0.5">{currentTech.clinicalBenefit}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl gradient-teal text-white flex items-center justify-center shadow-md">
                <FileCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">특허 공보 및 논문 데이터</h4>
                <p className="text-xs text-slate-500 mt-1">
                  SCI급 의학 저널 등재 논문 및 한국특허청 공식 등록 원문
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenWhitepaperModal}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all focus:outline-none"
                aria-label="특허 및 임상 백서 원문 열람"
              >
                연구 백서 및 도면 열람
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
