import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getReadDates, getMondayOfWeek, toDateString, DAY_LABELS, MONTH_NAMES } from '../utils/dayMeter';
import IslamicPatternBackground from './IslamicPatternBackground';

export default function WeekMeter() {
    const [readDates, setReadDates] = useState<string[]>([]);

    useEffect(() => {
        const load = async () => setReadDates(await getReadDates());
        load();
    }, []);

    const saturday = getMondayOfWeek(new Date());
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(saturday);
        d.setDate(saturday.getDate() + i);
        return d;
    });
    const monthLabel = `${MONTH_NAMES[saturday.getMonth()]} ${saturday.getFullYear()}`;

    return (
        <View style={styles.container}>
            <IslamicPatternBackground bgColor="transparent" lineColor="#0f4c3a" opacity={0.06} />
            <View style={styles.headerRow}>
                <Text style={styles.todayLabel}>Today</Text>
                <Text style={styles.monthLabel}>{monthLabel}</Text>
            </View>
            <View style={styles.row}>
                {weekDates.map((date, i) => {
                    const isRead = readDates.includes(toDateString(date));
                    const isToday = toDateString(date) === toDateString(new Date());
                    return (
                        <View key={i} style={[styles.dayBox, isRead && styles.dayBoxFilled, isToday && styles.dayBoxToday]}>
                            <Text style={[styles.dateNum, isRead && styles.dateNumFilled]}>{date.getDate()}</Text>
                            <Text style={[styles.dayLabel, isRead && styles.dayLabelFilled]}>{DAY_LABELS[i]}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    dayBoxToday: {
        borderWidth: 2,
        borderColor: '#0f4c3a',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
        paddingHorizontal: 4,
    },
    todayLabel: { fontSize: 16, fontWeight: '700', color: '#0f4c3a' },
    monthLabel: { fontSize: 13, color: '#999' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    dayBox: {
        width: 40,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#f0f0eb',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    dayBoxFilled: { backgroundColor: '#0f4c3a' },
    dateNum: { fontSize: 17, fontWeight: '700', color: '#555' },
    dateNumFilled: { color: '#fff' },
    dayLabel: { fontSize: 11, color: '#999', marginTop: 2 },
    dayLabelFilled: { color: 'rgba(255,255,255,0.8)' },
    dotFilled: { backgroundColor: '#0f4c3a' },
});