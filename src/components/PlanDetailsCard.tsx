import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  selectedPlan: any;
}

const PlanDetailsCard: React.FC<Props> = ({selectedPlan}) => {

  if (!selectedPlan) {
    return null;
  }

  const details = [
    {
      label: 'Wallet Bonus',
      value: `₹${selectedPlan.wallet_bonus}`,
    },
    {
      label: 'Monthly Claim',
      value: `₹${selectedPlan.monthly_claim}`,
    },
    {
      label: 'Monthly Discount',
      value: `${selectedPlan.discount_percentage}%`,
    },
    {
      label: 'Eligible Bottles',
      value: `${selectedPlan.monthly_limit_litres} Litres`,
    },
    {
      label: 'Validity',
      value: '12 Months',
    },
    {
      label: 'Renewal',
      value: 'Every Year',
    },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {selectedPlan.plan_name} Membership
      </Text>

      <View style={styles.grid}>

        {details.map((item, index) => (

          <View
            key={index}
            style={styles.box}>

            <Text style={styles.label}>
              {item.label}
            </Text>

            <Text style={styles.value}>
              {item.value}
            </Text>

          </View>

        ))}

      </View>

    </View>
  );
};

export default PlanDetailsCard;

const styles = StyleSheet.create({

  container:{
    marginHorizontal:18,
    marginTop:20,
    backgroundColor:'#FFFFFF',
    borderRadius:24,
    padding:20,
    elevation:6,
  },

  title:{
    textAlign:'center',
    fontSize:22,
    fontWeight:'700',
    color:'#3B2A1A',
    marginBottom:20,
  },

  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },

  box:{
    width:'48%',
    backgroundColor:'#FFF8EA',
    borderRadius:18,
    padding:16,
    marginBottom:14,
  },

  label:{
    color:'#777',
    fontSize:13,
  },

  value:{
    marginTop:8,
    fontWeight:'700',
    fontSize:19,
    color:'#3B2A1A',
  },

});