import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah } from '../types';

type Props = {
    ayah: Ayah;
    onPress: () => void;
};

export default function AyahListItem({ ayah, onPress }: Props) {
    const snippet =
        ayah.englishData.length > 60
            ? ayah.englishData.slice(0, 90) + '…'
            : ayah.englishData;


    return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(15,76,58,0.08)' }}
    >
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.reference}>
            Surah {ayah.surahName} -  Ayah {ayah.ayahNumber}
          </Text>
          <Ionicons name="bookmark" size={16} color="#d4a94a" />
        </View>
        <Text style={styles.snippet}>{snippet}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    marginHorizontal: 10,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemPressed: { opacity: 0.9 },
  accentBar: { width: 4, backgroundColor: '#0f4c3a' },
  content: { flex: 1, padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reference: { fontSize: 13, color: '#0f4c3a', fontWeight: '600' },
  snippet: { fontSize: 15, color: '#333', lineHeight: 21 },
});