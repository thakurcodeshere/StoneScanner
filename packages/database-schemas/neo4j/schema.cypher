// StoneScanner Neo4j Schema & Seed Knowledge Graph Script

// Constraints
CREATE CONSTRAINT stone_id_unique IF NOT EXISTS FOR (s:Stone) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT location_id_unique IF NOT EXISTS FOR (l:Location) REQUIRE l.id IS UNIQUE;
CREATE CONSTRAINT use_id_unique IF NOT EXISTS FOR (u:Use) REQUIRE u.id IS UNIQUE;

// Core Stone Nodes
MERGE (s1:Stone {id: "amethyst", name: "Amethyst Quartz", mineral_name: "Quartz", hardness_mohs: 7.0, crystal_system: "Trigonal", luster: "Vitreous"})
MERGE (s2:Stone {id: "emerald", name: "Colombian Emerald", mineral_name: "Beryl", hardness_mohs: 7.5, crystal_system: "Hexagonal", luster: "Vitreous"})
MERGE (s3:Stone {id: "pyrite", name: "Fools Gold (Pyrite)", mineral_name: "Iron Sulfide", hardness_mohs: 6.5, crystal_system: "Isometric", luster: "Metallic"})
MERGE (s4:Stone {id: "malachite", name: "Malachite", mineral_name: "Copper Carbonate", hardness_mohs: 3.8, crystal_system: "Monoclinic", luster: "Silky"})
MERGE (s5:Stone {id: "fluorite", name: "Rainbow Fluorite", mineral_name: "Calcium Fluoride", hardness_mohs: 4.0, crystal_system: "Isometric", luster: "Vitreous"})

// Location Nodes
MERGE (l1:Location {id: "loc_brazil", name: "Rio Grande do Sul", country: "Brazil", region: "South America"})
MERGE (l2:Location {id: "loc_colombia", name: "Muzo Mine", country: "Colombia", region: "South America"})
MERGE (l3:Location {id: "loc_congo", name: "Katanga Copper Crescent", country: "DR Congo", region: "Africa"})
MERGE (l4:Location {id: "loc_peru", name: "Huanzala Mine", country: "Peru", region: "South America"})

// Use Nodes
MERGE (u1:Use {id: "use_jewelry", category: "Jewelry", subcategory: "Faceted Gemstones", historical_period: "Ancient Greece to Modern"})
MERGE (u2:Use {id: "use_industrial", category: "Industrial", subcategory: "Sulfuric Acid Production", historical_period: "Industrial Era"})
MERGE (u3:Use {id: "use_pigment", category: "Art & Pigment", subcategory: "Green Verditer Paint", historical_period: "Renaissance"})

// Formation Process Nodes
MERGE (f1:FormationProcess {id: "fp_geode", process_type: "Hydrothermal Geode Growth", temperature_range: "100-300C", pressure_range: "Low-Moderate"})
MERGE (f2:FormationProcess {id: "fp_pegmatite", process_type: "Granitic Pegmatite Cooling", temperature_range: "400-700C", pressure_range: "High"})
MERGE (f3:FormationProcess {id: "fp_supergene", process_type: "Copper Ore Oxidation", temperature_range: "Ambient", pressure_range: "Atmospheric"})

// Relationships
MERGE (s1)-[:FOUND_AT {confidence: 0.95}]->(l1)
MERGE (s2)-[:FOUND_AT {confidence: 0.98}]->(l2)
MERGE (s3)-[:FOUND_AT {confidence: 0.90}]->(l4)
MERGE (s4)-[:FOUND_AT {confidence: 0.94}]->(l3)

MERGE (s1)-[:USED_FOR]->(u1)
MERGE (s2)-[:USED_FOR]->(u1)
MERGE (s3)-[:USED_FOR]->(u2)
MERGE (s4)-[:USED_FOR]->(u3)

MERGE (s1)-[:FORMED_BY]->(f1)
MERGE (s2)-[:FORMED_BY]->(f2)
MERGE (s4)-[:FORMED_BY]->(f3)

// Lookalikes & Confusion Graph
MERGE (s3)-[:OFTEN_CONFUSED_WITH {reason: "Metallic brass color and crystalline geometry"}]->(s1)
MERGE (s4)-[:OFTEN_CONFUSED_WITH {reason: "Similar green color banding"}]->(s5)
MERGE (s1)-[:SIMILAR_TO {similarity_score: 0.88}]->(s5)
