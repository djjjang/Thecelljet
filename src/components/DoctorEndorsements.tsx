import React from 'react';
import { Quote, Star, Building2, UserCheck, Stethoscope } from 'lucide-react';
import { DOCTOR_REVIEWS } from '../data/mockData';

export const DoctorEndorsements: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#faf8ff] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100/90 text-[#005049] border border-teal-300/70 mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#006a61]" />
            <span>CLINIC &amp; AESTHETIC DIRECTORS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            병원 피부과 및 프리미엄 피부관리 센터 원장단 평가
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-normal">
            병원 피부과 및 고급 피부 관리 센터에서 바늘 없는 비침습 스킨케어를 진행하는
            전문가 및 원장님들이 직접 전하는 통증 제로 만족도와 원내 관리 효율성 평가입니다.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOCTOR_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-200/80" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.doctorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/30"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{rev.doctorName}</h3>
                    <p className="text-[11px] text-teal-700 font-semibold">{rev.hospitalName}</p>
                    <p className="text-[10px] text-slate-400">{rev.position}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-teal-50 text-[#006a61] border border-teal-200 shrink-0">
                  {rev.treatmentStats}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
