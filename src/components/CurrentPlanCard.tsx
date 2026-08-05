import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  membership: any;
}

const CurrentPlanCard: React.FC<Props> = ({
  membership,
}) => {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Current Membership
      </Text>

      <View style={styles.grid}>

        <View style={styles.box}>
          <Text style={styles.label}>
            Current Plan
          </Text>

          <Text style={styles.value}>
            {membership.plan_name}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Wallet Bonus
          </Text>

          <Text style={styles.value}>
            ₹{membership.wallet_bonus}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Monthly Claim
          </Text>

          <Text style={styles.value}>
            ₹{membership.monthly_claim}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Discount
          </Text>

          <Text style={styles.value}>
            {membership.discount_percentage}%
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
  Monthly Limit
</Text>

<Text style={styles.value}>
  {membership.monthly_limit_litres} Litres
</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Validity
          </Text>

          <Text style={styles.value}>
            {membership.validity_months} Months
          </Text>
        </View>

      </View>

    </View>

  );
};

export default CurrentPlanCard;

const styles = StyleSheet.create({

  container:{
    marginHorizontal:18,
    marginTop:18,

    backgroundColor:"#FFF",

    borderRadius:22,

    padding:20,

    elevation:6,

    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
  },

  heading:{
    fontSize:24,
    fontWeight:"700",
    color:"#2E3C24",
    marginBottom:18,
    textAlign:"center",
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },

  box:{
    width:"48%",
    backgroundColor:"#FFF7EA",
    borderRadius:16,
    padding:15,
    marginBottom:14,
  },

  label:{
    color:"#777",
    fontSize:13,
  },

  value:{
    marginTop:8,
    fontSize:22,
    fontWeight:"700",
    color:"#2E3C24",
  },

});