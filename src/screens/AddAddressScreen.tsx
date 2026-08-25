import React, { useEffect, useRef, useState } from 'react';
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
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  /* Fixed Top Header Styles */
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

  titleCenter: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2D341F',
    marginVertical: 15,
  },

  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#222',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D341F',
    marginTop: 10,
    marginBottom: 10,
  },

  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  radioOption: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  saveButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
addressRow: {
  flexDirection: 'row',
  alignItems: 'stretch',
  marginBottom: 12,
},

addressSearchContainer: {
  flex: 7,
  position: 'relative',
  marginRight: 6,
},

addressInput: {
  backgroundColor: '#FFF',
  height: 48,
  borderRadius: 12,
  paddingLeft: 15,
  paddingRight: 70,
  fontSize: 14,
  color: '#222',

  elevation: 1,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2,
},

addressIcons: {
  position: 'absolute',
  right: 12,
  top: 0,
  height: 48,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

searchIcon: {
  fontSize: 18,
},

clearIcon: {
  fontSize: 17,
  color: '#777',
  fontWeight: '600',
},

currentLocationButton: {
  flex: 3,
  backgroundColor: '#D6E4FF',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 48,
},

currentLocationText: {
  fontSize: 17,
},

currentLocationLabel: {
  color: '#1D4ED8',
  fontSize: 10,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: 2,
},
suggestionsContainer: {
  backgroundColor: '#FFF',
  borderRadius: 12,
  marginTop: -6,
  marginBottom: 12,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.12,
  shadowRadius: 5,
  zIndex: 100,
},

suggestionItem: {
  paddingHorizontal: 15,
  paddingVertical: 13,
  borderBottomWidth: 1,
  borderBottomColor: '#EEE',
},

suggestionMain: {
  fontSize: 14,
  fontWeight: '600',
  color: '#2D341F',
},

suggestionSecondary: {
  fontSize: 12,
  color: '#777',
  marginTop: 3,
},  
});

