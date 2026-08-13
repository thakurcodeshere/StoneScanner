"use client";

import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Tag, Globe, CheckCircle, ArrowRight } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  stoneName: string;
  price: number;
  weightGrams: number;
  origin: string;
  grade: string;
  isVerified: boolean;
  seller: string;
  image: string;
}

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: 'lst_1',
    title: 'Natural Amethyst Geode Specimen - AAA Grade',
    stoneName: 'Amethyst Quartz',
    price: 340.00,
    weightGrams: 420.5,
    origin: 'Rio Grande do Sul, Brazil',
    grade: 'AAA Certified',
    isVerified: true,
    seller: 'Gemological Treasures Co.',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80'
  },
  {
    id: 'lst_2',
    title: 'Uncut Colombian Emerald Rough Matrix Specimen',
    stoneName: 'Colombian Emerald',
    price: 1850.00,
    weightGrams: 14.2,
    origin: 'Muzo Mine, Colombia',
    grade: 'AA Certified',
    isVerified: true,
    seller: 'Andean Minerals Ltd.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80'
  },
  {
    id: 'lst_3',
    title: 'Perfect Cubic Pyrite Clusters on Quartz Matrix',
    stoneName: 'Fools Gold (Pyrite)',
    price: 120.00,
    weightGrams: 310.0,
    origin: 'Huanzala Mine, Peru',
    grade: 'AAA Certified',
    isVerified: true,
    seller: 'Inca Geological Exporters',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80'
  },
  {
    id: 'lst_4',
    title: 'Concentric Banded Malachite Slab - Polished',
    stoneName: 'Congolese Malachite',
    price: 260.00,
    weightGrams: 185.0,
    origin: 'Katanga Crescent, DR Congo',
    grade: 'A Grade',
    isVerified: false,
    seller: 'Sahara Minerals Direct',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'
  }
];

export const MarketplaceView: React.FC = () => {
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="glass-panel p-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] text-xs font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Gemologist Verified Escrow Marketplace
            </div>
            <h2 className="text-3xl font-extrabold gradient-text">Geological & Gemstone Marketplace</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Buy, sell, and trade certified minerals, rough crystals, and faceted gemstones with guaranteed escrow protection.
            </p>
          </div>

          <button className="btn-primary text-xs whitespace-nowrap">
            + Create New Listing
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_LISTINGS.map((item) => (
          <div key={item.id} className="glass-panel overflow-hidden flex flex-col justify-between group hover:border-[var(--accent-gold)]/40 transition-all">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.isVerified && (
                  <div className="absolute top-3 left-3 bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED GENUINE
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-[#07090E]/90 text-[var(--accent-gold)] font-mono font-extrabold text-base px-3 py-1 rounded-lg border border-[var(--accent-gold)]/30">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono text-[var(--accent-emerald)] font-semibold block">{item.stoneName}</span>
                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">{item.title}</h4>

                <div className="space-y-1 text-xs font-mono text-[var(--text-muted)] bg-[#090D16] p-3 rounded-lg border border-[var(--border-glass)]">
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="text-white font-semibold">{item.weightGrams}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Origin:</span>
                    <span className="text-white font-semibold truncate max-w-[130px]">{item.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seller:</span>
                    <span className="text-emerald-400 truncate max-w-[130px]">{item.seller}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setPurchasedId(item.id)}
                className={`w-full py-2.5 rounded-xl font-heading text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  purchasedId === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[var(--accent-gold)] to-amber-600 text-[#07090E] hover:brightness-110 shadow-lg shadow-[var(--accent-gold)]/20'
                }`}
              >
                {purchasedId === item.id ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Escrow Order Placed!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Buy with Escrow
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
