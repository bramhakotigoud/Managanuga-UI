import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/AddAddressScreen.styles';
import Geolocation from "react-native-geolocation-service";
import GooglePlacesSDK from 'react-native-google-places-sdk';
import {reverseGeocode} from '../services/googleMapsService';
import FloatingInput from '../components/FloatingInput';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

import { Platform } from "react-native";
import {
  getPincodeDetails,
  addAddress,
  updateAddress,
} from "../services/addressService";
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAddressScreen({ navigation }: any) {
  const route = useRoute();
  const { user } = useAuth();
  const editData = (route.params as any)?.editData;
  const editIndex = (route.params as any)?.editIndex;

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [address, setAddress] = useState('');
const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
const [searchingAddress, setSearchingAddress] = useState(false);
const addressInputRef = useRef<TextInput>(null);
const [addressSearchActive, setAddressSearchActive] = useState(false);


 useEffect(() => {
  if (editData) {
    setName(editData.full_name || '');
    setMobile(editData.phone || '');
    setAddress(editData.address_line1 || '');
    setLandmark(editData.address_line2 || '');
    setCity(editData.city || '');
    setState(editData.state || '');
    setPincode(editData.postal_code || '');
    setAddressType(editData.address_type || 'Home');
  }
}, [editData]);
const requestLocationPermission = async () => {

  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  let result = await check(permission);

  if (result !== RESULTS.GRANTED) {
    result = await request(permission);
  }

  return result === RESULTS.GRANTED;

};
const handleAddressChange = async (text: string) => {
  setAddress(text);

  // Don't search until 3 characters are entered
  if (text.trim().length < 3) {
    setAddressSuggestions([]);
    return;
  }

  try {
    setSearchingAddress(true);

    const predictions =
      await GooglePlacesSDK.fetchPredictions(text);

    console.log('GOOGLE ADDRESS PREDICTIONS:', predictions);

    setAddressSuggestions(predictions || []);
  } catch (error) {
    console.error('GOOGLE ADDRESS SEARCH ERROR:', error);
    setAddressSuggestions([]);
  } finally {
    setSearchingAddress(false);
  }
};
const handleCurrentLocation = async () => {
  const granted = await requestLocationPermission();

  if (!granted) {
    Alert.alert(
      'Location Permission Required',
      'Please allow location access to automatically fill your current address.',
    );
    return;
  }

  Geolocation.getCurrentPosition(
    async position => {
      try {
        const {latitude, longitude} = position.coords;

        console.log('CURRENT LOCATION:', {
          latitude,
          longitude,
        });

        const data = await reverseGeocode(
          latitude,
          longitude,
        );

        const result = data.results?.[0];

        if (!result) {
          Alert.alert(
            'Location Error',
            'No address was found for your current location.',
          );
          return;
        }

        const components =
          result.address_components || [];

        let selectedPincode = '';
        let selectedCity = '';
        let selectedState = '';

        components.forEach((component: any) => {
          const types = component.types || [];

          if (types.includes('postal_code')) {
            selectedPincode =
              component.long_name || '';
          }

          if (
            types.includes('locality') ||
            types.includes('postal_town')
          ) {
            selectedCity =
              component.long_name || '';
          }

          if (
            types.includes(
              'administrative_area_level_1',
            )
          ) {
            selectedState =
              component.long_name || '';
          }
        });

        setAddress(
          result.formatted_address || '',
        );

        setPincode(selectedPincode);
        setCity(selectedCity);
        setState(selectedState);

        setAddressSuggestions([]);

      } catch (error: any) {
        console.error(
          'CURRENT LOCATION GEOCODING ERROR:',
          error,
        );

        Alert.alert(
          'Location Error',
          error?.message ||
            'Unable to determine your current address.',
        );
      }
    },

    error => {
      console.error(
        'LOCATION ERROR:',
        error,
      );

      Alert.alert(
        'Location Error',
        error.message ||
          'Unable to get your current location.',
      );
    },

    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
};
  const handleSaveAddress = async () => {
  if (!name.trim()) {
    Alert.alert('Validation Error', 'Please enter your name');
    return;
  }

  if (mobile.length !== 10) {
    Alert.alert(
      'Validation Error',
      'Mobile number must contain 10 digits'
    );
    return;
  }

  if (!address.trim()) {
    Alert.alert('Validation Error', 'Please enter your address');
    return;
  }

  if (!city.trim()) {
    Alert.alert('Validation Error', 'Please enter city');
    return;
  }

  if (!state.trim()) {
    Alert.alert('Validation Error', 'Please enter state');
    return;
  }

  if (pincode.length !== 6) {
    Alert.alert(
      'Validation Error',
      'Pincode must contain 6 digits'
    );
    return;
  }

  if (!user?.id) {
    Alert.alert(
      'Login Required',
      'Please login before saving an address.'
    );
    return;
  }

  try {
    const addressData = {
      entity_type: 'USER',
      entity_id: Number(user.id),
      address_type: addressType,
      full_name: name.trim(),
      phone: mobile,
      address_line1: address.trim(),
      address_line2: landmark.trim(),
      city: city.trim(),
      state: state.trim(),
      country: 'India',
      postal_code: pincode,
      is_default: editData
           ? editData.is_default
           : false,
    };

    let response;

    if (editData?.id) {
      response = await updateAddress(
        Number(editData.id),
        addressData
      );
    } else {
      response = await addAddress(addressData);
    }

    if (!response?.success) {
      throw new Error(
        response?.message || 'Failed to save address'
      );
    }

    console.log(
      'ADDRESS SAVED TO DATABASE:',
      response.data
    );

    navigation.goBack();
  } catch (error: any) {
    console.error('SAVE ADDRESS ERROR:', error);

    Alert.alert(
      'Error',
      error?.message ||
        'Failed to save address. Please try again.'
    );
  }
};
  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED BRAND HEADER WITH BACK BUTTON & LOGO (NO BELL/CART ICONS) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <CircleChevronLeft 
              size={24}
              color="#000000"
              strokeWidth={2}
              />
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

      {/* CENTERED PAGE TITLE */}
     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
       
        <FloatingInput
  label="Full Name"
  value={name}
  onChangeText={setName}
/>

        <FloatingInput
  label="Mobile Number"
  keyboardType="phone-pad"
  maxLength={10}
  value={mobile}
  onChangeText={(text) => {
    setMobile(text.replace(/[^0-9]/g, ''));
  }}
/>

        {/* ADDRESS + CURRENT LOCATION */}

<View style={styles.addressRow}>

  {/* 70% Address Search */}
  <View style={styles.addressSearchContainer}>

    <TextInput
  ref={addressInputRef}
  placeholder="Address"
  placeholderTextColor="#777"
  value={address}
  onChangeText={handleAddressChange}
  editable={true}
  onFocus={() => {
    setAddressSearchActive(true);
  }}
  style={styles.addressInput}
/>

    <View style={styles.addressIcons}>
  {address.length > 0 ? (
    <TouchableOpacity
      onPress={() => {
        setAddress('');
        setAddressSuggestions([]);
        setAddressSearchActive(false);
        addressInputRef.current?.blur();
      }}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}>
      <Text style={styles.clearIcon}>
        ✕
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setAddressSearchActive(true);

        setTimeout(() => {
          addressInputRef.current?.focus();
        }, 100);
      }}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}>
      <Text style={styles.searchIcon}>
        🔍
      </Text>
    </TouchableOpacity>
  )}
