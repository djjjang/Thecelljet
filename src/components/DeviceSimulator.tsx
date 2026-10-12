import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Sparkles, Volume2, VolumeX, Check, RefreshCw, Zap, Shield, 
  HelpCircle, FileText, Plus, Trash2, Edit2, Save, X as XIcon, Sliders,
  Activity, Lock, Sun, Eye, ChevronUp, ChevronDown, Award, CircleDot,
  Radio, Disc
} from 'lucide-react';
import { CELLJET_MODES } from '../data/mockData';
import { DeviceMode } from '../types';
import { SumiLogo } from './SumiLogo';

interface TreatmentLog {
  id: string;
  time: string;
  mode: string;
  dose: string;
  frequency: string;
  intensity: number;
  status: string;
  note: string;
}

interface DeviceSimulatorProps {
  onOpenDemoModal: (modeName?: string) => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ onOpenDemoModal }) => {
  // Mode & Parameters state matching actual THE CELLJET system
  const [currentMode, setCurrentMode] = useState<DeviceMode>(CELLJET_MODES[1]); // Default to Face & Neck
  const [intensity, setIntensity] = useState<number>(5); // 1~9 steps
  const [shotFrequency, setShotFrequency] = useState<number>(3); // 1~5 Hz
  const [shotCount, setShotCount] = useState<number>(412); // Total shots fired
  const [sessionShots, setSessionShots] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [injectedDose, setInjectedDose] = useState<number>(0.25); // in cc (0.5cc full-shot)

  // Handpiece Integrated Touch Sensors (Manual Chapter 3 & 4)
  const [vibrationActive, setVibrationActive] = useState<boolean>(true);
  const [ledActive, setLedActive] = useState<boolean>(true);

  // Sub-modals inside simulator matching manual
  const [isPressureCheckOpen, setIsPressureCheckOpen] = useState<boolean>(false);
  const [isLogViewOpen, setIsLogViewOpen] = useState<boolean>(false);
  const [isPinSetOpen, setIsPinSetOpen] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('1234');
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [brightness, setBrightness] = useState<number>(85); // 0-100
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Memory Slots (Memory 1~5)
  const [activeMemorySlot, setActiveMemorySlot] = useState<number | null>(null);
  const [savedMemories, setSavedMemories] = useState<Record<number, { modeId: string; intensity: number; frequency: number }>>({
    1: { modeId: 'face-neck', intensity: 3, frequency: 3 },
    2: { modeId: 'face-neck', intensity: 6, frequency: 4 },
    3: { modeId: 'scalp', intensity: 5, frequency: 5 },
    4: { modeId: 'body', intensity: 8, frequency: 1 },
    5: { modeId: 'special', intensity: 4, frequency: 2 },
  });

  // Hotspots on Applicator
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // User-editable Telemetry Logs
  const [logs, setLogs] = useState<TreatmentLog[]>([
    {
      id: 'log-1',
      time: '14:59:38',
      mode: '얼굴·목 모드 (FACE & NECK)',
      dose: '0.50 cc (풀샷 완제)',
      frequency: '4 Hz',
      intensity: 5,
      status: '정상 침투 (TH:30.1 A:0.156)',
      note: '이마·미간 및 팔자 부위 ATON PLUS FS 앰플 3mm 균일 침투 완료 / 바늘 통증 0.0',
    },
    {
      id: 'log-2',
      time: '14:58:38',
      mode: '스칼프 모드 (SCALP)',
      dose: '0.40 cc',
      frequency: '5 Hz',
      intensity: 6,
      status: '정상 침투 (TH:28.6 A:0.421)',
      note: '헤어라인 및 정수리 두피 혈자리 순환 케어 / 저주파 미세진동으로 편안함 유지',
    },
    {
      id: 'log-3',
      time: '14:57:38',
      mode: '스페셜 모드 (SPECIAL)',
      dose: '0.30 cc',
      frequency: '3 Hz',
      intensity: 3,
      status: '정상 침투 (TH:27.3 A:0.156)',
      note: 'Y존 서혜부 림프 순환 케어 / 피부 자극 0.00 확인',
    },
  ]);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string>('');
  const [newLogNote, setNewLogNote] = useState<string>('');

  // Mode Selection handler
  const handleSelectMode = (mode: DeviceMode) => {
    setCurrentMode(mode);
    if (mode.id === 'body') {
      // In BODY mode, manual states it is configured to trigger 1Hz safe single shots
      setShotFrequency(1);
    } else {
      if (shotFrequency < 2) setShotFrequency(3);
    }
    setActiveMemorySlot(null);
  };

  // Adjust Frequency
  const handleIncreaseFrequency = () => {
    if (currentMode.id === 'body') return; // Body is locked to 1Hz
    setShotFrequency((prev) => Math.min(5, prev + 1));
  };
  const handleDecreaseFrequency = () => {
    if (currentMode.id === 'body') return;
    setShotFrequency((prev) => Math.max(1, prev - 1));
  };

  // Adjust Intensity
  const handleIncreaseIntensity = () => {
    setIntensity((prev) => Math.min(9, prev + 1));
  };
  const handleDecreaseIntensity = () => {
    setIntensity((prev) => Math.max(1, prev - 1));
  };

  // Memory Recall / Save
  const handleRecallMemory = (slot: number) => {
    setActiveMemorySlot(slot);
    const mem = savedMemories[slot];
    if (mem) {
      const targetMode = CELLJET_MODES.find((m) => m.id === mem.modeId) || CELLJET_MODES[0];
      setCurrentMode(targetMode);
      setIntensity(mem.intensity);
      setShotFrequency(mem.frequency);
    }
  };

  const handleSaveCurrentToMemory = () => {
    if (!activeMemorySlot) {
      handleRecallMemory(1);
    }
    const slotToSave = activeMemorySlot || 1;
    setSavedMemories((prev) => ({
      ...prev,
      [slotToSave]: {
        modeId: currentMode.id,
        intensity,
        frequency: shotFrequency,
      },
    }));
  };

  // Firing action simulation
  const handleToggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setShotCount((prev) => prev + 1);
        setSessionShots((prev) => prev + 1);
        setInjectedDose((prev) => {
          const next = +(prev + 0.01).toFixed(2);
          return next > 0.5 ? 0.01 : next;
        });
      }, 1000 / (shotFrequency || 1));
    }
    return () => clearInterval(interval);
  }, [isRunning, shotFrequency]);

  // Single shot test button
  const handleSingleShotTest = () => {
    setShotCount((prev) => prev + 1);
    setSessionShots((prev) => prev + 1);
    setInjectedDose((prev) => {
      const next = +(prev + 0.01).toFixed(2);
      return next > 0.5 ? 0.01 : next;
    });

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newEntry: TreatmentLog = {
      id: `log-${Date.now()}`,
      time: timeStr,
      mode: currentMode.nameKr,
      dose: '0.01 cc (정량 제트)',
      frequency: `${shotFrequency} Hz`,
      intensity,
      status: `정상 분사 (20~25 MPa)`,
      note: `${currentMode.nameKr} ${intensity}단계 펄스 분사 시험 성공 (누적 ${shotCount + 1}샷)`,
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  // Log management handlers
  const handleStartEdit = (log: TreatmentLog) => {
    setEditingLogId(log.id);
    setEditingNote(log.note);
  };

  const handleSaveEdit = (logId: string) => {
    setLogs((prev) =>
      prev.map((item) => (item.id === logId ? { ...item, note: editingNote } : item))
    );
    setEditingLogId(null);
  };

  const handleDeleteLog = (logId: string) => {
    setLogs((prev) => prev.filter((item) => item.id !== logId));
  };

  const handleAddCustomLog = () => {
    if (!newLogNote.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newEntry: TreatmentLog = {
      id: `log-${Date.now()}`,
      time: timeStr,
      mode: currentMode.nameKr,
      dose: '0.01 cc',
      frequency: `${shotFrequency} Hz`,
      intensity,
      status: '직접 기록',
      note: newLogNote.trim(),
    };
    setLogs((prev) => [newEntry, ...prev]);
    setNewLogNote('');
  };

  // Hotspots definition for the applicator gun (from user manual)
  const hotspots = [
    {
      id: 'nozzle',
      title: '나노 마이크로젯 노즐 (130~150µm)',
      top: '26%',
      left: '49%',
      desc: '특허받은 130~150µm 초미세 노즐로 20~25 MPa의 공기압을 집중시켜 바늘 없이 표피 손상 제로로 진피 3mm까지 투입합니다.',
    },
    {
      id: 'solenoid',
      title: '고정밀 솔레노이드 챔버 (Solenoid Core)',
      top: '44%',
      left: '42%',
      desc: '전자기 펄스로 순간 압력을 정밀 제어하는 Muto Impact 핵심 심장부입니다. 36단계 펄스 듀레이션(7~17ms)으로 0.5cc를 일정하게 분사합니다.',
    },
    {
      id: 'cylinder',
      title: '전용 0.5cc 실린더 & 앰플 어댑터',
      top: '35%',
      left: '60%',
      desc: '풀샷(Full-Shot) 퍼포먼스를 보장하는 전용 0.5cc 실린더로 고농축 세럼 및 PDRN 앰플의 로스와 스플래터를 원천 방지합니다.',
    },
    {
      id: 'touch-module',
      title: '핸드피스 원형 듀얼 터치 센서 모듈',
      top: '64%',
      left: '48%',
      desc: '본체 조작 없이 손끝 터치로 미세진동(Vibration)과 630nm RED LED를 즉시 독립 제어할 수 있는 스마트 원형 모듈입니다.',
    },
  ];

  return (
    <section id="simulator" className="py-16 lg:py-24 bg-[#0a1120] text-slate-100 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 mb-3">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span>THE CELLJET 10.1&quot; VIRTUAL HUD SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight break-keep font-['Plus_Jakarta_Sans']">
            더셀젯 정밀 장비 가상 조작기
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed break-keep font-normal">
            더셀젯(THE CELLJET)의 실제 10.1인치 터치스크린 UI와 인체공학 핸드피스를 그대로 구현했습니다.
            4대 부위별 스마트 모드, 1~5 Hz 고속 펄스, 9단계 강도, 핸드피스 듀얼 터치 센서(진동/LED),
            그리고 압력 파형 점검 및 로그 뷰 기능을 직접 체험해 보세요.
          </p>
        </div>

        {/* Outer 10.1" Bezel Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] border-4 border-slate-700 shadow-2xl relative">
          
          {/* Main 10.1" Digital Screen Container */}
          <div 
            className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner relative flex flex-col min-h-[580px] sm:min-h-[640px]"
            style={{ 
              backgroundColor: '#0c1626',
              filter: `brightness(${brightness / 100})`,
            }}
          >
            {/* Screen Top Status Bar */}
            <div className="px-4 py-2.5 bg-[#08101d] border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 select-none">
              <div className="flex items-center gap-3">
                <SumiLogo variant="light" className="h-6 w-auto" />
                <span className="text-[11px] font-mono tracking-widest text-teal-400 font-bold uppercase">
                  NEEDLE - FREE INJECTOR
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  MODEL: SUMI THE CELLJET
                </span>
              </div>

              {/* Utility Tools: Brightness, Sound, Pressure Check, Log View, PIN */}
              <div className="flex items-center gap-2">
                {/* Pressure Check Trigger */}
                <button
                  type="button"
                  onClick={() => setIsPressureCheckOpen(true)}
                  className="px-2 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-[11px] text-teal-300 font-mono border border-slate-700 flex items-center gap-1 transition-colors"
                  title="솔레노이드 챔버 압력 파형 점검"
                >
                  <Activity className="w-3 h-3 text-teal-400" />
                  <span className="hidden sm:inline">PRESSURE CHECK</span>
                </button>

                {/* Log View Trigger */}
                <button
                  type="button"
                  onClick={() => setIsLogViewOpen(true)}
                  className="px-2 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-[11px] text-sky-300 font-mono border border-slate-700 flex items-center gap-1 transition-colors"
                  title="누적 샷 및 타임스탬프 로그 보기"
                >
                  <FileText className="w-3 h-3 text-sky-400" />
                  <span className="hidden sm:inline">LOG VIEW</span>
                </button>

                {/* PIN Set Trigger */}
                <button
                  type="button"
                  onClick={() => setIsPinSetOpen(true)}
                  className="p-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  title="PIN 보안 접근 설정"
                  aria-label="PIN 보안 설정"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>

                {/* Sound toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  title={soundEnabled ? '사운드 켜짐' : '사운드 음소거'}
                  aria-label="사운드 토글"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-teal-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                {/* Brightness Control */}
                <div className="hidden md:flex items-center gap-1 pl-2 border-l border-slate-700">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-14 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-teal-400"
                    title={`화면 밝기: ${brightness}%`}
                  />
                </div>
              </div>
            </div>

            {/* Main Screen Content Grid: 3 Main Columns */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
              
              {/* === LEFT COLUMN: Treatment Area (SPECIAL, SCALP, FACE & NECK, BODY) === */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Treatment Area
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">
                      {currentMode.name}
                    </span>
                  </div>

                  {/* 4 Mode Grid Buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {CELLJET_MODES.map((mode) => {
                      const isSelected = currentMode.id === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => handleSelectMode(mode)}
                          className={`p-3.5 rounded-xl text-left border flex flex-col justify-between h-24 transition-all focus:outline-none relative overflow-hidden group ${
                            isSelected
                              ? 'bg-gradient-to-br from-teal-500/30 to-teal-900/60 border-teal-400 shadow-lg shadow-teal-500/20'
                              : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span 
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: mode.color }}
                            />
                            {isSelected && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-400 text-slate-950">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div>
                            <div className={`font-bold text-xs uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                              {mode.name.replace(' MODE', '')}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                              {mode.nameKr.split('(')[0]}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub Guide: Current Stage Guidance (1~3 / 4~6 / 7~9 Levels from Manual) */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-teal-300 border-b border-slate-800 pb-1.5">
                    <span>{currentMode.nameKr} 부위별 강도 가이드</span>
                    <span className="font-mono text-slate-400">CURRENT: {intensity}단계</span>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    {currentMode.id === 'face-neck' && (
                      <>
                        <p className={intensity >= 1 && intensity <= 3 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 1~3단계: 이마, 눈가, 미간, 눈밑 (섬세 케어)
                        </p>
                        <p className={intensity >= 4 && intensity <= 6 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 4~6단계: 중안면, 코, 심술보, 턱라인 (V라인)
                        </p>
                        <p className={intensity >= 7 && intensity <= 9 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 7~9단계: 목주름, 이중턱 리프팅
                        </p>
                      </>
                    )}
                    {currentMode.id === 'scalp' && (
                      <>
                        <p className={intensity >= 1 && intensity <= 3 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 1~3단계: 헤어라인, 측두부, 전두부
                        </p>
                        <p className={intensity >= 4 && intensity <= 6 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 4~6단계: 후두부, 정수리 탈모 집중
                        </p>
                        <p className={intensity >= 7 && intensity <= 9 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 7~9단계: 경추 및 두피 주요 혈자리 자극
                        </p>
                      </>
                    )}
                    {currentMode.id === 'special' && (
                      <>
                        <p className={intensity >= 1 && intensity <= 3 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 1~3단계: 외음부 초민감 스킨 케어
                        </p>
                        <p className={intensity >= 4 && intensity <= 6 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 4~6단계: Y존(서혜부) 림프 순환 케어
                        </p>
                        <p className={intensity >= 7 && intensity <= 9 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 7~9단계: 골반저 및 엉덩이 밑 탄력 케어
                        </p>
                      </>
                    )}
                    {currentMode.id === 'body' && (
                      <>
                        <p className={intensity >= 1 && intensity <= 3 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 1~3단계: 림프절 순환 관리 (안전 단발 1Hz)
                        </p>
                        <p className={intensity >= 4 && intensity <= 6 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 4~6단계: 국소 통증/다이어트 (팔뚝, 등살, 허벅지)
                        </p>
                        <p className={intensity >= 7 && intensity <= 9 ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          · 7~9단계: 복부 다이어트 슬리밍
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* === CENTER COLUMN: Shot/Second (Hz) & Intensity (1~9) Controls === */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                
                {/* 1. Shot / Second (Frequency Control) Box */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      Shot / Second
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">
                      {currentMode.id === 'body' ? 'SINGLE TRIGGER (1 Hz)' : 'UP TO 5 Hz'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 py-3 px-4 rounded-xl bg-black/60 border border-slate-700 flex items-center justify-center">
                      <span className="text-3xl font-extrabold font-mono text-teal-300">
                        {shotFrequency}
                      </span>
                      <span className="text-xs font-mono text-slate-400 ml-1.5 self-end mb-1">
                        HZ
                      </span>
                    </div>

                    {/* Up / Down Arrows */}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={handleIncreaseFrequency}
                        disabled={currentMode.id === 'body' || shotFrequency >= 5}
                        className="w-10 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-700 flex items-center justify-center text-teal-400 active:scale-95 transition-all"
                        aria-label="주파수 증가"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDecreaseFrequency}
                        disabled={currentMode.id === 'body' || shotFrequency <= 1}
                        className="w-10 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-700 flex items-center justify-center text-teal-400 active:scale-95 transition-all"
                        aria-label="주파수 감소"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-2">
                    {shotFrequency === 5 ? '⚡ 최고속 연속 펄스 (통증 분산 극대화)' : `${shotFrequency}회/초 균일 제트 펄스`}
                  </div>
                </div>

                {/* 2. Intensity (1~9 Level) Box */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-sky-400" />
                      Intensity
                    </span>
                    <span className="text-[10px] text-sky-400 font-mono">
                      SOLENOID POWER (1~9)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 py-3 px-4 rounded-xl bg-black/60 border border-slate-700 flex items-center justify-between">
                      <span className="text-3xl font-extrabold font-mono text-sky-300">
                        {intensity}
                      </span>
                      {/* 9-bar indicator visual */}
                      <div className="flex items-end gap-1 h-6">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 rounded-xs transition-all ${
                              i < intensity ? 'bg-sky-400' : 'bg-slate-800'
                            }`}
                            style={{ height: `${(i + 1) * 11}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Up / Down Arrows */}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={handleIncreaseIntensity}
                        disabled={intensity >= 9}
                        className="w-10 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-700 flex items-center justify-center text-sky-400 active:scale-95 transition-all"
                        aria-label="강도 증가"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDecreaseIntensity}
                        disabled={intensity <= 1}
                        className="w-10 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-700 flex items-center justify-center text-sky-400 active:scale-95 transition-all"
                        aria-label="강도 감소"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-2 flex items-center justify-between">
                    <span>압력: 약 {20 + intensity * 0.5} MPa</span>
                    <span>침투 깊이: 약 {(1.5 + intensity * 0.2).toFixed(1)} mm</span>
                  </div>
                </div>

                {/* 3. Firing Controls & Trigger */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-sky-950/40 border border-teal-500/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">누적 실린더 분사량</div>
                    <div className="text-base font-mono font-bold text-white">
                      {injectedDose} <span className="text-xs text-teal-400">/ 0.50 cc</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSingleShotTest}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 flex items-center gap-1 active:scale-95 transition-all"
                      title="1회 정량 시험 분사"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>단발 분사</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleRunning}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all active:scale-95 ${
                        isRunning
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                      }`}
                    >
                      {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                      <span>{isRunning ? '일시 정지' : 'START 분사'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* === RIGHT COLUMN: Handpiece Graphic with Interactive Dual Touch Sensors === */}
              <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900/60 rounded-2xl border border-slate-800 p-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Handpiece Sensor Control
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      CONNECTED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    핸드피스 원형 모듈의 독립 터치 센서를 눌러 미세진동과 630nm LED를 켜거나 끌 수 있습니다.
                  </p>

                  {/* Applicator graphic with live LED & vibration rings */}
                  <div className="relative h-44 rounded-xl bg-black/50 border border-slate-800 overflow-hidden flex items-center justify-center">
                    <img
                      src="/thecelljet1.svg"
                      alt="THE CELLJET 핸드피스 원본 모듈"
                      className={`h-36 object-contain transition-transform duration-300 ${
                        vibrationActive ? 'animate-[wiggle_0.5s_ease-in-out_infinite]' : ''
                      }`}
                    />

                    {/* RED LED 630nm Glow Simulation */}
                    {ledActive && (
                      <div className="absolute top-1/4 right-8 w-16 h-16 rounded-full bg-red-600/40 blur-xl pointer-events-none animate-pulse" />
                    )}

                    {/* Firing Jet Shockwave Effect */}
                    {isRunning && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 rounded-full border-2 border-teal-400 animate-ping opacity-75" />
                        <span className="text-[10px] font-mono text-teal-300 font-bold bg-black/80 px-2 py-0.5 rounded shadow">
                          5Hz PULSING
                        </span>
                      </div>
                    )}

                    {/* Hotspot triggers on gun */}
                    {hotspots.map((hs) => (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                        className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/80 hover:bg-teal-300 border-2 border-slate-900 shadow-md flex items-center justify-center text-[10px] font-bold text-slate-950 transition-transform hover:scale-125"
                        style={{ top: hs.top, left: hs.left }}
                        title={hs.title}
                      >
                        +
                      </button>
                    ))}
                  </div>

                  {/* Hotspot detail popup */}
                  {activeHotspot && (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-800 text-xs border border-teal-500/40 animate-in fade-in">
                      <div className="flex items-center justify-between font-bold text-teal-300">
                        <span>{hotspots.find((h) => h.id === activeHotspot)?.title}</span>
                        <button type="button" onClick={() => setActiveHotspot(null)} className="text-slate-400 hover:text-white">✕</button>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {hotspots.find((h) => h.id === activeHotspot)?.desc}
                      </p>
                    </div>
                  )}
                </div>

                {/* Handpiece 2 Touch Sensor Buttons (Manual Chapter 3, Page 13) */}
                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                  {/* 1. Low Frequency Vibration Sensor */}
                  <button
                    type="button"
                    onClick={() => setVibrationActive(!vibrationActive)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      vibrationActive
                        ? 'bg-teal-950/60 border-teal-400 text-teal-200 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Radio className="w-3.5 h-3.5" />
                      <span className={`w-2 h-2 rounded-full ${vibrationActive ? 'bg-teal-400 animate-ping' : 'bg-slate-700'}`} />
                    </div>
                    <div className="mt-1">
                      <div className="font-bold text-[11px]">미세진동 센서</div>
                      <div className="text-[9px] font-mono">{vibrationActive ? 'ON (통증분산)' : 'OFF'}</div>
                    </div>
                  </button>

                  {/* 2. Red LED (630nm) Sensor */}
                  <button
                    type="button"
                    onClick={() => setLedActive(!ledActive)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      ledActive
                        ? 'bg-red-950/60 border-red-500 text-red-200 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sun className="w-3.5 h-3.5" />
                      <span className={`w-2 h-2 rounded-full ${ledActive ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`} />
                    </div>
                    <div className="mt-1">
                      <div className="font-bold text-[11px]">630nm RED LED</div>
                      <div className="text-[9px] font-mono">{ledActive ? 'ON (재생·진정)' : 'OFF'}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row Controls: Save, Memory 1~5, SHOT COUNT, START */}
            <div className="px-4 py-3 bg-[#08101d] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
              
              {/* Memory Function Keys (Memory 1~5) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSaveCurrentToMemory}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 text-[11px] font-mono transition-colors"
                  title="현재 설정 저장"
                >
                  <Save className="w-3.5 h-3.5 text-teal-400" />
                  <span className="hidden sm:inline">SAVE</span>
                </button>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((slot) => {
                    const isMemActive = activeMemorySlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleRecallMemory(slot)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                          isMemActive
                            ? 'bg-teal-400 text-slate-950 shadow-md ring-2 ring-teal-400/50'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                        title={`Memory ${slot} 프리셋 호출`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Shot Count Display */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-black/80 border border-slate-800 flex items-center gap-2 text-[11px] font-mono">
                  <span className="text-slate-400">SHOT COUNT:</span>
                  <span className="text-teal-300 font-bold tracking-widest text-sm">
                    {String(shotCount).padStart(6, '0')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDemoModal(`${currentMode.nameKr} (${shotFrequency}Hz / ${intensity}단계)`)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>데모 상담</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODAL 1: PRESSURE CHECK (Real Square Wave Waveform Diagnostic) */}
        {/* ========================================================= */}
        {isPressureCheckOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-xl bg-[#08101d] rounded-2xl border-2 border-teal-500/50 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-400" />
                  <span className="font-mono font-bold text-base text-teal-300">PRESSURE CHECK (실시간 압력 점검)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPressureCheckOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                솔레노이드 챔버 내부 제트 역학에 대한 실시간 진단 시각화입니다.
                일반적으로 계단형(Square Wave) 표준 패턴으로 표시되며, 펄스 지속 시간(7~17ms), 전류 진폭 및 응답 안정성을 검증합니다.
              </p>

              {/* Square Wave Graphic from Manual Page 11 */}
              <div className="p-4 rounded-xl bg-black border border-slate-700/80 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>SQUARE WAVE DIAGNOSTIC</span>
                  <span className="text-teal-400 font-bold">OPTIMAL STATUS (정상)</span>
                </div>
                <div className="h-32 w-full flex items-center justify-center">
                  <svg className="w-full h-28" viewBox="0 0 500 120" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
                    {/* Square waveform pulses */}
                    <path
                      d="M 10 100 L 40 100 L 40 30 L 90 30 L 90 100 L 140 100 L 140 30 L 190 30 L 190 100 L 240 100 L 240 30 L 290 30 L 290 100 L 340 100 L 340 30 L 390 30 L 390 100 L 440 100 L 440 30 L 490 30"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 border-t border-slate-800 pt-2">
                  <span>Pulse Duration: 12.4 ms (36-step)</span>
                  <span>Pressure: 22.8 MPa</span>
                  <span>Temperature: 36.4 °C (Safe &lt; 70°C)</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPressureCheckOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950"
                >
                  점검 완료 및 닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 2: LOG VIEW (Actual 1,000,000 Shot Lifespan & Records) */}
        {/* ========================================================= */}
        {isLogViewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-[#08101d] rounded-2xl border-2 border-sky-500/50 p-6 text-white shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sky-400" />
                    <span className="font-mono font-bold text-base text-sky-300">LOG VIEW (작동 기록 데이터베이스)</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">
                    TOTALSHOT: {shotCount} / 1,000,000 (핸드피스 수명 1,000,000회 인증)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLogViewOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              {/* Exact Log Table from Manual Page 12 */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-black/60 mb-4">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">타임스탬프 (날짜/시간)</th>
                      <th className="py-2 px-3">발사 횟수</th>
                      <th className="py-2 px-3">온도 (TH)</th>
                      <th className="py-2 px-3">전류 (A)</th>
                      <th className="py-2 px-3">모드 / 상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:59:38</td>
                      <td className="py-2 px-3 font-bold">63 shot</td>
                      <td className="py-2 px-3">TH: 30.1°C</td>
                      <td className="py-2 px-3">A: 0.156</td>
                      <td className="py-2 px-3 text-emerald-400">정상 통과</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:58:38</td>
                      <td className="py-2 px-3 font-bold">40 shot</td>
                      <td className="py-2 px-3">TH: 28.6°C</td>
                      <td className="py-2 px-3">A: 0.421</td>
                      <td className="py-2 px-3 text-emerald-400">정상 통과</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:57:38</td>
                      <td className="py-2 px-3 font-bold">48 shot</td>
                      <td className="py-2 px-3">TH: 27.3°C</td>
                      <td className="py-2 px-3">A: 0.156</td>
                      <td className="py-2 px-3 text-emerald-400">정상 통과</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:56:38</td>
                      <td className="py-2 px-3 font-bold">29 shot</td>
                      <td className="py-2 px-3">TH: 25.8°C</td>
                      <td className="py-2 px-3">A: 0.311</td>
                      <td className="py-2 px-3 text-emerald-400">정상 통과</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:55:38</td>
                      <td className="py-2 px-3 font-bold">13 shot</td>
                      <td className="py-2 px-3">TH: 24.6°C</td>
                      <td className="py-2 px-3">A: 0.468</td>
                      <td className="py-2 px-3 text-emerald-400">정상 통과</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2 px-3 text-teal-300">2026/10/11 14:54:38</td>
                      <td className="py-2 px-3 font-bold">54 shot</td>
                      <td className="py-2 px-3">TH: 23.8°C</td>
                      <td className="py-2 px-3">A: 0.229</td>
                      <td className="py-2 px-3 text-emerald-400">S/V 출고 테스트</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>* S/V 출고 시 10,000샷 사전 신뢰성 테스트 통과</span>
                <button
                  type="button"
                  onClick={() => setIsLogViewOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-slate-950"
                >
                  확인 완료
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 3: PIN SET (Security Keypad from Manual Page 10, 11) */}
        {/* ========================================================= */}
        {isPinSetOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-sm bg-[#08101d] rounded-2xl border-2 border-slate-700 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="font-mono font-bold text-sm text-teal-300">NEW PIN CODE 설정</span>
                <button type="button" onClick={() => setIsPinSetOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              {/* Pin Display */}
              <div className="py-3 px-4 rounded-xl bg-black border border-slate-700 text-center font-mono text-2xl tracking-widest text-teal-400 mb-4 h-14 flex items-center justify-center">
                {enteredPin ? '•'.repeat(enteredPin.length) : '4자리 입력'}
              </div>

              {/* Number Pad (1~9, Del, 0, Enter) */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      if (enteredPin.length < 4) setEnteredPin(enteredPin + n);
                    }}
                    className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-mono text-lg font-bold"
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setEnteredPin('')}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-mono text-xs text-rose-400 font-bold"
                >
                  Del
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (enteredPin.length < 4) setEnteredPin(enteredPin + '0');
                  }}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-mono text-lg font-bold"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (enteredPin.length === 4) {
                      setPinCode(enteredPin);
                      setIsPinSetOpen(false);
                      setEnteredPin('');
                    }
                  }}
                  className="py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Treatment Log & Direct Customization Panel */}
        <div className="mt-8 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
                  TREATMENT &amp; CARE TELEMETRY LOGS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-500/40">
                  직접 수정 가능
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                실시간 케어 로그 &amp; 파라미터 기록 관리
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                분사 테스트 시 실시간으로 기록되며, 로그 항목의 메모 및 수치를 사용자가 직접 수정하거나 추가할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLogs([])}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>로그 전체 삭제</span>
                </button>
              )}
            </div>
          </div>

          {/* New Custom Log Input Bar */}
          <div className="mt-4 p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={newLogNote}
                onChange={(e) => setNewLogNote(e.target.value)}
                placeholder="새로운 스킨케어 로그 메모를 직접 입력하세요 (예: 얼굴·목 모드 5단계, 0.5cc ATON PLUS FS 침투 완료)"
                className="w-full px-3.5 py-2 text-xs bg-slate-900 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-teal-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomLog();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleAddCustomLog}
              disabled={!newLogNote.trim()}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all disabled:opacity-40 flex items-center justify-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>로그 직접 추가</span>
            </button>
          </div>

          {/* Log Entries List */}
          <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                기록된 케어 로그가 없습니다. 위 '단발 분사' 또는 'START 분사' 버튼을 누르거나 직접 로그를 입력하세요.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl border border-slate-800 hover:border-teal-500/40 bg-slate-950/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-teal-400 bg-slate-900 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                        {log.time}
                      </span>
                      <span className="font-bold text-white">
                        {log.mode}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {log.dose} · {log.frequency} · {log.intensity}단계
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                        {log.status}
                      </span>
                    </div>

                    {editingLogId === log.id ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={editingNote}
                          onChange={(e) => setEditingNote(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-teal-500 focus:outline-none text-xs bg-slate-900 text-white"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(log.id);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(log.id)}
                          className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-teal-400"
                        >
                          <Save className="w-3 h-3" />
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingLogId(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <p className="text-slate-300 font-medium mt-0.5 leading-relaxed">
                        {log.note}
                      </p>
                    )}
                  </div>

                  {editingLogId !== log.id && (
                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(log)}
                        className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-slate-900 rounded-lg transition-colors"
                        title="로그 메모 수정"
                        aria-label="로그 수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                        title="로그 삭제"
                        aria-label="로그 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
