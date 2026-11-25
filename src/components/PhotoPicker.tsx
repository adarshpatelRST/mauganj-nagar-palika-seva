import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  CameraOff,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  RotateCw,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { SAMPLE_APP_SCREENSHOTS, SAMPLE_PHOTOS } from '../constants';
import { ICON_CIRCLE_THEMES, UI } from '../theme/tokens';
import { useApp } from '../store/AppContext';
import { resizeImageFile } from '../utils/format';

interface PhotoPickerProps {
  value?: string;
  onChange: (photoUrl?: string) => void;
  mode: 'before' | 'after' | 'app';
  error?: string;
  customSamples?: { src: string; label: string }[];
  cameraOnly?: boolean;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  value,
  onChange,
  mode,
  error,
  customSamples,
  cameraOnly = false,
}) => {
  const { t, language } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  // Stop camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async (targetFacing: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    setIsCameraOpen(true);

    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    try {
      if (
        typeof navigator === 'undefined' ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error('getUserMedia not supported');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: targetFacing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(() => { });
      }
    } catch {
      setCameraError(
        language === 'hi'
          ? 'लाइव कैमरा शुरू नहीं हो सका। कृपया कैमरा अनुमति दें अथवा नीचे दिए गए कैमरा बटन का उपयोग करें।'
          : 'Could not access live camera. Please grant camera permissions or use the camera fallback button below.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const switchCameraFacing = async () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    await startCamera(nextFacing);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onChange(dataUrl);
      }
    } catch {
      // Fallback if canvas snapshot fails
    } finally {
      setIsCapturing(false);
      stopCamera();
    }
  };

  const handleFallbackFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingFile(true);
    try {
      const dataUrl = await resizeImageFile(file);
      onChange(dataUrl);
    } catch {
      // Ignore failure
    } finally {
      setLoadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const sampleOptions =
    customSamples ||
    (mode === 'app'
      ? [
        {
          src: SAMPLE_APP_SCREENSHOTS.errorDialog,
          label:
            language === 'hi'
              ? 'ऐप नेटवर्क त्रुटि (नमूना)'
              : 'Network Error (Sample)',
        },
        {
          src: SAMPLE_APP_SCREENSHOTS.mapGlitch,
          label:
            language === 'hi'
              ? 'मैप/GPS लोडिंग त्रुटि (नमूना)'
              : 'Map/GPS Glitch (Sample)',
        },
      ]
      : mode === 'before'
        ? [
          { src: SAMPLE_PHOTOS.pothole, label: t.samplePotholeLabel },
          { src: SAMPLE_PHOTOS.garbage, label: t.sampleGarbageLabel },
        ]
        : [
          {
            src: SAMPLE_PHOTOS.repairedRoad,
            label: language === 'hi' ? 'मरम्मत की गई सड़क (नमूना)' : 'Repaired road (Sample)',
          },
          {
            src: SAMPLE_PHOTOS.cleanStreet,
            label: language === 'hi' ? 'साफ़ की गई सड़क (नमूना)' : 'Cleaned street (Sample)',
          },
        ]);

  // If live camera is actively open
  if (isCameraOpen) {
    return (
      <div className="space-y-2">
        <div className="relative rounded-[16px] overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-[var(--mnp-primary)] shadow-lg">
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Camera Viewfinder Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold flex items-center gap-1 shadow">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>{language === 'hi' ? '🔴 लाइव कैमरा' : '🔴 LIVE CAMERA'}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                {facingMode === 'environment'
                  ? language === 'hi'
                    ? 'बैक कैमरा'
                    : 'Rear Camera'
                  : language === 'hi'
                    ? 'फ्रंट कैमरा'
                    : 'Front Camera'}
              </span>
            </div>

            {/* Reticle / Viewfinder Frame */}
            <div className="mx-auto w-32 h-24 border border-dashed border-white/50 rounded-lg pointer-events-none" />

            <div className="text-center">
              <p className="text-[11px] font-semibold text-white/90 drop-shadow bg-black/40 px-2 py-0.5 rounded-full inline-block backdrop-blur-xs">
                {language === 'hi'
                  ? 'समस्या स्थल को फ्रेम में रखकर कैप्चर करें'
                  : 'Frame the civic problem & tap capture'}
              </p>
            </div>
          </div>

          {/* Camera Action Buttons Inside Viewfinder */}
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-5 pointer-events-auto">
            {/* Close camera */}
            <button
              type="button"
              onClick={stopCamera}
              className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all shadow"
              title={language === 'hi' ? 'कैमरा बंद करें' : 'Close Camera'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Shutter capture button */}
            <button
              type="button"
              disabled={isCapturing}
              onClick={takeSnapshot}
              className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center shadow-xl active:scale-90 transition-transform"
              title={language === 'hi' ? 'फोटो खींचें' : 'Capture Photo'}
            >
              <div className="w-13 h-13 rounded-full border-2 border-black/20 bg-red-600 hover:bg-red-700 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>

            {/* Flip Camera */}
            <button
              type="button"
              onClick={switchCameraFacing}
              className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all shadow"
              title={language === 'hi' ? 'कैमरा बदलें' : 'Flip Camera'}
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {cameraError && (
          <div className="p-2.5 rounded-[10px] bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold">{cameraError}</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-[8px] bg-[var(--mnp-primary)] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'डिवाइस कैमरा खोलें' : 'Open Device Camera'}</span>
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-3 py-1.5 rounded-[8px] border border-[var(--mnp-border)] text-xs font-bold"
              >
                {t.back}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Fallback Camera Input (Strictly capture="environment" - blocks gallery) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFallbackFileInput}
        className="hidden"
      />

      {cameraOnly && (
        <div className="rounded-[10px] bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 p-2.5 flex items-start gap-2 text-xs text-blue-900 dark:text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="font-bold">
              {language === 'hi'
                ? '🔒 केवल लाइव कैमरा मान्य (गैलरी प्रतिबंधित)'
                : '🔒 Live Camera Only (Gallery restricted)'}
            </p>
            <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-0.5">
              {language === 'hi'
                ? 'सत्यापन सुरक्षा नीति: शिकायत के स्थान पर उपस्थित होकर लाइव कैमरे से खींची गई फोटो ही स्वीकार की जाती है।'
                : 'Security policy: Photos must be taken live at the location. Prior gallery uploads are restricted.'}
            </p>
          </div>
        </div>
      )}

      {value ? (
        <div className={`${UI.card} overflow-hidden border border-[var(--mnp-border)]`}>
          <div className="relative">
            <img
              src={value}
              alt={mode === 'before' ? t.beforePhotoLabel : t.afterPhotoLabel}
              referrerPolicy="no-referrer"
              className="w-full h-48 object-cover bg-neutral-900"
            />
            {cameraOnly && (
              <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold flex items-center gap-1 shadow backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'लाइव फोटो सत्यापित' : 'Live Photo Verified'}</span>
              </span>
            )}
          </div>
          <div className="p-2 flex items-center justify-between gap-2 bg-[var(--mnp-surface)] border-t border-[var(--mnp-border)]">
            <button
              type="button"
              onClick={() => {
                if (cameraOnly) {
                  startCamera('environment');
                } else {
                  fileInputRef.current?.click();
                }
              }}
              className="min-h-[44px] px-3 rounded-[8px] text-xs font-bold text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <Camera className="w-4 h-4" />
              <span>
                {cameraOnly
                  ? language === 'hi'
                    ? 'पुनः लाइव फोटो खींचें'
                    : 'Retake Live Photo'
                  : t.uploadPhotoBtn}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="min-h-[44px] px-3 rounded-[8px] text-xs font-bold text-[var(--mnp-error)] hover:bg-[var(--mnp-error-bg)] flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-error)]"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.removePhoto}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {cameraOnly ? (
            /* Dedicated Live Camera Launcher Button */
            <button
              type="button"
              disabled={loadingFile}
              onClick={() => startCamera('environment')}
              className={`w-full min-h-[136px] rounded-[16px] border-2 border-dashed flex flex-col items-center justify-center gap-2 p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${error
                  ? 'border-[var(--mnp-error)] bg-[var(--mnp-error-bg)]'
                  : 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] hover:bg-[var(--mnp-primary)]/10'
                }`}
            >
              <span className="w-14 h-14 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shadow-md">
                <Camera className="w-7 h-7" />
              </span>
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[var(--mnp-text)] block">
                  {language === 'hi' ? '📷 लाइव कैमरा चालू करें' : '📷 Open Live Camera'}
                </span>
                <span className="text-xs text-[var(--mnp-text-muted)] block">
                  {language === 'hi'
                    ? 'मौके की ताज़ा फोटो लेने हेतु टैप करें'
                    : 'Tap to take a live photo of the issue'}
                </span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              disabled={loadingFile}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full min-h-[124px] rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center gap-2.5 p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${error
                  ? 'border-[var(--mnp-error)] bg-[var(--mnp-error-bg)]'
                  : 'border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                }`}
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center ${ICON_CIRCLE_THEMES.blue}`}
              >
                <Camera className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold text-[var(--mnp-text)]">
                {loadingFile
                  ? '...'
                  : mode === 'app'
                    ? language === 'hi'
                      ? 'स्क्रीनशॉट अपलोड करें'
                      : 'Upload Screenshot'
                    : t.uploadPhotoBtn}
              </span>
            </button>
          )}

          {/* Fallback button if WebRTC is not supported or browser prompts */}
          {cameraOnly && (
            <div className="flex justify-center pt-0.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-medium text-[var(--mnp-text-muted)] hover:text-[var(--mnp-primary)] underline flex items-center gap-1"
              >
                <Camera className="w-3 h-3" />
                <span>
                  {language === 'hi'
                    ? 'कैमरा नहीं खुला? डिवाइस कैमरे से खींचें'
                    : "Camera didn't open? Use device camera fallback"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sample photo grid: ONLY shown when cameraOnly is FALSE (e.g. app issues or standard mode) */}
      {!cameraOnly && (
        <div>
          <p className="text-xs font-semibold text-[var(--mnp-text-muted)] mb-2">
            {mode === 'app'
              ? language === 'hi'
                ? 'अथवा नमूना स्क्रीनशॉट चुनें (वैकल्पिक):'
                : 'Or select a sample screenshot (Optional):'
              : t.useSamplePhoto}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {sampleOptions.map((opt) => {
              const active = value === opt.src;
              return (
                <button
                  key={opt.src}
                  type="button"
                  onClick={() => onChange(opt.src)}
                  className={`min-h-[52px] p-1.5 rounded-[10px] border text-left flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${active
                      ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-1 ring-[var(--mnp-primary)]'
                      : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                    }`}
                >
                  <img
                    src={opt.src}
                    alt={opt.label}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-[8px] object-cover shrink-0 bg-[var(--mnp-surface-muted)]"
                  />
                  <span className="text-xs font-semibold text-[var(--mnp-text)] leading-tight line-clamp-2">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p className={`${UI.errorText} flex items-center gap-1`} role="alert">
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
