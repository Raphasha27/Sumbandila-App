import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Platform,
    KeyboardAvoidingView,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const knowledgeBase = {
    greetings: ["Hello! 👋 I'm your Sumbandila Assistant. How can I help you today?"],
    verification: {
        education: "To verify an educational institution: Go to Home > Education > Enter details.",
        medical: "To verify a medical professional: Go to Home > Medical > Enter details.",
        legal: "To verify a legal professional: Go to Home > Legal > Enter details.",
    },
    help: "I can help you verify professionals, schools, or report fraud. Just ask!",
};

const quickSuggestions = [
    { id: 1, text: "How do I verify a doctor?", icon: "stethoscope" },
    { id: 2, text: "Is my school accredited?", icon: "school" },
    { id: 3, text: "Report suspicious activity", icon: "alert-circle" },
    { id: 4, text: "Contact support", icon: "phone" },
];

const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('doctor') || lowerMsg.includes('medical')) return knowledgeBase.verification.medical;
    if (lowerMsg.includes('school') || lowerMsg.includes('education')) return knowledgeBase.verification.education;
    if (lowerMsg.includes('legal') || lowerMsg.includes('lawyer')) return knowledgeBase.verification.legal;
    return knowledgeBase.help;
};

export default function AIAssistantScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [messages, setMessages] = useState([
        { id: 1, text: knowledgeBase.greetings[0], isAI: true, time: 'Now' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef();
    const typingAnimation = useRef(new Animated.Value(0)).current;

    const sendMessage = (text = inputText) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), text: text.trim(), isAI: false, time: 'Now' }]);
        setInputText('');
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: getAIResponse(text), isAI: true, time: 'Now' }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient colors={isDarkMode ? [theme.colors.background, theme.colors.background] : ['#ea580c', '#16a34a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.headerCenter}>
                            <View style={styles.aiAvatar}>
                                <MaterialCommunityIcons name="robot-happy" size={24} color={theme.colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.headerTitle}>Sumbandila Assistant</Text>
                                <Text style={styles.headerSubtitle}>Always here to help</Text>
                            </View>
                        </View>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView 
                ref={scrollViewRef} 
                style={styles.chatContainer} 
                contentContainerStyle={styles.chatContent}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((message) => (
                    <View key={message.id} style={[styles.messageRow, message.isAI ? styles.aiMessageRow : styles.userMessageRow]}>
                        {message.isAI && (
                            <View style={[styles.messageAvatar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                                <MaterialCommunityIcons name="robot-happy" size={20} color={theme.colors.primary} />
                            </View>
                        )}
                        <View style={[styles.messageBubble, message.isAI ? [styles.aiBubble, { backgroundColor: theme.colors.surface }] : [styles.userBubble, { backgroundColor: theme.colors.primary }] ]}>
                            <Text style={[styles.messageText, message.isAI ? { color: theme.colors.text } : { color: 'white' }]}>{message.text}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
                    <View style={[styles.inputWrapper, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                        <TextInput 
                            style={[styles.input, { color: theme.colors.text }]} 
                            placeholder="Ask me anything..." 
                            placeholderTextColor={theme.colors.textLight}
                            value={inputText} 
                            onChangeText={setInputText} 
                        />
                        <TouchableOpacity onPress={() => sendMessage()}>
                            <Ionicons name="send" size={24} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingBottom: 16, paddingHorizontal: 16 },
    headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
    headerCenter: { flexDirection: 'row', alignItems: 'center' },
    aiAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
    chatContainer: { flex: 1 },
    chatContent: { padding: 16, paddingBottom: 24 },
    messageRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
    aiMessageRow: { justifyContent: 'flex-start' },
    userMessageRow: { justifyContent: 'flex-end' },
    messageAvatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8, borderWidth: 1 },
    messageBubble: { maxWidth: '75%', padding: 14, borderRadius: 20 },
    aiBubble: { borderBottomLeftRadius: 4 },
    userBubble: { borderBottomRightRadius: 4 },
    messageText: { fontSize: 15, lineHeight: 22 },
    inputContainer: { padding: 16, borderTopWidth: 1 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8 },
    input: { flex: 1, fontSize: 16, marginRight: 8 }
});

