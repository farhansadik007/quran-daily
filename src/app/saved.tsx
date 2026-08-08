import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { getSavedAyah, getAyahByKey } from '../utils';
import { Ayah } from '../types';
import AyahCard from '../components/AyahCard';
import AyahListItem from '@/components/AyahListItem';

export default function Saved() {
  const [savedAyah, setSavedAyah] = useState<Ayah[]>([]);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const keys = (await getSavedAyah()).filter(Boolean);
        const ayaat = keys.map(getAyahByKey).filter((a): a is Ayah => !!a);
        setSavedAyah(ayaat);
      };
      load();
    }, [])
  );

  return (
    <>
      <FlatList
        data={savedAyah}
        keyExtractor={(item) => `${item.surahNumber}-${item.ayahNumber}`}
        renderItem={({ item }) => <AyahListItem ayah={item} onPress={() => setSelectedAyah(item)} />}
      />

      <Modal
        visible={!!selectedAyah}
        transparent
        animationType="none"
        onRequestClose={() => setSelectedAyah(null)}
      >
        <View style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectedAyah(null)} />
          {selectedAyah && <AyahCard ayah={selectedAyah} showSaveButton={false} />}
        </View>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});