import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../data/mockData';
import { Certification } from '../types';

interface ClinicalCertificationsProps {
  onSelectCert: (cert: Certification) => void;
}

export const ClinicalCertifications: React.FC<ClinicalCertificationsProps> = ({ onSelectCert }) => {
  return (
    <section id="certifications" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300/80 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-800" />
            <span>SAFETY &amp; QUALITY STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            공식 공인 인증 및 안전·품질 표준 규격
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            국립전파연구원 KC 안전인증(R-R-IL6-SUMI THE CELLJET), 대한민국 특허청 원천 특허 3종 등록(제10-2290085호 외),
            유럽 LVD CE 적합 규격 및 국제 ISO 9001:2015 / ISO 14001:2015 제조 품질·환경 경영 표준을 통과하여
            병원 피부과와 프리미엄 피부관리 센터에서 가장 신뢰할 수 있는 에스테틱 케어를 보증합니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-white text-slate-800 border border-slate-200">
                    {cert.issuerLogoText}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                </div>

                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                  {cert.badgeText}
                </div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {cert.organization}
                </h3>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  {cert.title}
                </p>
                <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] font-mono text-slate-600">
                  <div className="text-slate-400 text-[10px]">인증/등록 번호</div>
                  <div className="font-bold text-slate-800 truncate">{cert.docNumber}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  유효: {cert.validThrough}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  className="text-xs font-bold text-[#006a61] hover:text-[#00c4b4] flex items-center gap-1 focus:outline-none"
                  aria-label={`${cert.organization} 인증서 상세 정보 확인`}
                >
                  <span>상세 보기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-amber-50 border border-teal-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#00c4b4] shrink-0" />
            <div className="text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-bold">공식 특허 3종 및 KC 안전인증(R-R-IL6-SUMI THE CELLJET):</strong>{' '}
              국가공인 전기용품안전기준(Class I / Type B) 및 전자기 적합성, LVD CE 지침을 준수한 5세대 정밀 비침습 인체 유효성분 주입기입니다.
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500 shrink-0">
            R-R-IL6-SUMI THE CELLJET
          </div>
        </div>
      </div>
    </section>
  );
};
