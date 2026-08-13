"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, CheckCircle2, AlertTriangle, Layers, Zap, Info, ShieldAlert, Compass, Sparkles, Eye, Sliders, Activity, Scale } from 'lucide-react';

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
  crystal_shape: 'TRIGONAL' | 'HEXAGONAL' | 'CUBIC' | 'MONOCLINIC' | 'AMORPHOUS';
}

const SAMPLE_PRESETS: StoneResult[] = [
  {
    id: "amethyst",
    name: "Amethyst Geode Quartz",
    mineral_name: "Quartz (Silicate)",
    chemical_formula: "SiO2",
    hardness_mohs: 7.0,
    specific_gravity: 2.65,
    crystal_system: "Trigonal",
    luster: "Vitreous / Glassy",
    streak: "White",
    category: "Gemstone",
    rarity_index: 4,
    avg_price_per_carat_usd: 15.00,
    description: "A purple variety of quartz prized in fine jewelry, colored by natural gamma irradiation and trace iron impurities.",
    formation_narrative: "Formed in gas cavities (geodes) inside volcanic basalt rocks over millions of years through hydrothermal fluid cooling at 100–300°C.",
    image_url: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=800&q=80",
    confused_with: ["Rainbow Fluorite", "Purple Sapphire", "Iolite", "Glass Imitation"],
    similar_stones: ["Rose Quartz", "Citrine", "Smoky Quartz", "Jasper"],
    crystal_shape: 'TRIGONAL'
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
    rarity_index: 9,
    avg_price_per_carat_usd: 450.00,
    description: "A radiant green gem colored by chromium and vanadium inclusions within the hexagonal beryl crystal lattice.",
    formation_narrative: "Formed in hydrothermal veins associated with granitic pegmatites and black shales under intense tectonic pressure.",
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
    confused_with: ["Tsavorite Garnet", "Peridot", "Green Tourmaline", "Chrome Diopside"],
    similar_stones: ["Aquamarine", "Morganite", "Heliodor", "Bixbite"],
    crystal_shape: 'HEXAGONAL'
  },
  {
    id: "pyrite",
    name: "Fools Gold (Pyrite)",
    mineral_name: "Iron Sulfide",
    chemical_formula: "FeS2",
    hardness_mohs: 6.5,
    specific_gravity: 5.01,
    crystal_system: "Isometric (Cubic)",
    luster: "High Metallic",
    streak: "Greenish-Black",
    category: "Mineral",
    rarity_index: 2,
    avg_price_per_carat_usd: 4.50,
    description: "A brass-yellow mineral with a mirror-like metallic luster, famously known as Fools Gold.",
    formation_narrative: "Formed in sedimentary rocks, hydrothermal veins, and metamorphic deposits in sulfur-rich marine environments.",
    image_url: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&q=80",
    confused_with: ["Native Gold", "Chalcopyrite", "Marcasite", "Pyrrhotite"],
    similar_stones: ["Magnetite", "Hematite", "Galena", "Arsenopyrite"],
    crystal_shape: 'CUBIC'
  },
  {
    id: "malachite",
    name: "Congolese Malachite",
    mineral_name: "Copper Carbonate Hydroxide",
    chemical_formula: "Cu2CO3(OH)2",
    hardness_mohs: 3.8,
    specific_gravity: 4.00,
    crystal_system: "Monoclinic",
    luster: "Silky / Botryoidal",
    streak: "Pale Green",
    category: "Mineral",
    rarity_index: 6,
    avg_price_per_carat_usd: 25.00,
    description: "A striking green copper carbonate mineral characterized by distinctive concentric botryoidal banding.",
    formation_narrative: "Formed in the supergene oxidation zones of copper ore deposits where carbonated groundwaters react with primary copper minerals.",
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    confused_with: ["Azurite", "Chrysocolla", "Pseudomalachite", "Variscite"],
    similar_stones: ["Azurite", "Turquoise", "Cuprite", "Dioptase"],
    crystal_shape: 'MONOCLINIC'
  },
  {
    id: "obsidian",
    name: "Black Volcanic Obsidian",
    mineral_name: "Volcanic Glass",
    chemical_formula: "70%+ SiO2 (Amorphous)",
    hardness_mohs: 5.5,
    specific_gravity: 2.40,
    crystal_system: "Amorphous (Non-crystalline)",
    luster: "High Vitreous",
    streak: "White",
    category: "Igneous Rock",
    rarity_index: 3,
    avg_price_per_carat_usd: 8.00,
    description: "A naturally occurring volcanic glass formed when high-silica lava cools rapidly with minimal crystalline growth.",
    formation_narrative: "Formed when high-viscosity felsic lava extrudes from a volcanic vent and quenches instantaneously upon contact with water or air.",
    image_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    confused_with: ["Black Tourmaline (Schorl)", "Onyx", "Tektite", "Coal"],
    similar_stones: ["Basalt", "Pumice", "Rhyolite", "Flint"],
    crystal_shape: 'AMORPHOUS'
  }
];

