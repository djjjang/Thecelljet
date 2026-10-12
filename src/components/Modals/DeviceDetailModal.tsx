import React, { useEffect } from 'react';
import { X, Check, Cpu, Sparkles } from 'lucide-react';
import { DeviceSpec } from '../../types';
import { SumiLogo } from '../SumiLogo';

interface DeviceDetailModalProps {
  device: DeviceSpec | null;
  onClose: () => void;
  onOpenDemo: (deviceName: string) => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  onClose,
  onOpenDemo,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && device) {
        onClose();
      }
    };
    if (device) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [device, onClose]);

  if (!device) return null;

  const fullSpecs = [
    { title: '제품명 / 모델명', val: 'COSMETIC DELIVERY SYSTEM / SUMI THE CELLJET (IMPALA)' },
    { title: '제조원 / 제조국', val: 'I LASER LAB (아이레이저랩) / 대한민국 (Republic of Korea)' },
    { title: '작동 원리', val: 'Solenoid-Driven Electromagnetic Jet Injection (솔레노이드 구동 전자기 제트 인젝션)' },
    { title: '압력 출력 (Pressure)', val: 'Approx. 20 – 25 MPa (공기압력 마이크로젯 침투)' },
    { title: '최대 분사 주파수', val: 'Up to 5 Hz (1~5연발 연속 샷 / 바디모드 1Hz 단발 제어)' },
    { title: '펄스 지속 시간 (Pulse Duration)', val: '7 – 17 ms (36단계 미세 정밀 제어)' },
    { title: '노즐 구경 (Nozzle Diameter)', val: 'Appx. 130 ~ 150 µm 초미세 노즐' },
    { title: '전용 카트리지 용량', val: '0.5cc 풀샷 (Full-Shot) 전량 흔들림 없는 일정한 압력 투입' },
    { title: '강도 조절 단계', val: '모드별 9단계 미세 조정 (솔레노이드 출력 전력 조절)' },
    { title: '프로토콜 메모리', val: '5개 프로그래밍 독립 메모리 프리셋 (Memory 1~5)' },
    { title: '핸드피스 내구성', val: '약 1,000,000 샷 (S/V 출고 시 10,000샷 사전 테스트 완료)' },
    { title: '핸드피스 원형 센서', val: '저주파 미세진동 & 630nm RED LED 독립 터치 제어' },
    { title: '디스플레이 UI', val: '10.1인치 고해상도 풀컬러 정전식 터치스크린 LCD' },
    { title: '전원 사양 (Power)', val: 'AC 100–240V, 50/60Hz, DC 36V/12A (SMPS), Peak 360W' },
    { title: '안전 모니터링 (Watchdog)', val: '솔레노이드 70°C 과열 방지 자동 셧다운 & 압력 파형 점검' },
    { title: '기기 중량 및 소음', val: '본체 약 4kg / 저소음 65 dB 미만' },
    { title: '안전 등급 및 인증', val: 'Class I / Type B, KC 적합등록 (R-R-IL6-SUMI THE CELLJET), LVD CE' },
    { title: '특허 등록 현황', val: '대한민국 특허청 3종 등록 (제10-2290085호 / 제10-2290090호 / 제10-2351632호)' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="device-detail-title"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="장비 사양표 닫기 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <SumiLogo className="h-7 w-auto" />
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-[#006a61]">
              ENGINEERING SPEC SHEET
            </span>
            <span className="text-xs text-slate-500 font-mono">{device.id}</span>
          </div>
        </div>

        <h2 id="device-detail-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {device.name} 정밀 기술 사양서
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          {device.subtitle}
        </p>

        {/* Specifications Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden mb-6">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-slate-200">
              {fullSpecs.map((spec, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}>
                  <th className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 border-r border-slate-200/80">
                    {spec.title}
                  </th>
                  <td className="py-2.5 px-4 text-slate-900 font-medium">
                    {spec.val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            도입 병원 대상 1:1 맞춤 교육 지원
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDemo(device.name);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white gradient-teal shadow-md flex items-center justify-center gap-2 hover:opacity-95 focus:outline-none"
            aria-label={`${device.name} 데모 신청하기`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>이 모델 원내 데모 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
