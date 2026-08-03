import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  membership: any;
}

const MembershipStatusCard: React.FC<Props> = ({
  membership,
}) => {

  const expiryDate = new Date(
    membership.expiry_date,
  );

  const startDate = new Date(
    membership.start_date,
  );

  const daysLeft = Math.ceil(
    (expiryDate.getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <View style={styles.container}>

      {/* Left */}

      <View style={styles.left}>

        <Text style={styles.badge}>
          ✅
        </Text>

        <Text style={styles.title}>
          Premium Membership
        </Text>

        <Text style={styles.active}>
          Active
        </Text>

        <Text style={styles.message}>
          Thank you for being a valued member!
        </Text>

        <View style={styles.pill}>
          <Text style={styles.pillText}>
            Your membership is active
          </Text>
        </View>

      </View>

      {/* Right */}

      <View style={styles.right}>

        <Text style={styles.label}>
          Member Since
        </Text>

        <Text style={styles.value}>
          {startDate.toLocaleDateString()}
        </Text>

        <Text style={styles.label}>
          Valid Until
        </Text>

        <Text style={styles.value}>
          {expiryDate.toLocaleDateString()}
        </Text>

        <View style={styles.days}>
          <Text style={styles.daysText}>
            {daysLeft} Days Left
          </Text>
        </View>

        <Text style={styles.label}>
          Plan
        </Text>

        <Text style={styles.value}>
          {membership.plan_name}
        </Text>

      </View>

    </View>
  );
};

export default MembershipStatusCard;

const styles = StyleSheet.create({

  container:{
    margin:18,
    borderRadius:22,
    backgroundColor:"#F6FFF1",

    padding:20,

    flexDirection:"row",

    justifyContent:"space-between",

    borderWidth:1,
    borderColor:"#D7EDCF",
  },

  left:{
    flex:1,
    paddingRight:20,
  },

  right:{
    width:120,
  },

  badge:{
    fontSize:48,
  },

  title:{
    marginTop:10,
    fontSize:24,
    fontWeight:"700",
    color:"#2C3D25",
  },

  active:{
    fontSize:38,
    color:"#2E9E35",
    fontWeight:"800",
    marginTop:5,
  },

  message:{
    marginTop:10,
    color:"#666",
    fontSize:14,
  },

  pill:{
    marginTop:14,
    alignSelf:"flex-start",
    backgroundColor:"#DFF7D6",
    paddingHorizontal:14,
    paddingVertical:8,
    borderRadius:50,
  },

  pillText:{
    color:"#2E8B34",
    fontWeight:"600",
    fontSize:12,
  },

  label:{
    color:"#777",
    fontSize:13,
    marginTop:8,
  },

  value:{
    fontSize:17,
    fontWeight:"700",
    color:"#222",
  },

  days:{
    marginTop:8,
    alignSelf:"flex-start",
    backgroundColor:"#DDF6D2",
    borderRadius:50,
    paddingHorizontal:10,
    paddingVertical:5,
  },

  daysText:{
    color:"#2E8B34",
    fontWeight:"700",
    fontSize:12,
  },

});