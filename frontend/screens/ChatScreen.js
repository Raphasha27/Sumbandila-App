import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import config from '../config';

export default function ChatScreen({ route }) {
    const { user } = route.params || {};
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const apiBase = config.apiBase;

    useEffect(() => {
        fetch(`${apiBase}/api/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error(err));
    }, []);

    const sendMessage = async () => {
        if (!inputText.trim()) return;
        try {
            const res = await fetch(`${apiBase}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText, user: user?.name })
            });
            const data = await res.json();
            if (data.success) {
                setMessages([...messages, data.message]);
                setInputText('');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const renderMessage = ({ item }) => {
        const isMe = item.sender === (user?.name || 'Me');
        return (
            <View style={[styles.msgContainer, isMe ? styles.msgRight : styles.msgLeft]}>
                <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
                    {!isMe && <Text style={styles.sender}>{item.sender}</Text>}
                    <Text style={[styles.text, isMe ? styles.textRight : styles.textLeft]}>{item.text}</Text>
                    <Text style={[styles.time, isMe ? styles.timeRight : styles.timeLeft]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Messages</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center' },
    backButton: { marginRight: 16 },
    backText: { fontSize: 16, color: '#0066cc', fontWeight: '600' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    list: { padding: 20 },
    msgContainer: { flexDirection: 'row', marginBottom: 16 },
    msgLeft: { justifyContent: 'flex-start' },
    msgRight: { justifyContent: 'flex-end' },
    bubble: { padding: 12, borderRadius: 16, maxWidth: '80%' },
    bubbleLeft: { backgroundColor: 'white', borderBottomLeftRadius: 4 },
    bubbleRight: { backgroundColor: '#0066cc', borderBottomRightRadius: 4 },
    sender: { fontSize: 12, fontWeight: 'bold', color: '#666', marginBottom: 4 },
    text: { fontSize: 16 },
    textLeft: { color: '#333' },
    textRight: { color: 'white' },
    time: { fontSize: 10, marginTop: 4, textAlign: 'right' },
    timeLeft: { color: '#999' },
    timeRight: { color: '#e3f2fd' },
    inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: 'white', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
    input: { flex: 1, backgroundColor: '#f8f9fa', borderRadius: 20, padding: 12, marginRight: 10, borderWidth: 1, borderColor: '#eee' },
    sendBtn: { backgroundColor: '#0066cc', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 20 },
    sendText: { color: 'white', fontWeight: 'bold' }
});
