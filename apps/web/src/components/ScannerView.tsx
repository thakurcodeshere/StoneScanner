"use client";

import React, { useState } from 'react';
import { Upload, Camera, CheckCircle2, AlertTriangle, Layers, Zap, Info, ShieldAlert, Compass, Sparkles } from 'lucide-react';

interface StoneResult {
  id: string;
  name: string;
  mineral_name: string;
  chemical_formula: string;
  hardness_mohs: number;
  specific_gravity: number;
  crystal_system: string;
  luster: string;
  streak: string;
  category: string;
  rarity_index: number;
  avg_price_per_carat_usd: number;
  description: string;
  formation_narrative: string;
  image_url: string;
  confused_with: string[];
  similar_stones: string[];
}

const SAMPLE_PRESETS: StoneResult[] = [
  {
    id: "amethyst",
    name: "Amethyst Quartz",
    mineral_name: "Quartz (Silicate)",
    chemical_formula: "SiO2",
    hardness_mohs: 7.0,
    specific_gravity: 2.65,
    crystal_system: "Trigonal",
    luster: "Vitreous",
    streak: "White",
    category: "Gemstone",
    rarity_index: 3,
    avg_price_per_carat_usd: 15.00,
    description: "A purple variety of quartz often used in jewelry, colored by natural gamma irradiation and iron impurities.",
    formation_narrative: "Formed in gas cavities (geodes) inside volcanic rocks over millions of years through hydrothermal fluid cooling at 100-300°C.",
    image_url: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80",
    confused_with: ["Rainbow Fluorite", "Purple Sapphire", "Iolite", "Glass Imitation"],
    similar_stones: ["Rose Quartz", "Citrine", "Smoky Quartz", "Jasper"]
  },
  {
    id: "emerald",
    name: "Colombian Emerald",
    mineral_name: "Beryl (Cyclosilicate)",
    chemical_formula: "Be3Al2Si6O18",
    hardness_mohs: 7.5,
    specific_gravity: 2.72,
    crystal_system: "Hexagonal",
    luster: "Vitreous",
    streak: "White",
    category: "Gemstone",
    rarity_index: 8,
    avg_price_per_carat_usd: 450.00,
    description: "A vibrant green gemstone colored by chromium and vanadium inclusions within the beryl lattice.",
    formation_narrative: "Formed in hydrothermal veins associated with granitic pegmatites and black shales under intense tectonic pressure.",
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
    confused_with: ["Tsavorite Garnet", "Peridot", "Green Tourmaline", "Chrome Diopside"],
    similar_stones: ["Aquamarine", "Morganite", "Heliodor", "Bixbite"]
  },
  {
    id: "pyrite",
    name: "Fools Gold (Pyrite)",
    mineral_name: "Iron Sulfide",
    chemical_formula: "FeS2",
    hardness_mohs: 6.5,
    specific_gravity: 5.01,
    crystal_system: "Isometric (Cubic)",
    luster: "Metallic",
    streak: "Greenish-Black",
    category: "Mineral",
    rarity_index: 2,
    avg_price_per_carat_usd: 4.50,
    description: "A brass-yellow mineral with a bright metallic luster, famously known as Fools Gold.",
    formation_narrative: "Formed in sedimentary rocks, hydrothermal veins, and metamorphic deposits in sulfur-rich environments.",
    image_url: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80",
    confused_with: ["Native Gold", "Chalcopyrite", "Marcasite", "Pyrrhotite"],
    similar_stones: ["Magnetite", "Hematite", "Galena", "Arsenopyrite"]
  },
  {
    id: "malachite",
    name: "Congolese Malachite",
    mineral_name: "Copper Carbonate Hydroxide",
    chemical_formula: "Cu2CO3(OH)2",
    hardness_mohs: 3.8,
    specific_gravity: 4.00,
    crystal_system: "Monoclinic",
    luster: "Silky / Adamantine",
    streak: "Pale Green",
    category: "Mineral",
    rarity_index: 5,
    avg_price_per_carat_usd: 25.00,
    description: "A striking green copper carbonate mineral characterized by distinctive concentric banding.",
    formation_narrative: "Formed in the oxidation zones of copper ore deposits where carbonated waters react with copper minerals.",
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    confused_with: ["Azurite", "Chrysocolla", "Pseudomalachite", "Variscite"],
    similar_stones: ["Azurite", "Turquoise", "Cuprite", "Dioptase"]
  },
  {
    id: "obsidian",
    name: "Black Obsidian",
    mineral_name: "Volcanic Glass",
    chemical_formula: "70%+ SiO2 (Amorphous)",
    hardness_mohs: 5.5,
    specific_gravity: 2.40,
    crystal_system: "Amorphous",
    luster: "Vitreous",
    streak: "White",
    category: "Igneous Rock",
    rarity_index: 2,
    avg_price_per_carat_usd: 8.00,
    description: "A naturally occurring volcanic glass formed when felsic lava cools rapidly with minimal crystal growth.",
    formation_narrative: "Formed when high-silica lava extrudes from a volcano and chills instantaneously upon exposure to water or air.",
    image_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    confused_with: ["Black Tourmaline (Schorl)", "Onyx", "Tektite", "Coal"],
    similar_stones: ["Basalt", "Pumice", "Rhyolite", "Flint"]
  }
];

