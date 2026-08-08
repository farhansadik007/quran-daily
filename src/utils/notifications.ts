import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Ayah } from '@/types';
import { getAyahForDate } from '.';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
     shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForNotifications(): Promise<boolean> {
    if (!Device.isDevice) return false;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === 'granted';
}

export async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('quran-daily', {
      name: 'Quran Daily',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}


//schedule for 7 days
export async function scheduleNext7Days(hour = 7, minute = 0) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + i);
    targetDate.setHours(hour, minute, 0, 0);

    // Skip today if that time has already passed
    if (i === 0 && targetDate.getTime() <= now.getTime()) continue;

    const ayah = getAyahForDate(targetDate);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Today's Ayah - ${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber}`,
        body: ayah.englishData,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: targetDate,
        channelId: 'daily-ayah',
      },
    });
  }
}