import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ placeholder = "Search...", onSearch, value, onChangeText }) {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="search-outline" size={20} color={theme.colors.textLight} style={styles.icon} />
            <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textLight}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSearch}
                returnKeyType="search"
            />
            {value?.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Ionicons name="close-circle" size={20} color={theme.colors.textLight} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
});
