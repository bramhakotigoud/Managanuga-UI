import { useAuth } from '../context/AuthContext';
import {
  getAddresses,
  updateAddress,
  deleteAddress as deleteAddressApi,
} from '../services/addressService';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';


export default function AddressListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<any[]>([]);
  const fromCheckout = route.params?.fromCheckout;

  // Data loading helper
  const loadAddresses = useCallback(async () => {
  if (!user?.id) {
    return;
  }

  try {
    const response = await getAddresses(Number(user.id));

    if (response?.success) {
      setAddresses(response.data || []);
    } else {
      setAddresses([]);
    }
  } catch (error) {
    console.log('Error loading addresses:', error);
    Alert.alert(
      'Error',
      'Unable to load your addresses.'
    );
  }
}, [user?.id]);

  // Safe focus listener
  useEffect(() => {
    loadAddresses();

    const unsubscribe = navigation.addListener('focus', () => {
      loadAddresses();
    });

    return unsubscribe;
  }, [navigation, loadAddresses]);


  const makeDefault = async (selectedIndex: number) => {
  try {
    const selected = addresses[selectedIndex];

    if (!selected?.id) {
      Alert.alert('Error', 'Address ID is missing.');
      return;
    }

    await Promise.all(
      addresses.map(async (item) => {
        if (item.id) {
          await updateAddress(item.id, {
            is_default: item.id === selected.id,
          });
        }
      })
    );

    await loadAddresses();

    if (fromCheckout) {
      navigation.goBack();
    }
  } catch (error: any) {
    console.log('MAKE DEFAULT ERROR:', error);

    Alert.alert(
      'Error',
      error?.message || 'Failed to update default address.'
    );
  }
};

 const deleteAddress = (indexToDelete: number) => {
  Alert.alert(
    'Delete Address',
    'Are you sure you want to delete this address?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const address = addresses[indexToDelete];

            if (!address?.id) {
              Alert.alert('Error', 'Address ID is missing.');
              return;
            }

            await deleteAddressApi(Number(address.id));

            await loadAddresses();
          } catch (error: any) {
            console.log('DELETE ADDRESS ERROR:', error);

            Alert.alert(
              'Error',
              error?.message || 'Failed to delete address.'
            );
          }
        },
      },
    ]
  );
};

  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED BRAND HEADER MATCHING AddAddressScreen */}
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
      <Text style={[styles.titleCenter, addresses.length === 0 && styles.titleCenterEmpty]}>
        My Addresses
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {addresses.map((item, index) => (
  <View key={item.id ?? index} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.homeTag}>
  {item.address_type === 'Home'
    ? '🏠 Home'
    : item.address_type === 'Office'
    ? '🏢 Office'
    : '📍 Other'}
</Text>
              {item.is_default && (
                <Text style={styles.defaultTag}>✓ Default</Text>
              )}
            </View>
            {!!item.full_name && (
  <Text style={styles.name}>
    {item.full_name}
  </Text>
)}

{!!item.address_line1 && (
  <Text style={styles.address}>
    {item.address_line1}
    {item.address_line2
      ? `, ${item.address_line2}`
      : ''}
    {item.city
      ? `, ${item.city}`
      : ''}
    {item.state
      ? `, ${item.state}`
      : ''}
    {item.postal_code
      ? ` - ${item.postal_code}`
      : ''}
  </Text>
)}

{!!item.phone && (
  <Text style={styles.mobile}>
    {item.phone}
  </Text>
)}

            <View style={styles.cardActionsRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddAddress', {
                  editData: item,
                   })
                }
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAddress(index)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>

              {!item.is_default && (
                <TouchableOpacity onPress={() => makeDefault(index)}>
                  <Text style={styles.defaultText}>Make Default</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddAddress', {
              editData: null,
            })
          }
        >
          <Text style={styles.addText}>+ Add New Address</Text>
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

  titleCenterEmpty: {
    marginBottom: 5,
  },

  /* Content & Card Styles */
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  homeTag: {
    backgroundColor: '#F5E6DD',
    color: '#A84B21',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: '700',
    fontSize: 12,
  },

  defaultTag: {
    color: 'green',
    fontWeight: '700',
    fontSize: 13,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  address: {
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },

  mobile: {
    marginTop: 4,
    fontWeight: '600',
    color: '#444',
  },

  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  edit: {
    color: '#A84B21',
    marginRight: 20,
    fontWeight: '700',
  },

  delete: {
    color: 'red',
    fontWeight: '700',
  },

  defaultText: {
    color: 'green',
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 14,
  },

  addButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  addText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});