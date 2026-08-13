"""
StoneScanner — Core Scan Service (Python FastAPI)
Handles multipart image upload, quality pre-assessment, and AI pipeline orchestration.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import random
import uuid

app = FastAPI(
    title="StoneScanner — Scan Service",
    description="Multimodal image ingest, quality assessment, and AI inference orchestrator",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    user_id: str = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    image_url: str = None
    context_note: str = None

class QualityAssessment(BaseModel):
    blur_score: float
    brightness_score: float
    resolution_ok: bool
    is_geological_object: bool
    quality_grade: str

# Sample seed stone records database for inference response matching
SEED_STONES = [
    {
        "id": "amethyst",
        "name": "Amethyst Quartz",
        "mineral_name": "Quartz (Silicate)",
        "chemical_formula": "SiO2",
        "hardness_mohs": 7.0,
        "specific_gravity": 2.65,
        "crystal_system": "Trigonal",
        "luster": "Vitreous",
        "streak": "White",
        "category": "Gemstone",
        "rarity_index": 3,
        "avg_price_per_carat_usd": 15.00,
        "description": "A violet variety of quartz often used in jewelry, colored by natural gamma irradiation and iron impurities.",
        "formation_narrative": "Formed in gas cavities (geodes) inside volcanic rocks over millions of years through hydrothermal fluid cooling at 100-300°C.",
        "image_url": "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80",
        "confused_with": ["Rainbow Fluorite", "Purple Sapphire", "Aiolite", "Glass Imitation"],
        "similar_stones": ["Rose Quartz", "Citrine", "Smoky Quartz", "Jasper"]
    },
    {
        "id": "emerald",
        "name": "Colombian Emerald",
        "mineral_name": "Beryl (Cyclosilicate)",
        "chemical_formula": "Be3Al2Si6O18",
        "hardness_mohs": 7.5,
        "specific_gravity": 2.72,
        "crystal_system": "Hexagonal",
        "luster": "Vitreous",
        "streak": "White",
        "category": "Gemstone",
        "rarity_index": 8,
        "avg_price_per_carat_usd": 450.00,
        "description": "A vibrant green gem colored by chromium and vanadium inclusions within the Beryl crystal lattice.",
        "formation_narrative": "Formed in hydrothermal veins associated with granitic pegmatites and black shales under intense tectonic pressure.",
        "image_url": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
        "confused_with": ["Tsavorite Garnet", "Peridot", "Green Tourmaline", "Chrome Diopside"],
        "similar_stones": ["Aquamarine", "Morganite", "Heliodor", "Bixbite"]
    },
    {
        "id": "pyrite",
        "name": "Fools Gold (Pyrite)",
        "mineral_name": "Iron Sulfide",
        "chemical_formula": "FeS2",
        "hardness_mohs": 6.5,
        "specific_gravity": 5.01,
        "crystal_system": "Isometric (Cubic)",
        "luster": "Metallic",
        "streak": "Greenish-Black",
        "category": "Mineral",
        "rarity_index": 2,
        "avg_price_per_carat_usd": 4.50,
        "description": "A brass-yellow mineral with a bright metallic luster, famously known as Fools Gold due to its resemblance to real gold.",
        "formation_narrative": "Formed in sedimentary rocks, hydrothermal veins, and metamorphic deposits in sulfur-rich environments.",
        "image_url": "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80",
        "confused_with": ["Native Gold", "Chalcopyrite", "Marcasite", "Pyrrhotite"],
        "similar_stones": ["Magnetite", "Hematite", "Galena", "Arsenopyrite"]
    },
    {
        "id": "malachite",
        "name": "Congolese Malachite",
        "mineral_name": "Copper Carbonate Hydroxide",
        "chemical_formula": "Cu2CO3(OH)2",
        "hardness_mohs": 3.8,
        "specific_gravity": 4.00,
        "crystal_system": "Monoclinic",
        "luster": "Silky / Adamantine",
        "streak": "Pale Green",
        "category": "Mineral",
        "rarity_index": 5,
        "avg_price_per_carat_usd": 25.00,
        "description": "A striking green copper carbonate mineral characterized by distinctive concentric banding.",
        "formation_narrative": "Formed in the oxidation zones of copper ore deposits where carbonated waters react with copper minerals.",
        "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        "confused_with": ["Azurite", "Chrysocolla", "Pseudomalachite", "Variscite"],
        "similar_stones": ["Azurite", "Turquoise", "Cuprite", "Dioptase"]
    },
    {
        "id": "obsidian",
        "name": "Black Obsidian",
        "mineral_name": "Volcanic Glass",
        "chemical_formula": "70%+ SiO2 (Amorphous)",
        "hardness_mohs": 5.5,
        "specific_gravity": 2.40,
        "crystal_system": "Amorphous",
        "luster": "Vitreous",
        "streak": "White",
        "category": "Igneous Rock",
        "rarity_index": 2,
        "avg_price_per_carat_usd": 8.00,
        "description": "A naturally occurring volcanic glass formed when felsic lava cools rapidly with minimal crystal growth.",
        "formation_narrative": "Formed when high-silica lava extrudes from a volcano and chills instantaneously upon exposure to water or air.",
        "image_url": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
        "confused_with": ["Black Tourmaline (Schorl)", "Onyx", "Tektite", "Coal"],
        "similar_stones": ["Basalt", "Pumice", "Rhyolite", "Flint"]
    }
]

@app.get("/health")
def health_check():
    return {"service": "Scan Service", "status": "HEALTHY", "time": time.time()}

@app.post("/v1/scans/analyze")
def analyze_scan(payload: ScanRequest):
    """
    Simulates multi-stage computer vision inference:
    Stage 1: Quality Check
    Stage 2: Primary Classifier (ResNet-152 + ViT)
    Stage 3: Secondary Attributes & Bayesian Ensemble Calibration
    """
    scan_id = str(uuid.uuid4())
    
    # Pick target stone based on input or seed default
    matched_stone = random.choice(SEED_STONES)
    
    # Calculate top-k probabilities
    top_k = [
        {"stone_id": matched_stone["id"], "name": matched_stone["name"], "confidence": 0.942},
        {"stone_id": SEED_STONES[(SEED_STONES.index(matched_stone) + 1) % len(SEED_STONES)]["id"], "name": SEED_STONES[(SEED_STONES.index(matched_stone) + 1) % len(SEED_STONES)]["name"], "confidence": 0.038},
        {"stone_id": SEED_STONES[(SEED_STONES.index(matched_stone) + 2) % len(SEED_STONES)]["id"], "name": SEED_STONES[(SEED_STONES.index(matched_stone) + 2) % len(SEED_STONES)]["name"], "confidence": 0.014}
    ]
    
    return {
        "scan_id": scan_id,
        "status": "COMPLETED",
        "processing_time_ms": 482,
        "quality_assessment": {
            "blur_score": 14.8,
            "brightness_ok": True,
            "resolution": "1920x1080",
            "quality_grade": "EXCELLENT"
        },
        "identification": {
            "primary_match": matched_stone,
            "overall_confidence": 0.942,
            "uncertainty_score": 0.038,
            "mohs_predicted": matched_stone["hardness_mohs"],
            "top_k_candidates": top_k
        },
        "model_metadata": {
            "vision_models": ["ResNet-152", "Vision Transformer (ViT-Base)", "EfficientNet-B7"],
            "calibration_method": "Bayesian Ensemble Monte Carlo Dropout",
            "inference_hardware": "NVIDIA TensorRT GPU Cluster"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
