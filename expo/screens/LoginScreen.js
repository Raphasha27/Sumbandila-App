import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({navigation}){
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');

  const doLogin = async ()=>{
    try{
      const res = await axios.post('http://10.0.2.2:8001/login', {phone, password});
      if(res.data.access_token){
        Alert.alert('Logged in', 'Token: ' + res.data.access_token);
        navigation.navigate('Verify');
      }
    }catch(e){
      Alert.alert('Login failed', e?.response?.data?.detail || e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Signup</Text>
      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry/>
      <Button title="Login" onPress={doLogin} />
      <View style={{height:12}}/>
      <Button title="Back" onPress={()=>navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  title:{fontSize:22,marginBottom:12},
  input:{width:'100%',borderWidth:1,borderColor:'#ccc',padding:8,marginBottom:8,borderRadius:6}
})
