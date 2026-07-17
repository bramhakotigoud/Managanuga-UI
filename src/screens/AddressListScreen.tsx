import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function AddressListScreen(){
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

const [addresses, setAddresses] = useState<any[]>([]);
const fromCheckout = route.params?.fromCheckout;

const saveAddresses = async (data: any[]) => {
  try {
    await AsyncStorage.setItem(
      'addresses',
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};
const loadAddresses = async () => {
  const data = await AsyncStorage.getItem('addresses');

  if (data) {
    setAddresses(JSON.parse(data));
  }
};

useEffect(() => {
  loadAddresses();
}, []);
const makeDefault = async (selectedIndex: number) => {
  const updatedAddresses = addresses.map((item, index) => ({
    ...item,
    isDefault: index === selectedIndex,
  }));

  setAddresses(updatedAddresses);

  await AsyncStorage.setItem(
    'addresses',
    JSON.stringify(updatedAddresses)
  );

  if (fromCheckout) {
    navigation.goBack();
  }
};
const deleteAddress = (indexToDelete: number) => {
  const updated = addresses.filter(
    (_, index) => index !== indexToDelete
  );

  setAddresses(updated);
  saveAddresses(updated);
};
useEffect(() => {
  const data = (route.params as any)?.newAddress;
  const editIndex = (route.params as any)?.editIndex;

  if (!data) return;

  if (editIndex !== undefined) {
  setAddresses((prev: any[]) => {
    const updated = prev.map((item, index) =>
      index === editIndex
        ? {
            ...data,
            address: `${data.houseNo}, ${data.street}, ${data.landmark}, ${data.city}, ${data.state} - ${data.pincode}`,
          }
        : item
    );

    saveAddresses(updated);
    return updated;
  });
} else {
  setAddresses((prev: any[]) => {
    const updated = [
      ...prev,
      {
        ...data,
        isDefault: prev.length === 0,
        address: `${data.houseNo}, ${data.street}, ${data.landmark}, ${data.city}, ${data.state} - ${data.pincode}`,
      },
    ];

    saveAddresses(updated);
    return updated;
  });
}
}, [route.params]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>My Addresses</Text>

      {addresses.map((item, index) => (
  <View key={index} style={styles.card}>

    <View style={styles.row}>
      <Text style={styles.name}>
        {item.addressType === 'Home'
          ? '🏠 Home'
          : item.addressType === 'Office'
          ? '🏢 Office'
          : '📍 Other'}
      </Text>
      {item.isDefault && (
      <Text style={styles.defaultTag}>
        ✓ Default
      </Text>
      )}
    </View>

    <Text style={styles.name}>
      {item.name}
    </Text>

    <Text style={styles.address}>
      {item.address}
    </Text>

    <Text style={styles.mobile}>
      {item.mobile}
    </Text>

    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => 
          navigation.navigate(
            'AddAddress',{
              editData:item,
              editIndex:index,
            })
          }
        >
        <Text style={styles.edit}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteAddress(index)}
        >
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
      {!item.isDefault && (
  <TouchableOpacity
    onPress={() => makeDefault(index)}
  >
    <Text style={styles.defaultText}>
      Make Default
    </Text>
  </TouchableOpacity>
)}
    </View>
    
 </View>
))}

      <TouchableOpacity
       style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress', {
          editData: null,
          editIndex: undefined,
        })}
        >
        <Text style={styles.addText}>
          + Add New Address
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
    fontSize:26,
    fontWeight:'700',
    marginBottom:20,
  },

  card:{
    backgroundColor:'#FFF',
    borderRadius:16,
    padding:16,
    marginBottom:15,
  },

  name:{
    fontSize:18,
    fontWeight:'700',
  },

  address:{
    color:'#666',
    marginTop:8,
  },

  mobile:{
    marginTop:8,
    fontWeight:'600',
  },

  row:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
    marginTop:15,
  },

  edit:{
    color:'#A84B21',
    marginRight:20,
    fontWeight:'700',
  },

  delete:{
    color:'red',
    fontWeight:'700',
  },

  addButton:{
    backgroundColor:'#A84B21',
    padding:15,
    borderRadius:12,
    alignItems:'center',
    marginTop:20,
  },

  addText:{
    color:'#FFF',
    fontWeight:'700',
  },
  topRow:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom:10,
},

homeTag:{
  backgroundColor:'#F5E6DD',
  color:'#A84B21',
  paddingHorizontal:10,
  paddingVertical:4,
  borderRadius:20,
  fontWeight:'700',
},

defaultTag:{
  color:'green',
  fontWeight:'700',
},
defaultText: {
  color: 'green',
  marginLeft: 20,
  fontWeight: '700',
  fontSize:14,
},
});