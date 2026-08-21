import { Tabs } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from 'react';
import { registerForNotifications, scheduleNext7Days, setupNotificationChannel } from '../utils/notifications';
import IslamicPatternBackground from "@/components/IslamicPatternBackground";
import mobileAds from 'react-native-google-mobile-ads';
import { getNotificationHour } from "@/utils/settings";

function TabButton(props: any) {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: 'rgba(15,76,58,0.15)', borderless: false }}
      style={[props.style, styles.tabButton]}
    />
  );
}


export default function RootLayout() {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const init = async () => {
      await mobileAds().initialize();
      await setupNotificationChannel();
      const granted = await registerForNotifications();
      if (granted) {
        const savedHour = await getNotificationHour();
        await scheduleNext7Days(savedHour);
      }
    };
    init();
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <IslamicPatternBackground />
        <Text style={styles.headerText}>Quran Daily</Text>
      </View>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => <IslamicPatternBackground />,
          tabBarStyle: {
            height: 68 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,
            borderTopWidth: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 8,
          },
          tabBarActiveTintColor: '#d4a94a',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
            tabBarButton: TabButton,
          }} />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color, size }) => <MaterialIcons name="mark-chat-read" size={size} color={color} />,
            tabBarButton: TabButton,
          }} />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
            tabBarButton: TabButton,
          }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f4c3a' },
  header: {
    backgroundColor: '#0f4c3a',
    paddingVertical: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  tabButton: { overflow: 'hidden' },
});