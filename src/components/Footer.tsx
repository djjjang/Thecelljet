import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { SumiLogo } from './SumiLogo';

interface FooterProps {
  onOpenDemoModal: () => void;
  onOpenWhitepaperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal, onOpenWhitepaperModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterSent(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <SumiLogo variant="light" className="h-12 sm:h-14 w-auto" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              더셀젯(THE CELLJET)은 독자적인 솔레노이드 공기압(20~25 MPa)과 듀얼 펄스 마이크로젯 기술을 바탕으로
              바늘 없는 무통·비침습 스킨케어 앰플 전달 솔루션을 선도하는 5세대 프리미엄 미용기기 브랜드입니다.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>제조원: 아이레이저랩(I LASER LAB) | 경기도 양주시 백석읍 월암로 91-1</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>총판/판매원: (주)채움엔터프라이즈 | 경기도 성남시 중원구 둔촌대로80번길 3-10, 212호</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>장비 도입 및 센터 제휴 직통: 010-7781-6533</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>공식 이메일: cuenter333@gmail.com | www.thecelljet.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              솔루션 바로가기
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#technology"
                  onClick={(e) => scrollToSection(e, '#technology')}
                  className="hover:text-teal-300 transition-colors"
                >
                  4대 원천 특허 기술
                </a>
              </li>
              <li>
                <a
                  href="#devices"
                  onClick={(e) => scrollToSection(e, '#devices')}
                  className="hover:text-teal-300 transition-colors"
                >
                  THE CELLJET PRO
                </a>
              </li>
              <li>
                <a
                  href="#devices"
                  onClick={(e) => scrollToSection(e, '#devices')}
                  className="hover:text-teal-300 transition-colors"
                >
                  ATOM PLUS 3.0
                </a>
              </li>
              <li>
                <a
                  href="#simulator"
                  onClick={(e) => scrollToSection(e, '#simulator')}
                  className="hover:text-teal-300 transition-colors"
                >
                  가상 장비 조작기
                </a>
              </li>
              <li>
                <a
                  href="#clinical-results"
                  onClick={(e) => scrollToSection(e, '#clinical-results')}
                  className="hover:text-teal-300 transition-colors"
                >
                  임상 비포 & 애프터 대조
                </a>
              </li>
              <li>
                <a
                  href="#protocol-calc"
                  onClick={(e) => scrollToSection(e, '#protocol-calc')}
                  className="hover:text-teal-300 transition-colors"
                >
                  맞춤 프로토콜 계산기
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory & Whitepaper (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              규격 및 학술 자료
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#certifications"
                  onClick={(e) => scrollToSection(e, '#certifications')}
                  className="hover:text-teal-300 transition-colors"
                >
                  KC 안전인증 및 규격 현황
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  onClick={(e) => scrollToSection(e, '#certifications')}
                  className="hover:text-teal-300 transition-colors"
                >
                  CE 유럽 안전 적합 인증
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  onClick={(e) => scrollToSection(e, '#certifications')}
                  className="hover:text-teal-300 transition-colors"
                >
                  ISO 9001:2015 품질인증
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenWhitepaperModal}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  기술 연구 백서 온라인 열람
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="text-teal-400 font-bold hover:underline"
                >
                  무상 방문 데모 신청
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin signup (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              장비 세미나 및 프로토콜 소식 수신
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              병원 피부과 및 프리미엄 피부관리 센터를 위한 최신 케어 프로토콜 및 세미나 일정을 전달해 드립니다.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="원장님/센터 이메일"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-l-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  aria-label="세미나 및 프로토콜 소식 수신 이메일"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-r-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shrink-0 flex items-center justify-center transition-colors"
                  aria-label="구독 신청"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {newsletterSent && (
                <div className="text-[11px] text-teal-300 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>세미나 뉴스레터 구독이 완료되었습니다.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal & Compliance */}
        <div className="pt-8 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>제조원: 아이레이저랩 (I LASER LAB)</span>
            <span>총판/판매: (주)채움엔터프라이즈</span>
            <span>브랜드: 더셀젯 (THE CELLJET)</span>
            <span>KC 적합등록: R-R-IL6-SUMI THE CELLJET</span>
            <span>사업자등록번호: 214-88-91024</span>
          </div>
          <p className="text-slate-400">
            본 제품(더셀젯 THE CELLJET)은 비침습식 인체 유효성분 주입기로 피부 미용 및 스킨케어 관리를 위한 전문 미용기기이며, 병의원 및 프리미엄 피부 관리 센터에서 안전하게 사용 가능합니다. 질병의 예방 및 치료를 위한 의료기기가 아닙니다.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-slate-400">
            <div>
              © 2026 I LASER LAB &amp; Chaeum Enterprise. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">품질보증기준</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
