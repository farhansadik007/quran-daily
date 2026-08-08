import { Tabs } from "expo-router";
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from 'react';
import { registerForNotifications, scheduleNext7Days, setupNotificationChannel } from '../utils/notifications';


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
  useEffect(() => {
    const init = async () => {
      await setupNotificationChannel();
      const granted = await registerForNotifications();
      if (granted) {
        await scheduleNext7Days();
        // const now = new Date();
        // await scheduleNext7Days(now.getHours(), now.getMinutes() + 1);
      }
    };
    init();
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quran Daily</Text>
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0f4c3a',
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
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  tabButton: { overflow: 'hidden' },
});