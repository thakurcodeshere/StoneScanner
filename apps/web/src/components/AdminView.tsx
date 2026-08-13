"use client";

import React from 'react';
import { Activity, ShieldCheck, Cpu, HardDrive, Server, Zap, RefreshCw } from 'lucide-react';

export const AdminView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Platform Observability & Telemetry
            </div>
            <h2 className="text-3xl font-extrabold gradient-text">System Admin & AI Model Operations</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Real-time monitoring for API Gateway, GPU Inference Nodes, Neo4j Graph DB, and User Feedback Model Retraining Queue.
            </p>
          </div>

          <button className="btn-secondary text-xs font-mono">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>API Gateway Latency (p95)</span>
            <Server className="w-4 h-4 text-[var(--accent-emerald)]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[var(--accent-emerald)]">12.4 ms</div>
          <p className="text-[10px] text-emerald-400 font-mono">SLA Target &lt; 200ms (PASS)</p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>AI Inference Throughput</span>
            <Cpu className="w-4 h-4 text-[var(--accent-amethyst)]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[var(--accent-amethyst)]">482 ms</div>
          <p className="text-[10px] text-purple-400 font-mono">PyTorch + TensorRT GPU Cluster</p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Graph Queries (Neo4j Bolt)</span>
            <Zap className="w-4 h-4 text-[var(--accent-sapphire)]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[var(--accent-sapphire)]">4.1 ms</div>
          <p className="text-[10px] text-blue-400 font-mono">Read Replicas Active</p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Daily Scan Volume</span>
            <HardDrive className="w-4 h-4 text-[var(--accent-gold)]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-[var(--accent-gold)]">14,280</div>
          <p className="text-[10px] text-amber-400 font-mono">+18% vs yesterday</p>
        </div>
      </div>

      {/* Services Health Table */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-bold font-heading text-white">Microservices Infrastructure Status</h3>

        <div className="space-y-3 font-mono text-xs">
          {[
            { service: 'API Gateway (Express)', status: 'HEALTHY', latency: '12ms', memory: '142 MB', replicas: '4 / 4' },
            { service: 'Scan Processing Service (FastAPI)', status: 'HEALTHY', latency: '48ms', memory: '380 MB', replicas: '8 / 8' },
            { service: 'AI Vision Inference Engine (PyTorch/GPU)', status: 'HEALTHY', latency: '482ms', memory: '4.2 GB (VRAM)', replicas: '12 / 12' },
            { service: 'Knowledge Graph Service (Neo4j)', status: 'HEALTHY', latency: '4ms', memory: '1.1 GB', replicas: '2 / 2' },
            { service: 'Marketplace & Escrow Service', status: 'HEALTHY', latency: '18ms', memory: '190 MB', replicas: '3 / 3' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#090D16] p-4 rounded-xl border border-[var(--border-glass)] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-white font-bold block">{item.service}</span>
                <span className="text-[var(--text-muted)] text-[10px]">Replicas: {item.replicas} | Memory: {item.memory}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-muted)]">p95: {item.latency}</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2.5 py-1 rounded-full font-bold">
                  ● {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
