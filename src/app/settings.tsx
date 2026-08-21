import { scheduleNext7Days } from '@/utils/notifications';
import { formatHour, getDisplayLanguage, getNotificationHour, setDisplayLanguage, setNotificationHour } from '@/utils/settings';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { openBatteryOptimizationSettings } from '../utils/notifications';
import IslamicPatternBackground from '@/components/IslamicPatternBackground';
import AppBannerAd from '@/components/BannerAds';

const HOURS = Array.from({ length: 17 }, (_, i) => i + 5);

export default function Settings() {
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedLang, setSelectedLang] = useState<'en' | 'bn'>('en');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const [attributionVisible, setAttributionVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      setSelectedHour(await getNotificationHour());
      setSelectedLang(await getDisplayLanguage());
    };
    load();
  }, []);

  // daily reminder settings 
  async function handleSelect(hour: number) {
    setSelectedHour(hour);
    await setNotificationHour(hour);
    await scheduleNext7Days(hour, 0);
    setModalVisible(false);
  }

  // language settings 
  async function handleSelectLang(lang: 'en' | 'bn') {
    setSelectedLang(lang);
    await setDisplayLanguage(lang);
    const hour = await getNotificationHour();
    await scheduleNext7Days(hour);
    setLangModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Daily Reminder Setting */}
      <View style={styles.settingRow}>
        <IslamicPatternBackground bgColor="transparent" lineColor="#0f4c3a" opacity={0.08} />
        <View>
          <Text style={styles.label}>Daily reminder time</Text>
          <Text style={styles.hint}>Tap to change</Text>
        </View>
        <Pressable style={styles.trigger} onPress={() => setModalVisible(true)}>
          <Text style={styles.triggerText}>{formatHour(selectedHour)}</Text>
        </Pressable>
      </View>

      {/* Battery Optimization Setting */}
      <View style={styles.settingRow}>
        <IslamicPatternBackground bgColor="transparent" lineColor="#0f4c3a" opacity={0.08} />
        <View>
          <Text style={styles.label}>Battery optimization</Text>
          <Text style={styles.hint}>Allow for reliable daily reminders</Text>
        </View>
        <Pressable style={styles.trigger} onPress={openBatteryOptimizationSettings}>
          <Text style={styles.triggerText}>Open</Text>
        </Pressable>
      </View>

      <View style={styles.settingRow}>
        <IslamicPatternBackground bgColor="transparent" lineColor="#0f4c3a" opacity={0.08} />
        <View >
          <Text style={styles.label}>Translation language</Text>
          <Text style={styles.hint}>Tap to change</Text>
        </View>
        <Pressable style={styles.trigger} onPress={() => setLangModalVisible(true)}>
          <Text style={styles.triggerText}>{selectedLang === 'en' ? 'English' : 'বাংলা '}</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => setAttributionVisible(true)} style={styles.linkContainer}>
        <Text style={styles.linkText}>Sources & attribution</Text>
      </Pressable>

      {/* Modal for Daily Reminder */}
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

      {/* Modal for Language Settings */}
      <Modal
        visible={langModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setLangModalVisible(false)}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Choose language</Text>
            <Pressable style={[styles.option, selectedLang === 'en' && styles.optionSelected]} onPress={() => handleSelectLang('en')}>
              <Text style={[styles.optionText, selectedLang === 'en' && styles.optionTextSelected]}>English</Text>
            </Pressable>
            <Pressable style={[styles.option, selectedLang === 'bn' && styles.optionSelected]} onPress={() => handleSelectLang('bn')}>
              <Text style={[styles.optionText, selectedLang === 'bn' && styles.optionTextSelected]}>বাংলা</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Sources and Attribution  */}
      <Modal
        visible={attributionVisible} transparent
        animationType="fade" onRequestClose={() => setAttributionVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setAttributionVisible(false)}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Sources & attribution</Text>
            <Text style={styles.attributionText}>
              Quran text and translations from the quran-json project (CC BY-SA 4.0), sourced from Tanzil.net.
            </Text>
            <Text style={styles.attributionText}>
              English: Saheeh International{'\n'}Bengali: Muhiuddin Khan
            </Text>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.bannerContainer}>
        <AppBannerAd />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edefe6',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
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
  attributionText: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 19, marginTop: 8 },
  linkContainer: { marginTop: 'auto', alignItems: 'center', paddingVertical: 12 },
  linkText: { fontSize: 13, color: '#0f4c3a', textDecorationLine: 'underline' },
  popupTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  option: { paddingVertical: 12, borderRadius: 8 },
  optionSelected: { backgroundColor: '#0f4c3a' },
  optionText: { fontSize: 15, textAlign: 'center', color: '#333' },
  optionTextSelected: { color: '#fff', fontWeight: '600' },
});