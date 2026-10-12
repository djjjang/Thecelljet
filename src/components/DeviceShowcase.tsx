import React, { useState, useRef } from 'react';
import { 
  Cpu, CheckCircle2, Sliders, Sparkles, Camera, RefreshCw, Layers, ShieldCheck, 
  Droplets, Flame, Sparkle, HeartHandshake, Check, ChevronRight, Box, Package
} from 'lucide-react';
import { DEVICES, ATON_PLUS_SOLUTIONS } from '../data/mockData';
import { DeviceSpec, AtonPlusSolution } from '../types';
import { SumiLogo } from './SumiLogo';

const CLEAN_CLINIC_BG = '/clean_clinic_bg.jpg';

interface DeviceShowcaseProps {
  onOpenDemoModal: (deviceName?: string) => void;
  onOpenDeviceDetailModal: (device: DeviceSpec) => void;
}

export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({
  onOpenDemoModal,
  onOpenDeviceDetailModal,
}) => {
  const [activeDeviceIndex, setActiveDeviceIndex] = useState(0);
  const [selectedAmpouleId, setSelectedAmpouleId] = useState<string>(ATON_PLUS_SOLUTIONS[0].id);
  const [showcaseTab, setShowcaseTab] = useState<'device' | 'solutions' | 'accessories'>('device');

  // Custom equipment image replacement state
  const [customDeviceImages, setCustomDeviceImages] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sumi_custom_device_images');
        return stored ? JSON.parse(stored) : {};
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeDevice = DEVICES[activeDeviceIndex] || DEVICES[0];
  const activeAmpoule = ATON_PLUS_SOLUTIONS.find((a) => a.id === selectedAmpouleId) || ATON_PLUS_SOLUTIONS[0];

  const currentDeviceImage =
    customDeviceImages[activeDevice.id] ||
    (activeDevice.id === 'the-celljet'
      ? (typeof window !== 'undefined' && localStorage.getItem('sumi_custom_hero_image')) || activeDevice.imageUrl
      : activeDevice.imageUrl);

  const isCustomImageActive = !!customDeviceImages[activeDevice.id];

  const handleDeviceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomDeviceImages((prev) => {
        const updated = { ...prev, [activeDevice.id]: dataUrl };
        try {
          localStorage.setItem('sumi_custom_device_images', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleResetDeviceImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomDeviceImages((prev) => {
      const updated = { ...prev };
      delete updated[activeDevice.id];
      try {
        localStorage.setItem('sumi_custom_device_images', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  return (
    <section id="devices" className="py-16 lg:py-24 bg-[#f8fafc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#006a61]" />
            <span>THE CELLJET SYSTEM &amp; SOLUTION LINEUP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            더셀젯(THE CELLJET) 기기 &amp; 전용 솔루션 라인업
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            제조원 아이레이저랩(I LASER LAB)의 특허받은 5세대 비침습 솔레노이드 공기압 주입 장비와,
            피부 재생을 극대화하는 아톤플러스(ATON PLUS) 6대 전용 PDRN 앰플 및 맞춤형 부속품 시스템입니다.
          </p>
        </div>

        {/* Tab Navigation: Device vs ATON PLUS Solutions vs Accessories */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300">
            <button
              type="button"
              onClick={() => setShowcaseTab('device')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none flex items-center gap-2 ${
                showcaseTab === 'device'
                  ? 'bg-white text-[#006a61] shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>THE CELLJET 본체 &amp; 자동건</span>
            </button>

            <button
              type="button"
              onClick={() => setShowcaseTab('solutions')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none flex items-center gap-2 ${
                showcaseTab === 'solutions'
                  ? 'bg-white text-[#006a61] shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>아톤플러스 (ATON PLUS) 6종 앰플</span>
            </button>

            <button
              type="button"
              onClick={() => setShowcaseTab('accessories')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none flex items-center gap-2 ${
                showcaseTab === 'accessories'
                  ? 'bg-white text-[#006a61] shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 text-amber-600" />
              <span>0.5cc 전용 실린더 &amp; 부속품</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MAIN THE CELLJET DEVICE CARD */}
        {/* ========================================================= */}
        {showcaseTab === 'device' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left 6 Cols: Hardware Image & Badges */}
              <div className="lg:col-span-6 p-8 bg-slate-50 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-200">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00c4b4] text-[#00201d]">
                        {activeDevice.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 font-mono">
                        KC: R-R-IL6-SUMI THE CELLJET
                      </span>
                    </div>
                    <div>
                      <SumiLogo className="h-7 w-auto" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    {activeDevice.name}
                  </h3>
                  <p className="text-xs font-mono text-[#006a61] font-semibold mt-1">
                    {activeDevice.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {activeDevice.tagline}
                  </p>
                </div>

                {/* High-res photo container with studio background */}
                <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-76 sm:h-84 relative group bg-[#0a0f1d] flex items-center justify-center p-4">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={CLEAN_CLINIC_BG}
                      alt="Luxury Clinic Studio Background"
                      className="w-full h-full object-cover object-center filter blur-[0.6px] brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/90 via-[#060a14]/30 to-[#060a14]/40" />
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 h-8 bg-black/60 rounded-full blur-xl" />
                  </div>

                  {/* Foreground Device: Authentic untouched equipment */}
                  <img
                    src={currentDeviceImage}
                    alt={`${activeDevice.name} 미용기기 실물`}
                    className="relative z-1 max-h-[86%] max-w-[92%] object-contain object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />

                  {/* Direct Image Replacement button in top right of photo */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title={`${activeDevice.name} 장비 사진 직접 교체 (thecelljet1.png 등)`}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/95 hover:bg-white text-slate-800 shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      aria-label="장비 사진 직접 교체"
                    >
                      <Camera className="w-3 h-3 text-teal-600" />
                      <span className="hidden sm:inline">사진 직접 교체</span>
                    </button>

                    {isCustomImageActive && (
                      <button
                        type="button"
                        onClick={handleResetDeviceImage}
                        title="기본 장비 그래픽으로 복원"
                        className="p-1 rounded-lg text-[11px] bg-black/60 hover:bg-black/80 text-white/90 transition-colors"
                        aria-label="기본 사진으로 복원"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleDeviceImageUpload}
                      className="hidden"
                      aria-label="장비 사진 이미지 파일 선택"
                    />
                  </div>

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs z-10 pointer-events-none flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white drop-shadow-sm">{activeDevice.name}</div>
                      <div className="text-teal-300 text-[11px] font-medium drop-shadow-sm">비침습식 인체 유효성분 주입기</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/90 text-white shadow-sm font-mono">
                      NON-INVASIVE
                    </span>
                  </div>
                </div>

                {/* Action row */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenDeviceDetailModal(activeDevice)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs flex items-center gap-1.5 transition-all focus:outline-none"
                    aria-label={`${activeDevice.name} 상세 기술 스펙 시트 보기`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-teal-600" />
                    <span>정밀 기술 사양서(Chapter 7) 열람</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenDemoModal(activeDevice.name)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-teal shadow-md hover:opacity-95 flex items-center gap-1.5 transition-all focus:outline-none"
                    aria-label={`${activeDevice.name} 원내 무료 데모 신청`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeDevice.name} 데모 신청</span>
                  </button>
                </div>
              </div>

              {/* Right 6 Cols: Technical Specs & Advantages */}
              <div className="lg:col-span-6 p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    OFFICIAL HARDWARE SPECIFICATIONS
                  </h4>

                  {/* Key specs list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {activeDevice.keySpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className="text-[11px] text-slate-500 font-medium">{spec.label}</div>
                        <div className="text-base font-bold text-[#006a61] mt-0.5">{spec.value}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{spec.detail}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    CLINICAL &amp; OPERATIONAL ADVANTAGES
                  </h4>

                  {/* Advantages list */}
                  <div className="space-y-2.5">
                    {activeDevice.advantages.map((adv, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00c4b4] shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications row */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 mr-1">공식 규격:</span>
                  {activeDevice.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ATON PLUS 6 DEDICATED SOLUTIONS LINEUP */}
        {/* ========================================================= */}
        {showcaseTab === 'solutions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300 mb-2">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>6TH-GEN NATURAL PEPTIDE &amp; PDRN AMPOULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  아톤플러스 (ATON PLUS) 맞춤 앰플 6종
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  모든 아톤플러스 솔루션에는 고순도 PDRN(Sodium DNA) 및 특허 펩타이드가 배합되어,
                  더셀젯을 통한 3mm 심층 침투 시 피부 세포 재생과 리프팅 효과를 극대화합니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenDemoModal(`ATON PLUS 솔루션 키트 (${activeAmpoule.code})`)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white gradient-teal shadow-md flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>솔루션 패키지 도입 문의</span>
              </button>
            </div>

            {/* 6 Ampoule Tabs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {ATON_PLUS_SOLUTIONS.map((sol) => {
                const isSelected = selectedAmpouleId === sol.id;
                return (
                  <button
                    key={sol.id}
                    type="button"
                    onClick={() => setSelectedAmpouleId(sol.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between h-28 focus:outline-none ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/90 shadow-md ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                        {sol.code.replace('ATON PLUS ', '')}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: sol.color }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {sol.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                        {sol.target.split('·')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Ampoule Focused Card */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left 5 Cols: Ampoule Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-slate-900">
                      {activeAmpoule.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600">
                      {activeAmpoule.volume}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activeAmpoule.name}
                  </h4>
                  <div className="text-xs font-bold text-sky-700 bg-sky-100/80 px-3 py-1.5 rounded-xl inline-block">
                    {activeAmpoule.target}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeAmpoule.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-700 mb-2">주요 임상 효과 지표:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeAmpoule.effects.map((eff, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>{eff}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: Key Ingredients & Formulation Breakdown */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      핵심 유효 성분 (ACTIVE FORMULATION)
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-bold">
                      PDRN 함유 · 국제 ICID 등재
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeAmpoule.keyIngredients.map((ing, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
                      >
                        <strong className="text-slate-900 font-bold shrink-0 min-w-32">
                          {ing.name}
                        </strong>
                        <span className="text-slate-600 text-right">
                          {ing.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                    * 흑운모, 견운모 미네랄 성분, 미네랄워터, 진공나노추출물 및 천연식물추출물 배합으로 민감한 피부에도 무자극 침투를 보장합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DEDICATED ACCESSORIES & CONSUMABLES */}
        {/* ========================================================= */}
        {showcaseTab === 'accessories' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                CUSTOM DEDICATED ACCESSORIES
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                맞춤형 전용 부속품 &amp; 호환 시스템
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                더셀젯 맞춤형 전용 부속품 사용을 통해 제품 안정성을 극대화하며,
                시중의 다양한 앰플 규격과도 유연하게 호환됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Item 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    0.5cc
                  </div>
                  <h4 className="font-bold text-base text-slate-900">전용 실린더 (0.5cc)</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    풀샷(Full-Shot) 퍼포먼스를 완성하는 정밀 눈금 실린더입니다.
                    20~25 MPa 고압을 안정적으로 견디며 첫 방울부터 마지막 한 방울까지 정량 토출을 보장합니다.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                  단위: 0.5cc / 1회용 위생 멸균 패키지
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    ADAPT
                  </div>
                  <h4 className="font-bold text-base text-slate-900">전용 어댑터</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    핸드피스 솔레노이드 챔버와 실린더를 흔들림 없이 결합하는 핵심 기밀 부속품입니다.
                    분사 시 앰플 유실과 스플래터 현상을 원천 방지합니다.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                  고정밀 솔레노이드 챔버 직결 설계
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    CAP
                  </div>
                  <h4 className="font-bold text-base text-slate-900">전용 실린더 캡</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    앰플 용액 충전 후 오염을 방지하고 보관 안정성을 높이는 위생 실린더 캡입니다.
                    시중 제품의 다양한 앰플 병 및 바이알과도 편리하게 호환됩니다.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                  * 해당 실린더, 어댑터, 실린더캡은 시중 제품과 호환 가능
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
