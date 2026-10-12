import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Droplets, Sparkles, FileText, Play, Camera, RefreshCw, Layers, Image as ImageIcon } from 'lucide-react';
import { CLINICAL_STATS } from '../data/mockData';
import { SumiLogo } from './SumiLogo';

const DEFAULT_HERO_IMAGE = '/thecelljet1.svg';
const STUDIO_BG_IMAGE = '/clean_clinic_bg.jpg';

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenWhitepaperModal: () => void;
  onScrollToSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDemoModal,
  onOpenWhitepaperModal,
  onScrollToSimulator,
}) => {
  const [heroImage, setHeroImage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sumi_custom_hero_image') || DEFAULT_HERO_IMAGE;
    }
    return DEFAULT_HERO_IMAGE;
  });

  const [viewMode, setViewMode] = useState<'composite' | 'studio' | 'clean'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sumi_hero_view_mode') as 'composite' | 'studio' | 'clean') || 'composite';
    }
    return 'composite';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setHeroImage(dataUrl);
      try {
        localStorage.setItem('sumi_custom_hero_image', dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroImage(DEFAULT_HERO_IMAGE);
    try {
      localStorage.removeItem('sumi_custom_hero_image');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeViewMode = (mode: 'composite' | 'studio' | 'clean') => {
    setViewMode(mode);
    try {
      localStorage.setItem('sumi_hero_view_mode', mode);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient bio-radiance glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute top-20 right-10 w-[420px] h-[420px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Micro Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 shadow-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-[#006a61]" />
                KC 적합등록 (R-R-IL6-SUMI THE CELLJET) · 특허 3종 등록
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-900 border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                무통증·무자극 케어 100% (Pain-Free Protocol)
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#006a61] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00c4b4]" />
                5TH-GEN NON-INVASIVE COSMETIC DELIVERY SYSTEM
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0F172A] tracking-tight leading-[1.3] break-keep font-['Plus_Jakarta_Sans']">
                바늘 없이 피부 깊숙이 전달하는 <br className="hidden sm:inline" />
                <span className="inline-block px-3.5 py-1 my-1 rounded-xl bg-gradient-to-r from-[#006a61] via-[#00524a] to-[#0284c7] text-white shadow-md font-black">
                  솔레노이드 공기압 마이크로젯
                </span>{' '}
                더셀젯
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal break-keep max-w-2xl">
                더셀젯(THE CELLJET)은 특허받은 <strong>솔레노이드 20~25 MPa 공기압 제트 및 듀얼 펄스 정밀 시스템</strong>으로,
                바늘 찔림의 통증·출혈·다운타임 없이 PDRN과 고농축 앰플을 피부 3mm 깊숙이 전달하는 
                <strong>전문가용 비침습 인체 유효성분 주입기</strong>입니다.
                병원 피부과 및 고급 피부 관리 센터에 최적화된 맞춤형 솔루션을 제공합니다.
              </p>
            </div>

            {/* Key Advantages Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00c4b4] shrink-0" />
                <span>주사 바늘 통증 0.0 · 멍과 엠보싱 자국 제로</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00c4b4] shrink-0" />
                <span>0.5cc 풀샷(Full-Shot) 전량 일정한 압력 투입</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00c4b4] shrink-0" />
                <span>최대 5 Hz 고속 펄스 &amp; 핸드피스 진동/LED 터치 제어</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#00c4b4] shrink-0" />
                <span>관리 즉시 메이크업 가능 · 일상 복귀 다운타임 0초</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white gradient-teal hover:opacity-95 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] focus:outline-none"
                aria-label="병원 및 에스테틱 센터 무료 장비 데모 시연 신청"
              >
                <Sparkles className="w-4 h-4" />
                <span>병원·클리닉 & 에스테틱 센터 데모 신청</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onScrollToSimulator}
                className="px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/80 rounded-xl shadow-xs hover:border-[#00c4b4] transition-all flex items-center justify-center gap-2 focus:outline-none"
                aria-label="장비 인터랙티브 가상 조작기 체험 섹션으로 이동"
              >
                <Play className="w-4 h-4 text-[#00c4b4] fill-[#00c4b4]" />
                <span>가상 장비 조작기 체험</span>
              </button>

              <button
                type="button"
                onClick={onOpenWhitepaperModal}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none"
                aria-label="학술 임상 백서 열람"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>임상 백서 열람</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Device Showcase & Interactive HUD Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-teal-500/15 via-sky-500/15 to-transparent blur-xl -z-10" />

              {/* Main Device Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl group">
                <div className="relative h-92 sm:h-[440px] w-full flex items-center justify-center px-4 pt-12 pb-16 bg-[#0a0f1d] overflow-hidden">
                  
                  {/* === BACKGROUND LAYER (The Studio Clinic Background Created for You) === */}
                  {viewMode === 'composite' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={STUDIO_BG_IMAGE}
                        alt="SUMI Luxury Clinic Studio Background"
                        className="w-full h-full object-cover object-center scale-105 filter blur-[0.6px] brightness-95"
                      />
                      {/* Gradient vignettes for depth and contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/90 via-[#060a14]/25 to-[#060a14]/40" />
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-10 bg-black/60 rounded-full blur-xl" />
                    </div>
                  )}

                  {viewMode === 'studio' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={STUDIO_BG_IMAGE}
                        alt="SUMI Full Studio Photograph"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/85 via-transparent to-[#060a14]/30" />
                    </div>
                  )}

                  {viewMode === 'clean' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#111827] via-[#0B101E] to-[#030712]">
                      <div className="absolute w-72 h-72 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
                      <div className="absolute w-60 h-60 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
                    </div>
                  )}

                  {/* === FOREGROUND DEVICE (Authentic Untouched THE CELLJET Equipment) === */}
                  {viewMode !== 'studio' && (
                    <img
                      src={heroImage}
                      alt="더셀젯(THE CELLJET) 프리미엄 에스테틱 뷰티 디바이스 원본 실물"
                      className="relative z-1 max-h-[88%] max-w-[92%] object-contain object-center drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)] group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  )}

                  {/* Subtle bottom edge gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060a14] via-[#060a14]/80 to-transparent pointer-events-none z-5" />

                  {/* Top Status Bar on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/95 px-2.5 py-1 rounded-lg shadow-sm flex items-center">
                        <SumiLogo className="h-6 w-auto" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-teal-500 text-white shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        THE CELLJET
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Direct Photo Upload / Replace button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="thecelljet1.png 원본 사진 파일 직접 불러오기"
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/95 hover:bg-white text-slate-800 shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                        aria-label="장비 원본 사진 직접 교체"
                      >
                        <Camera className="w-3 h-3 text-teal-600" />
                        <span className="hidden sm:inline">thecelljet1.png 사진 교체</span>
                      </button>

                      {heroImage !== DEFAULT_HERO_IMAGE && (
                        <button
                          type="button"
                          onClick={handleResetImage}
                          title="기본 원본 그래픽으로 복원"
                          className="p-1 rounded-lg text-[11px] bg-black/60 hover:bg-black/80 text-white/90 transition-colors"
                          aria-label="기본 원본으로 복원"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      )}

                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 text-white/90 backdrop-blur-md border border-white/20">
                        KC CERT
                      </span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="thecelljet1.png 원본 이미지 파일 선택"
                    />
                  </div>

                  {/* Bottom Image Info & View Mode Switcher */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-white text-xs font-semibold tracking-wide uppercase text-teal-300">
                        MUTO Impact Core V.3.4
                      </p>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        THE CELLJET 초음파·나노 마이크로젯 시스템
                      </h3>
                    </div>

                    {/* View Mode Switcher: Studio Background / Full Studio / Clean */}
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleChangeViewMode('composite')}
                        title="제작된 스튜디오 배경 위에 실물 장비 배치"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          viewMode === 'composite'
                            ? 'bg-teal-500 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        스튜디오 배경+실물
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeViewMode('studio')}
                        title="스튜디오 룸 전체 촬영 뷰"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          viewMode === 'studio'
                            ? 'bg-teal-500 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        스튜디오 전체
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeViewMode('clean')}
                        title="다크 클린 배경 뷰"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          viewMode === 'clean'
                            ? 'bg-teal-500 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        다크 클린
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Telemetry Bar */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">주파수</div>
                    <div className="font-bold text-[#006a61]">1.2 MHz</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">정량 분사</div>
                    <div className="font-bold text-sky-600">0.01 ml</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">통증 레벨</div>
                    <div className="font-bold text-emerald-600">ZERO (0.0)</div>
                  </div>
                </div>
              </div>

              {/* Floating Interactive Badge 1: Acoustic Frequency */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-teal-200/80 shadow-lg flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#00c4b4]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-800">음파 공진 주파수</div>
                  <div className="text-xs text-[#006a61] font-extrabold">1,200,000 Hz / sec</div>
                </div>
              </div>

              {/* Floating Interactive Badge 2: Hydration delivery */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-sky-200/80 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-800">진피 유효 흡수율</div>
                  <div className="text-xs text-sky-600 font-extrabold">+420% Efficacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fast Stats Grid */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CLINICAL_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-xs hover:border-teal-300 hover:shadow-md transition-all group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#006a61] font-['Plus_Jakarta_Sans'] group-hover:text-[#00c4b4] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
