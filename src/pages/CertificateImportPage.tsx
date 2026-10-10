
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  LogOut,
  ShieldCheck,
  Trash2,
  Search,
  X,
} from 'lucide-react';

import { auth, ADMIN_UID } from '../lib/firebase';
import {
  createCertificate,
  deleteCertificate,
  getAllCertificates,
  updateCertificateStatus,
  type Certificate,
} from '../services/certificateService';

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
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState<Certificate>(emptyForm);
  const [records, setRecords] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRecords = records.filter((record) => {
   const query = searchQuery.trim().toLowerCase();

   if (!query) return true;

   return [
     record.productId,
     record.certificateNumber,
     record.productName,
     record.category,
   ].some((value) =>
     (value || '').toLowerCase().includes(query)
   );
 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
  }, []);

  const isAdmin = Boolean(user && ADMIN_UID && user.uid === ADMIN_UID);

  const loadRecords = async () => {
    try {
      setRecords(await getAllCertificates());
    } catch {
      setError('Unable to load certificates. Check your Firestore rules.');
    }
  };

  useEffect(() => {
    if (isAdmin) void loadRecords();
  }, [isAdmin]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('Sign-in failed. Check your email and password.');
    }
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
      setMessage(`${record.certificateNumber} status updated.`);
      await loadRecords();
    } catch {
      setError('Could not update status. Check your permissions.');
    }
  };
  
  const handleDelete = async (record: Certificate) => {
  const confirmed = window.confirm(
    `Permanently delete certificate ${record.certificateNumber}? This cannot be undone.`
  );

  if (!confirmed) return;

  setError('');
  setMessage('');

  try {
    await deleteCertificate(record.certificateNumber);
    setMessage(`Certificate ${record.certificateNumber} deleted successfully.`);
    await loadRecords();
  } catch {
    setError('Could not delete certificate. Check your permissions and Firestore rules.');
  }
};

  if (authLoading) {
    return <main className="p-10 text-center">Loading administrator access…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-5 py-12 text-[#263238]">
        <div className="mx-auto max-w-md rounded-xl border border-[#D6DAD8] bg-white p-7 shadow-sm">
          <div className="mb-5 flex justify-center">
            <ShieldCheck className="h-10 w-10 text-[#238B80]" />
          </div>
          <h1 className="text-center font-serif text-3xl">Certificate Admin</h1>
          <p className="mb-6 mt-2 text-center text-sm text-gray-500">
            Sign in with your authorized Crown Pearl administrator account.
          </p>

          {user ? (
            <>
              <p className="mb-4 text-sm text-red-600">
                This account is not authorized to manage certificates.
              </p>
              <button
                onClick={() => signOut(auth)}
                className="w-full rounded-md bg-[#3B4A50] px-4 py-3 text-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block text-sm">
                Email
                <input
                  required
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass + ' mt-1'}
                />
              </label>
              <label className="block text-sm">
                Password
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass + ' mt-1'}
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button className="w-full rounded-md bg-[#3B4A50] px-4 py-3 text-white">
                Sign In
              </button>
            </form>
          )}

          <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <ArrowLeft className="h-4 w-4" /> Back to Crown Pearl
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-8 text-[#263238] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#3B4A50] p-6 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Crown Pearl
            </p>
            <h1 className="mt-2 font-serif text-3xl">Certificate Import</h1>
            <p className="mt-2 text-sm text-white/70">
              Register and manage pearl certificate records.
            </p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>

        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-md bg-[#EAF6F4] p-4 text-sm text-[#238B80]">
            <CheckCircle className="h-5 w-5 shrink-0" /> {message}
          </div>
        )}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-red-200 bg-white p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSave} className="rounded-xl border border-[#D6DAD8] bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-6 font-serif text-2xl">Pearl Certificate Details</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {([
              ['certificateNumber', 'Certificate Number', 'CP-2026-00003'],
              ['productId', 'Product ID', 'CP-NK-0003'],
              ['productName', 'Product Name', 'Pearl necklace name'],
              ['productImage', 'Product Image URL', 'https://...'],
              ['pearlGrade', 'Pearl Grade / Quality', 'Type pearl grade (e.g. AAA)'],
              ['pearlColor', 'Pearl Color', 'White / Golden / Black'],
              ['pearlSize', 'Pearl Size', '10–11 mm'],
              ['metal', 'Metal', '18K Yellow Gold'],
              ['category', 'Category', 'Necklace / Earrings / Ring'],
              ['issuedDate', 'Issue Date', 'October 9, 2026'],
            ] as const).map(([key, label, placeholder]) => (
              <label key={key} className="block text-sm">
                {label}
                <input
                  required
                  value={form[key]}
                  placeholder={placeholder}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, [key]: e.target.value }))
                  }
                  className={inputClass + ' mt-1'}
                />
              </label>
            ))}

            <label className="block text-sm">
              Pearl Type
              <select
                value={form.pearlType}
                onChange={(e) => setForm((old) => ({ ...old, pearlType: e.target.value }))}
                className={inputClass + ' mt-1'}
              >
                <option>South Sea</option>
                <option>Akoya</option>
                <option>Tahitian</option>
                <option>Freshwater</option>
              </select>
            </label>

            <label className="block text-sm">
              Certificate Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((old) => ({
                    ...old,
                    status: e.target.value as Certificate['status'],
                  }))
                }
                className={inputClass + ' mt-1'}
              >
                <option value="verified">Verified</option>
                <option value="revoked">Revoked</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            For Product Image URL, use a public HTTPS image URL. This form stores the URL, not the image file itself.
          </p>

          <button
            disabled={loading}
            className="mt-6 w-full rounded-md bg-[#3B4A50] px-5 py-3.5 font-medium text-white transition hover:bg-[#263238] disabled:opacity-50 sm:w-auto"
          >
            {loading ? 'Saving…' : 'Save Certificate'}
          </button>
        </form>

        <section className="mt-8 rounded-xl border border-[#D6DAD8] bg-white p-5 sm:p-8">
          <div className="mb-5">
  <h2 className="mb-4 font-serif text-2xl">
    Registered Certificates ({filteredRecords.length})
  </h2>

  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

    <input
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search product ID, certificate number, product name, or category..."
      className="w-full rounded-md border border-[#D6DAD8] bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
      aria-label="Search registered certificates"
    />

    {searchQuery && (
      <button
        type="button"
        onClick={() => setSearchQuery('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        aria-label="Clear search"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
</div>

          {records.length === 0 ? (
  <p className="text-sm text-gray-500">
    No certificates registered yet.
  </p>
) : filteredRecords.length === 0 ? (
  <p className="py-6 text-center text-sm text-gray-500">
    No certificates match "{searchQuery}". Try another search.
  </p>
) : (
  <div className="space-y-3">
    {filteredRecords.map((record) => (
      <div
        key={record.certificateNumber}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 py-3 last:border-0"
      >
        <div>
          <p className="font-medium">{record.productName}</p>
          <p className="text-xs text-gray-500">
            {record.certificateNumber} · {record.productId} · {record.category} · {record.pearlType} · {record.pearlSize} · Grade {record.pearlGrade || 'Not recorded'}
          </p>
          <p
            className={`mt-1 text-xs ${
              record.status === 'verified'
                ? 'text-[#238B80]'
                : 'text-red-600'
            }`}
          >
            {record.status.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void changeStatus(record)}
            className="rounded-md border border-[#D6DAD8] px-3 py-2 text-xs hover:bg-gray-50"
          >
            {record.status === 'verified' ? 'Revoke' : 'Restore'}
          </button>

          <button
            type="button"
            onClick={() => void handleDelete(record)}
            className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}
</section>

        <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="h-4 w-4" /> Back to Crown Pearl
        </Link>
      </div>
    </main>
  );
};

export default CertificateImportPage;
