import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, Eye, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useLogo } from './LogoContext';

interface AdminEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  enableEditMode: () => void;
  disableEditMode: () => void;
}

const STORAGE_KEY = 'thecelljet_admin_edit_mode_v1';

const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined);

export const AdminEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('edit') === 'true' || urlParams.get('admin') === 'true' || urlParams.get('dev') === 'true') {
          return true;
        }
        if (urlParams.get('edit') === 'false' || urlParams.get('admin') === 'false') {
          return false;
        }
        return localStorage.getItem(STORAGE_KEY) === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (isEditMode) {
        localStorage.setItem(STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isEditMode]);

  // URL query parameter check on mount and popstate
  useEffect(() => {
    const checkUrl = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('edit') === 'true' || urlParams.get('admin') === 'true' || urlParams.get('dev') === 'true') {
          setIsEditMode(true);
          showToast('🛠️ 작업자 편집 모드가 활성화되었습니다. (이미지 및 로고 교체 버튼 표시)');
        } else if (urlParams.get('edit') === 'false' || urlParams.get('admin') === 'false') {
          setIsEditMode(false);
          showToast('🔒 일반 유저 보기 모드로 전환되었습니다. (모든 교체 도구 숨김)');
        }
      } catch {
        // ignore
      }
    };
    checkUrl();
    window.addEventListener('popstate', checkUrl);
    return () => window.removeEventListener('popstate', checkUrl);
  }, []);

  // Keyboard shortcut listener: Alt + Shift + E or Ctrl + Shift + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) ||
          (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e'))) {
        e.preventDefault();
        setIsEditMode((prev) => {
          const next = !prev;
          if (next) {
            showToast('🛠️ 작업자 편집 모드가 활성화되었습니다. (이미지 및 로고 교체 도구 활성화)');
          } else {
            showToast('🔒 일반 유저 보기 모드로 전환되었습니다. (교체 도구 비활성화)');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (next) {
        showToast('🛠️ 작업자 편집 모드가 활성화되었습니다.');
      } else {
        showToast('🔒 일반 유저 보기 모드로 전환되었습니다.');
      }
      return next;
    });
  };

  const enableEditMode = () => {
    setIsEditMode(true);
    showToast('🛠️ 작업자 편집 모드가 활성화되었습니다.');
  };

  const disableEditMode = () => {
    setIsEditMode(false);
    showToast('🔒 일반 유저 보기 모드로 전환되었습니다.');
  };

  return (
    <AdminEditContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        enableEditMode,
        disableEditMode,
      }}
    >
      {children}

      {/* Temporary Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-50 bg-slate-900/95 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-teal-500/50 backdrop-blur-md flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Worker Toolbar: ONLY VISIBLE when isEditMode is true */}
      {isEditMode && <AdminToolbar onDisable={disableEditMode} />}
    </AdminEditContext.Provider>
  );
};

const AdminToolbar: React.FC<{ onDisable: () => void }> = ({ onDisable }) => {
  const { openEditor } = useLogo();
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="px-3 py-1.5 rounded-full bg-slate-900/95 text-teal-300 hover:text-white border border-teal-500/40 text-xs font-semibold shadow-xl flex items-center gap-1.5 backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          title="작업자 편집 도구 모음 펼치기"
        >
          <Settings className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
          <span>작업자 모드 ON</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-slate-950/95 text-white rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-teal-500/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide">
            작업자 전용 편집 모드
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="text-[11px] text-slate-400 hover:text-white transition-colors"
          title="최소화"
        >
          접기
        </button>
      </div>

      <div className="mt-2.5 text-[11px] text-slate-300 leading-relaxed space-y-1">
        <div className="flex items-center gap-1.5 text-teal-300 font-medium">
          <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
          <span>화면 상의 장비 사진 및 로고 교체 버튼 활성화됨</span>
        </div>
        <p className="text-slate-400 text-[10px]">
          일반 방문자에게는 이 툴바 및 모든 이미지 교체 버튼이 전혀 보이지 않습니다. (단축키: Alt + Shift + E)
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-2">
        <button
          type="button"
          onClick={openEditor}
          className="flex-1 py-1.5 px-2.5 rounded-lg bg-teal-600/90 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sliders className="w-3 h-3" />
          <span>로고 편집기</span>
        </button>

        <button
          type="button"
          onClick={onDisable}
          className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
          title="일반 사용자 모드로 전환하여 확인하기"
        >
          <Eye className="w-3 h-3 text-slate-400" />
          <span>일반 유저 모드로 보기</span>
        </button>
      </div>
    </div>
  );
};

export const useAdminEdit = () => {
  const ctx = useContext(AdminEditContext);
  if (!ctx) {
    throw new Error('useAdminEdit must be used within an AdminEditProvider');
  }
  return ctx;
};
