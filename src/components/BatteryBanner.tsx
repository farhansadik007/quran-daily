import { openBatteryOptimizationSettings } from '@/utils/notifications';
import { dismissBanner, getBannerDismissed } from '@/utils/settings';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function BatteryBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const load = async () => {
            const dismissed = await getBannerDismissed();
            setVisible(!dismissed);
        };
        load();
    }, []);

    async function handleEnable() {
        await openBatteryOptimizationSettings();
        await dismissBanner();
        setVisible(false);
    }

    async function handleDismiss() {
        await dismissBanner();
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <View style={styles.banner}>
            <View style={styles.card}>
                <Text style={styles.text}>
                    For reliable daily reminders, allow this app to skip battery optimization.
                </Text>
                <View style={styles.actions}>
                    <Pressable onPress={handleDismiss}>
                        <Text style={styles.dismiss}>Not now</Text>
                    </Pressable>
                    <Pressable onPress={handleEnable} style={styles.enableButton}>
                        <Text style={styles.enableText}>Enable</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 10,
    },
    card: {
        backgroundColor: '#e9edec',
        borderRadius: 20,
        padding: 24,
        width: '85%',
        borderWidth: 1.5,
        borderColor: '#0f4c3a',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    text: { fontSize: 14, color: '#0b0b0b', marginBottom: 16, lineHeight: 20, textAlign: 'center' },
    dismiss: { fontSize: 13, color: '#000000' },
    enableButton: { backgroundColor: '#0f4c3a', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 18 },
    enableText: { color: '#f3f6f5', fontSize: 14, fontWeight: '700' },
    actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16, alignItems: 'center' },
});