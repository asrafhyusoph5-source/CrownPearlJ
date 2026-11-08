import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  LogIn,
} from 'lucide-react';
import {
  loginWithEmail,
  resetPassword,
  isCurrentlyAdmin,
  getFriendlyAuthErrorMessage,
} from '../services/adminAuth';
import { Logo } from '../components/common/Logo';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // If already authenticated as admin, redirect to admin products dashboard
    if (isCurrentlyAdmin()) {
      navigate('/admin/products', { replace: true });
    }
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your manager email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await loginWithEmail(email, password);
      navigate('/admin/products');
    } catch (err) {
      setErrorMessage(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email above first, then click "Forgot Password?".');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await resetPassword(email);
      setSuccessMessage(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
    } catch (err) {
      setErrorMessage(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2327] text-white flex flex-col justify-between selection:bg-[#7FC8C0]/30 selection:text-white">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Crown Pearl Store</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#7FC8C0] font-heading uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Authorized Staff Only</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" isLightMode={true} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#7FC8C0]/15 text-[#7FC8C0] text-[11px] font-heading font-semibold uppercase tracking-[0.25em] border border-[#7FC8C0]/30 mb-3">
            Atelier Management Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-white">
            Manager Sign In
          </h1>
          <p className="text-xs text-white/60 mt-2 max-w-sm mx-auto leading-relaxed">
            Enter your Crown Pearl staff credentials to manage jewelry inventory, catalog pricing, and certificates.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#242E33] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative backdrop-blur-md">
          {/* Feedback Banners */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email & Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-white/80 mb-1.5">
                Manager Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@crownpearl.ph"
                  className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-heading uppercase tracking-wider text-white/80">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-[11px] text-[#7FC8C0] hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none font-mono transition-colors"
                />
                <Lock className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3 bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] font-heading font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#1A2327] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Manager Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>Encrypted Firebase Authentication · Crown Pearl Palawan</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center py-6 text-xs text-white/40">
        Crown Pearl Jewelry Atelier · Puerto Princesa, Palawan, Philippines · Estd. 2003
      </div>
    </div>
  );
};
