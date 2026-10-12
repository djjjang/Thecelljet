import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Building, User, Phone, Mail, Calendar, HelpCircle } from 'lucide-react';
import { SumiLogo } from '../SumiLogo';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProtocol?: string;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({
  isOpen,
  onClose,
  prefilledProtocol = '',
}) => {
  const [clinicName, setClinicName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('THE CELLJET PRO');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefilledProtocol) {
      setNotes(`[맞춤 프로토콜 문의] ${prefilledProtocol}`);
    }
  }, [prefilledProtocol]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName.trim() || !applicantName.trim() || !phoneNumber.trim()) {
      setErrorMessage('병원명, 신청자 성함, 연락처는 필수 입력 항목입니다.');
      return;
    }
    if (!agreedTerms) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setClinicName('');
    setApplicantName('');
    setPhoneNumber('');
    setEmail('');
    setNotes('');
    setAgreedTerms(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="모달 닫기 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Submission Complete View */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              데모 시연 신청이 접수되었습니다!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              <strong>{clinicName} ({applicantName} 님)</strong>의 요청이 정상 접수되었습니다.
              수미 바이오테크 임상 전문 컨설턴트가 24시간 이내에 기재해주신 연락처(
              {phoneNumber})로 장비 일정 및 무상 테스트 일정을 조율해 드립니다.
            </p>
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-xs text-teal-800 text-left space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                원내 무상 시연 혜택 안내
              </div>
              <p className="text-slate-600">
                · 전문 학술팀 동행하여 핸드피스 조작법 및 전용 앰플 1Kit 무료 제공
              </p>
              <p className="text-slate-600">
                · 고객용 상담 브로슈어 및 센터/원내 배너 홍보물 패키지 증정
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 w-full py-3 rounded-xl font-bold text-white gradient-teal shadow-md"
            >
              확인 및 창 닫기
            </button>
          </div>
        ) : (
          /* Main Form View */
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <SumiLogo className="h-8 w-auto" />
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-[#006a61]">
                  TRIAL &amp; DEMO
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">전국 병의원 및 에스테틱 센터 방문 시연</span>
              </div>
            </div>

            <h2
              id="demo-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
            >
              병원 &amp; 고급 피부관리 센터 무료 장비 데모 신청
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              병원 및 피부관리 센터 전문가분들이 고객에게 직접 무통 마이크로젯 케어를
              테스트해보실 수 있도록 데모 장비를 지원합니다.
            </p>

            {errorMessage && (
              <div
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Clinic Name & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="clinic-name"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    병원 / 에스테틱 센터명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      ref={firstInputRef}
                      id="clinic-name"
                      type="text"
                      required
                      placeholder="예: 청담 오라클피부과의원"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="applicant-name"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    원장님/담당자 성함 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="예: 김민준 원장"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="phone-number"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    연락처 (휴대폰 번호) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="phone-number"
                      type="tel"
                      required
                      placeholder="예: 010-1234-5678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    이메일 주소
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="email-address"
                      type="email"
                      placeholder="clinic@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Device Model Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  관심 장비 모델 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['THE CELLJET PRO', 'ATOM PLUS 3.0', '전체 모델 비교 시연'].map((dev) => (
                    <button
                      key={dev}
                      type="button"
                      onClick={() => setSelectedDevice(dev)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        selectedDevice === dev
                          ? 'border-teal-500 bg-teal-50 text-[#006a61]'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="pref-date"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  시연 희망 일자 (선택)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="pref-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes-area"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  상담 및 시연 문의 내용
                </label>
                <textarea
                  id="notes-area"
                  rows={3}
                  placeholder="보유 중인 레이저 장비와의 결합 프로토콜이나 시연 시 테스트하고 싶은 앰플 종류를 적어주세요."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="privacy-terms"
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 accent-[#00c4b4]"
                />
                <label htmlFor="privacy-terms" className="text-xs text-slate-600 select-none">
                  [필수] 데모 시연 및 장비 상담을 위한 개인정보 수집 및 활용에 동의합니다.
                </label>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white gradient-teal shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none"
                >
                  {isSubmitting ? (
                    <span>접수 처리 중...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>무료 데모 시연 신청 완료하기</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
