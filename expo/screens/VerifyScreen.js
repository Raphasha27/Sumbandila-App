import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as BarcodeScanner from 'expo-barcode-scanner';
import axios from 'axios';

export default function VerifyScreen({navigation}){
  const [providerType,setProviderType]=useState('education');
  const [identifier,setIdentifier]=useState('');
  const [hasPermission,setHasPermission]=useState(null);
  const [scanning,setScanning]=useState(false);

  useEffect(()=>{
    (async ()=>{
      const {status} = await BarcodeScanner.BarcodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  },[]);

  const doVerify = async ()=>{
    try{
      const res = await axios.post('http://10.0.2.2:8002/verify', {provider_type: providerType, provider_identifier: identifier});
      navigation.navigate('Result', {result: res.data});
    }catch(e){
      Alert.alert('Error', e.message);
    }
  }

  const startScan = ()=> setScanning(true);

  if(scanning){
    return (
      <BarcodeScanner.BarcodeScanner
        onBarCodeScanned={({data})=>{ setScanning(false); setIdentifier(data); }}
        style={{flex:1}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Provider</Text>
      <TextInput placeholder="provider identifier (reg no or name)" style={styles.input} value={identifier} onChangeText={setIdentifier} />
      <View style={{flexDirection:'row', gap:8}}>
        <Button title="Scan QR/Barcode" onPress={startScan} />
        <Button title="Verify" onPress={doVerify} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  title:{fontSize:22,marginBottom:12},
  input:{width:'100%',borderWidth:1,borderColor:'#ccc',padding:8,marginBottom:8,borderRadius:6}
})
