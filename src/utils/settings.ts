import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIF_HOUR_KEY = '@notifHour';
const BANNER_DISMISSED_KEY = '@batteryBannerDismissed';
const LANGUAGE_KEY = '@displayLanguage';

// Notification Settings
export async function getNotificationHour(): Promise<number> {
    const stored = await AsyncStorage.getItem(NOTIF_HOUR_KEY);
    return stored ? parseInt(stored, 10) : 7;
}

export async function setNotificationHour(hour: number): Promise<void> {
  await AsyncStorage.setItem(NOTIF_HOUR_KEY, String(hour));
}

export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${period}`;
}

// Battery Optimization Banner
export async function getBannerDismissed(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(BANNER_DISMISSED_KEY);
  return stored === 'true';
}

export async function dismissBanner(): Promise<void> {
  await AsyncStorage.setItem(BANNER_DISMISSED_KEY, 'true');
}

// Language Settings
export async function getDisplayLanguage(): Promise<'en' | 'bn'> {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
  return stored === 'bn' ? 'bn' : 'en';
}

export async function setDisplayLanguage(lang: 'en' | 'bn'): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}