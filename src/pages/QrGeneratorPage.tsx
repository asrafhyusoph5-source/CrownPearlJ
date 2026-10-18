import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  QrCode,
  Sparkles,
  Download,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Palette,
  Layers,
  Sliders,
  ShieldCheck,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { getAllCertificates } from '../services/certificateService';

type QrMode = 'normal' | 'customized';
type DotStyle = 'square' | 'rounded' | 'dots' | 'diamond';
type EyeStyle = 'square' | 'rounded' | 'circle';
type CenterLogoType = 'none' | 'crown_pearl' | 'shield' | 'monogram';

interface ColorPreset {
  name: string;
  fg: string;
  bg: string;
  eyeOuter: string;
  eyeInner: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Palawan Gold',
    fg: '#996515',
    bg: '#FFFFFF',
    eyeOuter: '#D4AF37',
    eyeInner: '#996515'
  },
  {
    name: 'Atelier Teal',
    fg: '#238B80',
    bg: '#FFFFFF',
    eyeOuter: '#7FC8C0',
    eyeInner: '#1E6F66'
  },
  {
    name: 'Obsidian & Gold',
    fg: '#E5C158',
    bg: '#1A2327',
    eyeOuter: '#E5C158',
    eyeInner: '#FFFFFF'
  },
  {
    name: 'Rose Pearl',
    fg: '#8B485A',
    bg: '#FFF8F8',
    eyeOuter: '#C5837B',
    eyeInner: '#8B485A'
  },
  {
    name: 'Classic Charcoal',
    fg: '#1A2327',
    bg: '#FFFFFF',
    eyeOuter: '#1A2327',
    eyeInner: '#1A2327'
  }
];

