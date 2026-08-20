import { getReadToday, markAsRead } from '@/utils/dayMeter';
import { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onRead?: () => void;
};

export default function MarkAsReadButton({ onRead }: Props) {
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
        onRead?.();
    }

    

    return (
        <Pressable
            style={[styles.button, readToday && styles.buttonDone]}
            onPress={handlePress}
            disabled={readToday}
            android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
        >
            <Ionicons
                name={readToday ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
            />
            <Text style={styles.buttonText}>{readToday ? 'Read' : 'Mark as Read'}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f4c3a',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        overflow: 'hidden',
    },
    buttonDone: { backgroundColor: '#8a9a94' },
    buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});