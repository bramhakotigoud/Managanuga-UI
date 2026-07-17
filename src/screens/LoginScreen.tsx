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

  loginText: {
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
});