import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function ResultScreen({route, navigation}){
  const res = route.params?.result;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verification Result</Text>
      <Text style={{marginTop:8}}>{JSON.stringify(res, null, 2)}</Text>
      <View style={{height:12}}/>
      <Button title="Back" onPress={()=>navigation.goBack()} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{flexGrow:1,alignItems:'center',justifyContent:'center',padding:20},
  title:{fontSize:22,fontWeight:'700'}
})
