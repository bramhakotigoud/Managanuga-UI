import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Props {
  selectedPlan: any;
  loading?: boolean;
  onPress: () => void;
}

const SubscribeButton: React.FC<Props> = ({
  selectedPlan,
  loading = false,
  onPress,
}) => {

  if (!selectedPlan) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading}
      style={styles.button}
      onPress={onPress}>

      {loading ? (
        <ActivityIndicator
          color="#FFF"
          size="small"
        />
      ) : (
        <>
          <Text style={styles.title}>
            Subscribe Now
          </Text>

          <Text style={styles.price}>
            ₹{Number(selectedPlan.plan_price).toLocaleString()} / Year
          </Text>
        </>
      )}

    </TouchableOpacity>
  );
};

export default SubscribeButton;

const styles = StyleSheet.create({

  button:{
    marginHorizontal:18,
    marginVertical:25,
    height:65,
    borderRadius:18,

    backgroundColor:"#C8942E",

    justifyContent:"center",
    alignItems:"center",

    elevation:8,

    shadowColor:"#C8942E",
    shadowOpacity:0.35,
    shadowRadius:12,
    shadowOffset:{
      width:0,
      height:5,
    },
  },

  title:{
    color:"#FFF",
    fontWeight:"700",
    fontSize:18,
  },

  price:{
    marginTop:4,
    color:"#FFF8D8",
    fontSize:14,
    fontWeight:"600",
  },

});