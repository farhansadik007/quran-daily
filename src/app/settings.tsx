import { scheduleNext7Days } from '@/utils/notifications';
import { formatHour, getNotificationHour, setNotificationHour } from '@/utils/settings';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';

const HOURS = Array.from({ length: 17 }, (_, i) => i + 5);

export default function Settings() {
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      setSelectedHour(await getNotificationHour());
    };
    load();
  }, []);

  async function handleSelect(hour: number) {
    setSelectedHour(hour);
    await setNotificationHour(hour);
    await scheduleNext7Days(hour, 0);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Daily reminder time</Text>
          <Text style={styles.hint}>Tap to change</Text>
        </View>
        <Pressable style={styles.trigger} onPress={() => setModalVisible(true)}>
          <Text style={styles.triggerText}>{formatHour(selectedHour)}</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Choose a time</Text>
            <FlatList
              data={HOURS}
              keyExtractor={(h) => String(h)}
              renderItem={({ item: hour }) => (
                <Pressable
                  style={[styles.option, selectedHour === hour && styles.optionSelected]}
                  onPress={() => handleSelect(hour)}
                >
                  <Text style={[styles.optionText, selectedHour === hour && styles.optionTextSelected]}>
                    {formatHour(hour)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  hint: { fontSize: 12, color: '#999', marginTop: 2 },
  trigger: {
    backgroundColor: '#0f4c3a',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  triggerText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  popupTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  option: { paddingVertical: 12, borderRadius: 8 },
  optionSelected: { backgroundColor: '#0f4c3a' },
  optionText: { fontSize: 15, textAlign: 'center', color: '#333' },
  optionTextSelected: { color: '#fff', fontWeight: '600' },
});