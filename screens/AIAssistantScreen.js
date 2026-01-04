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

// AI Knowledge Base for Sumbandila App
const knowledgeBase = {
    greetings: [
        "Hello! 👋 I'm your Sumbandila Assistant. I can help you with verification questions, finding registered professionals, and understanding how our platform works. What would you like to know?",
    ],
    verification: {
        education: "To verify an educational institution:\n\n1. Select 'Education'\n2. Enter school name/reg number\n\nWe check against CHE & QCTO. (EduCred Africa)",
        medical: "To verify medical professionals:\n\n1. Select 'Medical'\n2. Enter name/HPCSA number\n\nLicense expiry reminders available in MedCheck SA.",
        legal: "To verify lawyers:\n\n1. Select 'Legal'\n2. Enter name/Law Society number\n\nDisciplinary alerts integrated via LegalVerify.",
        construction: "BuildSafe Africa verifies CIDB & ECSA status for contractors and engineers to ensure safety compliance.",
        transport: "RideCheck verifies PDP, vehicle roadworthiness, and driver criminal records for passenger safety.",
        tenders: "TenderShield verifies tax compliance, CSD registration, and BEE certificates for anti-fraud procurement.",
        panafrican: "Our network connects registries across SA, Botswana, Kenya, and Nigeria for cross-border trust.",
    },
    ai_fraud_detector: {
        analysis: "My AI Fraud Detector is analyzing institutions for:\n\n⚠️ Duplicate registrations\n⚠️ Fake accreditation logos\n⚠️ Non-existent physical addresses\n⚠️ Suspicious name similarities to top universities",
    },
    fraud: "If you suspect fraud, use our 'AI Fraud Radar' or click 'Report Fraud'. We protect users across Education, Medical, Legal, and Construction sectors.",
    about: "Sumbandila is an all-in-one verification ecosystem including:\n\n✅ TrustAfrica (B2B API)\n✅ IdentityPass (Digital Wallet)\n✅ BuildSafe, RideCheck & TenderShield networks.",
    contact: "You can reach us at:\n\n📞 Phone: 0781172470\n⏰ Hours: Mon-Fri 8AM-5PM\n📧 Email: support@sumbandila.co.za\n\nWe're here to help!",
    help: "Here's what I can help you with:\n\n1️⃣ How to verify schools/colleges\n2️⃣ How to verify doctors\n3️⃣ How to verify lawyers\n4️⃣ Reporting fraud\n5️⃣ Understanding our database\n6️⃣ Contact information\n\nJust ask me anything!",
};

const quickSuggestions = [
    { id: 1, text: "How do I verify a doctor?", icon: "stethoscope" },
    { id: 2, text: "Is my school accredited?", icon: "school" },
    { id: 3, text: "Report suspicious activity", icon: "alert-circle" },
    { id: 4, text: "Contact support", icon: "phone" },
];

const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return knowledgeBase.greetings[0];
    }

    // Idea 9: AI Fraud Detector
    if (lowerMsg.includes('analyze') || (lowerMsg.includes('check') && (lowerMsg.includes('fake') || lowerMsg.includes('scam')))) {
        return knowledgeBase.ai_fraud_detector.analysis;
    }

    if (lowerMsg.includes('doctor') || lowerMsg.includes('medical') || lowerMsg.includes('hpcsa') || lowerMsg.includes('nurse')) {
        return knowledgeBase.verification.medical;
    }

    if (lowerMsg.includes('school') || lowerMsg.includes('college') || lowerMsg.includes('university') || lowerMsg.includes('accredit')) {
        return knowledgeBase.verification.education;
    }

    if (lowerMsg.includes('lawyer') || lowerMsg.includes('legal') || lowerMsg.includes('attorney')) {
        return knowledgeBase.verification.legal;
    }

    if (lowerMsg.includes('construction') || lowerMsg.includes('build') || lowerMsg.includes('engineer') || lowerMsg.includes('contractor')) {
        return knowledgeBase.verification.construction;
    }

    if (lowerMsg.includes('transport') || lowerMsg.includes('uber') || lowerMsg.includes('bolt') || lowerMsg.includes('taxi') || lowerMsg.includes('pedp')) {
        return knowledgeBase.verification.transport;
    }

    if (lowerMsg.includes('tender') || lowerMsg.includes('company') || lowerMsg.includes('tax') || lowerMsg.includes('bee')) {
        return knowledgeBase.verification.tenders;
    }

    if (lowerMsg.includes('africa') || lowerMsg.includes('kenya') || lowerMsg.includes('nigeria') || lowerMsg.includes('ghana') || lowerMsg.includes('botswana')) {
        return knowledgeBase.verification.panafrican;
    }

    if (lowerMsg.includes('fraud') || lowerMsg.includes('fake') || lowerMsg.includes('report') || lowerMsg.includes('suspicious')) {
        return knowledgeBase.fraud;
    }

    if (lowerMsg.includes('about') || lowerMsg.includes('what is') || lowerMsg.includes('sumbandila')) {
        return knowledgeBase.about;
    }

    if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('support')) {
        return knowledgeBase.contact;
    }

    if (lowerMsg.includes('help')) {
        return knowledgeBase.help;
    }

    return "I'm a multi-industry verification assistant! Ask me about:\n\n• Verifying schools, doctors, or lawyers\n• Construction (BuildSafe) status\n• Transport (RideCheck) safety\n• Tenders (TenderShield) compliance\n• AI Fraud Detection analysis";
};

