import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

interface Props {
  membership: any;
  plans: any[];
  navigation: any;
}

const UpgradePlansSection: React.FC<Props> = ({
  membership,
  plans,
  navigation,
}) => {

  // Show only plans above the current one
  const upgradePlans = plans.filter(
    plan => plan.id > membership.plan_id
  );

  if (upgradePlans.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Upgrade Your Membership
      </Text>

      <Text style={styles.subHeading}>
        Unlock more benefits with higher plans
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={upgradePlans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (

          <View style={styles.card}>

            <Text style={styles.plan}>
              {item.plan_name}
            </Text>

            <Text style={styles.price}>
              ₹{Number(item.plan_price).toLocaleString()}
            </Text>

            <Text style={styles.year}>
              / Year
            </Text>

            <View style={styles.info}>
              <Text>
                💰 Wallet Bonus ₹{item.wallet_bonus}
              </Text>

              <Text>
                🎁 Monthly Claim ₹{item.monthly_claim}
              </Text>

              <Text>
                🏷 {item.discount_percentage}% Discount
              </Text>

              <Text>
                🫒 {item.eligible_bottles} Bottles
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Payment", {
                  type: "membership",
                  plan: {
                    id: item.id,
                    name: item.plan_name,
                    price: item.plan_price,
                    discount: item.discount_percentage,
                    walletAmount: item.wallet_bonus,
                    monthlyClaim: item.monthly_claim,
                  },
                })
              }>

              <Text style={styles.buttonText}>
                Upgrade
              </Text>

            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
};

export default UpgradePlansSection;

const styles = StyleSheet.create({

  container:{
    marginTop:25,
  },

  heading:{
    textAlign:"center",
    fontSize:28,
    fontWeight:"700",
    color:"#2E3C24",
  },

  subHeading:{
    textAlign:"center",
    color:"#777",
    marginTop:5,
    marginBottom:20,
  },

  card:{
    width:260,
    backgroundColor:"#FFF",
    marginLeft:18,
    borderRadius:20,
    padding:20,
    elevation:6,
  },

  plan:{
    fontSize:24,
    fontWeight:"700",
    color:"#2E3C24",
  },

  price:{
    marginTop:10,
    fontSize:34,
    fontWeight:"800",
    color:"#C8942E",
  },

  year:{
    color:"#666",
    marginBottom:15,
  },

  info:{
    gap:10,
  },

  button:{
    marginTop:20,
    backgroundColor:"#C8942E",
    height:50,
    borderRadius:14,
    justifyContent:"center",
    alignItems:"center",
  },

  buttonText:{
    color:"#FFF",
    fontSize:17,
    fontWeight:"700",
  },

});