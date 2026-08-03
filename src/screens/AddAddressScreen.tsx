import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAddressScreen({ navigation }: any) {
  const route = useRoute();
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

  useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setMobile(editData.mobile || '');
      setHouseNo(editData.houseNo || '');
      setStreet(editData.street || '');
      setLandmark(editData.landmark || '');
      setCity(editData.city || '');
      setState(editData.state || '');
      setPincode(editData.pincode || '');
      setAddressType(editData.type || editData.addressType || 'Home');
    }
  }, [editData]);

  const handleSaveAddress = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return;
    }
    if (mobile.length !== 10) {
      Alert.alert('Validation Error', 'Mobile number must contain 10 digits');
      return;
    }
    if (!houseNo.trim()) {
      Alert.alert('Validation Error', 'Please enter house number');
      return;
    }
    if (!street.trim()) {
      Alert.alert('Validation Error', 'Please enter street');
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
      Alert.alert('Validation Error', 'Pincode must contain 6 digits');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('addresses');
      let addressList = data ? JSON.parse(data) : [];

      const newAddress = {
        id: editData?.id || Date.now().toString(),
        name,
        mobile,
        houseNo,
        street,
        landmark,
        city,
        state,
        pincode,
        type: addressType,
        addressType,
        isDefault: editData ? editData.isDefault : addressList.length === 0,
      };

      if (editData && (editIndex !== undefined || editData.id)) {
        // Edit existing address
        if (editIndex !== undefined && editIndex >= 0) {
          addressList[editIndex] = newAddress;
        } else {
          addressList = addressList.map((item: any) =>
            item.id === editData.id ? newAddress : item
          );
        }
      } else {
        // Add new address
        addressList.push(newAddress);
      }

      await AsyncStorage.setItem('addresses', JSON.stringify(addressList));
      navigation.goBack();
    } catch (e) {
      console.log('Error saving address:', e);
      Alert.alert('Error', 'Failed to save address. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED BRAND HEADER WITH BACK BUTTON & LOGO (NO BELL/CART ICONS) */}
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

      {/* CENTERED PAGE TITLE */}
      <Text style={styles.titleCenter}>
        {editData ? 'Edit Address' : 'Add Address'}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#777"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          value={mobile}
          onChangeText={(text) => {
            setMobile(text.replace(/[^0-9]/g, ''));
          }}
        />

        <TextInput
          placeholder="House / Flat No"
          placeholderTextColor="#777"
          style={styles.input}
          value={houseNo}
          onChangeText={setHouseNo}
        />

        <TextInput
          placeholder="Street"
          placeholderTextColor="#777"
          style={styles.input}
          value={street}
          onChangeText={setStreet}
        />

        <TextInput
          placeholder="Landmark (Optional)"
          placeholderTextColor="#777"
          style={styles.input}
          value={landmark}
          onChangeText={setLandmark}
        />

        <TextInput
          placeholder="City"
          placeholderTextColor="#777"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="State"
          placeholderTextColor="#777"
          style={styles.input}
          value={state}
          onChangeText={setState}
        />

        <TextInput
          placeholder="Pincode"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          value={pincode}
          onChangeText={(text) => {
            setPincode(text.replace(/[^0-9]/g, ''));
          }}
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
});