export default function AIAssistantScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const styles = createStyles(theme);

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: knowledgeBase.greetings[0],
            isAI: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef();
    const typingAnimation = useRef(new Animated.Value(0)).current;

    const startTypingAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(typingAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(typingAnimation, { toValue: 0, duration: 500, useNativeDriver: true }),
            ])
        ).start();
    };

    const sendMessage = (text = inputText) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: text.trim(),
            isAI: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);
        startTypingAnimation();

        // Simulate AI thinking delay
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                text: getAIResponse(text),
                isAI: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleQuickSuggestion = (suggestion) => {
        sendMessage(suggestion.text);
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.background]}
            style={styles.container}
        >
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
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

            {/* Chat Messages */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageRow,
                            message.isAI ? styles.aiMessageRow : styles.userMessageRow,
                        ]}
                    >
                        {message.isAI && (
                            <View style={styles.messageAvatar}>
                                <MaterialCommunityIcons name="robot-happy" size={20} color={theme.colors.primary} />
                            </View>
                        )}
                        <View
                            style={[
                                styles.messageBubble,
                                message.isAI ? styles.aiBubble : styles.userBubble,
                            ]}
                        >
                            <Text style={[styles.messageText, message.isAI ? styles.aiText : styles.userText]}>
                                {message.text}
                            </Text>
                            <Text style={[styles.messageTime, message.isAI ? styles.aiTime : styles.userTime]}>
                                {message.time}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <View style={[styles.messageRow, styles.aiMessageRow]}>
                        <View style={styles.messageAvatar}>
                            <MaterialCommunityIcons name="robot-happy" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                            <Animated.View style={[styles.typingDot, { opacity: typingAnimation }]} />
                            <Animated.View style={[styles.typingDot, { opacity: typingAnimation }]} />
                            <Animated.View style={[styles.typingDot, { opacity: typingAnimation }]} />
                        </View>
                    </View>
                )}

                {/* Quick Suggestions (show only at start) */}
                {messages.length === 1 && (
                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>Quick Questions</Text>
                        <View style={styles.suggestionsGrid}>
                            {quickSuggestions.map((suggestion) => (
                                <TouchableOpacity
                                    key={suggestion.id}
                                    style={styles.suggestionChip}
                                    onPress={() => handleQuickSuggestion(suggestion)}
                                >
                                    <Feather name={suggestion.icon} size={16} color={theme.colors.primary} />
                                    <Text style={styles.suggestionText}>{suggestion.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ask me anything..."
                            placeholderTextColor={theme.colors.textMuted}
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={() => sendMessage()}
                            returnKeyType="send"
                            multiline
                            maxLength={500}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                            onPress={() => sendMessage()}
                            disabled={!inputText.trim()}
                        >
                            <LinearGradient
                                colors={inputText.trim() ? [theme.colors.gradientStart, theme.colors.gradientEnd] : [theme.colors.border, theme.colors.border]}
                                style={styles.sendButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons
                                    name="send"
                                    size={20}
                                    color={inputText.trim() ? 'white' : theme.colors.textMuted}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    aiAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
    chatContainer: {
        flex: 1,
    },
    chatContent: {
        padding: 16,
        paddingBottom: 24,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    aiMessageRow: {
        justifyContent: 'flex-start',
    },
    userMessageRow: {
        justifyContent: 'flex-end',
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 14,
        borderRadius: 20,
    },
    aiBubble: {
        backgroundColor: theme.colors.surface,
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    userBubble: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    aiText: {
        color: theme.colors.text,
    },
    userText: {
        color: 'white',
    },
    messageTime: {
        fontSize: 10,
        marginTop: 6,
    },
    aiTime: {
        color: theme.colors.textMuted,
    },
    userTime: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'right',
    },
    typingBubble: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 3,
    },
    suggestionsContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    suggestionsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginBottom: 12,
    },
    suggestionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    suggestionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.mode === 'dark' ? theme.colors.background : '#fff7ed',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.mode === 'dark' ? theme.colors.border : '#fed7aa',
    },
    suggestionText: {
        fontSize: 13,
        color: theme.colors.primary,
        marginLeft: 8,
        fontWeight: '500',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: theme.colors.background,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingLeft: 16,
        paddingRight: 6,
        paddingVertical: 6,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
        maxHeight: 100,
        paddingVertical: 8,
    },
    sendButton: {
        marginLeft: 8,
    },
    sendButtonDisabled: {
        opacity: 0.7,
    },
    sendButtonGradient: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
