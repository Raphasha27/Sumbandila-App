import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { user } = route.params || {};
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: `Hello ${user?.name || 'there'}! 👋\nI'm the Sumbandila AI Assistant.\n\nI can help you with:\n• Verifying institutions\n• Reporting fraud\n• Account status\n\nHow can I assist you today?`,
            sender: 'AI',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef();

    const styles = createStyles(theme, isDarkMode);

    const generateResponse = async (query) => {
        setIsTyping(true);

        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        let responseText = "I'm sorry, I didn't quite understand that. Could you try rephrasing?";
        const q = query.toLowerCase();

        if (q.includes('verify') || q.includes('check') || q.includes('search')) {
            responseText = "To verify an institution or professional:\n1. Go to the Home Dashboard\n2. Select a category (Education, Medical, Legal)\n3. Enter the name or registration number.\n\nWould you like me to take you there?";
        } else if (q.includes('fraud') || q.includes('scam') || q.includes('fake')) {
            responseText = "We take fraud very seriously. You can report suspicious activity immediately using the 'Report Fraud' feature found in the dashboard menu or search results.";
        } else if (q.includes('hello') || q.includes('hi')) {
            responseText = "Hello! Ready to verify specifics? Just ask.";
        } else if (q.includes('school') || q.includes('college')) {
            responseText = "For schools and colleges, look for the 'Education' category on the main screen. We verify against the Department of Higher Education database.";
        } else if (q.includes('doctor') || q.includes('medical')) {
            responseText = "You can verify doctors using their MP number or practice number in the 'Medical' section.";
        } else if (q.includes('thank')) {
            responseText = "You're welcome! Stay safe and verified. 🛡️";
        }

        const aiMsg = {
            id: Date.now().toString(),
            text: responseText,
            sender: 'AI',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'Me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMsg]);
        const query = inputText;
        setInputText('');

        generateResponse(query);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                style={styles.header}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.headerTitleContainer}>
                            <View style={styles.botAvatar}>
                                <MaterialCommunityIcons name="robot" size={24} color={theme.colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.headerTitle}>Sumbandila AI</Text>
                                <Text style={styles.headerSubtitle}>Always here to help</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => (
                    <View style={[styles.msgWrapper, item.sender === 'Me' ? styles.msgWrapperRight : styles.msgWrapperLeft]}>
                        {item.sender === 'AI' && (
                            <View style={styles.tinyAvatar}>
                                <MaterialCommunityIcons name="robot" size={16} color="white" />
                            </View>
                        )}
                        <View style={[styles.bubble, item.sender === 'Me' ? styles.bubbleRight : styles.bubbleLeft]}>
                            <Text style={[styles.text, item.sender === 'Me' ? styles.textRight : styles.textLeft]}>
                                {item.text}
                            </Text>
                            <Text style={[styles.time, item.sender === 'Me' ? styles.timeRight : styles.timeLeft]}>
                                {item.time}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {isTyping && (
                <View style={styles.typingContainer}>
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                    <Text style={styles.typingText}>AI is thinking...</Text>
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Ask about verification..."
                    value={inputText}
                    onChangeText={setInputText}
                    placeholderTextColor="#9ca3af"
                    onSubmitEditing={sendMessage}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendBtn} disabled={!inputText.trim()}>
                    <LinearGradient
                        colors={[theme.colors.primary, theme.colors.primaryDark]}
                        style={styles.sendGradient}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const createStyles = (theme, isDarkMode) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { paddingBottom: 16 },
    headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 },
    backButton: { marginRight: 16, backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
    headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
    botAvatar: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center', marginRight: 12
    },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },

    list: { padding: 20, paddingBottom: 10 },
    msgWrapper: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end' },
    msgWrapperLeft: { justifyContent: 'flex-start' },
    msgWrapperRight: { justifyContent: 'flex-end' },

    tinyAvatar: {
        width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary,
        justifyContent: 'center', alignItems: 'center', marginRight: 8, marginBottom: 4
    },

    bubble: { padding: 16, borderRadius: 20, maxWidth: '80%' },
    bubbleLeft: {
        backgroundColor: theme.colors.surface,
        borderBottomLeftRadius: 4,
        borderWidth: isDarkMode ? 1 : 0,
        borderColor: theme.colors.border,
        ...theme.shadows.default
    },
    bubbleRight: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 4,
        ...theme.shadows.default
    },

    text: { fontSize: 16, lineHeight: 24 },
    textLeft: { color: theme.colors.text },
    textRight: { color: 'white' },

    time: { fontSize: 10, marginTop: 6, textAlign: 'right' },
    timeLeft: { color: theme.colors.textSecondary },
    timeRight: { color: 'rgba(255,255,255,0.7)' },

    typingContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 56, marginBottom: 16 },
    typingText: { marginLeft: 8, color: theme.colors.textSecondary, fontSize: 12 },

    inputContainer: {
        flexDirection: 'row', padding: 16,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1, borderTopColor: theme.colors.border
    },
    input: {
        flex: 1, backgroundColor: theme.colors.background,
        borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12,
        marginRight: 12, fontSize: 16, color: theme.colors.text,
        borderWidth: 1, borderColor: theme.colors.border
    },
    sendBtn: {},
    sendGradient: {
        width: 48, height: 48, borderRadius: 24,
        justifyContent: 'center', alignItems: 'center'
    },
});
