import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import {sendOtp, verifyOtp} from '../services/authService';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

import ProductItem from '../components/ProductItem';

const LoginScreen = () => {
  const {login} = useAuth();
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loginType, setLoginType] = useState<'user' | 'admin' | null>(null);
    const [adminId, setAdminId] = useState('');
    const [adminPassword, setAdminPassword] = useState('')
    const navigation = useNavigation();
    const route = useRoute<any>();
    useEffect(() => {
  navigation.getParent()?.setOptions({
    tabBarStyle: { display: 'none' },
  });

  return () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        height: 70,
        paddingTop: 8,
        paddingBottom: 8,
      },
    });
  };
}, []);
    

    
  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.background}
      imageStyle={styles.bgImage}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>

          <Text style={styles.subHeading}>
            Sign in to your Mana Ganuga account
          </Text>
          <View style={styles.loginTypeContainer}>
            <TouchableOpacity
             style={[
               styles.loginTypeButton,
               loginType === 'user' && styles.activeLoginType,
               ]}
               onPress={() => setLoginType('user')}>
               <Text
                style={[
                  styles.loginTypeText,
                  loginType === 'user' && styles.activeLoginTypeText,
                ]}>
                User
               </Text>
              </TouchableOpacity>
              <TouchableOpacity
               style={[
                styles.loginTypeButton,
                loginType === 'admin' && styles.activeLoginType,
                ]}
                onPress={() => setLoginType('admin')}>
                <Text
                style={[
                 styles.loginTypeText,
                 loginType === 'admin' && styles.activeLoginTypeText,
                 ]}>
                 Admin
                </Text>
               </TouchableOpacity>
              </View>

          {loginType === 'user' && (
            <>
            <TextInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={(text) => {
              setMobile(text.replace(/[^0-9]/g, ''));
             }}
             maxLength={10}
            placeholderTextColor="#888"
            style={styles.input}
          />
          {otpSent && (
            <TextInput
              placeholder="Enter OTP"
              keyboardType="number-pad"
               value={otp}
               onChangeText={setOtp}
               maxLength={6}
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
            />
          )}
          <TouchableOpacity
           style={styles.loginButton}
           onPress={async () => {
  try {
    if (!otpSent) {
      const response = await sendOtp(mobile);

      Alert.alert("OTP Sent", response.message);

      if (response.message === "OTP sent successfully") {
        setOtpSent(true);
      }
    } else {
      const response = await verifyOtp(mobile, otp);

      Alert.alert("Verification", response.message);

      if (response.token) {
        login(
          response.token,
          response.user);

        if (route.params?.fromCart) {
          navigation.navigate('Cart' as never);
        } else {
          navigation.navigate('Home' as never);
        }
      }
    }
  } catch (err) {
    console.log(err);
    Alert.alert("Error", "Something went wrong");
  }
}}
           
          >
          <Text style={styles.loginButtonText}>
            {otpSent ? 'LOGIN' : 'SEND OTP'}
          </Text>
          </TouchableOpacity>
           
          <TouchableOpacity>
            <Text style={styles.guest}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
          </>
          )}
        
        {loginType === 'admin' && (
  <>
    <TextInput
      placeholder="Admin ID"
      value={adminId}
      onChangeText={setAdminId}
      placeholderTextColor="#888"
      style={styles.input}
    />

    <TextInput
      placeholder="Password"
      value={adminPassword}
      onChangeText={setAdminPassword}
      secureTextEntry
      placeholderTextColor="#888"
      style={styles.input}
    />

    <TouchableOpacity
      style={styles.loginButton}
      onPress={() => {
        if (adminId === 'admin' && adminPassword === '123456') {
          navigation.navigate('AdminDashboard' as never);
        } else {
          Alert.alert('Error', 'Invalid Admin Credentials');
        }
      }}>
      <Text style={styles.loginButtonText}>
        LOGIN
      </Text>
    </TouchableOpacity>
  </>
)}
</View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Powered by APFDC
          </Text>

          
        </View>

      </ScrollView>

    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  bgImage: {
    opacity: 0.88,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 18,
    marginTop: 20,
    padding: 18,
    borderRadius: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D341F',
  },

  subHeading: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 18,
  },

  input: {
    height: 50,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7D9C1',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },

  forgot: {
    textAlign: 'right',
    color: '#A84B21',
    marginBottom: 15,
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#A84B21',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  guest: {
    textAlign: 'center',
    marginTop: 15,
    color: '#2D341F',
    fontWeight: '600',
  },

  productTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#2D341F',
    marginTop: 20,
    marginBottom: 12,
  },

  oilsWrapper: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    marginHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 15,
  },

  productContainer: {
    paddingHorizontal: 10,
  },

  

  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  footerTitle: {
    color: '#2D341F',
    fontSize: 15,
    fontWeight: '700',
  },

  footerSub: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  loginTypeContainer: {
  flexDirection: 'row',
  marginBottom: 20,
  backgroundColor: '#F4F1EA',
  borderRadius: 14,
  padding: 4,
},

loginTypeButton: {
  flex: 1,
  paddingVertical: 12,
  alignItems: 'center',
  borderRadius: 10,
},

activeLoginType: {
  backgroundColor: '#A84B21',
},

loginTypeText: {
  fontWeight: '600',
  color: '#555',
},

activeLoginTypeText: {
  color: '#FFF',
},
});