"use client";

import React, { useState } from 'react';
import { Search, Filter, Database, Tag, ShieldAlert, Sparkles, Layers, SlidersHorizontal, Scale } from 'lucide-react';

interface StoneItem {
  id: string;
  name: string;
  category: string;
  hardness: number;
  formula: string;
  system: string;
  rarity: number;
  price: number;
  image: string;
  desc: string;
}

const KNOWLEDGE_STONES: StoneItem[] = [
  { id: '1', name: 'Amethyst Geode Quartz', category: 'Gemstone', hardness: 7.0, formula: 'SiO2', system: 'Trigonal', rarity: 4, price: 15.00, image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=800&q=80', desc: 'Violet quartz colored by trace iron impurities and natural gamma irradiation.' },
  { id: '2', name: 'Colombian Emerald', category: 'Gemstone', hardness: 7.5, formula: 'Be3Al2Si6O18', system: 'Hexagonal', rarity: 9, price: 450.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80', desc: 'Vibrant green gem colored by chromium and vanadium inclusions.' },
  { id: '3', name: 'Fools Gold (Pyrite)', category: 'Mineral', hardness: 6.5, formula: 'FeS2', system: 'Isometric', rarity: 2, price: 4.50, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&q=80', desc: 'Brass-yellow mineral with bright mirror metallic luster.' },
  { id: '4', name: 'Congolese Malachite', category: 'Mineral', hardness: 3.8, formula: 'Cu2CO3(OH)2', system: 'Monoclinic', rarity: 6, price: 25.00, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', desc: 'Striking green copper carbonate mineral with concentric botryoidal banding.' },
  { id: '5', name: 'Black Volcanic Obsidian', category: 'Igneous Rock', hardness: 5.5, formula: 'SiO2 Glass', system: 'Amorphous', rarity: 3, price: 8.00, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', desc: 'Volcanic glass formed when silica-rich lava cools instantaneously.' },
  { id: '6', name: 'Royal Blue Sapphire', category: 'Gemstone', hardness: 9.0, formula: 'Al2O3', system: 'Trigonal', rarity: 9, price: 850.00, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', desc: 'Precious blue variety of corundum colored by titanium and iron.' },
  { id: '7', name: 'Madagascar Rose Quartz', category: 'Gemstone', hardness: 7.0, formula: 'SiO2', system: 'Trigonal', rarity: 2, price: 6.00, image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', desc: 'Soft pink quartz colored by dumortierite fibrous inclusions.' },
  { id: '8', name: 'Afghan Lapis Lazuli', category: 'Metamorphic Rock', hardness: 5.5, formula: 'Complex Silicate', system: 'Isometric', rarity: 7, price: 45.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80', desc: 'Deep-blue metamorphic rock containing lazurite, calcite, and gold pyrite.' }
];

export const KnowledgeBaseView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [minHardness, setMinHardness] = useState<number>(1.0);

  const filteredStones = KNOWLEDGE_STONES.filter(stone => {
    const matchesSearch = stone.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          stone.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stone.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || stone.category.toUpperCase().includes(selectedCategory);
    const matchesHardness = stone.hardness >= minHardness;
    return matchesSearch && matchesCategory && matchesHardness;
  });

  return (
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gradient-emerald font-heading">
              Geological Encyclopedia & Knowledge Base
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-body">
              Browse 500+ cataloged minerals, gemstones, igneous, sedimentary, and metamorphic rock species.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] font-mono text-xs font-bold">
            <Database className="w-4 h-4" /> 500 Verified Profiles
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search by stone name, chemical formula (SiO2, FeS2), or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#070B14] border border-[var(--border-subtle)] focus:border-[var(--accent-emerald)] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none font-body transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['ALL', 'GEMSTONE', 'MINERAL', 'IGNEOUS', 'METAMORPHIC'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[var(--accent-emerald)] text-[#04060A] shadow-lg shadow-[var(--accent-emerald)]/30'
                      : 'bg-[#070B14] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mohs Hardness Slider Filter */}
          <div className="bg-[#070B14] p-4 rounded-2xl border border-[var(--border-subtle)] flex items-center gap-4 text-xs font-mono">
            <SlidersHorizontal className="w-4 h-4 text-[var(--accent-emerald)]" />
            <span className="text-[var(--text-muted)] whitespace-nowrap">Filter Min Hardness:</span>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={minHardness}
              onChange={(e) => setMinHardness(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent-emerald)]"
            />
            <span className="text-emerald-400 font-extrabold whitespace-nowrap">Mohs ≥ {minHardness.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Grid of Stone Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStones.map((stone) => (
          <div key={stone.id} className="glass-card overflow-hidden group hover:border-[var(--accent-emerald)]/50 transition-all duration-300">
            <div className="relative h-52 overflow-hidden">
              <img
                src={stone.image}
                alt={stone.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#04060A]/85 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-mono border border-white/10 text-emerald-400 font-bold">
                Mohs {stone.hardness}
              </div>
              <div className="absolute top-3 right-3 bg-[var(--accent-gold)]/20 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-mono border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] font-bold">
                ${stone.price}/ct
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[var(--accent-emerald)] uppercase tracking-wider block font-bold">
                  {stone.category}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-[var(--accent-emerald)] transition-colors font-heading">
                  {stone.name}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#070B14] p-3 rounded-xl border border-[var(--border-subtle)]">
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] block">Formula</span>
                  <span className="text-white font-bold truncate block">{stone.formula}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] block">Crystal System</span>
                  <span className="text-white font-bold truncate block">{stone.system}</span>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {stone.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
