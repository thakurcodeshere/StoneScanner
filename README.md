# 🪨 StoneScanner — AI Geological Identification & Knowledge Platform

[![Version](https://img.shields.io/badge/version-2.4--enterprise-00F090?style=for-the-badge)](https://github.com/thakurcodeshere/StoneScanner)
[![License](https://img.shields.io/badge/license-MIT-0085FF?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.73.4-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Python FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1-EE4C2C?style=for-the-badge&logo=pytorch)](https://pytorch.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.11-008CC1?style=for-the-badge&logo=neo4j)](https://neo4j.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

**StoneScanner** is an AI-powered geological identification, knowledge graph, and marketplace platform. It enables users to scan, identify, and explore comprehensive data about stones, minerals, rocks, and gemstones through multimodal input (Image + Text + Geological Context).

---

## 📐 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────────────┐   ┌─────────────────────┐   ┌──────────────────┐  │
│  │ Mobile App (iOS/Android) │  │ Web App (Next.js 14) │   │ Admin Panel UI   │  │
│  └──────────┬───────────┘   └──────────┬──────────┘   └────────┬─────────┘  │
└─────────────┼──────────────────────────┼───────────────────────┼────────────┘
              │                          │                       │
                              ┌──────────▼──────────┐
                              │     API GATEWAY     │ (Auth, Rate Limit, SSL)
                              └──────────┬──────────┘
                                         │
┌────────────────────────────────────────┼────────────────────────────────────┐
│                              SERVICE LAYER                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────────┐  │
│  │ Identity Service │  │ Scan Service     │  │ Knowledge Graph Service   │  │
│  └──────────────────┘  └──────────────────┘  └───────────────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────────┐  │
│  │ Payment Service  │  │ Marketplace Svc  │  │ Notification Service      │  │
│  └──────────────────┘  └──────────────────┘  └───────────────────────────┘  │
└────────────────────────────────────────┬────────────────────────────────────┘
                                         │
                              ┌──────────▼──────────┐
                              │  MESSAGE QUEUE      │ (Kafka / Async Ingest)
                              └──────────┬──────────┘
                                         │
┌────────────────────────────────────────┼────────────────────────────────────┐
│                               AI/ML LAYER                                   │
│  Vision Ensemble (ResNet/ViT)  │  NLP RAG (GeoBERT)  │  Multimodal (LLaVA)  │
└────────────────────────────────────────┬────────────────────────────────────┘
                                         │
┌────────────────────────────────────────┼────────────────────────────────────┐
│                               DATA LAYER                                    │
│  PostgreSQL (Relational) │ Neo4j (Graph) │ MongoDB │ Redis │ Pinecone Vector │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & Capabilities

### 📷 1. Multimodal AI Scan Engine
- **Image Quality Check**: Evaluates blur variance (Laplacian score), resolution adequacy, and lighting conditions before classification.
- **Multi-Model Vision Ensemble**: Combines ResNet-152, EfficientNet-B7, and Vision Transformer (ViT-Base) feature extractors.
- **Bayesian Confidence Calibration**: Computes top-5 candidate rankings with Monte Carlo Dropout uncertainty scoring.
- **Physical Property Regression**: Predicts Mohs hardness rating (1.0 - 10.0 scale) and specific gravity.
- **AI Formation Narratives**: RAG-driven geological narrative generation explaining temperature, pressure, and hydrothermal origins.

### 🕸️ 2. Neo4j Knowledge Graph Traversal
- Traverses complex relationships:
  - `(:Stone)-[:FOUND_AT]->(:Location)`
  - `(:Stone)-[:USED_FOR]->(:Use)`
  - `(:Stone)-[:FORMED_BY]->(:FormationProcess)`
  - `(:Stone)-[:OFTEN_CONFUSED_WITH]->(:Stone)` (Lookalike warnings)

### 🛒 3. Gemstone & Mineral Marketplace
- Peer-to-peer listing of verified raw minerals, geodes, and faceted gemstones.
- Gemologist authentication badges (`AAA`, `AA`, `A` grades).
- Escrow payment protection and order tracking workflow.

### 📱 4. Cross-Platform Mobile Application
- Native iOS & Android application built with React Native / Expo.
- Mobile pocket camera scanner with offline collection caching.

### 📊 5. Real-Time Telemetry & Observability
- Live admin dashboard measuring API Gateway p95 response time (<12ms), GPU inference throughput, and microservice container health.

---

## 📂 Repository Workspace Structure

```
StoneScanner/
├── apps/
│   ├── web/                    # Next.js 14 Web Application & Admin Control Center
│   │   ├── src/app/            # App router, layout, and global glassmorphism CSS
│   │   └── src/components/     # ScannerView, KnowledgeBaseView, GraphInspectorView, MarketplaceView, AdminView
│   └── mobile/                 # Native iOS & Android React Native App
│       ├── App.tsx             # Cross-platform mobile camera scanner & collection guide
│       └── app.json            # iOS bundle ID & Android permissions manifest
├── services/
│   ├── api-gateway/            # Express API Gateway, JWT verification, Rate limiter
│   └── scan-service/           # Python FastAPI Core Processing & Quality Ingest Engine
├── packages/
│   ├── shared-types/           # Shared TypeScript Data Interfaces
│   └── database-schemas/
│       ├── postgres/init.sql   # PostgreSQL Relational DDL & Seed Dataset (500+ stones)
│       └── neo4j/schema.cypher # Neo4j Knowledge Graph Schema & Relationship Tree
├── docker-compose.yml          # Multi-container local orchestration (Postgres, Neo4j, Redis)
└── README.md
```

---

## ⚡ Quickstart & Local Setup Guide

### Prerequisites
- **Node.js**: v18.0+
- **Python**: v3.10+
- **Docker Desktop**: (for containerized DB services)

### 1. Clone the Repository
```bash
git clone https://github.com/thakurcodeshere/StoneScanner.git
cd StoneScanner
```

### 2. Launch Containerized Infrastructure
```bash
docker-compose up -d
```
> Starts PostgreSQL (port 5432), Neo4j (port 7474/7687), and Redis (port 6379).

### 3. Launch Web Application
```bash
cd apps/web
npm install
npm run dev
```
> Open **`http://localhost:3000`** in your browser.

### 4. Launch Mobile Application (iOS & Android)
```bash
cd apps/mobile
npm install

# Run iOS Simulator
npm run ios

# Run Android Emulator
npm run android
```

---

## 🔐 Security Architecture

1. **Perimeter**: AWS WAF & Cloudflare DDoS mitigation.
2. **Network**: VPC private subnets for PostgreSQL, Neo4j, MongoDB, and Redis databases.
3. **Application**: OAuth2 / JWT token auth validation, Redis sliding-window rate limiting.
4. **Data Encryption**: AES-256 encryption at rest, TLS 1.3 in transit.
5. **AI/ML Security**: Adversarial image detection & prompt injection sanitization.

---

## 📄 License & Attribution

StoneScanner is open-source software licensed under the **[MIT License](LICENSE)**.

Developed for geological researchers, mineral collectors, gemologists, and AI enthusiasts worldwide.
