import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function HomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sumbandila</Text>
      <Text style={styles.subtitle}>Verify providers (education, medical, legal)</Text>
      <View style={{marginTop:20}}>
        <Button title="Login / Signup" onPress={()=>navigation.navigate('Login')} />
      </View>
      <View style={{marginTop:10}}>
        <Button title="Verify now" onPress={()=>navigation.navigate('Verify')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  logo:{width:120,height:120,marginBottom:12},
  title:{fontSize:28,fontWeight:'700'},
  subtitle:{marginTop:6,color:'#444'}
})
