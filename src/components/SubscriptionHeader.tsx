import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: any;
}

const SubscriptionHeader: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <View style={styles.header}>

        <View style={styles.leftContainer}>

          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />

          <View>

            <Text style={styles.brand}>
              Mana Ganuga
            </Text>

            <Text style={styles.tagline}>
              Pure Tradition • Healthy Future
            </Text>

          </View>

        </View>

        <View style={styles.rightContainer}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Ionicons
              name="notifications-outline"
              size={26}
              color="#5B3A1D"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft:18}}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons
              name="cart-outline"
              size={26}
              color="#5B3A1D"
            />
          </TouchableOpacity>

        </View>

      </View>

      <Text style={styles.title}>
        Mana Ganuga Premium Membership
      </Text>

      <Text style={styles.subtitle}>
        Save up to ₹35,000 every year
      </Text>
    </>
  );
};

export default SubscriptionHeader;

const styles = StyleSheet.create({

  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:18,
    paddingTop:12,
  },

  leftContainer:{
    flexDirection:'row',
    alignItems:'center',
  },

  logo:{
    width:52,
    height:52,
    resizeMode:'contain',
    marginRight:12,
  },

  brand:{
    fontSize:22,
    fontWeight:'700',
    color:'#4D2C12',
  },

  tagline:{
    marginTop:2,
    fontSize:12,
    color:'#8A8A8A',
  },

  rightContainer:{
    flexDirection:'row',
    alignItems:'center',
  },

  title:{
    marginTop:20,
    textAlign:'center',
    fontSize:22,
    fontWeight:'700',
    color:'#3B2A1A',
  },

  subtitle:{
    marginTop:8,
    marginBottom:25,
    textAlign:'center',
    color:'#8B6B3E',
    fontSize:15,
  },

});