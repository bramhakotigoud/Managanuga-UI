import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function OrderSuccessScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>
        Order Placed Successfully
      </Text>

      <Text style={styles.subtitle}>
        Thank you for shopping with Mana Ganuga
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.buttonText}>
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#FFF',
  },

  icon:{
    fontSize:70,
  },

  title:{
    fontSize:24,
    fontWeight:'700',
    marginTop:20,
  },

  subtitle:{
    marginTop:10,
    color:'#666',
    textAlign:'center',
  },

  button:{
    marginTop:30,
    backgroundColor:'#A84B21',
    padding:15,
    borderRadius:10,
    width:'80%',
    alignItems:'center',
  },

  buttonText:{
    color:'#FFF',
    fontWeight:'700',
  },
});