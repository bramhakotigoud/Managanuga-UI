import React, {useState} from 'react';
import styles from '../styles/LocationPickerScreen.styles';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
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

