import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { getAyahKey, getSavedAyah, toggleSaved } from '../utils';
import { Props } from '../types';
import { Ionicons } from '@expo/vector-icons';



export default function AyahCard({ ayah, showSaveButton = true }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const savedList = await getSavedAyah();
      setSaved(savedList.includes(getAyahKey(ayah)));
    };
    load();
  }, []);

  async function handleToggleSave() {
    const newState = await toggleSaved(ayah);
    setSaved(newState);
    ToastAndroid.show(newState ? 'Saved' : 'Removed from saved', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.card}>
      {showSaveButton && (
        <Pressable style={styles.saveButton} onPress={handleToggleSave}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color="#0f4c3a" />
        </Pressable>
      )}
      <Text style={styles.reference}>
        Surah {ayah.surahName} - Ayah {ayah.ayahNumber}
      </Text>
      <Text style={styles.arabic}>{ayah.arabicData[0]}</Text>
      <Text style={styles.translation}>{ayah.englishData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButton: { position: 'absolute', top: 12, right: 12 },
  reference: { fontSize: 14, color: '#888', marginBottom: 12, textAlign: 'center' },
  arabic: { fontSize: 26, textAlign: 'center', marginBottom: 16, lineHeight: 42 },
  translation: { fontSize: 16, textAlign: 'center', color: '#333', marginBottom: 8 },
});