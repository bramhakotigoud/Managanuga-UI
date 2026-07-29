import { SafeAreaView } from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ProfileScreen({navigation}: any) {
const {isLoggedIn, user, logout} = useAuth();
  console.log('isLoggedIn =', isLoggedIn);
  if (!isLoggedIn) {
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.guestHeader}>
      <Text style={styles.guestAvatar}>👤</Text>

      <Text style={styles.guestTitle}>
        Welcome Guest
      </Text>

      <Text style={styles.guestSubtitle}>
        Login to access orders, wishlist and addresses
      </Text>
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.getParent()?.navigate('Login')}
    >
      <Text style={styles.buttonText}>
        Login / Register
      </Text>
    </TouchableOpacity>

    <View style={styles.menuItem}>
      <Text>📦 Track Orders</Text>
    </View>

    <View style={styles.menuItem}>
      <Text>📍 Saved Addresses</Text>
    </View>

    <View style={styles.menuItem}>
      <Text>❤️ Wishlist</Text>
    </View>

    <View style={styles.menuItem}>
      <Text>🔔 Notifications</Text>
    </View>

  </SafeAreaView>
  );
}
  return (
    
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>My Profile</Text>

    <View style={styles.avatar}>
  <Text style={styles.avatarText}>👤</Text>
</View>


<Text style={styles.name}>
  {user?.username || "User"}
</Text>

<Text style={styles.mobile}>
  +91 {user?.mobile || user?.mobile_no || ""}
</Text>


<Text style={styles.sectionTitle}>Account</Text>
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>12</Text>
        <Text>Orders</Text>
       </View>

       <View style={styles.statCard}>
         <Text style={styles.statNumber}>4</Text>
         <Text>Wishlist</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text>Addresses</Text>
         </View>
        </View>

    <TouchableOpacity style={styles.menuItem}>
      <Text>My Orders</Text>
    </TouchableOpacity>


    <TouchableOpacity style={styles.menuItem}
      style={styles.menuItem}
      onPress={() => navigation.navigate('AddressList')}>
      <Text>My Addresses</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem}
      style={styles.menuItem}
      onPress={() => navigation.navigate('Wishlist')}>
      <Text>❤️ Wishlist</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem}
      style={styles.menuItem}
      onPress={() => navigation.navigate('Notifications')}>
      <Text>🔔 Notifications</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem}
      style={styles.menuItem}
      onPress={() => navigation.navigate('HelpSupport')}>
      <Text>📞 Help & Support</Text>
    </TouchableOpacity>
    

    <TouchableOpacity
      style={styles.button}
      onPress={logout}>
      <Text style={styles.buttonText}>
        Logout
      </Text>
    </TouchableOpacity>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F4EC',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#A84B21',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
  },

  menuItem: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
  fontSize: 22,
  fontWeight: '700',
  marginBottom: 5,
},

mobile: {
  color: '#666',
  marginBottom: 25,
},
statsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 20,
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
avatar: {
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: '#A84B21',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
},

avatarText: {
  color: '#FFF',
  fontSize: 32,
  fontWeight: '700',
},

sectionTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginTop: 25,
  marginBottom: 10,
  color: '#2D341F',
},

statsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 20,
},

statCard: {
  flex: 1,
  backgroundColor: '#FFF',
  borderRadius: 12,
  padding: 15,
  alignItems: 'center',
  marginHorizontal: 5,
},

statNumber: {
  fontSize: 22,
  fontWeight: '700',
  color: '#A84B21',
},
avatarContainer: {
  alignSelf: 'center',
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: '#F5E6D3',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},

avatar: {
  fontSize: 40,
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
});