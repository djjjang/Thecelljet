import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Menu, X, ChevronRight, ShieldCheck, Sliders } from 'lucide-react';
import { SumiLogo } from './SumiLogo';
import { useLogo } from '../context/LogoContext';

interface NavbarProps {
  onOpenDemoModal: (defaultConcern?: string) => void;
  onOpenWhitepaperModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal, onOpenWhitepaperModal }) => {
  const { openEditor } = useLogo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '혁신 기술', href: '#technology' },
    { label: '뷰티 디바이스', href: '#devices' },
    { label: '장비 시뮬레이터', href: '#simulator' },
    { label: '관리 결과 (B/A)', href: '#clinical-results' },
    { label: '맞춤 프로토콜', href: '#protocol-calc' },
    { label: '공식 인증', href: '#certifications' },
    { label: '전문가 평가', href: '#reviews' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#004b44] text-[#63f9e8] text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00c4b4] text-[#00201d]">
              KC 안전인증
            </span>
            <span>2026 차세대 무통증·비침습 음파 마이크로젯 에스테틱 뷰티 디바이스</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-white/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#63f9e8]" />
              전국 380+ 병원 &amp; 피부관리 센터 도입
            </span>
            <span className="text-white/40">|</span>
            <a
              href="tel:010-7781-6533"
              className="hover:text-white flex items-center gap-1 transition-colors"
              aria-label="클리닉 도입 상담 전화 010-7781-6533"
            >
              <Phone className="w-3 h-3 text-[#63f9e8]" />
              도입 상담 직통: 010-7781-6533
            </a>
          </div>
        </div>
      </div>

      {/* Main glass navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-md border-b border-slate-200/80 py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4'
        }`}
        aria-label="메인 내비게이션"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Quick Customizer */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#"
              className="flex items-center group focus:outline-none"
              aria-label="SUMI BEAUTY 홈으로 이동"
            >
              <div className="py-0.5 transition-transform group-hover:scale-105 duration-200">
                <SumiLogo className="h-10 sm:h-11 w-auto" />
              </div>
            </a>

            <button
              type="button"
              onClick={openEditor}
              title="로고 파일 직접 업로드 / SVG 수정"
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-[#006a61] bg-slate-100/80 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-1.5 shadow-2xs group"
              aria-label="로고 직접 수정 열기"
            >
              <Sliders className="w-3 h-3 text-teal-600 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline">로고 직접 수정</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-[#006a61] hover:bg-teal-50/60 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenWhitepaperModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#006a61] bg-slate-50 hover:bg-teal-50/50 border border-slate-200 rounded-lg transition-all focus:outline-none"
              aria-label="임상 백서 열람 모달 열기"
            >
              임상 백서 열람
            </button>
            <button
              type="button"
              onClick={() => onOpenDemoModal()}
              className="px-4 py-2 text-xs font-bold text-white gradient-teal hover:opacity-95 rounded-lg shadow-sm hover:shadow-[0_4px_16px_rgba(0,196,180,0.3)] transition-all flex items-center gap-1.5 active:scale-95 focus:outline-none"
              aria-label="장비 데모 및 클리닉 도입 신청 모달 열기"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>장비 데모 신청</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDemoModal()}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white gradient-teal rounded-lg shadow-sm"
              aria-label="데모 신청"
            >
              데모 신청
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '모바일 메뉴 열기'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
            role="region"
            aria-label="모바일 내비게이션 메뉴"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-[#006a61] transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEditor();
                }}
                className="w-full py-2.5 text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg text-center flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>로고 직접 수정 & 커스텀 관리</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhitepaperModal();
                }}
                className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center"
              >
                기술 백서 및 연구 데이터 열람
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-2.5 text-sm font-bold text-white gradient-teal rounded-lg text-center shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                병원·클리닉 무료 데모 시연 신청
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
