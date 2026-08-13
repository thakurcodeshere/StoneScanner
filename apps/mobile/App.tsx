import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from 'react-native';

const { width } = Dimensions.get('window');

interface StoneData {
  id: string;
  name: string;
  mineralName: string;
  formula: string;
  hardness: number;
  specificGravity: number;
  crystalSystem: string;
  luster: string;
  pricePerCarat: number;
  description: string;
  formationNarrative: string;
  imageUrl: string;
  lookalikes: string[];
}

const SAMPLE_STONES: StoneData[] = [
  {
    id: 'amethyst',
    name: 'Amethyst Quartz',
    mineralName: 'Quartz (Silicate)',
    formula: 'SiO2',
    hardness: 7.0,
    specificGravity: 2.65,
    crystalSystem: 'Trigonal',
    luster: 'Vitreous',
    pricePerCarat: 15.00,
    description: 'A purple variety of quartz often used in jewelry, colored by natural gamma irradiation and trace iron impurities.',
    formationNarrative: 'Formed in gas geodes inside volcanic rocks over millions of years through hydrothermal fluid cooling at 100-300°C.',
    imageUrl: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80',
    lookalikes: ['Rainbow Fluorite', 'Purple Sapphire', 'Iolite', 'Glass Imitation']
  },
  {
    id: 'emerald',
    name: 'Colombian Emerald',
    mineralName: 'Beryl (Cyclosilicate)',
    formula: 'Be3Al2Si6O18',
    hardness: 7.5,
    specificGravity: 2.72,
    crystalSystem: 'Hexagonal',
    luster: 'Vitreous',
    pricePerCarat: 450.00,
    description: 'Vibrant green gemstone colored by chromium and vanadium inclusions in the beryl lattice.',
    formationNarrative: 'Formed in hydrothermal veins associated with granitic pegmatites under intense tectonic pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
    lookalikes: ['Tsavorite Garnet', 'Peridot', 'Green Tourmaline', 'Chrome Diopside']
  },
  {
    id: 'pyrite',
    name: 'Fools Gold (Pyrite)',
    mineralName: 'Iron Sulfide',
    formula: 'FeS2',
    hardness: 6.5,
    specificGravity: 5.01,
    crystalSystem: 'Isometric (Cubic)',
    luster: 'Metallic',
    pricePerCarat: 4.50,
    description: 'Brass-yellow mineral with bright metallic luster, famously known as Fools Gold.',
    formationNarrative: 'Formed in sedimentary rocks, hydrothermal veins, and metamorphic deposits in sulfur-rich environments.',
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80',
    lookalikes: ['Native Gold', 'Chalcopyrite', 'Marcasite', 'Pyrrhotite']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'collection' | 'market'>('scanner');
  const [selectedStone, setSelectedStone] = useState<StoneData>(SAMPLE_STONES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [savedCollection, setSavedCollection] = useState<string[]>([]);

  const triggerMobileScan = (stone: StoneData) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedStone(stone);
      setIsScanning(false);
    }, 1200);
  };

  const toggleSaveCollection = (id: string) => {
    if (savedCollection.includes(id)) {
      setSavedCollection(savedCollection.filter(item => item !== id));
    } else {
      setSavedCollection([...savedCollection, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07090E" />

      {/* Top Mobile Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerLogo}>🪨 StoneScanner</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Mobile AI v1.0</Text>
          </View>
        </View>
        <Text style={styles.headerSub}>iOS & Android Geological Field Guide</Text>
      </View>

      {/* Main Tab Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'scanner' && (
          <View style={styles.section}>
            {/* Camera Viewfinder Box */}
            <View style={styles.cameraBox}>
              <Image source={{ uri: selectedStone.imageUrl }} style={styles.cameraImage} />
              
              {isScanning ? (
                <View style={styles.overlayScan}>
                  <ActivityIndicator size="large" color="#00F090" />
                  <Text style={styles.scanText}>Inferencing PyTorch Mobile Vision Ensemble...</Text>
                </View>
              ) : (
                <View style={styles.overlayControls}>
                  <Text style={styles.qualityTag}>✓ Quality: 98.4% (Optimal Lighting)</Text>
                </View>
              )}
            </View>

            {/* Preset Selector */}
            <Text style={styles.sectionTitle}>Sample Geological Presets</Text>
            <View style={styles.presetRow}>
              {SAMPLE_STONES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.presetBtn,
                    selectedStone.id === item.id && styles.presetBtnActive
                  ]}
                  onPress={() => triggerMobileScan(item)}
                >
                  <Text style={styles.presetText}>{item.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Identification Result Details */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.stoneName}>{selectedStone.name}</Text>
                  <Text style={styles.mineralName}>{selectedStone.mineralName}</Text>
                </View>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>${selectedStone.pricePerCarat.toFixed(2)}/ct</Text>
                </View>
              </View>

              {/* Confidence Meter */}
              <View style={styles.confidenceRow}>
                <Text style={styles.confidenceLabel}>AI Match Confidence:</Text>
                <Text style={styles.confidenceVal}>94.2%</Text>
              </View>

              {/* Properties Grid */}
              <View style={styles.propGrid}>
                <View style={styles.propBox}>
                  <Text style={styles.propLabel}>Mohs Hardness</Text>
                  <Text style={styles.propVal}>{selectedStone.hardness} / 10</Text>
                </View>
                <View style={styles.propBox}>
                  <Text style={styles.propLabel}>Formula</Text>
                  <Text style={styles.propVal}>{selectedStone.formula}</Text>
                </View>

                <View style={styles.propBox}>
                  <Text style={styles.propLabel}>Crystal System</Text>
                  <Text style={styles.propVal}>{selectedStone.crystalSystem}</Text>
                </View>
                <View style={styles.propBox}>
                  <Text style={styles.propLabel}>Luster</Text>
                  <Text style={styles.propVal}>{selectedStone.luster}</Text>
                </View>
              </View>

              {/* AI Narrative */}
              <Text style={styles.narrativeTitle}>AI Formation Narrative</Text>
              <Text style={styles.narrativeBody}>{selectedStone.formationNarrative}</Text>

              {/* Lookalikes */}
              <Text style={styles.lookalikeTitle}>⚠️ Common Lookalikes</Text>
              <View style={styles.tagWrap}>
                {selectedStone.lookalikes.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  savedCollection.includes(selectedStone.id) && styles.savedBtn
                ]}
                onPress={() => toggleSaveCollection(selectedStone.id)}
              >
                <Text style={styles.saveBtnText}>
                  {savedCollection.includes(selectedStone.id)
                    ? '✓ In My Field Collection'
                    : '+ Save to Pocket Collection'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'collection' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Pocket Geological Collection</Text>
            <Text style={styles.sectionSub}>Saved specimens from your field scans</Text>

            {savedCollection.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No stones saved yet. Use the camera scanner to add specimens!</Text>
              </View>
            ) : (
              savedCollection.map((id) => {
                const stone = SAMPLE_STONES.find(s => s.id === id);
                if (!stone) return null;
                return (
                  <View key={id} style={styles.collectionItem}>
                    <Image source={{ uri: stone.imageUrl }} style={styles.colImg} />
                    <View style={styles.colDetails}>
                      <Text style={styles.stoneName}>{stone.name}</Text>
                      <Text style={styles.mineralName}>{stone.mineralName} • Mohs {stone.hardness}</Text>
                      <Text style={styles.formulaText}>{stone.formula}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        )}

        {activeTab === 'market' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mobile Mineral Marketplace</Text>
            <Text style={styles.sectionSub}>Escrow verified gemstones and crystals</Text>

            {SAMPLE_STONES.map((stone) => (
              <View key={stone.id} style={styles.marketCard}>
                <Image source={{ uri: stone.imageUrl }} style={styles.marketImg} />
                <View style={styles.marketInfo}>
                  <Text style={styles.stoneName}>{stone.name}</Text>
                  <Text style={styles.mineralName}>Certified Authentic • {stone.crystalSystem}</Text>
                  <Text style={styles.priceText}>${(stone.pricePerCarat * 20).toFixed(2)} USD</Text>
                  <TouchableOpacity style={styles.buyBtn}>
                    <Text style={styles.buyBtnText}>Buy with Escrow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Mobile Tab Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'scanner' && styles.navItemActive]}
          onPress={() => setActiveTab('scanner')}
        >
          <Text style={styles.navIcon}>📷</Text>
          <Text style={[styles.navText, activeTab === 'scanner' && styles.navTextActive]}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'collection' && styles.navItemActive]}
          onPress={() => setActiveTab('collection')}
        >
          <Text style={styles.navIcon}>💼</Text>
          <Text style={[styles.navText, activeTab === 'collection' && styles.navTextActive]}>Collection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'market' && styles.navItemActive]}
          onPress={() => setActiveTab('market')}
        >
          <Text style={styles.navIcon}>💎</Text>
          <Text style={[styles.navText, activeTab === 'market' && styles.navTextActive]}>Market</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090E'
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#0E131F',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)'
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#00F090'
  },
  badge: {
    backgroundColor: 'rgba(0, 240, 144, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 144, 0.3)'
  },
  badgeText: {
    fontSize: 10,
    color: '#00F090',
    fontWeight: '700'
  },
  headerSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80
  },
  section: {
    gap: 16
  },
  cameraBox: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 144, 0.3)',
    position: 'relative'
  },
  cameraImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  overlayScan: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 9, 14, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  scanText: {
    color: '#00F090',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center'
  },
  overlayControls: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12
  },
  qualityTag: {
    backgroundColor: 'rgba(7, 9, 14, 0.85)',
    color: '#00F090',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  sectionTitle: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8
  },
  sectionSub: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: -10
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8
  },
  presetBtn: {
    flex: 1,
    backgroundColor: '#0E131F',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center'
  },
  presetBtnActive: {
    borderColor: '#00F090',
    backgroundColor: 'rgba(0, 240, 144, 0.1)'
  },
  presetText: {
    color: '#F3F4F6',
    fontSize: 12,
    fontWeight: '600'
  },
  resultCard: {
    backgroundColor: '#0E131F',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  stoneName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800'
  },
  mineralName: {
    color: '#00F090',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2
  },
  priceBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)'
  },
  priceText: {
    color: '#FFB800',
    fontSize: 12,
    fontWeight: '800'
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#07090E',
    padding: 10,
    borderRadius: 8
  },
  confidenceLabel: {
    color: '#9CA3AF',
    fontSize: 12
  },
  confidenceVal: {
    color: '#00F090',
    fontSize: 12,
    fontWeight: '800'
  },
  propGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  propBox: {
    width: (width - 64) / 2,
    backgroundColor: '#07090E',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  propLabel: {
    color: '#9CA3AF',
    fontSize: 10
  },
  propVal: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2
  },
  narrativeTitle: {
    color: '#B855FF',
    fontSize: 12,
    fontWeight: '700'
  },
  narrativeBody: {
    color: '#D1D5DB',
    fontSize: 12,
    lineHeight: 18
  },
  lookalikeTitle: {
    color: '#FFB800',
    fontSize: 12,
    fontWeight: '700'
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  tag: {
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.2)'
  },
  tagText: {
    color: '#FFB800',
    fontSize: 10
  },
  saveBtn: {
    backgroundColor: '#00F090',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6
  },
  savedBtn: {
    backgroundColor: '#059669'
  },
  saveBtnText: {
    color: '#07090E',
    fontWeight: '800',
    fontSize: 13
  },
  emptyCard: {
    backgroundColor: '#0E131F',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center'
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center'
  },
  collectionItem: {
    flexDirection: 'row',
    backgroundColor: '#0E131F',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12
  },
  colImg: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  colDetails: {
    flex: 1
  },
  formulaText: {
    color: '#9CA3AF',
    fontSize: 11
  },
  marketCard: {
    flexDirection: 'row',
    backgroundColor: '#0E131F',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  marketImg: {
    width: 100,
    height: 120
  },
  marketInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  buyBtn: {
    backgroundColor: '#FFB800',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  buyBtnText: {
    color: '#07090E',
    fontWeight: '800',
    fontSize: 11
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#0E131F',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#00F090'
  },
  navIcon: {
    fontSize: 16
  },
  navText: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 2
  },
  navTextActive: {
    color: '#00F090',
    fontWeight: '700'
  }
});