export const ScannerView: React.FC = () => {
  const [selectedStone, setSelectedStone] = useState<StoneResult>(SAMPLE_PRESETS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Ready');
  const [collectionAdded, setCollectionAdded] = useState<boolean>(false);

  const handleScanPreset = (stone: StoneResult) => {
    setIsScanning(true);
    setCollectionAdded(false);

    setScanStep('Stage 1: Preprocessing & Blur Assessment');
    setTimeout(() => {
      setScanStep('Stage 2: Vision Transformer Feature Extraction');
    }, 400);

    setTimeout(() => {
      setScanStep('Stage 3: Multi-Model Ensemble Voting');
    }, 800);

    setTimeout(() => {
      setScanStep('Stage 4: Bayesian Uncertainty Calibration');
    }, 1200);

    setTimeout(() => {
      setSelectedStone(stone);
      setIsScanning(false);
      setScanStep('Complete');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-[var(--accent-emerald)]/10 to-[var(--accent-amethyst)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/20 text-[var(--accent-emerald)] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> Multimodal Geological AI Ingest
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold gradient-text">
            Instant Geological Scan & Identification
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Upload or capture a photo of any rock, mineral, crystal, or gemstone. Our multi-model computer vision ensemble assesses physical properties, crystal geometry, Mohs hardness, and Neo4j knowledge relationships in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Dropzone & Sample Presets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--accent-emerald)]" />
              Multimodal Ingest Dropzone
            </h3>

            {/* Drop Area */}
            <div className="relative border-2 border-dashed border-[var(--border-glass)] hover:border-[var(--accent-emerald)]/50 rounded-2xl p-8 text-center transition-all bg-[#090D16]/60 group">
              {isScanning ? (
                <div className="py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-[var(--accent-emerald)]/20 border-t-[var(--accent-emerald)] animate-spin" />
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-[var(--accent-emerald)] font-bold animate-pulse">
                      {scanStep}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">Inferencing PyTorch ViT-Base & ResNet-152...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 cursor-pointer">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/20 flex items-center justify-center text-[var(--accent-emerald)] group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Drag and drop geological photo here</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Supports JPG, PNG, WEBP up to 25MB</p>
                  </div>
                  <button className="btn-primary text-xs mx-auto py-2 px-4">
                    <Camera className="w-4 h-4" /> Capture Photo
                  </button>
                </div>
              )}
            </div>

            {/* Image Quality Indicator */}
            <div className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[var(--text-muted)]">Image Quality Assessment</span>
                <span className="text-[var(--accent-emerald)] font-bold">98.4% (EXCELLENT)</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--accent-emerald)] h-full w-[98%]" />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                <span>Blur Variance: 14.8 (Low)</span>
                <span>Lighting: Optimal</span>
                <span>Res: 1920x1080</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Presets */}
          <div className="glass-panel p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Test Sample Geological Presets
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {SAMPLE_PRESETS.map((stone) => (
                <button
                  key={stone.id}
                  onClick={() => handleScanPreset(stone)}
                  className={`relative rounded-xl overflow-hidden border transition-all h-20 ${
                    selectedStone.id === stone.id
                      ? 'border-[var(--accent-emerald)] ring-2 ring-[var(--accent-emerald)]/30 scale-105'
                      : 'border-[var(--border-glass)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={stone.image_url} alt={stone.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                    <span className="text-[10px] font-mono truncate w-full text-center font-semibold text-white">
                      {stone.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Identification Results Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-8 space-y-6 relative">
            {/* Header Result Line */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[var(--border-glass)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30">
                    Confidence: 94.2% (High Calibration)
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">ID: #{selectedStone.id}</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white mt-1">{selectedStone.name}</h3>
                <p className="text-sm text-[var(--accent-emerald)] font-mono font-medium">{selectedStone.mineral_name}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs text-[var(--text-muted)] block">Est. Market Value</span>
                <span className="text-2xl font-bold text-[var(--accent-gold)]">${selectedStone.avg_price_per_carat_usd.toFixed(2)} <span className="text-xs text-gray-400 font-normal">/ carat</span></span>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)]">
                <span className="text-xs text-[var(--text-muted)] block font-mono">Mohs Hardness</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-extrabold text-[var(--accent-emerald)]">{selectedStone.hardness_mohs}</span>
                  <span className="text-[10px] text-gray-400 font-mono">/ 10.0</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[var(--accent-emerald)] h-full transition-all duration-500" 
                    style={{ width: `${(selectedStone.hardness_mohs / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)]">
                <span className="text-xs text-[var(--text-muted)] block font-mono">Chemical Formula</span>
                <span className="text-sm font-bold font-mono text-white mt-1 block truncate" title={selectedStone.chemical_formula}>
                  {selectedStone.chemical_formula}
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-2 block">Silicate / Carbonate</span>
              </div>

              <div className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)]">
                <span className="text-xs text-[var(--text-muted)] block font-mono">Crystal System</span>
                <span className="text-sm font-bold text-white mt-1 block truncate">
                  {selectedStone.crystal_system}
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-2 block">Specific Grav: {selectedStone.specific_gravity}</span>
              </div>

              <div className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)]">
                <span className="text-xs text-[var(--text-muted)] block font-mono">Luster & Streak</span>
                <span className="text-sm font-bold text-white mt-1 block truncate">
                  {selectedStone.luster}
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-2 block">Streak: {selectedStone.streak}</span>
              </div>
            </div>

            {/* AI Geological Narrative */}
            <div className="bg-[#090D16]/80 p-5 rounded-xl border border-[var(--border-glass)] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-sapphire)] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4" /> AI Formation & Geological Narrative
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {selectedStone.formation_narrative}
              </p>
            </div>

            {/* Confusion & Lookalike Warnings */}
            <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2 font-mono">
                <ShieldAlert className="w-4 h-4" /> Common Lookalikes ("Often Confused With")
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedStone.confused_with.map((item, idx) => (
                  <span key={idx} className="bg-amber-500/10 text-amber-300 text-xs px-2.5 py-1 rounded-md border border-amber-500/20 font-mono">
                    ⚠️ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-glass)]">
              <button
                onClick={() => setCollectionAdded(true)}
                className={`btn-primary text-sm ${collectionAdded ? 'bg-emerald-600 text-white' : ''}`}
              >
                {collectionAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Saved to Geological Collection!
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" /> Add to My Digital Collection
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
                <span>Model Version: PyTorch-v2.1-Ensemble</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
