import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/common/TrustStrip';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { BestSellers } from '../components/home/BestSellers';
import { FeaturedCollectionBanner } from '../components/home/FeaturedCollectionBanner';
import { WhyCrownPearl } from '../components/home/WhyCrownPearl';
import { PearlGuideTeaser } from '../components/home/PearlGuideTeaser';
import { CustomerReviewsSummary } from '../components/home/CustomerReviewsSummary';
import { GiftFinderQuiz } from '../components/home/GiftFinderQuiz';
import { InstagramGallery } from '../components/home/InstagramGallery';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Crown Pearl – Jewelry Shop by Delma, Estd. 2003';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustStrip />
      <CategoryGrid />
      <BestSellers />
      <FeaturedCollectionBanner />
      <WhyCrownPearl />
      <PearlGuideTeaser />
      <CustomerReviewsSummary />
      <GiftFinderQuiz />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
};
