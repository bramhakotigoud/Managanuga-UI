import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import {
  updateUsername,
  changePassword,
} from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOrders} from '../services/orderService';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';


export default function ProfileScreen({ navigation }: any) {
  const { isLoggedIn, user, logout, updateUser } = useAuth();
  const isFocused = useIsFocused();
   const [showNamePopup, setShowNamePopup] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
const [addressCount, setAddressCount] = useState(0);
const [showChangePassword, setShowChangePassword] = useState(false);

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

const [changingPassword, setChangingPassword] = useState(false);
  useEffect(() => {
  if (isLoggedIn && user?.requiresName === true) {
    setShowNamePopup(true);
  }
}, [isLoggedIn, user]);

useEffect(() => {
  if (isFocused && isLoggedIn) {
    loadAddressCount();
    loadOrderCount();
  }
}, [isFocused, isLoggedIn, user?.id]);

const loadAddressCount = async () => {
  try {
    const data = await AsyncStorage.getItem('addresses');
    const addresses = data ? JSON.parse(data) : [];

    setAddressCount(
      Array.isArray(addresses) ? addresses.length : 0
    );
  } catch (error) {
    console.log('ADDRESS COUNT ERROR:', error);
    setAddressCount(0);
  }
};

const loadOrderCount = async () => {
  if (!user?.id) {
    setOrderCount(0);
    return;
  }

  try {
    const response = await getOrders(
      'USER',
      Number(user.id),
    );

    console.log('PROFILE ORDERS RESPONSE:', response);

    if (response?.success) {
      setOrderCount(
        Array.isArray(response.data)
          ? response.data.length
          : 0,
      );
    } else {
      setOrderCount(0);
    }
  } catch (error) {
    console.log('ORDER COUNT ERROR:', error);
    setOrderCount(0);
  }
};

const handleSaveName = async () => {
  const cleanName = nameInput.trim();

  if (!cleanName) {
    Alert.alert('Name Required', 'Please enter your name.');
    return;
  }

  if (!user?.id) {
    Alert.alert('Error', 'User information is missing.');
    return;
  }

  try {
    setSavingName(true);

    const response = await updateUsername(
      user.id,
      cleanName
    );

    console.log('SAVE NAME RESPONSE:', response);

    if (!response.success) {
      const msg = response.message || `Failed to save your name (status ${response.status}).`;
      console.error('SAVE NAME FAILED:', response);
      Alert.alert('Error', msg);
      return;
    }

    // Update the logged-in user locally
    // so Profile immediately displays the new name.
    const updatedUser = {
      ...user,
      username: cleanName,
      requiresName: false,
    };
    await updateUser(updatedUser);
    setShowNamePopup(false);
    setNameInput('');

    Alert.alert(
      'Welcome!',
      `Nice to meet you, ${cleanName}.`
    );

    // We will update AuthContext with this user
  } catch (error) {
    console.error('SAVE NAME ERROR:', error);

    Alert.alert(
      'Error',
      'Unable to save your name. Please try again.'
    );
  } finally {
    setSavingName(false);
  }
};

  // 🎁 Share Referral Handler
  const handleShareReferral = async () => {
    try {
      await Share.share({
        message:
          'Try 100% pure wood-pressed oils from Mana Ganuga! Download the app here: https://managanuga.com/download?ref=USER123',
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // 1. GUEST USER VIEW
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.guestHeader}>
            <Text style={styles.guestAvatar}>👤</Text>
            <Text style={styles.guestTitle}>Welcome Guest</Text>
            <Text style={styles.guestSubtitle}>
              Login to access orders, wishlist and addresses
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.getParent()?.navigate('Login')}>
            <Text style={styles.buttonText}>Login / Register</Text>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>📦 Track Orders</Text>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>📍 Saved Addresses</Text>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>❤️ Wishlist</Text>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>🔔 Notifications</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 2. LOGGED-IN USER VIEW
  const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    Alert.alert(
      'Validation Error',
      'Please fill all password fields.',
    );
    return;
  }

  if (newPassword.length < 6) {
    Alert.alert(
      'Validation Error',
      'New password must be at least 6 characters.',
    );
    return;
  }

  if (newPassword !== confirmNewPassword) {
    Alert.alert(
      'Validation Error',
      'New passwords do not match.',
    );
    return;
  }

  if (!user?.id) {
    Alert.alert(
      'Error',
      'User information is missing.',
    );
    return;
  }

  try {
    setChangingPassword(true);

    const response = await changePassword(
      user.id,
      currentPassword,
      newPassword,
      confirmNewPassword,
    );

    console.log(
      'CHANGE PASSWORD RESPONSE:',
      response,
    );

    if (!response.success) {
      Alert.alert(
        'Change Password',
        response.message ||
          'Failed to change password.',
      );
      return;
    }

    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

   
  } catch (error) {
    console.error(
      'CHANGE PASSWORD ERROR:',
      error,
    );

    Alert.alert(
      'Error',
      'Unable to change password.',
    );
  } finally {
    setChangingPassword(false);
  }
};
  return (
    <>
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      {/* Scrollable Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <Text style={styles.name}>{user?.username || 'User'}</Text>

        <Text style={styles.mobile}>
          {`+91 ${user?.mobile || user?.mobile_no || ''}`}
        </Text>
        <View style={styles.accountHeader}>
  <Text style={styles.sectionTitle}>Account</Text>

  <TouchableOpacity
  style={styles.changePasswordButton}
  onPress={() => setShowChangePassword(true)}>
  <Text style={styles.changePasswordButtonText}>
    Change Password
  </Text>
</TouchableOpacity>
</View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orderCount}</Text>
<Text style={styles.statLabel}>Orders</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{addressCount}</Text>
<Text style={styles.statLabel}>Addresses</Text>
          </View>
        </View>
<TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Orders')}>
  <Text style={styles.menuText}>My Orders</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AddressList')}>
          <Text style={styles.menuText}>My Addresses</Text>
        </TouchableOpacity>

        {user &&
  !['9347499591', '9494661235', '9848283838'].includes(
    String(user.mobile).replace(/\D/g, '')
  ) && (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate('Subscription')}>
      <Text style={styles.menuText}>Subscription</Text>
    </TouchableOpacity>
  )}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.menuText}> Notifications</Text>
        </TouchableOpacity>

        {/* 🎁 Refer & Earn Option */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleShareReferral}>
          <Text style={styles.menuText}> Refer & Earn</Text>
        </TouchableOpacity>

      
        <TouchableOpacity
  style={styles.menuItem}
  onPress={() =>
    navigation.navigate('LegalScreen', {
      type: 'terms',
    })
  }>
  <Text style={styles.menuText}>
    Terms & Conditions
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.menuItem}
  onPress={() =>
    navigation.navigate('LegalScreen', {
      type: 'privacy',
    })
  }>
  <Text style={styles.menuText}>
    Privacy Policy
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.menuItem}
  onPress={() =>
    navigation.navigate('LegalScreen', {
      type: 'customerCare',
    })
  }>
  <Text style={styles.menuText}>
    Customer Care
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.menuItem}
  onPress={() =>
    navigation.navigate('LegalScreen', {
      type: 'refund',
    })
  }>
  <Text style={styles.menuText}>
    Refund & Cancellation Policy
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.menuItem}
  onPress={() =>
    navigation.navigate('LegalScreen', {
      type: 'shipping',
    })
  }>
  <Text style={styles.menuText}>
    Shipping & Delivery
  </Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
           </ScrollView>
    </SafeAreaView>

    {showNamePopup && (
      <View style={styles.popupOverlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>
            Welcome to Mana Ganuga!
          </Text>

          <Text style={styles.popupSubtitle}>
            Please enter your name
          </Text>

          <TextInput
            style={styles.nameInput}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={nameInput}
            onChangeText={setNameInput}
            autoFocus
          />

          <TouchableOpacity
            style={styles.saveNameButton}
            onPress={handleSaveName}
            disabled={savingName}
          >
            <Text style={styles.saveNameButtonText}>
              {savingName ? 'Saving...' : 'OK'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
{showChangePassword && (
  <View style={styles.passwordOverlay}>
    <View style={styles.passwordModal}>

      <Text style={styles.passwordTitle}>
        Change Password
      </Text>

      <TextInput
        style={styles.passwordInput}
        placeholder="Current Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <TextInput
        style={styles.passwordInput}
        placeholder="New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.passwordInput}
        placeholder="Confirm New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <TouchableOpacity
        style={styles.resetPasswordButton}
        onPress={handleChangePassword}
        disabled={changingPassword}
      >
        <Text style={styles.resetPasswordText}>
          {changingPassword
            ? 'Updating...'
            : 'Reset Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelPasswordButton}
        onPress={() => {
          setShowChangePassword(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        }}
      >
        <Text style={styles.cancelPasswordText}>
          Cancel
        </Text>
      </TouchableOpacity>

    </View>
  </View>
)}
  </>
);
}
   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
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
  button: {
    backgroundColor: '#A84B21',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D341F',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
    color: '#2D341F',
  },
  mobile: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A84B21',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#A84B21',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 10,
    color: '#2D341F',
  },
  guestHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  guestAvatar: {
    fontSize: 70,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  guestSubtitle: {
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  membershipIcon: {
  width: 22,
  height: 22,
  resizeMode: 'contain',
},
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  popupContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D341F',
    textAlign: 'center',
    marginBottom: 8,
  },

  popupSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  nameInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: '#2D341F',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },

  saveNameButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveNameButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  accountHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 15,
},

changePasswordLink: {
  color: '#A84B21',
  fontSize: 13,
  fontWeight: '700',
},

passwordOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 25,
  zIndex: 2000,
},

passwordModal: {
  width: '100%',
  backgroundColor: '#FFF',
  borderRadius: 20,
  padding: 22,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 8,
},

passwordTitle: {
  fontSize: 21,
  fontWeight: '700',
  color: '#2D341F',
  textAlign: 'center',
  marginBottom: 20,
},

passwordInput: {
  height: 50,
  backgroundColor: '#FAFAFA',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 12,
  paddingHorizontal: 15,
  fontSize: 15,
  color: '#222',
  marginBottom: 12,
},

resetPasswordButton: {
  backgroundColor: '#A84B21',
  height: 50,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
},

resetPasswordText: {
  color: '#FFF',
  fontSize: 15,
  fontWeight: '700',
},

cancelPasswordButton: {
  alignItems: 'center',
  marginTop: 14,
},

cancelPasswordText: {
  color: '#666',
  fontSize: 14,
  fontWeight: '600',
},
changePasswordButton: {
  backgroundColor: '#F5E6DD',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 20,
},

changePasswordButtonText: {
  color: '#A84B21',
  fontSize: 12,
  fontWeight: '700',
},
});