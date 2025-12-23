import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

export default function HomeAnalytics({ data }) {
    const { theme } = useTheme();

    if (!data || !data.trends) {
        return null;
    }

    const chartConfig = {
        backgroundGradientFrom: theme.colors.card,
        backgroundGradientTo: theme.colors.card,
        color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // Primary color
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => theme.colors.textLight,
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Fraud Trends</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>Last 6 Months</Text>
            </View>
            
            <LineChart
                data={{
                    labels: data.trends.labels,
                    datasets: [{ data: data.trends.datasets[0].data }]
                }}
                width={screenWidth - 64} // Padding compensation
                height={180}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withInnerLines={false}
                withOuterLines={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
    },
    chart: {
        marginRight: -16, // Attempt to fit better
        paddingRight: 0,
    }
});
