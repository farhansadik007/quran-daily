import { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { getAyahKey, getSavedAyah, toggleSaved } from '../utils';
import { Props } from '../types';
import { Ionicons } from '@expo/vector-icons';
import IslamicPatternBackground from './IslamicPatternBackground';
import { getDisplayLanguage } from '@/utils/settings';
import { useFocusEffect } from 'expo-router';

export default function AyahCard({ ayah, showSaveButton = true }: Props) {
  const [saved, setSaved] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    const load = async () => {
      const savedList = await getSavedAyah();
      setSaved(savedList.includes(getAyahKey(ayah)));
    };
    load();
  }, []);

  useFocusEffect(
  useCallback(() => {
    const load = async () => setLang(await getDisplayLanguage());
    load();
  }, [])
);

  async function handleToggleSave() {
    const newState = await toggleSaved(ayah);
    setSaved(newState);
    ToastAndroid.show(newState ? 'Saved' : 'Removed from saved', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.card}>
      <IslamicPatternBackground />
      <View style={styles.contentOverlay}>
        {showSaveButton && (
          <Pressable style={styles.saveButton} onPress={handleToggleSave}>
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={25} color="#d4a94a" />
          </Pressable>
        )}
        <Text style={styles.reference}>
          Surah {ayah.surahName} - Ayah {ayah.ayahNumber}
        </Text>
        <Text style={styles.arabic}>{ayah.arabicData[0]}</Text>
        <Text style={styles.translation}>{lang === 'bn' ? ayah.bengaliData : ayah.englishData}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  borderRadius: 16,
  marginBottom: 24,
  width: '100%',
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
},
  contentOverlay: {
    backgroundColor: 'rgba(15,76,58,0.3)',
    borderRadius: 16,
    padding: 24,
  },
  saveButton: { position: 'absolute', top: 12, right: 12 },
  reference: { fontSize: 14, color: '#d4a94a', marginBottom: 12, textAlign: 'center' },
  arabic: { fontSize: 26, textAlign: 'center', marginBottom: 16, lineHeight: 42, color: '#f5f5f0' },
  translation: { fontSize: 16, textAlign: 'center', color: '#f0ede4', marginBottom: 8 },
});