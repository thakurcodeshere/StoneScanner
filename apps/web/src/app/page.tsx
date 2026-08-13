"use client";

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ScannerView } from '@/components/ScannerView';
import { KnowledgeBaseView } from '@/components/KnowledgeBaseView';
import { GraphInspectorView } from '@/components/GraphInspectorView';
import { MarketplaceView } from '@/components/MarketplaceView';
import { AdminView } from '@/components/AdminView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'knowledge' | 'graph' | 'marketplace' | 'admin'>('scanner');

  return (
    <div className="space-y-6">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'scanner' && <ScannerView />}
      {activeTab === 'knowledge' && <KnowledgeBaseView />}
      {activeTab === 'graph' && <GraphInspectorView />}
      {activeTab === 'marketplace' && <MarketplaceView />}
      {activeTab === 'admin' && <AdminView />}
    </div>
  );
}
