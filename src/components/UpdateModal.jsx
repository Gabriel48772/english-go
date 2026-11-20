import React, { useState } from 'react';
import { RefreshCw, Sparkles, CheckCircle2, Download, X, ArrowUpCircle } from 'lucide-react';
import { CURRENT_APP_VERSION, applyUpdate, checkForUpdates } from '../services/updateService';
import { sounds } from '../utils/audio';

export const UpdateModal = ({
  isOpen,
  onClose,
  updateInfo,
  isManual = false
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkState, setCheckState] = useState('idle'); // 'idle', 'checking', 'upToDate', 'hasUpdate'
  const [foundInfo, setFoundInfo] = useState(updateInfo);

  if (!isOpen) return null;

  const handleApplyUpdate = async () => {
    sounds.playWin();
    setIsUpdating(true);
    await applyUpdate();
  };

  const handleManualCheck = async () => {
    sounds.playClick();
    setCheckState('checking');
    try {
      const res = await checkForUpdates();
      if (res.hasUpdate) {
        setFoundInfo(res);
        setCheckState('hasUpdate');
      } else {
        setCheckState('upToDate');
      }
    } catch {
      setCheckState('upToDate');
    }
  };

  // Test update flow simulator (so user can see how it works anytime)
  const handleSimulateUpdate = () => {
    sounds.playCorrect();
    setFoundInfo({
      hasUpdate: true,
      latestVersion: '1.0.2',
      releaseNotes: '¡Nueva Unidad 5 desbloqueada con 40 frases cotidianas, audio mejorado y modo oscuro perfeccionado!'
    });
    setCheckState('hasUpdate');
  };

  const hasUpdateToInstall = foundInfo?.hasUpdate || checkState === 'hasUpdate';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30 mb-4 animate-bounce-slow">
          <ArrowUpCircle size={36} strokeWidth={2.5} />
        </div>

        <h3 className="text-xl font-black text-white mb-1">
          {hasUpdateToInstall
            ? '¡Nueva Actualización Disponible!'
            : 'Centro de Actualizaciones'}
        </h3>

        <div className="text-xs text-slate-400 mb-4">
          Versión actual instalada: <span className="font-mono text-emerald-400 font-bold">v{CURRENT_APP_VERSION}</span>
        </div>

        {/* Content based on update status */}
        {hasUpdateToInstall ? (
          <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 mb-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Nueva versión: v{foundInfo?.latestVersion || '1.0.2'}
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                Lista para instalar
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {foundInfo?.releaseNotes || 'Nuevas mejoras, correcciones y lecciones añadidas.'}
            </p>
            <div className="mt-3 pt-2 border-t border-slate-750 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-400 flex-shrink-0" />
              <span>Se actualiza en 1 segundo sin desinstalar ni perder tu progreso.</span>
            </div>
          </div>
        ) : (
          <div className="my-4">
            {checkState === 'checking' ? (
              <div className="flex flex-col items-center py-4">
                <RefreshCw size={28} className="animate-spin text-emerald-400 mb-2" />
                <span className="text-xs text-slate-300">Buscando nuevas actualizaciones...</span>
              </div>
            ) : checkState === 'upToDate' ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold mb-3">
                <CheckCircle2 size={18} />
                <span>¡Tu aplicación ya tiene la última versión!</span>
              </div>
            ) : (
              <p className="text-xs text-slate-300 mb-4">
                Puedes buscar nuevas versiones con lecciones añadidas en cualquier momento.
              </p>
            )}

            <button
              onClick={handleManualCheck}
              disabled={checkState === 'checking'}
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 active:scale-95 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 mb-2"
            >
              <RefreshCw size={14} className={checkState === 'checking' ? 'animate-spin' : ''} />
              <span>Buscar Actualización Ahora</span>
            </button>

            {/* Test button so user can experience the flow right now */}
            <button
              onClick={handleSimulateUpdate}
              className="text-[11px] text-slate-500 hover:text-slate-400 underline decoration-dotted"
            >
              (Probar cómo se ve al detectar una versión nueva)
            </button>
          </div>
        )}

        {/* Action Button */}
        {hasUpdateToInstall ? (
          <div className="space-y-2">
            <button
              onClick={handleApplyUpdate}
              disabled={isUpdating}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {isUpdating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Actualizando...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>ACTUALIZAR AHORA</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Recordar más tarde
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs rounded-xl"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};
