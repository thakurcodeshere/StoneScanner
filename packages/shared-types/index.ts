/**
 * StoneScanner Shared TypeScript Interface Definitions
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'USER' | 'SELLER' | 'GEMOLOGIST' | 'ADMIN';
  createdAt: string;
}

export interface Stone {
  id: string;
  slug: string;
  name: string;
  mineralName: string;
  chemicalFormula: string;
  hardnessMohs: number;
  specificGravity: number;
  crystalSystem: string;
  luster: string;
  streak: string;
  category: string;
  rarityIndex: number;
  avgPricePerCaratUsd: number;
  description: string;
  formationNarrative: string;
  imageUrl: string;
}

export interface ScanResult {
  scanId: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  processingTimeMs: number;
  identification: {
    primaryMatch: Stone;
    overallConfidence: number;
    uncertaintyScore: number;
    mohsPredicted: number;
    topKCandidates: Array<{
      stoneId: string;
      name: string;
      confidence: number;
    }>;
  };
}

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  stoneId: string;
  title: string;
  description: string;
  priceUsd: number;
  weightGrams: number;
  originCountry: string;
  isVerified: boolean;
  verificationGrade: 'AAA' | 'AA' | 'A' | 'UNVERIFIED';
  imageUrl: string;
  status: 'ACTIVE' | 'SOLD' | 'CANCELLED';
}
