import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export const GiftFinderQuiz: React.FC = () => {
  const { addToCart } = useShop();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: '',
    budget: '',
    style: ''
  });

  const recipients = [
    { id: 'partner', label: 'Partner or Spouse', desc: 'Milestone anniversaries & declarations' },
    { id: 'bride', label: 'Bride or Wedding Attendant', desc: 'Ceremonial purity & regal elegance' },
    { id: 'mother', label: 'Mother or Matriarch', desc: 'Warm gratitude & generational grace' },
    { id: 'self', label: 'An Heirloom for Myself', desc: 'Daily luxury & signature confidence' },
    { id: 'gentleman', label: 'A Discerning Gentleman', desc: 'Sartorial cufflinks & dark pearls' }
  ];

  const budgets = [
    { id: 'tier1', label: 'Under $600', range: [0, 600] },
    { id: 'tier2', label: '$600 – $1,200', range: [600, 1200] },
    { id: 'tier3', label: '$1,200 – $2,000', range: [1200, 2000] },
    { id: 'tier4', label: '$2,000 and Above', range: [2000, 10000] }
  ];

  const styles = [
    { id: 'classic', label: 'Timeless Classic', desc: 'Symmetrical Akoya white strands and delicate studs' },
    { id: 'modern', label: 'Modern Minimalist', desc: 'Clean solitaires, openwork bangles, and architectural lines' },
    { id: 'statement', label: 'Dramatic Statement', desc: 'Exotic peacock Tahitian collars and golden South Sea pearls' },
    { id: 'organic', label: 'Romantic & Organic', desc: 'Freeform baroque pearls and petal-like Keshi drops' }
  ];

  const handleSelectRecipient = (id: string) => {
    setAnswers({ ...answers, recipient: id });
    setCurrentStep(2);
  };

  const handleSelectBudget = (id: string) => {
    setAnswers({ ...answers, budget: id });
    setCurrentStep(3);
  };

  const handleSelectStyle = (id: string) => {
    setAnswers({ ...answers, style: id });
    setCurrentStep(4);
  };

  const handleReset = () => {
    setAnswers({ recipient: '', budget: '', style: '' });
    setCurrentStep(1);
  };

  // Compute matched products
  const matchedProducts = React.useMemo(() => {
    if (currentStep !== 4) return [];

    let pool = [...PRODUCTS];

    if (answers.recipient === 'gentleman') {
      return pool.filter(p => p.category === 'mens');
    }

    if (answers.recipient === 'bride') {
      const bridal = pool.filter(p => p.category === 'set');
      if (bridal.length) return bridal.slice(0, 3);
    }

    if (answers.budget) {
      const budgetObj = budgets.find(b => b.id === answers.budget);
      if (budgetObj) {
        const [min, max] = budgetObj.range;
        const inBudget = pool.filter(p => p.price >= min && p.price <= max);
        if (inBudget.length >= 2) pool = inBudget;
      }
    }

    if (answers.style === 'classic') {
      pool = pool.filter(p => p.pearlType === 'Akoya');
    } else if (answers.style === 'statement') {
      pool = pool.filter(p => p.pearlType === 'Tahitian' || p.pearlType === 'South Sea');
    } else if (answers.style === 'organic') {
  pool = pool.filter(p => p.pearlType === 'Freshwater');
    }

    return pool.slice(0, 3);
  }, [currentStep, answers]);

  return (
    <section className="py-20 bg-[#FAFAF8] border-b border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#C9D1D3]/70 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle Ambient Pearl Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B4A50] via-[#7FC8C0] to-[#C9D1D3]" />

          {/* Quiz Header */}
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Jeweler Curations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold">
              The Crown Pearl Gift Finder
            </h2>
            <p className="text-xs sm:text-sm text-[#3B4A50]">
              Answer 3 brief questions to receive bespoke recommendations crafted in our atelier.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          {currentStep < 4 && (
            <div className="flex items-center justify-center gap-3 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-semibold transition-colors ${
                      currentStep === step
                        ? 'bg-[#3B4A50] text-white ring-2 ring-[#7FC8C0]'
                        : currentStep > step
                        ? 'bg-[#7FC8C0] text-[#111]'
                        : 'bg-[#FAFAF8] border border-gray-200 text-[#3B4A50]'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-3.5 h-3.5" /> : step}
                  </div>
                  {step < 3 && <div className="w-8 sm:w-12 h-0.5 bg-gray-200" />}
                </div>
              ))}
            </div>
          )}

          {/* Step 1: Recipient */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-lg font-semibold text-center text-[#111]">
                Who are you choosing this pearl heirloom for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {recipients.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectRecipient(r.id)}
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#7FC8C0] bg-[#FAFAF8] hover:bg-white text-left transition-all hover:shadow-sm group"
                  >
                    <div className="font-heading font-semibold text-xs uppercase tracking-wider text-[#111] group-hover:text-[#7FC8C0]">
                      {r.label}
                    </div>
                    <div className="text-[11px] text-[#3B4A50]/80 mt-0.5">
                      {r.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] hover:text-[#111]"
                >
                  ← Previous
                </button>
                <span className="text-xs text-gray-400">Step 2 of 3</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-center text-[#111]">
                What is your intended price spectrum?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSelectBudget(b.id)}
                    className="p-5 rounded-xl border border-[#E5E7EB] hover:border-[#7FC8C0] bg-[#FAFAF8] hover:bg-white text-center transition-all hover:shadow-sm"
                  >
                    <span className="font-heading font-bold text-sm tracking-wider text-[#111]">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Style */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] hover:text-[#111]"
                >
                  ← Previous
                </button>
                <span className="text-xs text-gray-400">Step 3 of 3</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-center text-[#111]">
                Which jewelry style resonates most?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectStyle(s.id)}
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#7FC8C0] bg-[#FAFAF8] hover:bg-white text-left transition-all hover:shadow-sm group"
                  >
                    <div className="font-heading font-semibold text-xs uppercase tracking-wider text-[#111] group-hover:text-[#7FC8C0]">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-[#3B4A50]/80 mt-0.5">
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#111]">
                    Curated For Your Occasion
                  </h3>
                  <p className="text-xs text-[#3B4A50]">
                    Selected based on your aesthetic and budget criteria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-heading uppercase tracking-wider text-[#3B4A50] hover:text-[#7FC8C0]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#FAFAF8] rounded-xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between p-3.5 space-y-2 hover:border-[#7FC8C0] transition-colors"
                  >
                    <Link to={`/product/${p.id}`} className="block aspect-square rounded-lg overflow-hidden bg-white">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                    <div>
                      <div className="text-[10px] text-[#7FC8C0] font-heading uppercase tracking-wider font-semibold">
                        {p.pearlType} · {p.pearlSize}
                      </div>
                      <Link to={`/product/${p.id}`} className="block font-serif text-sm font-semibold text-[#111] truncate mt-0.5">
                        {p.name}
                      </Link>
                      <div className="text-xs font-heading font-bold text-[#111] tabular-nums mt-1">
                        ${p.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        className="flex-1 py-1.5 bg-[#3B4A50] hover:bg-[#111] text-white text-[10px] font-heading uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#7FC8C0]" />
                        <span>Add</span>
                      </button>
                      <Link
                        to={`/product/${p.id}`}
                        className="p-1.5 bg-white border border-[#C9D1D3] text-[#3B4A50] hover:text-[#111] rounded text-xs"
                        aria-label={`View details for ${p.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
