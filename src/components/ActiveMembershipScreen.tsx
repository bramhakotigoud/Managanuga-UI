import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import MembershipStatusCard from "./MembershipStatusCard";
import CurrentPlanCard from "./CurrentPlanCard";
import UpgradePlansSection from "./UpgradePlansSection";
interface Props {
  membership: any;
  plans: any[];
  navigation: any;
}

const ActiveMembershipScreen: React.FC<Props> = ({
  membership,
  plans,
  navigation,
}) => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>
      
              <View style={styles.brandContainer}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.logo}
                />
                <View style={styles.brandTextContainer}>
                  <Text style={styles.brandTitle}>Mana Ganuga</Text>
                  <Text style={styles.brandSubtitle}>Pure Tradition • Healthy Future</Text>
                </View>
              </View>
      
              <View style={styles.headerRightPlaceholder} />
            </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <MembershipStatusCard
          membership={membership}
        />
        <CurrentPlanCard
  membership={membership}
/>
<UpgradePlansSection
  membership={membership}
  plans={plans}
  navigation={navigation}
/>

      </ScrollView>

    </SafeAreaView>
  );
};

export default ActiveMembershipScreen;

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#FFF8EE",
  },

  content:{
    paddingBottom:40,
  },
  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D341F',
    marginTop: -2,
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
   logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },

  brandTextContainer: {
    justifyContent: 'center',
  },

  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },

  brandSubtitle: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
  },
   headerRightPlaceholder: {
    width: 36,
  },
  


});