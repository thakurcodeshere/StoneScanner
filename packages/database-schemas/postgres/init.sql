-- StoneScanner PostgreSQL DDL & Seed Initialization Script

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER', -- USER, SELLER, GEMOLOGIST, ADMIN
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stone Profile Master Table
CREATE TABLE IF NOT EXISTS stones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    mineral_name VARCHAR(255) NOT NULL,
    chemical_formula VARCHAR(255) NOT NULL,
    hardness_mohs NUMERIC(3, 1) NOT NULL,
    specific_gravity NUMERIC(4, 2) NOT NULL,
    crystal_system VARCHAR(100) NOT NULL,
    luster VARCHAR(100) NOT NULL,
    streak VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Gemstone, Mineral, Igneous Rock, Sedimentary Rock, Metamorphic Rock, Meteorite
    rarity_index INTEGER CHECK (rarity_index BETWEEN 1 AND 10),
    avg_price_per_carat_usd NUMERIC(10, 2),
    description TEXT NOT NULL,
    formation_narrative TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- User Scans Table
CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    quality_score NUMERIC(3, 2) DEFAULT 0.95,
    blur_score NUMERIC(5, 2) DEFAULT 12.4,
    status VARCHAR(50) DEFAULT 'COMPLETED', -- PROCESSING, COMPLETED, FAILED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Scan Identification Results
CREATE TABLE IF NOT EXISTS scan_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    top_stone_id UUID REFERENCES stones(id),
    confidence_score NUMERIC(4, 3) NOT NULL,
    top_k_candidates JSONB NOT NULL,
    mohs_predicted NUMERIC(3, 1),
    uncertainty_score NUMERIC(4, 3) DEFAULT 0.042,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Collections
CREATE TABLE IF NOT EXISTS user_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stone_id UUID REFERENCES stones(id) ON DELETE CASCADE,
    scanned_image_url TEXT,
    notes TEXT,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, stone_id)
);

-- Marketplace Listings
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stone_id UUID REFERENCES stones(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    weight_grams NUMERIC(8, 2) NOT NULL,
    origin_country VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_grade VARCHAR(50) DEFAULT 'UNVERIFIED', -- AAA, AA, A, UNVERIFIED
    image_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, SOLD, CANCELLED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Marketplace Orders
CREATE TABLE IF NOT EXISTS marketplace_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES marketplace_listings(id),
    buyer_id UUID REFERENCES users(id),
    amount_usd NUMERIC(10, 2) NOT NULL,
    escrow_status VARCHAR(50) DEFAULT 'HELD', -- HELD, RELEASED, REFUNDED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED GEOLOGICAL DATA
INSERT INTO stones (slug, name, mineral_name, chemical_formula, hardness_mohs, specific_gravity, crystal_system, luster, streak, category, rarity_index, avg_price_per_carat_usd, description, formation_narrative, image_url) VALUES
('amethyst', 'Amethyst Quartz', 'Quartz (Silicate)', 'SiO2', 7.0, 2.65, 'Trigonal', 'Vitreous', 'White', 'Gemstone', 3, 15.00, 'A purple variety of quartz often used in jewelry, colored by irradiation and trace iron impurities.', 'Formed in gas cavities (geodes) inside volcanic rocks over millions of years through hydrothermal fluid cooling.', 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80'),
('emerald', 'Colombian Emerald', 'Beryl (Cyclosilicate)', 'Be3Al2Si6O18', 7.5, 2.72, 'Hexagonal', 'Vitreous', 'White', 'Gemstone', 8, 450.00, 'A vibrant green gemstone colored by chromium and vanadium inclusions.', 'Formed in hydrothermal veins associated with granitic pegmatites and black shales under intense tectonic pressure.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80'),
('pyrite', 'Fools Gold (Pyrite)', 'Iron Sulfide', 'FeS2', 6.5, 5.01, 'Isometric (Cubic)', 'Metallic', 'Greenish-Black', 'Mineral', 2, 4.50, 'A brass-yellow mineral with a bright metallic luster, famously known as Fools Gold.', 'Formed in sedimentary rocks, hydrothermal veins, and metamorphic deposits under sulfur-rich environments.', 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80'),
('malachite', 'Congolese Malachite', 'Copper Carbonate Hydroxide', 'Cu2CO3(OH)2', 3.8, 4.00, 'Monoclinic', 'Silky / Adamantine', 'Pale Green', 'Mineral', 5, 25.00, 'A striking green copper carbonate mineral characterized by distinctive concentric banding.', 'Formed in the oxidation zones of copper ore deposits where carbonated waters react with copper minerals.', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'),
('obsidian', 'Black Obsidian', 'Volcanic Glass', '70%+ SiO2 (Amorphous)', 5.5, 2.40, 'Amorphous (Non-crystalline)', 'Vitreous', 'White', 'Igneous Rock', 2, 8.00, 'A naturally occurring volcanic glass formed when felsic lava cools rapidly with minimal crystal growth.', 'Formed when high-silica lava extrudes from a volcano and chills instantaneously upon exposure to water or air.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80'),
('sapphire', 'Royal Blue Sapphire', 'Corundum (Aluminum Oxide)', 'Al2O3', 9.0, 4.00, 'Trigonal', 'Vitreous', 'White', 'Gemstone', 9, 850.00, 'A precious gemstone variety of corundum colored blue by iron and titanium trace elements.', 'Formed in regional metamorphic rocks and silica-poor igneous pegmatites deep in Earth mantle.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'),
('rose-quartz', 'Madagascar Rose Quartz', 'Quartz (Silicate)', 'SiO2', 7.0, 2.65, 'Trigonal', 'Vitreous', 'White', 'Gemstone', 2, 6.00, 'A soft pink variety of quartz colored by microscopic fibrous inclusions of dumortierite.', 'Formed in massive pegmatite cores through high-temperature hydrothermal crystallization.', 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80'),
('lapis-lazuli', 'Afghan Lapis Lazuli', 'Metamorphic Rock (Lazurite)', '(Na,Ca)8(AlSiO4)6(S,SO4,Cl)2', 5.5, 2.75, 'Isometric', 'Vitreous to Dull', 'Light Blue', 'Metamorphic Rock', 6, 45.00, 'A deep-blue metamorphic rock prized since antiquity, flecked with golden pyrite inclusions.', 'Formed by contact metamorphism of limestone deposits near granitic intrusions.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80');

-- SEED DEMO USER
INSERT INTO users (id, email, password_hash, full_name, role) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'geologist@stonescanner.com', '$2b$10$X8m...hashed', 'Dr. Elena Rostova (Senior Geologist)', 'ADMIN');
