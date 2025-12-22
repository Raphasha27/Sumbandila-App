import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { user } = route.params || {};
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can I help you today?', sender: 'Support', time: '09:00' },
        { id: 2, text: 'I have a question about my grades.', sender: user?.name || 'Me', time: '09:05' }
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: user?.name || 'Me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isMe = item.sender === (user?.name || 'Me');
        return (
            <View style={[styles.msgContainer, isMe ? styles.msgRight : styles.msgLeft]}>
                <View style={[styles.bubble, isMe ? [styles.bubbleRight, { backgroundColor: theme.colors.primary }] : [styles.bubbleLeft, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1 }] ]}>
                    {!isMe && <Text style={[styles.sender, { color: theme.colors.primary }]}>{item.sender}</Text>}
                    <Text style={[styles.text, isMe ? { color: 'white' } : { color: theme.colors.text }]}>{item.text}</Text>
                    <Text style={[styles.time, isMe ? { color: 'rgba(255,255,255,0.7)' } : { color: theme.colors.textLight }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <SafeAreaView style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Messages</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.textLight}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={sendMessage} style={[styles.sendBtn, { backgroundColor: theme.colors.primary }]}>
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { borderBottomWidth: 1 },
    headerContent: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    list: { padding: 16 },
    msgContainer: { flexDirection: 'row', marginBottom: 16 },
    msgLeft: { justifyContent: 'flex-start' },
    msgRight: { justifyContent: 'flex-end' },
    bubble: { padding: 12, borderRadius: 20, maxWidth: '80%' },
    bubbleLeft: { borderBottomLeftRadius: 4 },
    bubbleRight: { borderBottomRightRadius: 4 },
    sender: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
    text: { fontSize: 15, lineHeight: 20 },
    time: { fontSize: 10, marginTop: 4, textAlign: 'right' },
    inputContainer: { flexDirection: 'row', padding: 16, alignItems: 'center', borderTopWidth: 1, paddingBottom: Platform.OS === 'ios' ? 32 : 16 },
    input: { flex: 1, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12, borderWidth: 1 },
    sendBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' }
});

