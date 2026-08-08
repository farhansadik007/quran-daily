import { getReadToday, markAsRead } from '@/utils/dayMeter';
import { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function MarkAsReadButton() {
    const [readToday, setReadToday] = useState(false);

    useEffect(() => {
        const load = async () => {
            setReadToday(await getReadToday());
        };
        load();
    }, []);

    async function handlePress() {
        await markAsRead();
        setReadToday(true);
    }

    return (
        <Pressable
            style={[styles.button, readToday && styles.buttonDone]}
            onPress={handlePress}
            disabled={readToday}
            android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
        >
            <Text style={styles.buttonText}>{readToday ? '✓ Read Today' : 'Mark as Read'}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0f4c3a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonDone: { backgroundColor: '#8a9a94' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});