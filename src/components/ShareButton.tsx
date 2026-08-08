import { Pressable, Text, StyleSheet, Share } from 'react-native';
import { Ayah } from '../types';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    ayah: Ayah;
};

export default function ShareButton({ ayah }: Props) {
    async function handleShare() {
        const appName = Constants.expoConfig?.name ?? 'Ayah Daily';

        const message = [
            ayah.arabicData[0],
            '',
            `"${ayah.englishData}"`,
            '',
            `— ${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber}`,
            '',
            `Shared via ${appName}`,
        ].join('\n');

        try {
            await Share.share({ message });
        } catch (error) {
            // user cancelled or share failed silently — no action needed
        }
    }

    return (
        <Pressable style={styles.button} onPress={handleShare} android_ripple={{ color: 'rgba(15,76,58,0.1)' }}>
            <Ionicons name="share-social-outline" size={18} color="#0f4c3a" style={{ marginRight: 6 }} />
            <Text style={styles.text}>Share</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor: '#f0f0eb',
    },
    text: { color: '#0f4c3a', fontSize: 14, fontWeight: '600' },
});