export const ScannerView: React.FC = () => {
  const [selectedStone, setSelectedStone] = useState<StoneResult>(SAMPLE_PRESETS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Ready');
  const [collectionAdded, setCollectionAdded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'origin' | 'lookalikes'>('profile');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Crystal Gemstone Rotating Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render3DCrystal = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 60;

      angle += 0.015;

      // Draw Rotating Geometric Crystal Polyhedron
      ctx.save();
      ctx.translate(cx, cy);

      const color = selectedStone.id === 'amethyst' ? '#B855FF' :
                    selectedStone.id === 'emerald' ? '#00F090' :
                    selectedStone.id === 'pyrite' ? '#FFB800' :
                    selectedStone.id === 'malachite' ? '#00F0FF' : '#9CA3AF';

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;

      const vertices = [
        { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius - 40 },
        { x: Math.cos(angle + 2) * radius, y: Math.sin(angle + 2) * radius },
        { x: Math.cos(angle + 4) * radius, y: Math.sin(angle + 4) * radius },
        { x: Math.cos(angle + 1) * radius, y: Math.sin(angle + 1) * radius + 40 },
      ];

      ctx.beginPath();
      vertices.forEach((v, idx) => {
        if (idx === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
      });
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = color + '22';
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render3DCrystal);
    };

    render3DCrystal();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedStone]);

  const handleScanPreset = (stone: StoneResult) => {
    setIsScanning(true);
    setCollectionAdded(false);

    setScanStep('Stage 1: Laplacian Blur & Quality Ingest Check');
    setTimeout(() => {
      setScanStep('Stage 2: Vision Transformer (ViT-Base) Feature Extraction');
    }, 400);

    setTimeout(() => {
      setScanStep('Stage 3: Multi-Model Ensemble Softmax Voting');
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
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-[var(--accent-emerald)]/15 via-[var(--accent-amethyst)]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 animate-pulse" /> Real-Time Geological HUD Scanner
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-emerald tracking-tight">
            AI Multimodal Geological Identification
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-body">
            Upload or capture any rock, mineral, crystal, or gemstone. Our multi-model computer vision ensemble assesses physical properties, crystal geometry, Mohs hardness, and Neo4j knowledge relationships in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multimodal HUD Dropzone */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2 font-heading">
                <Camera className="w-5 h-5 text-[var(--accent-emerald)]" />
                Live Camera & Image Dropzone
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                HD INGEST
              </span>
            </div>

            {/* Drop Zone with Sci-Fi Scanner Laser Line */}
            <div className={`relative border-2 border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-emerald)] rounded-2xl p-6 text-center transition-all bg-[#070B14]/80 overflow-hidden ${isScanning ? 'glow-emerald-box' : ''}`}>
              {isScanning && <div className="laser-line" />}

              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedStone.image_url}
                  alt={selectedStone.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${isScanning ? 'scale-110 filter blur-sm' : ''}`}
                />
                
                {isScanning ? (
                  <div className="absolute inset-0 bg-[#04060A]/85 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-3">
                    <div className="w-14 h-14 rounded-full border-4 border-[var(--accent-emerald)]/20 border-t-[var(--accent-emerald)] animate-spin" />
                    <p className="font-mono text-xs text-[var(--accent-emerald)] font-bold animate-pulse">
                      {scanStep}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] font-mono">Inferencing PyTorch ViT-Base & ResNet-152...</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                    <span className="text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-emerald-400 border border-white/10 font-semibold">
                      ✓ Target Locked: #{selectedStone.id}
                    </span>
                    <button className="btn-primary-neon text-xs py-1.5 px-3">
                      <Camera className="w-3.5 h-3.5" /> Re-scan
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-[var(--text-muted)] bg-[#0A0F1D] p-3 rounded-xl border border-[var(--border-subtle)]">
                <span>Quality Score: <strong className="text-emerald-400 font-mono">98.4%</strong></span>
                <span>Blur Var: <strong className="text-white">14.8 (Low)</strong></span>
                <span>Res: <strong className="text-white">1920x1080</strong></span>
              </div>
            </div>

            {/* Quick Demo Presets Selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                Select Sample Geological Presets
              </span>
              <div className="grid grid-cols-5 gap-2">
                {SAMPLE_PRESETS.map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => handleScanPreset(stone)}
                    className={`relative rounded-xl overflow-hidden border transition-all h-20 ${
                      selectedStone.id === stone.id
                        ? 'border-[var(--accent-emerald)] ring-2 ring-[var(--accent-emerald)]/40 scale-105'
                        : 'border-[var(--border-subtle)] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={stone.image_url} alt={stone.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                      <span className="text-[10px] font-mono truncate w-full text-center font-bold text-white">
                        {stone.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Redesigned Results & 3D Interactive Viewer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-8 space-y-6">
            {/* Top Result Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30 font-bold">
                    Confidence: 94.2% (High Calibration)
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">ID: #{selectedStone.id}</span>
                </div>
                <h3 className="text-4xl font-extrabold text-white mt-1.5 font-heading">{selectedStone.name}</h3>
                <p className="text-sm text-[var(--accent-emerald)] font-mono font-bold">{selectedStone.mineral_name}</p>
              </div>

              {/* Price Tag */}
              <div className="text-right font-mono bg-[#070B14] p-3.5 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase tracking-wider font-bold">Est. Market Value</span>
                <span className="text-2xl font-black text-gradient-gold">${selectedStone.avg_price_per_carat_usd.toFixed(2)} <span className="text-xs text-gray-400 font-normal">/ carat</span></span>
              </div>
            </div>

            {/* 3D Rotating Crystal Gemstone Canvas & Hardness Comparator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Interactive 3D Canvas Box */}
              <div className="crystal-viewport p-4 flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono text-[var(--accent-emerald)] font-bold uppercase tracking-wider mb-2">
                  3D Lattice Geometry: {selectedStone.crystal_system}
                </span>
                <canvas ref={canvasRef} width={200} height={140} className="w-full h-32" />
                <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Real-time rotating polyhedral model</span>
              </div>

              {/* Mohs Hardness Rating Meter */}
              <div className="bg-[#070B14] p-5 rounded-2xl border border-[var(--border-subtle)] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-xs text-[var(--text-muted)] font-bold">Mohs Hardness Rating</span>
                    <span className="text-xl font-black text-[var(--accent-emerald)]">{selectedStone.hardness_mohs} / 10.0</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-700" 
                      style={{ width: `${(selectedStone.hardness_mohs / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[var(--text-muted)] space-y-1 bg-[#0A0F1D] p-2.5 rounded-xl border border-white/5">
                  <div className="flex justify-between"><span>Talc (Softest):</span><span className="text-white">1.0</span></div>
                  <div className="flex justify-between"><span>Quartz Standard:</span><span className="text-emerald-400 font-bold">7.0</span></div>
                  <div className="flex justify-between"><span>Diamond (Hardest):</span><span className="text-white">10.0</span></div>
                </div>
              </div>
            </div>

            {/* Geological Tabs Navigation */}
            <div className="flex border-b border-[var(--border-subtle)] space-x-6 text-sm font-mono font-bold">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 transition-all ${
                  activeTab === 'profile'
                    ? 'text-[var(--accent-emerald)] border-b-2 border-[var(--accent-emerald)]'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                Physical Profile
              </button>

              <button
                onClick={() => setActiveTab('origin')}
                className={`pb-3 transition-all ${
                  activeTab === 'origin'
                    ? 'text-[var(--accent-emerald)] border-b-2 border-[var(--accent-emerald)]'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                Formation & Hydrothermal Origin
              </button>

              <button
                onClick={() => setActiveTab('lookalikes')}
                className={`pb-3 transition-all ${
                  activeTab === 'lookalikes'
                    ? 'text-[var(--accent-emerald)] border-b-2 border-[var(--accent-emerald)]'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                Lookalikes & Confusion
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#070B14] p-4 rounded-xl border border-[var(--border-subtle)] font-mono">
                  <span className="text-[10px] text-[var(--text-muted)] block">Chemical Formula</span>
                  <span className="text-sm font-bold text-white mt-1 block truncate">{selectedStone.chemical_formula}</span>
                </div>

                <div className="bg-[#070B14] p-4 rounded-xl border border-[var(--border-subtle)] font-mono">
                  <span className="text-[10px] text-[var(--text-muted)] block">Specific Gravity</span>
                  <span className="text-sm font-bold text-white mt-1 block">{selectedStone.specific_gravity}</span>
                </div>

                <div className="bg-[#070B14] p-4 rounded-xl border border-[var(--border-subtle)] font-mono">
                  <span className="text-[10px] text-[var(--text-muted)] block">Luster</span>
                  <span className="text-sm font-bold text-white mt-1 block truncate">{selectedStone.luster}</span>
                </div>

                <div className="bg-[#070B14] p-4 rounded-xl border border-[var(--border-subtle)] font-mono">
                  <span className="text-[10px] text-[var(--text-muted)] block">Streak</span>
                  <span className="text-sm font-bold text-white mt-1 block truncate">{selectedStone.streak}</span>
                </div>
              </div>
            )}

            {activeTab === 'origin' && (
              <div className="bg-[#070B14] p-5 rounded-xl border border-[var(--border-subtle)] space-y-2">
                <h4 className="text-xs font-bold text-[var(--accent-sapphire)] flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4" /> AI Geological Narrative
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedStone.formation_narrative}
                </p>
              </div>
            )}

            {activeTab === 'lookalikes' && (
              <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2 font-mono">
                  <ShieldAlert className="w-4 h-4" /> Common Gemstone Lookalikes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStone.confused_with.map((item, idx) => (
                    <span key={idx} className="bg-amber-500/10 text-amber-300 text-xs px-3 py-1.5 rounded-lg border border-amber-500/20 font-mono">
                      ⚠️ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setCollectionAdded(true)}
                className={`btn-primary-neon text-sm ${collectionAdded ? 'bg-emerald-600' : ''}`}
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

              <span className="text-xs text-[var(--text-muted)] font-mono">
                Model: PyTorch-v2.4-Ensemble (Bayesian MC Dropout)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
