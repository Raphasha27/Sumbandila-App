import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatSupportScreen() {
    const navigation = useNavigation();
    const { theme, isDarkMode } = useTheme();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Sumbandila AI assistant. How can I help you today?", sender: 'system' }
    ]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef();

    const suggestions = [
        { label: "Verify a Doctor", action: () => handleRecommendation('medical') },
        { label: "Check School Status", action: () => handleRecommendation('education') },
        { label: "View my Profile", action: () => navigation.navigate('Profile') },
        { label: "Is this app secure?", action: () => navigation.navigate('PrivacySecurity') },
    ];

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        setTimeout(() => {
            const response = generateAIResponse(userMsg.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, sender: 'system', action: response.action }]);
        }, 1000);
    };

    const handleRecommendation = (type) => {
        const userMsg = { id: Date.now(), text: `I want to ${type === 'medical' ? 'verify a doctor' : 'check school status'}`, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        
        setTimeout(() => {
             navigation.navigate('Scanner', { category: type });
        }, 800);
    };

    const generateAIResponse = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('doctor') || lower.includes('medical')) {
            return { text: "To verify a medical professional, verify under the Medical category. Shall I take you there?", action: { label: "Go to Medical", route: 'Scanner', params: { category: 'medical' } } };
        }
        if (lower.includes('school') || lower.includes('education') || lower.includes('college')) {
            return { text: "You can check accreditation status in the Education section.", action: { label: "Go to Education", route: 'Scanner', params: { category: 'education' } } };
        }
        if (lower.includes('legal') || lower.includes('lawyer')) {
            return { text: "For lawyers, use the Legal verification tool.", action: { label: "Go to Legal", route: 'Scanner', params: { category: 'legal' } } };
        }
        return { text: "I can help you verify professionals, find institutions, or navigate the app." };
    };

    const handleAction = (action) => {
        if (action.route) {
            navigation.navigate(action.route, action.params);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <GradientHeader title="AI Assistant" showBack={true} onBack={() => navigation.goBack()} />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={styles.keyboardContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {messages.map((msg) => (
                        <View key={msg.id} style={[
                            styles.messageBubble, 
                            msg.sender === 'user' ? styles.userBubble : [styles.systemBubble, { backgroundColor: theme.colors.surface }]
                        ]}>
                            {msg.sender === 'system' && (
                                <View style={[styles.botIcon, { backgroundColor: theme.colors.primary }]}>
                                    <Ionicons name="sparkles" size={16} color="white" />
                                </View>
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={[
                                    styles.messageText, 
                                    msg.sender === 'user' ? styles.userText : [styles.systemText, { color: theme.colors.text }]
                                ]}>{msg.text}</Text>
                                
                                {msg.action && (
                                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]} onPress={() => handleAction(msg.action)}>
                                        <Text style={styles.actionButtonText}>{msg.action.label}</Text>
                                        <Ionicons name="arrow-forward" size={16} color="white" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.suggestionsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16}}>
                        {suggestions.map((s, index) => (
                            <TouchableOpacity key={index} style={[styles.suggestionChip, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]} onPress={s.action}>
                                <Text style={[styles.suggestionText, { color: theme.colors.primary }]}>{s.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
                    <TextInput 
                        style={[styles.input, { backgroundColor: isDarkMode ? theme.colors.background : '#F3F4F6', color: theme.colors.text }]}
                        placeholder="Ask me anything..."
                        placeholderTextColor={theme.colors.textLight}
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.colors.primary }]} onPress={sendMessage}>
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{height: 20}} /> 
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 24,
    },
    messageBubble: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    systemBubble: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: '#F97316', // Primary color hardcoded or theme
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    systemText: {
    },
    userText: {
        color: 'white',
    },
    botIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    actionButton: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 4,
    },
    suggestionsContainer: {
        height: 50,
        marginBottom: 8,
    },
    suggestionChip: {
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        justifyContent: 'center',
        height: 36,
    },
    suggestionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 8,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

