import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const benefits = [
  {
    icon: '💰',
    title: 'Wallet Bonus',
    subtitle: 'Extra money credited instantly',
  },
  {
    icon: '🛍️',
    title: 'Monthly Discount',
    subtitle: 'Discount on one order every month',
  },
  {
    icon: '🫒',
    title: 'Free Oil Bottles',
    subtitle: 'Get eligible bottles every year',
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    subtitle: 'No delivery charges',
  },
  {
    icon: '⭐',
    title: 'Priority Support',
    subtitle: 'Fast customer assistance',
  },
  {
    icon: '🔄',
    title: 'Easy Renewal',
    subtitle: 'Renew membership anytime',
  },
];

const BenefitsSection = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Membership Benefits
      </Text>

      {benefits.map((item, index) => (

        <View
          key={index}
          style={styles.row}>

          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              {item.icon}
            </Text>
          </View>

          <View style={styles.textContainer}>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              {item.subtitle}
            </Text>

          </View>

        </View>

      ))}

    </View>
  );
};

export default BenefitsSection;

const styles = StyleSheet.create({

  container:{
    marginHorizontal:18,
    marginTop:20,
    backgroundColor:'#FFFFFF',
    borderRadius:24,
    padding:20,
    elevation:6,
  },

  heading:{
    fontSize:22,
    fontWeight:'700',
    textAlign:'center',
    color:'#3B2A1A',
    marginBottom:18,
  },

  row:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:18,
  },

  iconContainer:{
    width:54,
    height:54,
    borderRadius:27,
    backgroundColor:'#FFF6D9',
    justifyContent:'center',
    alignItems:'center',
  },

  icon:{
    fontSize:24,
  },

  textContainer:{
    flex:1,
    marginLeft:14,
  },

  title:{
    fontSize:16,
    fontWeight:'700',
    color:'#3B2A1A',
  },

  subtitle:{
    marginTop:4,
    color:'#777',
    fontSize:13,
    lineHeight:18,
  },

});