import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Trash2,
  Search,
  X,
  Mail,
  Lock,
  LogIn,
  Package,
} from 'lucide-react';

import { auth } from '../lib/firebase';
import {
  createCertificate,
  deleteCertificate,
  getAllCertificates,
  updateCertificateStatus,
  type Certificate,
} from '../services/certificateService';
import {
  loginWithEmail,
  logoutAdmin,
  resetPassword,
  subscribeAdminAuth,
  getFriendlyAuthErrorMessage,
  type AdminSession,
} from '../services/adminAuth';
import { Logo } from '../components/common/Logo';

const emptyForm: Certificate = {
  certificateNumber: '',
  productId: '',
  productName: '',
  productImage: '',
  pearlType: 'South Sea',
  pearlGrade: 'AAA',
  pearlColor: 'White',
  pearlSize: '',
  metal: '18K Yellow Gold',
  category: 'Necklace',
  issuedDate: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  status: 'verified',
};

const inputClass =
  'w-full rounded-md border border-[#D6DAD8] bg-white px-3 py-3 text-sm outline-none focus:border-[#7FC8C0]';

export const CertificateImportPage: React.FC = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sign-in form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Certificate states
  const [form, setForm] = useState<Certificate>(emptyForm);
  const [records, setRecords] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Subscribe to unified admin session
  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((curr) => {
      setSession(curr);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(session?.isAuthenticated || auth.currentUser);

  const loadRecords = async () => {
    try {
      const data = await getAllCertificates();
      if (data) {
        setRecords(data);
      }
    } catch {
      setError('Unable to load certificates. Check your Firestore rules or internet connection.');
    }
  };

  useEffect(() => {
    if (isAdmin) {
      void loadRecords();
    }
  }, [isAdmin]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Please enter your manager email and password.');
      return;
    }

    setLoginError(null);
    setLoginSuccess(null);
    setIsLoginLoading(true);

    try {
      const s = await loginWithEmail(loginEmail, loginPassword);
      setSession(s);
    } catch (err) {
      setLoginError(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!loginEmail.trim()) {
      setLoginError('Please enter your manager email first, then click "Forgot Password?".');
      return;
    }
    setIsLoginLoading(true);
    setLoginError(null);
    setLoginSuccess(null);

    try {
      await resetPassword(loginEmail);
      setLoginSuccess(`Password reset email sent to ${loginEmail.trim()}. Please check your inbox.`);
    } catch (err) {
      setLoginError(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setSession(null);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await createCertificate(form);
      setMessage(`Certificate ${form.certificateNumber.trim().toUpperCase()} saved successfully.`);
      setForm({
        ...emptyForm,
        issuedDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      await loadRecords();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the certificate.');
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (record: Certificate) => {
    setError('');
    setMessage('');

    try {
      const nextStatus = record.status === 'verified' ? 'revoked' : 'verified';
      await updateCertificateStatus(record.certificateNumber, nextStatus);
      setMessage(`${record.certificateNumber} status updated to ${nextStatus}.`);
      await loadRecords();
    } catch {
      setError('Could not update status. Check your permissions.');
    }
  };

  const handleDelete = async (record: Certificate) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${record.certificateNumber}?`)) {
      return;
    }
    try {
      await deleteCertificate(record.certificateNumber);
      setMessage(`Certificate ${record.certificateNumber} deleted successfully.`);
      await loadRecords();
    } catch {
      setError('Could not delete certificate. Check your permissions.');
    }
  };

  const filteredRecords = records.filter((record) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [
      record.productId,
      record.certificateNumber,
      record.productName,
      record.category,
    ].some((value) => (value || '').toLowerCase().includes(query));
  });

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#1A2327] flex items-center justify-center p-10 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#7FC8C0] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-heading tracking-wider uppercase text-white/70">
            Verifying Firebase Authorization…
          </p>
        </div>
      </main>
    );
  }

  // If not authenticated as Admin, show the in-place Manager Sign In form
  if (!isAdmin) {
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
            <span>Certificate Administration</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" isLightMode={true} />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#7FC8C0]/15 text-[#7FC8C0] text-[11px] font-heading font-semibold uppercase tracking-[0.25em] border border-[#7FC8C0]/30 mb-3">
              Certificate Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-serif text-white">
              Manager Sign In
            </h1>
            <p className="text-xs text-white/60 mt-2 max-w-sm mx-auto leading-relaxed">
              Sign in with your authorized Firebase manager account to import and issue pearl authenticity certificates.
            </p>
          </div>

          <div className="bg-[#242E33] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative backdrop-blur-md">
            {loginError && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {loginSuccess && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>{loginSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-white/80 mb-1.5">
                  Manager Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none font-mono transition-colors"
                  />
                  <Lock className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full mt-3 py-3 bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] font-heading font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoginLoading ? (
                  <div className="w-4 h-4 border-2 border-[#1A2327] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Certificate Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7FC8C0]" />
              <span>Encrypted Firebase Authentication · Crown Pearl</span>
            </div>
          </div>
        </div>

        <div className="text-center py-6 text-xs text-white/40">
          Crown Pearl Jewelry Atelier · Puerto Princesa, Palawan, Philippines · Estd. 2003
        </div>
      </div>
    );
  }

  // Authenticated Certificate Import Portal
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-8 text-[#263238] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#1A2327] p-6 text-white border border-[#3B4A50]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7FC8C0] font-heading font-semibold">
                Crown Pearl Atelier
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-heading uppercase tracking-widest bg-[#7FC8C0] text-[#1A2327] font-bold">
                Manager Verified
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold">Certificate Import & Management</h1>
            <p className="mt-1 text-xs text-white/60">
              Signed in as {session?.userEmail || auth.currentUser?.email || 'manager@crownpearl.ph'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="flex items-center gap-2 rounded-lg bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] px-3.5 py-2 text-xs font-heading uppercase tracking-wider font-semibold transition-colors shadow-sm"
              title="Return to Manager Products Portal"
            >
              <Package className="h-4 w-4" />
              <span>Manager Atelier</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3.5 py-2 text-xs font-heading uppercase tracking-wider transition-colors"
              title="Sign out of Certificate Portal"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#EAF6F4] border border-[#7FC8C0]/30 p-4 text-sm text-[#238B80]">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-white p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="rounded-xl border border-[#D6DAD8] bg-white p-5 shadow-xs sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gray-900">Pearl Certificate Registration</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {([
              ['certificateNumber', 'Certificate Number', 'CP-2026-00003'],
              ['productId', 'Product ID / SKU', 'CP-NK-0003'],
              ['productName', 'Product Name', 'South Sea Golden Pearl Strand'],
              ['productImage', 'Product Image URL', 'https://...'],
              ['pearlGrade', 'Pearl Grade / Quality', 'AAA (Flawless Luster)'],
              ['pearlColor', 'Pearl Color', 'Golden / Champagne / White'],
              ['pearlSize', 'Pearl Size', '11.0–12.5 mm'],
              ['metal', 'Metal Mount', '18K Yellow Gold'],
              ['category', 'Jewelry Category', 'Necklace / Earrings / Ring'],
              ['issuedDate', 'Issue Date', 'November 8, 2026'],
            ] as const).map(([key, label, placeholder]) => (
              <label key={key} className="block text-xs font-heading uppercase tracking-wider text-gray-700">
                {label}
                <input
                  required
                  value={form[key]}
                  placeholder={placeholder}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, [key]: e.target.value }))
                  }
                  className={inputClass + ' mt-1 normal-case font-sans'}
                />
              </label>
            ))}

            <label className="block text-xs font-heading uppercase tracking-wider text-gray-700">
              Pearl Variety
              <select
                value={form.pearlType}
                onChange={(e) => setForm((old) => ({ ...old, pearlType: e.target.value }))}
                className={inputClass + ' mt-1 normal-case font-sans'}
              >
                <option>South Sea</option>
                <option>Akoya</option>
                <option>Tahitian</option>
                <option>Freshwater</option>
                <option>Keshi</option>
              </select>
            </label>

            <label className="block text-xs font-heading uppercase tracking-wider text-gray-700">
              Certificate Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((old) => ({
                    ...old,
                    status: e.target.value as Certificate['status'],
                  }))
                }
                className={inputClass + ' mt-1 normal-case font-sans'}
              >
                <option value="verified">Verified (Official Authenticity Guaranteed)</option>
                <option value="revoked">Revoked (Invalidated)</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            For Product Image URL, use a public image URL or an image from your catalog. This registers the certificate metadata securely in Firestore.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-[#3B4A50] hover:bg-[#263238] px-6 py-3.5 text-xs font-heading uppercase tracking-widest font-semibold text-white transition disabled:opacity-50 sm:w-auto shadow-sm cursor-pointer"
          >
            {loading ? 'Saving Certificate…' : 'Save Certificate to Database'}
          </button>
        </form>

        <section className="mt-8 rounded-xl border border-[#D6DAD8] bg-white p-5 sm:p-8 shadow-xs">
          <div className="mb-5">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
              Registered Certificates ({filteredRecords.length})
            </h2>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate number, product ID, name, or category..."
                className="w-full rounded-lg border border-[#D6DAD8] bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
                aria-label="Search registered certificates"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {records.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              No certificates registered in the database yet. Use the form above to add your first verified certificate.
            </p>
          ) : filteredRecords.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No certificates match "{searchQuery}". Try another search term.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <div
                  key={record.certificateNumber}
                  className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                >
                  <div>
                    <p className="font-medium text-gray-900">{record.productName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="font-mono font-semibold text-[#111]">{record.certificateNumber}</span> · SKU: {record.productId} · {record.category} · {record.pearlType} ({record.pearlSize}) · {record.metal}
                    </p>
                    <p
                      className={`mt-1 text-xs font-semibold uppercase tracking-wider ${
                        record.status === 'verified'
                          ? 'text-[#238B80]'
                          : 'text-red-600'
                      }`}
                    >
                      ● {record.status}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void changeStatus(record)}
                      className="rounded-lg border border-[#D6DAD8] hover:bg-gray-50 px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-gray-700 transition-colors"
                    >
                      {record.status === 'verified' ? 'Revoke' : 'Restore'}
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleDelete(record)}
                      className="flex items-center gap-1 rounded-lg border border-red-200 hover:bg-red-50 px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-xs font-heading uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Crown Pearl Store</span>
        </Link>
      </div>
    </main>
  );
};

export default CertificateImportPage;
