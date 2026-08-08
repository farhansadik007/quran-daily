import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIF_HOUR_KEY = '@notifHour';

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