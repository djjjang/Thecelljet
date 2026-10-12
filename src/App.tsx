import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechInnovations } from './components/TechInnovations';
import { DeviceShowcase } from './components/DeviceShowcase';
import { DeviceSimulator } from './components/DeviceSimulator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProtocolCalculator } from './components/ProtocolCalculator';
import { ClinicalCertifications } from './components/ClinicalCertifications';
import { DoctorEndorsements } from './components/DoctorEndorsements';
import { Footer } from './components/Footer';

import { DemoBookingModal } from './components/Modals/DemoBookingModal';
import { WhitepaperModal } from './components/Modals/WhitepaperModal';
import { CertDetailModal } from './components/Modals/CertDetailModal';
import { DeviceDetailModal } from './components/Modals/DeviceDetailModal';

import { Certification, DeviceSpec } from './types';
import { Sparkles, PhoneCall } from 'lucide-react';
import { LogoProvider } from './context/LogoContext';
import { LogoEditorModal } from './components/Modals/LogoEditorModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [prefilledProtocol, setPrefilledProtocol] = useState<string>('');
  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedDeviceDetail, setSelectedDeviceDetail] = useState<DeviceSpec | null>(null);

  const handleOpenDemoModal = (protocolOrConcern?: string) => {
    if (protocolOrConcern) {
      setPrefilledProtocol(protocolOrConcern);
    } else {
      setPrefilledProtocol('');
    }
    setIsDemoModalOpen(true);
  };

  const handleScrollToSimulator = () => {
    const el = document.querySelector('#simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LogoProvider>
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Pretendard','Inter',sans-serif]">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00c4b4] focus:text-[#00201d] focus:font-bold focus:rounded-lg focus:shadow-xl"
        >
          본문 콘텐츠로 바로가기 (Skip to main content)
        </a>

        {/* Glass Navigation */}
        <Navbar
          onOpenDemoModal={handleOpenDemoModal}
          onOpenWhitepaperModal={() => setIsWhitepaperModalOpen(true)}
        />

        {/* Main Content Areas */}
        <main id="main-content" className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onOpenDemoModal={() => handleOpenDemoModal()}
            onOpenWhitepaperModal={() => setIsWhitepaperModalOpen(true)}
            onScrollToSimulator={handleScrollToSimulator}
          />

          {/* 2. Patented Core Technologies */}
          <TechInnovations
            onOpenWhitepaperModal={() => setIsWhitepaperModalOpen(true)}
          />

          {/* 3. Flagship Aesthetic Beauty Devices Showcase */}
          <DeviceShowcase
            onOpenDemoModal={handleOpenDemoModal}
            onOpenDeviceDetailModal={(device) => setSelectedDeviceDetail(device)}
          />

          {/* 4. Interactive Virtual Device HUD & Simulator */}
          <DeviceSimulator
            onOpenDemoModal={handleOpenDemoModal}
          />

          {/* 5. Before & After Interactive Draggable Comparison */}
          <BeforeAfterSlider />

          {/* 6. AI Treatment Protocol Calculator & Quiz */}
          <ProtocolCalculator
            onOpenDemoModal={handleOpenDemoModal}
          />

          {/* 7. Clinical Certifications & Global Authority */}
          <ClinicalCertifications
            onSelectCert={(cert) => setSelectedCert(cert)}
          />

          {/* 8. Doctor & Clinic Endorsements */}
          <DoctorEndorsements />
        </main>

        {/* Footer */}
        <Footer
          onOpenDemoModal={() => handleOpenDemoModal()}
          onOpenWhitepaperModal={() => setIsWhitepaperModalOpen(true)}
        />

        {/* Mobile Sticky Quick CTA Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-2xl flex items-center gap-2">
          <a
            href="tel:010-7781-6533"
            className="p-3 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0"
            aria-label="010-7781-6533 도입 상담 전화 걸기"
          >
            <PhoneCall className="w-4 h-4 text-teal-600" />
          </a>
          <button
            type="button"
            onClick={() => handleOpenDemoModal()}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white gradient-teal shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            aria-label="클리닉 장비 데모 신청 모달 열기"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>병원·클리닉 무료 데모 신청</span>
          </button>
        </div>

        {/* Modals */}
        <DemoBookingModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          prefilledProtocol={prefilledProtocol}
        />

        <WhitepaperModal
          isOpen={isWhitepaperModalOpen}
          onClose={() => setIsWhitepaperModalOpen(false)}
        />

        <CertDetailModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />

        <DeviceDetailModal
          device={selectedDeviceDetail}
          onClose={() => setSelectedDeviceDetail(null)}
          onOpenDemo={handleOpenDemoModal}
        />

        {/* Logo Customizer Modal */}
        <LogoEditorModal />
      </div>
    </LogoProvider>
  );
}
