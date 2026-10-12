import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Code2, Link as LinkIcon, RefreshCw, Check, Eye, Sliders, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useLogo, LogoConfig } from '../../context/LogoContext';

export const LogoEditorModal: React.FC = () => {
  const { config, isEditorOpen, closeEditor, saveConfig, resetConfig } = useLogo();

  const [activeTab, setActiveTab] = useState<'upload' | 'svg' | 'url'>('upload');
  const [tempType, setTempType] = useState<'default' | 'image' | 'svg'>(config.logoType);
  const [tempSrc, setTempSrc] = useState<string>(config.logoSrc);
  const [tempSvgCode, setTempSvgCode] = useState<string>(config.customSvgCode);
  const [tempScale, setTempScale] = useState<number>(config.logoScale || 100);
  const [tempAutoInvert, setTempAutoInvert] = useState<boolean>(config.autoInvertOnDark);
  const [urlInput, setUrlInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isEditorOpen) {
      setTempType(config.logoType);
      setTempSrc(config.logoSrc);
      setTempSvgCode(config.customSvgCode || '');
      setTempScale(config.logoScale || 100);
      setTempAutoInvert(config.autoInvertOnDark ?? true);
      setStatusMessage('');
      setErrorMessage('');

      // If user currently uses raw SVG, default to SVG tab
      if (config.logoType === 'svg') {
        setActiveTab('svg');
      } else if (config.logoSrc && config.logoSrc.startsWith('http')) {
        setActiveTab('url');
        setUrlInput(config.logoSrc);
      } else {
        setActiveTab('upload');
      }
    }
  }, [isEditorOpen, config]);

  if (!isEditorOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('파일 크기가 너무 큽니다. (최대 5MB 이하의 이미지 또는 SVG 파일을 선택해주세요)');
      return;
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgContent = event.target?.result as string;
        setTempSvgCode(svgContent);
        setTempType('svg');
        setStatusMessage(`SVG 파일 '${file.name}'을 성공적으로 불러왔습니다.`);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setTempSrc(dataUrl);
        setTempType('image');
        setStatusMessage(`이미지 파일 '${file.name}'을 성공적으로 등록했습니다.`);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('지원하지 않는 파일 형식입니다. PNG, JPG, SVG, WebP 파일을 선택해주세요.');
    }
  };

  // Handle apply URL
  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('이미지 URL을 입력해주세요.');
      return;
    }
    setTempSrc(urlInput.trim());
    setTempType('image');
    setStatusMessage('입력하신 이미지 URL이 미리보기에 등록되었습니다.');
    setErrorMessage('');
  };

  // Save changes
  const handleSave = () => {
    const newConfig: Partial<LogoConfig> = {
      logoType: tempType,
      logoSrc: tempSrc,
      customSvgCode: tempSvgCode,
      logoScale: tempScale,
      autoInvertOnDark: tempAutoInvert,
    };

    saveConfig(newConfig);
    closeEditor();
  };

  // Reset to original
  const handleReset = () => {
    if (window.confirm('기본 로고 디자인으로 초기화하시겠습니까?')) {
      resetConfig();
      setTempType('default');
      setTempSrc('/sumi-logo.svg');
      setTempSvgCode('');
      setTempScale(100);
      setTempAutoInvert(true);
      setStatusMessage('기본 로고로 초기화되었습니다.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-editor-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeEditor}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="로고 편집기 닫기 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-[#006a61]">
            BRAND ASSET CUSTOMIZER
          </span>
          <span className="text-xs text-slate-400 font-medium">실시간 전역 반영</span>
        </div>

        <h2 id="logo-editor-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          로고 직접 수정 & 커스텀 관리
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
          원하는 로고 이미지(PNG, JPG, SVG)를 직접 업로드하거나 SVG 코드를 자유롭게 편집하여 사이트 전체에 즉시 반영할 수 있습니다.
        </p>

        {/* Notifications */}
        {statusMessage && (
          <div className="mb-4 p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Dual Live Preview Box */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              실시간 미리보기 (Live Preview)
            </span>
            <span className="text-[11px] text-slate-400">
              배율: {tempScale}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Light Preview (Header/Content) */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center min-h-[100px]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 self-start">
                밝은 배경 (네비게이션 / 본문)
              </span>
              <div
                className="flex items-center justify-center py-2 max-w-full overflow-hidden"
                style={{ transform: `scale(${tempScale / 100})`, transformOrigin: 'center center' }}
              >
                {tempType === 'svg' && tempSvgCode ? (
                  <div
                    className="max-h-12 w-auto flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: tempSvgCode }}
                  />
                ) : (
                  <img
                    src={tempSrc || '/sumi-logo.svg'}
                    alt="Preview"
                    className="max-h-12 w-auto object-contain"
                  />
                )}
              </div>
            </div>

            {/* 2. Dark Preview (Footer/HUD) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-2xs flex flex-col items-center justify-center min-h-[100px]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 self-start">
                어두운 배경 (푸터 / HUD)
              </span>
              <div
                className={`flex items-center justify-center py-2 max-w-full overflow-hidden ${
                  tempAutoInvert ? 'brightness-0 invert' : ''
                }`}
                style={{ transform: `scale(${tempScale / 100})`, transformOrigin: 'center center' }}
              >
                {tempType === 'svg' && tempSvgCode ? (
                  <div
                    className="max-h-12 w-auto flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: tempSvgCode }}
                  />
                ) : (
                  <img
                    src={tempSrc || '/sumi-logo.svg'}
                    alt="Preview"
                    className="max-h-12 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 focus:outline-none ${
              activeTab === 'upload'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>이미지 파일 업로드</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('svg')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 focus:outline-none ${
              activeTab === 'svg'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>SVG 코드 직접 편집</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 focus:outline-none ${
              activeTab === 'url'
                ? 'border-[#00c4b4] text-[#006a61]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>이미지 URL 링크</span>
          </button>
        </div>

        {/* Tab 1: Upload File */}
        {activeTab === 'upload' && (
          <div className="space-y-4 mb-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-2xl p-8 text-center cursor-pointer bg-teal-50/40 hover:bg-teal-50 transition-colors flex flex-col items-center justify-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                컴퓨터에서 로고 파일 선택 또는 드래그 앤 드롭
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, SVG, WebP 파일 지원 (최대 5MB)
              </p>
              <span className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#00c4b4] text-[#00201d] shadow-sm hover:shadow transition-shadow">
                파일 찾아보기
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              💡 업로드하신 로고는 브라우저 저장소(localStorage)에 안전하게 저장되어 즉시 전역 적용됩니다.
            </p>
          </div>
        )}

        {/* Tab 2: SVG Editor */}
        {activeTab === 'svg' && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="svg-code-input" className="text-xs font-bold text-slate-700">
                SVG 마크업 코드 편집:
              </label>
              <span className="text-[11px] text-slate-400">
                &lt;svg ... &gt; 태그 전체를 붙여넣으세요
              </span>
            </div>
            <textarea
              id="svg-code-input"
              rows={8}
              value={tempSvgCode}
              onChange={(e) => {
                setTempSvgCode(e.target.value);
                setTempType('svg');
              }}
              placeholder="<svg viewBox='0 0 540 310' ...> ... </svg>"
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-slate-900 text-teal-300"
            />
          </div>
        )}

        {/* Tab 3: URL Input */}
        {activeTab === 'url' && (
          <div className="space-y-4 mb-6">
            <label htmlFor="logo-url-input" className="text-xs font-bold text-slate-700 block">
              웹 이미지 URL 주소:
            </label>
            <div className="flex gap-2">
              <input
                id="logo-url-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-white hover:bg-slate-900 transition-colors"
              >
                적용
              </button>
            </div>
          </div>
        )}

        {/* Fine Tuning Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sliders className="w-3.5 h-3.5 text-teal-600" />
            세부 디스플레이 설정
          </div>

          {/* Scale Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>로고 크기 / 배율 조절:</span>
              <span className="font-mono font-bold text-teal-700">{tempScale}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="140"
              step="5"
              value={tempScale}
              onChange={(e) => setTempScale(Number(e.target.value))}
              className="w-full accent-[#00c4b4] cursor-pointer"
            />
          </div>

          {/* Invert Toggle */}
          <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer pt-1 border-t border-slate-200">
            <div>
              <span className="font-semibold block">어두운 배경에서 자동 흰색 반전</span>
              <span className="text-[11px] text-slate-400">푸터 및 다크 패널에서 로고가 선명하게 표시됩니다.</span>
            </div>
            <input
              type="checkbox"
              checked={tempAutoInvert}
              onChange={(e) => setTempAutoInvert(e.target.checked)}
              className="w-4 h-4 rounded text-[#00c4b4] focus:ring-teal-400 accent-[#00c4b4] cursor-pointer"
            />
          </label>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>기본 로고로 초기화</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeEditor}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-teal shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>로고 적용 완료</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