export const QrGeneratorPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // URL / Content State
  const defaultInitialUrl = `${window.location.origin}/verify-certificate?number=CP-2026-00001`;
  const [urlInput, setUrlInput] = useState<string>(searchParams.get('url') || defaultInitialUrl);

  // Mode Selection: Normal vs Customized
  const [qrMode, setQrMode] = useState<QrMode>((searchParams.get('mode') as QrMode) || 'customized');

  // Normal Settings
  const [normalFg, setNormalFg] = useState('#111111');
  const [normalBg, setNormalBg] = useState('#FFFFFF');

  // Customized Settings
  const [fgColor, setFgColor] = useState('#238B80');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [eyeOuterColor, setEyeOuterColor] = useState('#7FC8C0');
  const [eyeInnerColor, setEyeInnerColor] = useState('#1E6F66');
  const [dotStyle, setDotStyle] = useState<DotStyle>('rounded');
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>('rounded');
  const [centerLogo, setCenterLogo] = useState<CenterLogoType>('crown_pearl');
  const [frameText, setFrameText] = useState('SCAN TO VERIFY AUTHENTICITY');
  const [includeFrame, setIncludeFrame] = useState(true);
  const [exportSize, setExportSize] = useState<number>(1024);

  // State indicators
  const [isCopied, setIsCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('Atelier Teal');

  // Available certificates for quick fill
  const [recentCerts, setRecentCerts] = useState<{ number: string; name: string }[]>([]);

  useEffect(() => {
  document.title = 'Luxury QR Code Generator – Crown Pearl Atelier';

  let cancelled = false;

  async function loadRecentCertificates() {
    try {
      const certs = await getAllCertificates();

      if (!cancelled) {
        setRecentCerts(
          certs.slice(0, 5).map((certificate) => ({
            number: certificate.certificateNumber,
            name: certificate.productName,
          })),
        );
      }
    } catch (error) {
      console.error('Failed to load certificates:', error);
    }
  }

  void loadRecentCertificates();

  return () => {
    cancelled = true;
  };
}, []);

  // Update URL if query changes
  useEffect(() => {
    const qUrl = searchParams.get('url');
    if (qUrl) {
      setUrlInput(qUrl);
    }
  }, [searchParams]);

  // Main Canvas Render Effect
  useEffect(() => {
    renderQrCode();
  }, [
    urlInput,
    qrMode,
    normalFg,
    normalBg,
    fgColor,
    bgColor,
    eyeOuterColor,
    eyeInnerColor,
    dotStyle,
    eyeStyle,
    centerLogo,
    frameText,
    includeFrame
  ]);

  const renderQrCode = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const trimmedUrl = urlInput.trim() || 'https://crownpearl.com';

    try {
      // 1. Generate QR matrix with high error correction (needed for center emblems & stylized dots)
      const ecLevel = centerLogo !== 'none' || qrMode === 'customized' ? 'H' : 'M';
      const qrData = QRCode.create(trimmedUrl, {
        errorCorrectionLevel: ecLevel
      });

      const modules = qrData.modules;
      const moduleCount = modules.size;

      // Sizing
      const pixelResolution = 600; // Internal high resolution
      const qrAreaSize = 500;
      const modulePixelSize = qrAreaSize / moduleCount;

      const frameHeight = includeFrame && qrMode === 'customized' ? 70 : 0;
      const totalWidth = pixelResolution;
      const totalHeight = pixelResolution + frameHeight;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Determine active colors based on mode
      const activeFg = qrMode === 'normal' ? normalFg : fgColor;
      const activeBg = qrMode === 'normal' ? normalBg : bgColor;
      const activeEyeOuter = qrMode === 'normal' ? normalFg : eyeOuterColor;
      const activeEyeInner = qrMode === 'normal' ? normalFg : eyeInnerColor;

      // 2. Fill background
      ctx.fillStyle = activeBg;
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Offset to center QR matrix
      const marginOffset = (pixelResolution - qrAreaSize) / 2;

      // Helper to check if a module is inside one of the 3 corner eyes (7x7 zones)
      const isCornerEye = (row: number, col: number) => {
        // Top-left
        if (row < 7 && col < 7) return true;
        // Top-right
        if (row < 7 && col >= moduleCount - 7) return true;
        // Bottom-left
        if (row >= moduleCount - 7 && col < 7) return true;
        return false;
      };

      // Helper to check if module is in center logo zone (if logo is active)
      const centerStart = Math.floor(moduleCount / 2) - 3;
      const centerEnd = Math.floor(moduleCount / 2) + 3;
      const isCenterZone = (row: number, col: number) => {
        if (qrMode !== 'customized' || centerLogo === 'none') return false;
        return row >= centerStart && row <= centerEnd && col >= centerStart && col <= centerEnd;
      };

      // 3. Draw standard modules (dots)
      ctx.fillStyle = activeFg;

      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (isCornerEye(r, c) || isCenterZone(r, c)) continue;

          const isDark = modules.get(r, c);
          if (!isDark) continue;

          const x = marginOffset + c * modulePixelSize;
          const y = marginOffset + r * modulePixelSize;
          const size = modulePixelSize;

          if (qrMode === 'normal' || dotStyle === 'square') {
            ctx.fillRect(x, y, size + 0.3, size + 0.3); // slight overlap avoids canvas seam artifacts
          } else if (dotStyle === 'dots') {
            const radius = (size / 2) * 0.9;
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
            ctx.fill();
          } else if (dotStyle === 'rounded') {
            const radius = size * 0.35;
            roundRect(ctx, x + 0.5, y + 0.5, size - 1, size - 1, radius);
            ctx.fill();
          } else if (dotStyle === 'diamond') {
            ctx.beginPath();
            ctx.moveTo(x + size / 2, y);
            ctx.lineTo(x + size, y + size / 2);
            ctx.lineTo(x + size / 2, y + size);
            ctx.lineTo(x, y + size / 2);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // 4. Draw the 3 Corner Finder Patterns (Eyes)
      const drawEye = (startRow: number, startCol: number) => {
        const eyeX = marginOffset + startCol * modulePixelSize;
        const eyeY = marginOffset + startRow * modulePixelSize;
        const eyeDimension = 7 * modulePixelSize;

        // Clear eye background
        ctx.fillStyle = activeBg;
        ctx.fillRect(eyeX, eyeY, eyeDimension, eyeDimension);

        // Outer Eye Box
        ctx.fillStyle = activeEyeOuter;
        if (qrMode === 'normal' || eyeStyle === 'square') {
          ctx.fillRect(eyeX, eyeY, eyeDimension, eyeDimension);
          ctx.fillStyle = activeBg;
          ctx.fillRect(
            eyeX + modulePixelSize,
            eyeY + modulePixelSize,
            eyeDimension - 2 * modulePixelSize,
            eyeDimension - 2 * modulePixelSize
          );
        } else if (eyeStyle === 'rounded') {
          roundRect(ctx, eyeX, eyeY, eyeDimension, eyeDimension, modulePixelSize * 1.8);
          ctx.fill();
          ctx.fillStyle = activeBg;
          roundRect(
            ctx,
            eyeX + modulePixelSize,
            eyeY + modulePixelSize,
            eyeDimension - 2 * modulePixelSize,
            eyeDimension - 2 * modulePixelSize,
            modulePixelSize
          );
          ctx.fill();
        } else if (eyeStyle === 'circle') {
          ctx.beginPath();
          ctx.arc(eyeX + eyeDimension / 2, eyeY + eyeDimension / 2, eyeDimension / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = activeBg;
          ctx.beginPath();
          ctx.arc(
            eyeX + eyeDimension / 2,
            eyeY + eyeDimension / 2,
            (eyeDimension - 2 * modulePixelSize) / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Inner Eye Dot
        ctx.fillStyle = activeEyeInner;
        const innerOffset = 2 * modulePixelSize;
        const innerDim = 3 * modulePixelSize;

        if (qrMode === 'normal' || eyeStyle === 'square') {
          ctx.fillRect(eyeX + innerOffset, eyeY + innerOffset, innerDim, innerDim);
        } else if (eyeStyle === 'rounded') {
          roundRect(ctx, eyeX + innerOffset, eyeY + innerOffset, innerDim, innerDim, modulePixelSize * 0.9);
          ctx.fill();
        } else if (eyeStyle === 'circle') {
          ctx.beginPath();
          ctx.arc(eyeX + eyeDimension / 2, eyeY + eyeDimension / 2, innerDim / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      // Render Top-Left Eye
      drawEye(0, 0);
      // Render Top-Right Eye
      drawEye(0, moduleCount - 7);
      // Render Bottom-Left Eye
      drawEye(moduleCount - 7, 0);

      // 5. Draw Center Logo / Emblem if customized
      if (qrMode === 'customized' && centerLogo !== 'none') {
        const logoSize = 6.5 * modulePixelSize;
        const logoCenterX = pixelResolution / 2;
        const logoCenterY = pixelResolution / 2;

        // Clear center badge with background
        ctx.fillStyle = activeBg;
        ctx.beginPath();
        ctx.arc(logoCenterX, logoCenterY, logoSize / 2 + 6, 0, Math.PI * 2);
        ctx.fill();

        // Subtle accent ring
        ctx.strokeStyle = activeEyeOuter;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (centerLogo === 'crown_pearl') {
          // Draw Pearl + Crown Emblem
          // Inner pearl sphere
          const pearlRadius = logoSize * 0.28;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(logoCenterX, logoCenterY + 4, pearlRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = activeFg;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Crown Motif
          ctx.fillStyle = '#D4AF37'; // Palawan Gold
          ctx.beginPath();
          const cx = logoCenterX;
          const cy = logoCenterY - pearlRadius + 1;
          ctx.moveTo(cx - 14, cy + 4);
          ctx.lineTo(cx - 10, cy - 8);
          ctx.lineTo(cx, cy - 2);
          ctx.lineTo(cx + 10, cy - 8);
          ctx.lineTo(cx + 14, cy + 4);
          ctx.closePath();
          ctx.fill();
        } else if (centerLogo === 'shield') {
          // Shield Icon
          ctx.fillStyle = activeFg;
          ctx.beginPath();
          const sx = logoCenterX;
          const sy = logoCenterY - 10;
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + 14, sy + 6);
          ctx.lineTo(sx + 14, sy + 18);
          ctx.quadraticCurveTo(sx, sy + 28, sx, sy + 30);
          ctx.quadraticCurveTo(sx, sy + 28, sx - 14, sy + 18);
          ctx.lineTo(sx - 14, sy + 6);
          ctx.closePath();
          ctx.fill();

          // White checkmark inside shield
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(sx - 5, sy + 15);
          ctx.lineTo(sx - 1, sy + 19);
          ctx.lineTo(sx + 7, sy + 10);
          ctx.stroke();
        } else if (centerLogo === 'monogram') {
          // Monogram "CP"
          ctx.fillStyle = activeFg;
          ctx.font = 'bold 20px "Josefin Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('CP', logoCenterX, logoCenterY);
        }
      }

      // 6. Draw Frame & Bottom Brand Label if enabled
      if (qrMode === 'customized' && includeFrame) {
        // Divider line
        ctx.strokeStyle = `${activeFg}33`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(marginOffset, pixelResolution - 10);
        ctx.lineTo(pixelResolution - marginOffset, pixelResolution - 10);
        ctx.stroke();

        // Brand kicker
        ctx.fillStyle = activeEyeOuter;
        ctx.font = '600 11px "Josefin Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '3px';
        ctx.fillText('CROWN PEARL · PALAWAN', pixelResolution / 2, pixelResolution + 18);

        // Frame CTA text
        ctx.fillStyle = activeFg;
        ctx.font = 'bold 13px "Josefin Sans", sans-serif';
        ctx.letterSpacing = '1.5px';
        ctx.fillText(frameText.toUpperCase(), pixelResolution / 2, pixelResolution + 42);
      }
    } catch (err) {
      console.error('QR Code render error:', err);
    }
  };

  // Helper function for rounded rectangles
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const handleApplyPreset = (preset: ColorPreset) => {
    setFgColor(preset.fg);
    setBgColor(preset.bg);
    setEyeOuterColor(preset.eyeOuter);
    setEyeInnerColor(preset.eyeInner);
    setActivePreset(preset.name);
  };

  const handleDownload = (format: 'png' | 'svg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (format === 'png') {
      // Scale canvas to user's desired export resolution (e.g. 1024x1024 or 2048x2048)
      const exportCanvas = document.createElement('canvas');
      const ratio = canvas.height / canvas.width;
      exportCanvas.width = exportSize;
      exportCanvas.height = Math.round(exportSize * ratio);

      const expCtx = exportCanvas.getContext('2d');
      if (expCtx) {
        expCtx.imageSmoothingEnabled = true;
        expCtx.imageSmoothingQuality = 'high';
        expCtx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);

        const dataUrl = exportCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `crown_pearl_qr_${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        link.remove();
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } else {
      // SVG Download using qrcode's native SVG exporter
      QRCode.toString(
        urlInput.trim() || 'https://crownpearl.com',
        {
          type: 'svg',
          color: {
            dark: qrMode === 'normal' ? normalFg : fgColor,
            light: qrMode === 'normal' ? normalBg : bgColor
          }
        },
        (err, svgString) => {
          if (!err && svgString) {
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `crown_pearl_qr_${Date.now()}.svg`;
            link.href = url;
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3000);
          }
        }
      );
    }
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        }
      });
    } catch (e) {
      console.warn('Clipboard copy not permitted:', e);
      // Fallback: Copy URL
      navigator.clipboard.writeText(urlInput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleReset = () => {
    if (qrMode === 'normal') {
      setNormalFg('#111111');
      setNormalBg('#FFFFFF');
    } else {
      handleApplyPreset(COLOR_PRESETS[1]); // Atelier Teal
      setDotStyle('rounded');
      setEyeStyle('rounded');
      setCenterLogo('crown_pearl');
      setIncludeFrame(true);
      setFrameText('SCAN TO VERIFY AUTHENTICITY');
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#263238] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              <QrCode className="w-4 h-4 text-[#7FC8C0]" />
              <span>Crown Pearl Utility Suite</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold mt-1">
              Custom Luxury QR Code Generator
            </h1>
            <p className="text-xs sm:text-sm text-[#3B4A50] mt-1 font-light">
              Create high-resolution, fully scannable QR codes for your certificate verification links, product tags, jewelry boxes, or promotional materials.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/verify-certificate"
              className="px-4 py-2 bg-white border border-[#C9D1D3] hover:border-[#7FC8C0] text-[#3B4A50] hover:text-[#111] rounded-xl text-xs font-heading uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#7FC8C0]" />
              <span>Verify Portal ↗</span>
            </Link>

            <Link
              to="/certificate-import"
              className="px-4 py-2 bg-[#3B4A50] hover:bg-[#263238] text-white rounded-xl text-xs font-heading uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#7FC8C0]" />
              <span>Atelier Certificates</span>
            </Link>
          </div>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-resolution QR code downloaded successfully! Ready for print & certificate engraving.</span>
          </div>
        )}

        {/* Main Grid: Controls vs Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6">
            {/* Step 1: Destination URL Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold">
                  1. Insert Destination URL *
                </label>
                <span className="text-[11px] text-gray-400">Scannable link</span>
              </div>

              <div className="relative">
                <input
                  type="url"
                  required
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#C9D1D3] rounded-xl text-xs font-mono focus:outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
                />
              </div>

              {/* Quick Fill Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                <span className="text-gray-400 uppercase font-heading text-[10px] tracking-wider mr-1">
                  Quick Fill:
                </span>

                <button
                  type="button"
                  onClick={() => setUrlInput(`${window.location.origin}/verify-certificate?number=CP-2026-00001`)}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-[#EAF6F4] text-[#238B80] border border-gray-200 rounded text-[11px] font-mono transition-colors"
                >
                  Cert CP-2026-00001
                </button>

                <button
                  type="button"
                  onClick={() => setUrlInput(`${window.location.origin}/shop`)}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-[#3B4A50] border border-gray-200 rounded text-[11px] transition-colors"
                >
                  Shop Catalog
                </button>

                <button
                  type="button"
                  onClick={() => setUrlInput('https://www.facebook.com/delmapearlonline')}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-blue-50 text-[#0084FF] border border-gray-200 rounded text-[11px] transition-colors"
                >
                  Facebook Page
                </button>

                <button
                  type="button"
                  onClick={() => setUrlInput('https://wa.me/639999910270')}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-emerald-50 text-emerald-700 border border-gray-200 rounded text-[11px] transition-colors"
                >
                  WhatsApp
                </button>
              </div>

              {/* Quick Cert Picker from Registry */}
              {recentCerts.length > 0 && (
                <div className="pt-1 flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-gray-500">
                  <span className="shrink-0 text-[10px] uppercase font-heading text-gray-400">
                    From Your Registry:
                  </span>
                  {recentCerts.map((c) => (
                    <button
                      key={c.number}
                      type="button"
                      onClick={() => setUrlInput(`${window.location.origin}/verify-certificate?number=${c.number}`)}
                      className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-mono shrink-0 transition-colors"
                    >
                      {c.number}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2: Selection Mode (Normal vs Customized) */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold">
                2. Select QR Code Type
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQrMode('normal')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    qrMode === 'normal'
                      ? 'border-[#238B80] bg-[#EAF6F4] ring-2 ring-[#238B80]/30 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading uppercase text-xs tracking-wider font-bold text-[#111]">
                      Normal Classic QR
                    </span>
                    {qrMode === 'normal' && <Check className="w-4 h-4 text-[#238B80]" />}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Standard high-contrast square modules. Optimal for universal fast scanning.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setQrMode('customized')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    qrMode === 'customized'
                      ? 'border-[#238B80] bg-[#EAF6F4] ring-2 ring-[#238B80]/30 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading uppercase text-xs tracking-wider font-bold text-[#111] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
                      <span>Customized Luxury QR</span>
                    </span>
                    {qrMode === 'customized' && <Check className="w-4 h-4 text-[#238B80]" />}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Custom colors, corner eyes, center crown pearl emblem, and branded verification card.
                  </p>
                </button>
              </div>
            </div>

            {/* NORMAL MODE CONTROLS */}
            {qrMode === 'normal' && (
              <div className="p-5 bg-[#FAFAF8] rounded-xl border border-gray-200 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111]">
                    Classic Color Options
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-heading uppercase text-gray-600 mb-1.5">
                      QR Modules Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={normalFg}
                        onChange={(e) => setNormalFg(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={normalFg}
                        onChange={(e) => setNormalFg(e.target.value)}
                        className="w-24 px-2 py-1.5 bg-white border border-gray-300 rounded text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-heading uppercase text-gray-600 mb-1.5">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={normalBg}
                        onChange={(e) => setNormalBg(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={normalBg}
                        onChange={(e) => setNormalBg(e.target.value)}
                        className="w-24 px-2 py-1.5 bg-white border border-gray-300 rounded text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOMIZED MODE CONTROLS */}
            {qrMode === 'customized' && (
              <div className="space-y-6 pt-2 animate-fade-in">
                {/* 1. Atelier Luxury Color Palettes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-[#7FC8C0]" />
                      <span>Luxury Brand Palettes</span>
                    </label>
                    <span className="text-[10px] text-gray-400">1-click harmony</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          activePreset === p.name
                            ? 'border-[#238B80] ring-1 ring-[#238B80] bg-[#EAF6F4]'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: p.fg }} />
                          <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: p.eyeOuter }} />
                        </div>
                        <span className="text-[10px] font-heading font-semibold uppercase block truncate text-[#111]">
                          {p.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Custom Color Pickers */}
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-gray-200 space-y-4">
                  <span className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111] block">
                    Custom Hex Color Overrides
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-heading uppercase text-gray-500 mb-1">
                        Dots Color
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={fgColor}
                          onChange={(e) => {
                            setFgColor(e.target.value);
                            setActivePreset('Custom');
                          }}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="font-mono text-[11px] text-gray-600 uppercase">{fgColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-heading uppercase text-gray-500 mb-1">
                        Background
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => {
                            setBgColor(e.target.value);
                            setActivePreset('Custom');
                          }}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="font-mono text-[11px] text-gray-600 uppercase">{bgColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-heading uppercase text-gray-500 mb-1">
                        Corner Eye Frame
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={eyeOuterColor}
                          onChange={(e) => {
                            setEyeOuterColor(e.target.value);
                            setActivePreset('Custom');
                          }}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="font-mono text-[11px] text-gray-600 uppercase">{eyeOuterColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-heading uppercase text-gray-500 mb-1">
                        Corner Inner Dot
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={eyeInnerColor}
                          onChange={(e) => {
                            setEyeInnerColor(e.target.value);
                            setActivePreset('Custom');
                          }}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="font-mono text-[11px] text-gray-600 uppercase">{eyeInnerColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Dot & Corner Shapes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#7FC8C0]" />
                      <span>Dot Style / Pattern</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['rounded', 'dots', 'square', 'diamond'] as DotStyle[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setDotStyle(st)}
                          className={`py-2 px-3 rounded-lg border text-xs font-heading uppercase tracking-wider transition-colors capitalize ${
                            dotStyle === st
                              ? 'bg-[#238B80] text-white border-[#238B80]'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold mb-2 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#7FC8C0]" />
                      <span>Corner Eye Shape</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['rounded', 'circle', 'square'] as EyeStyle[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setEyeStyle(st)}
                          className={`py-2 px-2 rounded-lg border text-xs font-heading uppercase tracking-wider transition-colors capitalize ${
                            eyeStyle === st
                              ? 'bg-[#238B80] text-white border-[#238B80]'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Center Logo / Emblem */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading uppercase tracking-wider text-[#111] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
                    <span>Center Emblem (Auto-Calibrated for 100% Scan Reliability)</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'crown_pearl', label: 'Crown & Pearl' },
                      { id: 'shield', label: 'Verified Shield' },
                      { id: 'monogram', label: 'Monogram (CP)' },
                      { id: 'none', label: 'No Emblem' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCenterLogo(item.id as CenterLogoType)}
                        className={`p-2.5 rounded-lg border text-center transition-colors text-xs font-heading uppercase tracking-wider ${
                          centerLogo === item.id
                            ? 'bg-[#EAF6F4] text-[#238B80] border-[#238B80] font-semibold'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Certificate Frame & Label */}
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeFrame}
                        onChange={(e) => setIncludeFrame(e.target.checked)}
                        className="rounded text-[#238B80] focus:ring-[#7FC8C0] w-4 h-4"
                      />
                      <span className="text-xs font-heading uppercase font-semibold text-[#111]">
                        Add Bottom Certificate Label Frame
                      </span>
                    </label>
                    <span className="text-[10px] text-gray-400">Great for prints</span>
                  </div>

                  {includeFrame && (
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="e.g. SCAN TO VERIFY AUTHENTICITY"
                      className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded-lg text-xs font-heading uppercase tracking-wider focus:outline-none focus:border-[#7FC8C0]"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-md flex flex-col items-center justify-center text-center space-y-6">
              <div className="flex items-center justify-between w-full pb-3 border-b border-gray-100">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#3B4A50] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  <span>Real-Time Scannable Output</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {qrMode === 'normal' ? 'Standard' : 'Luxury Styled'}
                </span>
              </div>

              {/* QR Canvas Display */}
              <div className="p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-inner flex items-center justify-center max-w-full">
                <canvas
                  ref={canvasRef}
                  className="w-64 sm:w-72 h-auto max-w-full rounded-lg object-contain shadow-2xs"
                />
              </div>

              {/* Direct Link Preview & Test */}
              <div className="w-full text-left p-3 bg-[#FAFAF8] rounded-xl border border-gray-100 text-xs space-y-1">
                <div className="text-[10px] font-heading uppercase tracking-wider text-gray-400">
                  Encoded Target URL:
                </div>
                <div className="font-mono text-[11px] text-[#111] truncate select-all">
                  {urlInput || 'Empty'}
                </div>
                {urlInput && (
                  <a
                    href={urlInput}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#238B80] hover:underline font-heading uppercase tracking-wide pt-1"
                  >
                    <span>Test Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Download & Export Controls */}
              <div className="w-full space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-heading uppercase text-[10px] tracking-wider">Export Resolution:</span>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {[512, 1024, 2048].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setExportSize(sz)}
                        className={`px-2 py-0.5 rounded border text-[10px] ${
                          exportSize === sz
                            ? 'bg-[#238B80] text-white border-[#238B80]'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {sz}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload('png')}
                    className="py-3 bg-[#3B4A50] hover:bg-[#263238] text-white font-heading uppercase text-xs tracking-wider font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#7FC8C0]" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload('svg')}
                    className="py-3 bg-white hover:bg-gray-50 text-[#3B4A50] border border-[#C9D1D3] font-heading uppercase text-xs tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                    <span>Download SVG</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="w-full py-2.5 bg-gray-50 hover:bg-[#EAF6F4] text-[#238B80] border border-[#7FC8C0]/40 font-heading uppercase text-xs tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Image Copied to Clipboard!' : 'Copy QR Image to Clipboard'}</span>
                </button>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs text-[#3B4A50] space-y-2">
              <span className="font-heading font-semibold uppercase tracking-wider text-[11px] text-[#111] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7FC8C0]" />
                <span>Certificate Printing Tip:</span>
              </span>
              <p className="text-[11px] leading-relaxed text-gray-500">
                For physical warranty cards and jewelry boxes, export at <strong>1024px or 2048px</strong>. Ensure good contrast between the QR dots and the background for effortless scanning in all lighting conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
