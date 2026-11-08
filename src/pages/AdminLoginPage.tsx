import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, KeyRound, Lock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, LogIn } from 'lucide-react';
import { loginWithGoogle, loginWithPasscode, isCurrentlyAdmin } from '../services/adminAuth';
import { Logo } from '../components/common/Logo';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [emailInput, setEmailInput] = useState('delmapearl17@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'passcode' | 'google'>('passcode');

  useEffect(() => {
    // If already logged in, redirect to admin products
    if (isCurrentlyAdmin()) {
      navigate('/admin/products', { replace: true });
    }
  }, [navigate]);

  const handlePasscodeLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) {
      setErrorMessage('Please enter the Atelier Master Passcode.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await loginWithPasscode(passcode, emailInput);
      navigate('/admin/products');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickManagerLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginWithPasscode('delma2003', 'delmapearl17@gmail.com');
      navigate('/admin/products');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Quick login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      navigate('/admin/products');
    } catch (err) {
      console.error('Google login error:', err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Google Sign-In was cancelled or failed. You can also sign in with the Atelier Passcode.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2327] text-white flex flex-col justify-between selection:bg-[#7FC8C0]/30 selection:text-white">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Crown Pearl Store</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#7FC8C0] font-heading uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Authorized Staff Only</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto px-6 py-10">
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
            Manage Crown Pearl products, add new jewelry listings, update prices, and control real-time website inventory.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#242E33] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative backdrop-blur-md">
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-6 pb-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('passcode');
                setErrorMessage(null);
              }}
              className={`flex-1 pb-2 text-xs font-heading uppercase tracking-wider transition-colors relative flex items-center justify-center gap-1.5 ${
                activeTab === 'passcode'
                  ? 'text-[#7FC8C0] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#7FC8C0]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Atelier Key</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('google');
                setErrorMessage(null);
              }}
              className={`flex-1 pb-2 text-xs font-heading uppercase tracking-wider transition-colors relative flex items-center justify-center gap-1.5 ${
                activeTab === 'google'
                  ? 'text-[#7FC8C0] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#7FC8C0]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google Sign-In</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'passcode' ? (
            <form onSubmit={handlePasscodeLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-white/80 mb-1.5">
                  Staff Email / Delma ID
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none"
                  placeholder="delmapearl17@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-white/80 mb-1.5 flex items-center justify-between">
                  <span>Atelier Master Passcode</span>
                  <span className="text-[10px] text-[#7FC8C0] normal-case">Code: delma2003</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter delma2003"
                    className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none font-mono"
                  />
                  <Lock className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] font-heading font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#1A2327] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Inventory</span>
                  </>
                )}
              </button>

              <div className="pt-3 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={handleQuickManagerLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 text-xs font-heading uppercase tracking-wider text-white/80 rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  <span>1-Click Test Access as Delma</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-white/70 leading-relaxed">
                Authenticate securely with your Google Account linked to the Puerto Princesa store management team.
              </p>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-heading font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickManagerLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 text-xs font-heading uppercase tracking-wider text-white/80 rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  <span>Use Atelier Passcode instead</span>
                </button>
              </div>
            </div>
          )}

          {/* Security footnote */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>End-to-end encrypted · Crown Pearl Palawan</span>
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
