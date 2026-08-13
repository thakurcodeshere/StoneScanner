"use client";

import React from 'react';
import { Camera, Database, GitFork, ShoppingBag, ShieldCheck, Activity, Sparkles, Gem } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'knowledge' | 'graph' | 'marketplace' | 'admin';
  setActiveTab: (tab: 'scanner' | 'knowledge' | 'graph' | 'marketplace' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-4 z-50 glass-card px-6 py-4 mb-8 mx-auto max-w-7xl border border-white/10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('scanner')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--accent-emerald)] via-[var(--accent-sapphire)] to-[var(--accent-amethyst)] flex items-center justify-center shadow-lg shadow-[var(--accent-emerald)]/25">
            <Gem className="w-6 h-6 text-[#04060A]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-gradient-emerald tracking-tight font-heading">StoneScanner</h1>
              <span className="text-[10px] font-mono bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)] px-2.5 py-0.5 rounded-full border border-[var(--accent-emerald)]/30 font-bold">
                v2.4 Enterprise
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">Multimodal AI Geological Platform</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 bg-[#060912]/80 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'scanner', label: 'AI Scanner', icon: Camera },
            { id: 'knowledge', label: 'Encyclopedia', icon: Database },
            { id: 'graph', label: 'Knowledge Graph', icon: GitFork },
            { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
            { id: 'admin', label: 'Telemetry', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/40 shadow-lg shadow-[var(--accent-emerald)]/10 scale-105'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent-emerald)]' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* System Telemetry Indicator */}
        <div className="hidden xl:flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#070B14] px-3.5 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold">
            <Activity className="w-4 h-4 animate-pulse text-[var(--accent-emerald)]" />
            <span>AI Cluster: 482ms</span>
          </div>
        </div>
      </div>
    </header>
  );
};
