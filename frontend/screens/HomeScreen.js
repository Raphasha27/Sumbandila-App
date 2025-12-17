import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import CategoryCard from '../components/CategoryCard';
import StatsCard from '../components/StatsCard';

export default function HomeScreen({ navigation }) {
    
    const navigateToVerification = (category) => {
        navigation.navigate('Scanner', { category }); 
        // Note: Using 'Scanner' route for now as per App.js stack, but typically we'd rename this to 'VerificationForm'
        // The user screenshots imply a form based verification, not just scanner. 
        // I should probably rename/fix the route in a real refactor, but for UI match 'Scanner' screen will be updated to be the form.
    };

    return (
        <View style={styles.container}>
            <GradientHeader 
                title="Sumbandila" 
                subtitle="Verification in the palm of your hand"
                showProfile={true}
            />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.sectionTitle}>What would you like to verify?</Text>
                <Text style={styles.sectionSubtitle}>Select a category to begin verification</Text>

                <View style={styles.categoriesContainer}>
                    <CategoryCard 
                        title="Education" 
                        subtitle="Schools, Colleges & Courses" 
                        icon="school-outline" 
                        color={theme.colors.education}
                        onPress={() => navigateToVerification('education')}
                    />
                    <CategoryCard 
                        title="Medical" 
                        subtitle="Doctors & Healthcare Professionals" 
                        icon="medkit-outline" 
                        color={theme.colors.medical}
                        onPress={() => navigateToVerification('medical')}
                    />
                     <CategoryCard 
                        title="Legal" 
                        subtitle="Lawyers & Legal Professionals" 
                        icon="scale-outline" 
                        color={theme.colors.legal}
                        onPress={() => navigateToVerification('legal')}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <StatsCard 
                        icon="business-outline" 
                        number="2,450+" 
                        label="Registered Institutions" 
                        iconColor="#3B82F6"
                    />
                    <StatsCard 
                        icon="people-outline" 
                        number="45,000+" 
                        label="Verified Professionals" 
                        iconColor="#10B981"
                    />
                     <StatsCard 
                        icon="shield-checkmark-outline" 
                        number="100%" 
                        label="Official Data Sources" 
                        iconColor="#F97316"
                    />
                </View>

            </ScrollView>

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('ChatSupport')}
            >
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.fabGradient}
                >
                    <Ionicons name="chatbubbles-outline" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.xl + 80, // Extra padding for FAB
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        ...theme.shadows.hover,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.s,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginBottom: theme.spacing.l,
    },
    categoriesContainer: {
        marginBottom: theme.spacing.l,
    },
    statsContainer: {
        marginBottom: theme.spacing.l,
    }
});
