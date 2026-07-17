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
} from 'react-native';

export default function AddAddressScreen({navigation}: any) {
  const route = useRoute();
  const editData = (route.params as any)?.editData;
  const editIndex = (route.params as any)?.editIndex;
  const [name, setName] = useState(editData ? editData.name : '');
  const [mobile, setMobile] = useState(editData ? editData.mobile : '');
  const [houseNo, setHouseNo] = useState(editData ? editData.houseNo : '');
  const [street, setStreet] = useState(editData ? editData.street : '');
  const [landmark, setLandmark] = useState(editData ? editData.landmark : '');
  const [city, setCity] = useState(editData ? editData.city : '');
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
    setAddressType(editData.addressType || 'Home');
  }
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Add Address</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Mobile Number"
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
          style={styles.input}
          value={houseNo}
          onChangeText={setHouseNo}
        />

        <TextInput
          placeholder="Street"
          style={styles.input}
          value={street}
          onChangeText={setStreet}
        />

        <TextInput
          placeholder="Landmark"
          style={styles.input}
          value={landmark}
          onChangeText={setLandmark}
        />

        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="State"
          style={styles.input}
          value={state}
          onChangeText={setState}
        />

        <TextInput
          placeholder="Pincode"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          value={pincode}
          onChangeText={(text) => {
            setPincode(text.replace(/[^0-9]/g, ''));
          }}
        />

        <Text style={styles.sectionTitle}>
          Address Type
        </Text>

        <View style={styles.typeRow}>
            <TouchableOpacity
                onPress={() => setAddressType('Home')}
            >
                <Text style={styles.radioOption}>
                    {addressType === 'Home' ? '🔘' : '⚪'} Home
                </Text>
                </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setAddressType('Office')}
            >
                <Text style={styles.radioOption}>
                    {addressType === 'Office' ? '🔘' : '⚪'} Office
                </Text>
                </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setAddressType('other')}
            >
                <Text style={styles.radioOption}>
                    {addressType === 'other' ? '🔘' : '⚪'} Other
                </Text>
                </TouchableOpacity>        
        </View>

        <TouchableOpacity 
         style={styles.saveButton}
         onPress={() => {
          if (!name.trim()) {
            Alert.alert('Please enter your name');
            return;
          }
          if (mobile.length !== 10) {
            Alert.alert('Mobile number must contain 10 digits');
            return;
          }
          if (!houseNo.trim()) {
            Alert.alert('Please enter house number');
            return;
          }

          if (!street.trim()) {
            Alert.alert('Please enter street');
            return;
          }
          if (!city.trim()) {
            Alert.alert('Please enter city');
            return;
          }   
          if (!state.trim()) {
            Alert.alert('Please enter state');
            return;
          }
          if (pincode.length !== 6) {
            Alert.alert('Pincode must contain 6 digits');
            return;
          }
  const newAddress = {
    name,
    mobile,
    houseNo,
    street,
    landmark,
    city,
    state,
    pincode,
    addressType,
  };

       navigation.goBack();
       setTimeout(() => {
         navigation.navigate(
          'AddressList' as never, 
          {
            newAddress,
            editIndex,
          } as never
        );
     }, 100);
        }}
        >
         
          <Text style={styles.saveText}>
            Save Address
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F4EC',
    padding:20,
  },

  title:{
    fontSize:28,
    fontWeight:'700',
    marginBottom:20,
  },
  input:{
    backgroundColor:'#FFF',
    padding:15,
    borderRadius:12,
    marginBottom:12,
  },

  sectionTitle:{
    fontWeight:'700',
    marginTop:10,
    marginBottom:10,
  },

  typeRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:25,
  },

  saveButton:{
    backgroundColor:'#A84B21',
    padding:16,
    borderRadius:12,
    alignItems:'center',
  },

  saveText:{
    color:'#FFF',
    fontWeight:'700',
  },
  radioOption:{
  paddingVertical:10,
  paddingHorizontal:12,
}
});
