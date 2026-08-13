"use client";

import React, { useState } from 'react';
import { GitFork, Globe, ShieldAlert, Sparkles, MapPin, Hammer, Flame, ArrowRight } from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  type: 'STONE' | 'LOCATION' | 'USE' | 'FORMATION' | 'LOOKALIKE';
  details: string;
}

interface Relationship {
  source: string;
  target: string;
  label: string;
  color: string;
}

export const GraphInspectorView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('amethyst');

  const nodes: GraphNode[] = [
    { id: 'amethyst', name: 'Amethyst Quartz', type: 'STONE', details: 'Hardness 7.0 | SiO2 | Trigonal' },
    { id: 'rio_grande', name: 'Rio Grande do Sul', type: 'LOCATION', details: 'Brazil, South America' },
    { id: 'jewelry', name: 'Faceted Jewelry & Carvings', type: 'USE', details: 'Ancient Greece to Modern' },
    { id: 'hydrothermal', name: 'Hydrothermal Geode Cooling', type: 'FORMATION', details: '100-300°C Volcanic Vugs' },
    { id: 'fluorite', name: 'Rainbow Fluorite', type: 'LOOKALIKE', details: 'Confused with Amethyst (Hardness 4.0)' },
    { id: 'emerald', name: 'Colombian Emerald', type: 'STONE', details: 'Hardness 7.5 | Be3Al2Si6O18' },
    { id: 'muzo_mine', name: 'Muzo Mine', type: 'LOCATION', details: 'Colombia, South America' },
  ];

  const relationships: Relationship[] = [
    { source: 'amethyst', target: 'rio_grande', label: 'FOUND_AT (Confidence 0.95)', color: '#00F090' },
    { source: 'amethyst', target: 'jewelry', label: 'USED_FOR', color: '#0085FF' },
    { source: 'amethyst', target: 'hydrothermal', label: 'FORMED_BY', color: '#B855FF' },
    { source: 'amethyst', target: 'fluorite', label: 'OFTEN_CONFUSED_WITH', color: '#FF3B5C' },
    { source: 'emerald', target: 'muzo_mine', label: 'FOUND_AT (Confidence 0.98)', color: '#00F090' }
  ];

  const currentNode = nodes.find(n => n.id === selectedNode) || nodes[0];
  const activeRelationships = relationships.filter(r => r.source === selectedNode || r.target === selectedNode);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-amethyst)]/10 border border-[var(--accent-amethyst)]/30 text-[var(--accent-amethyst)] text-xs font-mono">
          <GitFork className="w-3.5 h-3.5" /> Neo4j Knowledge Graph Traversal Engine
        </div>
        <h2 className="text-3xl font-extrabold gradient-purple">Interactive Graph Relationships</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Explore semantic and geological relationships connecting Stones, Mining Locations, Industrial/Artistic Uses, Formation Thermodynamics, and Common Lookalikes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Graph Node Map */}
        <div className="lg:col-span-8 glass-panel p-8 relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono text-[var(--text-muted)]">Cypher Query: MATCH (s:Stone)-[r]-&gt;(target) RETURN s, r, target</span>
            <span className="text-xs font-mono text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 px-3 py-1 rounded-full border border-[var(--accent-emerald)]/20">
              Graph Latency: 4ms (Neo4j Bolt)
            </span>
          </div>

          {/* Interactive Graph Node Display */}
          <div className="my-auto py-12 flex flex-wrap items-center justify-center gap-6 relative z-10">
            {nodes.map((node) => {
              const isSelected = node.id === selectedNode;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 max-w-[180px] text-center ${
                    isSelected
                      ? 'bg-[var(--accent-amethyst)]/20 border-[var(--accent-amethyst)] shadow-xl shadow-[var(--accent-amethyst)]/20 scale-110 ring-2 ring-[var(--accent-amethyst)]/40'
                      : 'bg-[#090D16]/90 border-[var(--border-glass)] hover:border-white/20'
                  }`}
                >
                  {node.type === 'STONE' && <Sparkles className="w-6 h-6 text-[var(--accent-emerald)]" />}
                  {node.type === 'LOCATION' && <MapPin className="w-6 h-6 text-[var(--accent-gold)]" />}
                  {node.type === 'USE' && <Hammer className="w-6 h-6 text-[var(--accent-sapphire)]" />}
                  {node.type === 'FORMATION' && <Flame className="w-6 h-6 text-purple-400" />}
                  {node.type === 'LOOKALIKE' && <ShieldAlert className="w-6 h-6 text-red-400" />}

                  <span className="text-xs font-bold text-white font-heading">{node.name}</span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block truncate w-full">{node.type}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-glass)] pt-4 z-10">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)]" /> FOUND_AT</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sapphire)]" /> USED_FOR</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-amethyst)]" /> FORMED_BY</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> OFTEN_CONFUSED_WITH</span>
          </div>
        </div>

        {/* Right Column: Node Details & Connected Edges */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 space-y-5">
            <div className="border-b border-[var(--border-glass)] pb-4">
              <span className="text-xs font-mono text-[var(--accent-amethyst)] uppercase tracking-wider block">Selected Node Profile</span>
              <h3 className="text-2xl font-bold text-white mt-1">{currentNode.name}</h3>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-1">{currentNode.details}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Active Relationships ({activeRelationships.length})
              </h4>

              {activeRelationships.map((rel, idx) => (
                <div key={idx} className="bg-[#090D16] p-3.5 rounded-xl border border-[var(--border-glass)] space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold" style={{ color: rel.color }}>
                    <span>{rel.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="text-xs text-white font-semibold">
                    Target: {nodes.find(n => n.id === rel.target)?.name || rel.target}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
