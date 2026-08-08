import AsyncStorage from '@react-native-async-storage/async-storage';

const READ_DATES_KEY = '@readDates';

export async function getReadDates(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(READ_DATES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function markAsRead(): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const dates = await getReadDates();
  if (dates.includes(today)) return;
  await AsyncStorage.setItem(READ_DATES_KEY, JSON.stringify([...dates, today]));
}

export async function getReadToday(): Promise<boolean> {
  const dates = await getReadDates();
  const today = new Date().toISOString().split('T')[0];
  return dates.includes(today);
}

// for WeekMeter Component

export const DAY_LABELS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 6 ? 0 : -(day + 1);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}