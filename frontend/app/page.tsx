import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/features/home/HeroSection';
import { FilterBar } from '../components/features/home/FilterBar';
import { FeaturedCatalog } from '../components/features/home/FeaturedCatalog';
import { HowItWorks } from '../components/features/home/HowItWorks';
import { Testimonials } from '../components/features/home/Testimonials';
import { PromoSection } from '../components/features/home/PromoSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-28 bg-background min-h-screen">
        <HeroSection />
        <FilterBar />
        <FeaturedCatalog />
        <HowItWorks />
        <Testimonials />
        <PromoSection />
      </main>
      <Footer />
    </>
  );
}
