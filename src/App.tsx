import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { ShopProvider } from './context/ShopContext';
import { Header } from './components/common/Header';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { PearlGuidePage } from './pages/PearlGuidePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/CrownPearlJ">
      <ShopProvider>
        <ScrollToTop />

        <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#111111] antialiased">
          <Header />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/pearl-guide" element={<PearlGuidePage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route
                path="/shipping-returns"
                element={<ShippingReturnsPage />}
              />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}
