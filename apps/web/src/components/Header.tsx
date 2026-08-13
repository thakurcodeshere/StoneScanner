"use client";

import React from 'react';
import { Camera, Database, GitFork, ShoppingBag, ShieldCheck, Activity, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'knowledge' | 'graph' | 'marketplace' | 'admin';
  setActiveTab: (tab: 'scanner' | 'knowledge' | 'graph' | 'marketplace' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-[var(--border-glass)] px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-emerald)] to-[var(--accent-sapphire)] flex items-center justify-center shadow-lg shadow-[var(--accent-emerald)]/20">
            <Sparkles className="w-6 h-6 text-[#07090E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold gradient-text">StoneScanner</h1>
              <span className="text-[10px] font-mono bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] px-2 py-0.5 rounded-full border border-[var(--accent-emerald)]/20">
                v2.4 Enterprise
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">Geological AI & Knowledge Graph Platform</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-[#0A0E17]/80 p-1.5 rounded-xl border border-[var(--border-glass)]">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            AI Scanner
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'knowledge'
                ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            Knowledge Base
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'graph'
                ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <GitFork className="w-4 h-4" />
            Graph Traversal
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Marketplace
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-[var(--accent-emerald)]/20 to-[var(--accent-sapphire)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Telemetry
          </button>
        </nav>

        {/* System Health Badge */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#0E1525] px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Pipeline: ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