</View>

  </View>

  {/* 30% Current Location */}
  <TouchableOpacity
    style={styles.currentLocationButton}
    onPress={handleCurrentLocation}>
    <Text style={styles.currentLocationLabel}>
      Current
      {'\n'}
      Location
    </Text>

  </TouchableOpacity>

</View>
{addressSuggestions.length > 0 && (
  <View style={styles.suggestionsContainer}>
    {addressSuggestions.map((item: any, index: number) => (
      <TouchableOpacity
        key={item.placeID || item.placeId || index}
        style={styles.suggestionItem}
        onPress={async () => {
          try {
            const placeId =
              item.placeID || item.placeId;

            if (!placeId) {
              return;
            }

            const place =
              await GooglePlacesSDK.fetchPlaceByID(placeId);

            console.log(
              'SELECTED GOOGLE PLACE:',
              place
            );

            if (place?.formattedAddress) {
  setAddress(place.formattedAddress);
}

// Extract address components
const components = place?.addressComponents || [];

let selectedPincode = '';
let selectedCity = '';
let selectedState = '';

components.forEach((component: any) => {
  const types = component.types || [];

  if (
    types.includes('postal_code')
  ) {
    selectedPincode =
      component.name ||
      component.shortName ||
      '';
  }

  if (
    types.includes('locality') ||
    types.includes('postal_town')
  ) {
    selectedCity =
      component.name ||
      component.shortName ||
      '';
  }

  if (
    types.includes('administrative_area_level_1')
  ) {
    selectedState =
      component.name ||
      component.shortName ||
      '';
  }
});

setPincode(selectedPincode);
setCity(selectedCity);
setState(selectedState);

setAddressSuggestions([]);
       
          } catch (error) {
            console.error(
              'PLACE DETAILS ERROR:',
              error
            );

            Alert.alert(
              'Address Error',
              'Unable to get the selected address.'
            );
          }
        }}>
        
        <Text style={styles.suggestionMain}>
          {item.primaryText || item.text || item.description}
        </Text>

        {item.secondaryText && (
          <Text style={styles.suggestionSecondary}>
            {item.secondaryText}
          </Text>
        )}

      </TouchableOpacity>
    ))}
  </View>
)}

        <FloatingInput
  label="Landmark (Optional)"
  value={landmark}
  onChangeText={setLandmark}
/>
       <FloatingInput
  label="Pincode"
  keyboardType="number-pad"
  maxLength={6}
  value={pincode}
  onChangeText={async (text) => {
    const value = text.replace(/[^0-9]/g, '');

    setPincode(value);

    if (value.length === 6) {
      try {
        const response = await getPincodeDetails(value);

        if (response.success) {
          setCity(response.data.city);
          setState(response.data.state);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }}
/>

        <FloatingInput
  label="City"
  editable={false}
  value={city}
  onChangeText={setCity}
/>

       <FloatingInput
  label="State"
  editable={false}
  value={state}
  onChangeText={setState}
/>

       

        <Text style={styles.sectionTitle}>Address Type</Text>

        <View style={styles.typeRow}>
          <TouchableOpacity onPress={() => setAddressType('Home')}>
            <Text style={styles.radioOption}>
              {addressType === 'Home' ? '🔘' : '⚪'} Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAddressType('Office')}>
            <Text style={styles.radioOption}>
              {addressType === 'Office' ? '🔘' : '⚪'} Office
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAddressType('Other')}>
            <Text style={styles.radioOption}>
              {addressType === 'Other' || addressType === 'other' ? '🔘' : '⚪'} Other
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveText}>
            {editData ? 'Update Address' : 'Save Address'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}



