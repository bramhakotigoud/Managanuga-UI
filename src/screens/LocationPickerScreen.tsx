import React from "react";
import MapView, {
  Marker,
} from "react-native-maps";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LocationPickerScreen() {
    const [region, setRegion] = React.useState({

  latitude: 15.4786,

  longitude: 78.4831,

  latitudeDelta: 0.005,

  longitudeDelta: 0.005,

});

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Add new address
        </Text>

      </View>

      <View style={styles.searchBar}>

        <Text>
          🔍 Search by area, name, street...
        </Text>

      </View>

     <View style={{ flex: 1 }}>

  <MapView
    style={styles.mapContainer}
    region={region}
    onRegionChangeComplete={setRegion}
  />

  <View
    pointerEvents="none"
    style={styles.centerMarker}
  >
    <Text style={styles.pin}>
      📍
    </Text>
  </View>

</View>

      <TouchableOpacity
        style={styles.currentLocation}
      >

        <Text>
          📍 Use my current location
        </Text>

      </TouchableOpacity>

      <View style={styles.deliveryCard}>

        <Text style={styles.deliveryTitle}>
          Deliver To
        </Text>

        <Text>
          Address will appear here
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
      >

        <Text style={styles.buttonText}>
          Add Address Details
        </Text>

      </TouchableOpacity>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#FFF",
  },

  header:{
    padding:18,
  },

  title:{
    fontSize:22,
    fontWeight:"700",
  },

  searchBar:{
    marginHorizontal:16,
    height:52,
    backgroundColor:"#FFF",
    borderRadius:14,
    justifyContent:"center",
    paddingHorizontal:16,
    elevation:4,
  },

  mapContainer:{
    flex:1,
    marginTop:14,
},

  currentLocation:{
    alignSelf:"center",
    backgroundColor:"#FFF",
    marginTop:-30,
    paddingHorizontal:22,
    paddingVertical:14,
    borderRadius:30,
    elevation:5,
  },

  deliveryCard:{
    margin:16,
    backgroundColor:"#FFF",
    borderRadius:14,
    padding:18,
    elevation:4,
  },

  deliveryTitle:{
    fontSize:18,
    fontWeight:"700",
    marginBottom:10,
  },

  button:{
    backgroundColor:"#1E66F5",
    margin:16,
    borderRadius:14,
    height:55,
    justifyContent:"center",
    alignItems:"center",
  },

  buttonText:{
    color:"#FFF",
    fontWeight:"700",
    fontSize:17,
  },
  centerMarker: {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginLeft: -16,
  marginTop: -34,
},

pin: {
  fontSize: 40,
},

});