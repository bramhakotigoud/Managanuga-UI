import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function AddressListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [addresses, setAddresses] = useState<any[]>([]);
  const fromCheckout = route.params?.fromCheckout;

  // Data loading helper
  const loadAddresses = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('addresses');
      if (data) {
        setAddresses(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading addresses:', error);
    }
  }, []);

  const saveAddresses = async (data: any[]) => {
    try {
      await AsyncStorage.setItem('addresses', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving addresses:', error);
    }
  };

  // Safe focus listener
  useEffect(() => {
    loadAddresses();

    const unsubscribe = navigation.addListener('focus', () => {
      loadAddresses();
    });

    return unsubscribe;
  }, [navigation, loadAddresses]);

  // Handle address saved/edited via route params if passed back
  useEffect(() => {
    const data = route.params?.newAddress;
    const editIndex = route.params?.editIndex;

    if (!data) return;

    const constructed = [
      data.houseNo,
      data.street,
      data.landmark,
      data.city,
      data.state,
    ]
      .filter(Boolean)
      .join(', ');

    const formattedAddress =
      data.address ||
      (constructed
        ? `${constructed}${data.pincode ? ' - ' + data.pincode : ''}`
        : '');

    setAddresses((prev) => {
      let updated: any[];

      if (editIndex !== undefined && editIndex !== null) {
        updated = prev.map((item, index) =>
          index === editIndex
            ? { ...data, address: formattedAddress }
            : item
        );
      } else {
        updated = [
          ...prev,
          {
            ...data,
            isDefault: prev.length === 0,
            address: formattedAddress,
          },
        ];
      }

      saveAddresses(updated);
      return updated;
    });

    navigation.setParams({ newAddress: undefined, editIndex: undefined });
  }, [route.params?.newAddress, route.params?.editIndex]);

  const makeDefault = async (selectedIndex: number) => {
    const updatedAddresses = addresses.map((item, index) => ({
      ...item,
      isDefault: index === selectedIndex,
    }));

    setAddresses(updatedAddresses);
    await saveAddresses(updatedAddresses);

    if (fromCheckout) {
      navigation.goBack();
    }
  };

  const deleteAddress = (indexToDelete: number) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = addresses.filter((_, index) => index !== indexToDelete);

            if (addresses[indexToDelete]?.isDefault && updated.length > 0) {
              updated[0].isDefault = true;
            }

            setAddresses(updated);
            await saveAddresses(updated);
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
      <Text style={[styles.titleCenter, addresses.length === 0 && styles.titleCenterEmpty]}>
        My Addresses
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {addresses.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.homeTag}>
                {item.addressType === 'Home' || item.type === 'Home'
                  ? '🏠 Home'
                  : item.addressType === 'Office' || item.type === 'Office'
                  ? '🏢 Office'
                  : '📍 Other'}
              </Text>
              {item.isDefault && (
                <Text style={styles.defaultTag}>✓ Default</Text>
              )}
            </View>

            {!!item.name && <Text style={styles.name}>{item.name}</Text>}
            {!!item.address && <Text style={styles.address}>{item.address}</Text>}
            {!!item.mobile && <Text style={styles.mobile}>{item.mobile}</Text>}

            <View style={styles.cardActionsRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddAddress', {
                    editData: item,
                    editIndex: index,
                  })
                }
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAddress(index)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>

              {!item.isDefault && (
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
              editIndex: undefined,
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