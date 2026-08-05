import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
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

});