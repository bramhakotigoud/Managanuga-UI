import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

export default function LocationPickerScreen({navigation}: any) {
  const [region, setRegion] = useState<Region>({
    latitude: 15.4786,
    longitude: 78.4831,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Add new address</Text>

        <View style={{width: 30}} />
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>
          🔍 Search by area, name, street...
        </Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
  provider={PROVIDER_GOOGLE}
  style={{flex: 1}}
  initialRegion={{
    latitude: 15.4786,
    longitude: 78.4831,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
/>

        {/* Center Pin */}
        <View pointerEvents="none" style={styles.centerMarker}>
          <Text style={styles.pin}>📍</Text>
        </View>

        {/* Current Location */}
        <TouchableOpacity
          style={styles.currentLocation}
          onPress={() => {
            console.log('Current location pressed');
          }}>
          <Text style={styles.currentLocationText}>
            📍 Use my current location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Card */}
      <View style={styles.deliveryCard}>
        <Text style={styles.deliveryTitle}>Deliver To</Text>

        <Text style={styles.deliveryText}>
          Move the map to select your delivery location
        </Text>
      </View>

      {/* Add Address Details */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Add Address Details');
        }}>
        <Text style={styles.buttonText}>Add Address Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 30,
    height: 40,
    justifyContent: 'center',
  },

  back: {
    fontSize: 34,
    color: '#2D341F',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },

  searchBar: {
    marginHorizontal: 16,
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  searchText: {
    color: '#777',
    fontSize: 14,
  },

  mapContainer: {
    flex: 1,
    marginTop: 14,
    position: 'relative',
  },

  map: {
    flex: 1,
  },

  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },

  pin: {
    fontSize: 40,
  },

  currentLocation: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  currentLocationText: {
    fontWeight: '600',
    color: '#222',
  },

  deliveryCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    elevation: 4,
  },

  deliveryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },

  deliveryText: {
    color: '#777',
    fontSize: 14,
  },

  button: {
    backgroundColor: '#1E66F5',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
  },
});