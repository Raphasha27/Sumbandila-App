// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ReportScreen = () => {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSubmit = () => {
    Alert.alert(
      "Report Submitted",
      "Your fraud report has been securely uploaded to the Sovereign Registry Vault.",
      [{ text: "OK" }]
    );
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fraud Sentinel</Text>
        <Text style={styles.subtitle}>Report Suspicious Institutions</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Select Language</Text>
        <View style={styles.langPicker}>
          {['English', 'isiZulu', 'Afrikaans', 'Sepedi', 'Xitsonga'].map((lang) => (
            <TouchableOpacity 
              key={lang} 
              onPress={() => setLanguage(lang)}
              style={[styles.langBtn, language === lang && styles.langBtnActive]}
            >
              <Text style={[styles.langBtnText, language === lang && styles.langBtnTextActive]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Incident Description</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Describe the suspicious activity or institution here..."
          placeholderTextColor="#8b949e"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.voiceBtn}>
          <Text style={styles.voiceBtnText}>🎙️ Tap to Record Voice Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit to Sovereign Vault</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', padding: 25 },
  header: { marginTop: 40, marginBottom: 30 },
  title: { color: '#ff453a', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#8b949e', fontSize: 16 },
  form: { flex: 1 },
  label: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 10, marginTop: 15 },
  langPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
  langBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#161b22', borderWidth: 1, borderColor: '#30363d' },
  langBtnActive: { backgroundColor: '#ff453a', borderColor: '#ff453a' },
  langBtnText: { color: '#8b949e', fontSize: 12, fontWeight: '600' },
  langBtnTextActive: { color: '#fff' },
  textArea: { 
    backgroundColor: '#161b22', 
    borderWidth: 1, 
    borderColor: '#30363d', 
    borderRadius: 12, 
    padding: 15, 
    color: '#fff',
    textAlignVertical: 'top'
  },
  voiceBtn: { 
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 12, 
    padding: 20, 
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#30363d'
  },
  voiceBtnText: { color: '#8b949e', fontWeight: '600' },
  submitBtn: { 
    marginTop: 'auto',
    backgroundColor: '#ff453a', 
    borderRadius: 12, 
    padding: 18, 
    alignItems: 'center',
    marginBottom: 40
  },
  submitBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 }
});

export default ReportScreen;
