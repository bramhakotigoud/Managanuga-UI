import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('window');

interface Plan {
  id: number;
  plan_name: string;
  plan_price: number;
  wallet_bonus: number;
  monthly_claim: number;
  discount_percentage: number;
  eligible_bottles: number;
}

interface Props {
  plans: Plan[];
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
}

const MembershipCarousel: React.FC<Props> = ({
  plans,
  selectedPlan,
  setSelectedPlan,
}) => {

  if (!plans.length) {
    return null;
  }

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'basic':
        return '🌿';

      case 'silver':
        return '🥈';

      case 'gold':
        return '👑';

      case 'platinum':
        return '💎';

      default:
        return '🏆';
    }
  };

  return (
    <View>

      <Carousel
        loop={false}
        width={width}
        height={220}
        data={plans}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.88,
          parallaxScrollingOffset: 90,
        }}
        defaultIndex={0}
        onSnapToItem={(index) => {
          setSelectedPlan(plans[index]);
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedPlan(item)}
            style={[
              styles.card,
              selectedPlan?.id === item.id &&
                styles.selectedCard,
            ]}>
                <View style={styles.iconCircle}>
              <Text style={styles.icon}>
                {getIcon(item.plan_name)}
              </Text>
            </View>

            <Text style={styles.planName}>
              {item.plan_name}
            </Text>

            <Text style={styles.price}>
              ₹{Number(item.plan_price).toLocaleString()}
            </Text>

            <Text style={styles.year}>
              Per Year
            </Text>

            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {item.discount_percentage}% OFF
              </Text>
            </View>

          </TouchableOpacity>
        )}
      />

      <View style={styles.dotsContainer}>
        {plans.map(plan => (
          <View
            key={plan.id}
            style={[
              styles.dot,
              selectedPlan?.id === plan.id &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>

    </View>
  );
};

export default MembershipCarousel;

const styles = StyleSheet.create({

  card:{
    width:150,
    height:185,
    backgroundColor:'#FFFFFF',
    borderRadius:24,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',

    shadowColor:'#000',
    shadowOpacity:0.08,
    shadowRadius:12,
    shadowOffset:{
      width:0,
      height:5,
    },
    elevation:6,
  },

  selectedCard:{
    borderWidth:2,
    borderColor:'#D4A017',
    backgroundColor:'#FFF8E6',
    transform:[{scale:1.08}],
    elevation:12,
  },

  iconCircle:{
    width:58,
    height:58,
    borderRadius:29,
    backgroundColor:'#FDF4DD',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:14,
  },

  icon:{
    fontSize:28,
  },

  planName:{
    fontSize:18,
    fontWeight:'700',
    color:'#3B2A1A',
  },

  price:{
    marginTop:10,
    fontSize:24,
    fontWeight:'bold',
    color:'#222',
  },

  year:{
    marginTop:3,
    color:'#777',
    fontSize:13,
  },

  discountBadge:{
    marginTop:14,
    backgroundColor:'#EAF7DD',
    paddingHorizontal:16,
    paddingVertical:6,
    borderRadius:30,
  },

  discountText:{
    color:'#4E7D32',
    fontWeight:'700',
    fontSize:12,
  },

  dotsContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:18,
  },

  dot:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:'#D8D8D8',
    marginHorizontal:4,
  },

  activeDot:{
    width:22,
    backgroundColor:'#D4A017',
  },

});