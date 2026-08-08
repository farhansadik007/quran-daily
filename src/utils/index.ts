import { Ayah, ReadRecord } from '@/types';
import ayaat from '../data/ayah.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_KEY = '@savedAyaat';

// Get Ayah
export function getTodayAyah() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % ayaat.length;
  return ayaat[index];
}

// get Ayah key
export function getAyahKey(ayah: Ayah): string {
  return `${ayah.surahNumber}-${ayah.ayahNumber}`;
}

// Get Ayah By Key
export function getAyahByKey(key: string): Ayah | undefined {
  const [surahNumber, ayahNumber] = key.split('-').map(Number);
  return ayaat.find(
    (a) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber
  );
}

// Get Saved Ayah
export async function getSavedAyah(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(SAVED_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Toggle Saved Button
export async function toggleSaved(ayah: Ayah): Promise<boolean> {
  const key = getAyahKey(ayah);
  const saved = await getSavedAyah();
  const isSaved = saved.includes(key);

  const updated = isSaved ? saved.filter((k) => k !== key) : [...saved, key];
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  return !isSaved;
}

// get ayah for date
export function getAyahForDate(date: Date) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % ayaat.length;
  return ayaat[index];
}

