import { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ayaat from '../data/ayah.json';
import AyahCard from '@/components/AyahCard';
import MarkAsReadButton from '@/components/MarkAsReadButton';
import { Ayah } from '@/types';
import WeekMeter from '@/components/WeekMeter';
import ShareButton from '@/components/ShareButton';


export default function App() {
  const [ayah, setAyah] = useState<Ayah | null>(null);

  useEffect(() => {
    const dayOfYear: number = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % ayaat.length;
    setAyah(ayaat[index]);
  }, []);

  if (!ayah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WeekMeter />
      <View style={styles.centerContent}>
        <AyahCard ayah={ayah} />
        <View style={styles.actionsRow}>
          <MarkAsReadButton />
          <ShareButton ayah={ayah} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 24, paddingRight: 24, backgroundColor: '#edefe6' },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  arabic: { fontSize: 20, textAlign: 'center', marginBottom: 16, lineHeight: 42 },
  translation: { fontSize: 16, textAlign: 'center', color: '#333' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});