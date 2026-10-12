import React, { useEffect } from 'react';
import { X, ShieldCheck, CheckCircle, FileText, Stamp } from 'lucide-react';
import { Certification } from '../../types';
import { SumiLogo } from '../SumiLogo';

interface CertDetailModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertDetailModal: React.FC<CertDetailModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cert) {
        onClose();
      }
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="인증서 상세 닫기 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <SumiLogo className="h-7 w-auto" />
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
            OFFICIAL CERTIFICATE
          </span>
        </div>

        <h2 id="cert-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
          {cert.organization}
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-6 font-medium">
          {cert.title}
        </p>

        {/* Certificate Card Display */}
        <div className="p-6 rounded-2xl bg-[#faf8ff] border-2 border-amber-300/60 relative overflow-hidden shadow-inner space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div>
              <div className="text-[10px] text-slate-400 font-mono">인증 등록 번호</div>
              <div className="text-sm font-mono font-bold text-slate-900">{cert.docNumber}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs border border-amber-300">
              APPROVED
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div>
              <strong className="text-slate-900">인증 기관:</strong> {cert.organization}
            </div>
            <div>
              <strong className="text-slate-900">유효 만료 기한:</strong> {cert.validThrough}
            </div>
            <div>
              <strong className="text-slate-900">검증 상태:</strong> 정상 활성 (Active Verified)
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200 text-xs text-slate-600 leading-relaxed">
            {cert.description}
          </div>

          <div className="pt-2 flex items-center gap-2 text-emerald-700 text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>공식 시험성적서 및 안전 기준 적합 검증 완료</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all focus:outline-none"
          >
            확인 완료 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
