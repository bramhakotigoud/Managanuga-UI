import { useAuth } from '../context/AuthContext';
import styles from '../styles/LoginScreen.styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import {
  sendOtp,
  verifyOtp,
  loginWithPassword,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPasswordWithOtp,
} from '../services/authService';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';

const LoginScreen = () => {
  const {login} = useAuth();
  const navigation = useNavigation();
  const route = useRoute<any>();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginMode, setLoginMode] = useState('mobile');
  const [password, setPassword] = useState('');
  const [otpError, setOtpError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
  const [vendorId, setVendorId] = useState<string | null>(null);

  const [resendTimer, setResendTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);

  // Hide bottom tab bar while login screen is open
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    if (route.params?.vendor) {
      console.log('Referral Vendor:', route.params.vendor);
      setVendorId(route.params.vendor);
    }

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
        },
      });
    };
  }, [navigation, route]);

  // OTP resend timer
  useEffect(() => {
    if (loginMode !== 'otp' || !otpSent) {
      return;
    }

    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loginMode, otpSent, resendTimer]);
  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.background}
      imageStyle={styles.bgImage}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Logo */}

        <View style={styles.logoContainer}>

          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />

        </View>

        {/* Login Card */}

        <View style={styles.card}>

          <Text style={styles.heading}>
            Welcome Back
          </Text>

          <Text style={styles.subHeading}>
            Sign in to your Mana Ganuga account
          </Text>

          {/* ======================================
              MOBILE NUMBER
          ====================================== */}

          {loginMode !== 'resetPassword' && (
  <TextInput
    placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={(text) => {

              setMobile(
                text.replace(/[^0-9]/g, '')
              );

            }}
            maxLength={10}
            placeholderTextColor="#888"
            style={styles.input}
          />
          )}

          {/* ======================================
              OTP INPUT
          ====================================== */}

          {loginMode === 'otp' && (

            <TextInput
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={(text) => {

                setOtp(
                  text.replace(/[^0-9]/g, '')
                );

                setOtpError('');

              }}
              maxLength={6}
              placeholderTextColor="#888"
              style={styles.input}
            />

          )}

          {/* OTP ERROR */}

          {loginMode === 'otp' &&
            otpError !== '' && (

              <Text style={styles.errorText}>
                {otpError}
              </Text>

          )}
{loginMode === "otp" && (
  <View style={styles.resendContainer}>
    <Text style={styles.resendText}>
      Didn't receive the OTP?
    </Text>

    {canResend ? (
      <TouchableOpacity
        onPress={async () => {
          try {
            setCanResend(false);
setResendTimer(20);
setOtp("");
setOtpError("");

if (forgotPassword) {

  const response = await sendForgotPasswordOtp(mobile);

  if (!response.success) {
    Alert.alert(
      "Forgot Password",
      response.message || "Failed to resend OTP."
    );

    setCanResend(true);
    setResendTimer(0);

    return;
  }

} else {

  const response = await sendOtp(mobile);

  if (response.existingUser) {
    setLoginMode("password");
    return;
  }

}

            
          } catch (err: any) {
            console.log("Resend OTP Error:", err);

            setCanResend(true);
            setResendTimer(0);

            Alert.alert(
              "Error",
              err?.response?.data?.message ||
                "Failed to resend OTP. Please try again.",
            );
          }
        }}>
        <Text style={styles.resendActive}>
          Resend OTP
        </Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.resendDisabled}>
        Resend in {resendTimer}s
      </Text>
    )}
  </View>
)}

{/* ======================================
    RESET PASSWORD INPUTS
====================================== */}

{loginMode === 'resetPassword' && (
  <>
    <TextInput
      placeholder="New Password"
      placeholderTextColor="#888"
      value={newPassword}
      onChangeText={(text) => {
        setNewPassword(text);
        setOtpError('');
      }}
      secureTextEntry={true}
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.input}
    />

    <TextInput
      placeholder="Confirm Password"
      placeholderTextColor="#888"
      value={confirmPassword}
      onChangeText={(text) => {
        setConfirmPassword(text);
        setOtpError('');
      }}
      secureTextEntry={true}
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.input}
    />

    {otpError !== '' && (
      <Text style={styles.errorText}>
        {otpError}
      </Text>
    )}
  </>
)}

          {/* ======================================
              PASSWORD INPUT
          ====================================== */}

          {loginMode === 'password' && (

            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => {

                // Keep exactly what the user types.
                // Do NOT convert to uppercase/lowercase.
                setPassword(text);

              }}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />

          )}
{loginMode === "password" && (
  <TouchableOpacity
    onPress={() => {
  setForgotPassword(true);
  setOtp("");
  setOtpError("");
  setOtpSent(false);
  setResendTimer(20);
  setCanResend(false);
  setLoginMode("mobile");
  setMobile("");
}}
  >
    <Text style={styles.forgotPasswordText}>
      Forgot Password?
    </Text>
  </TouchableOpacity>
)}

          {/* ======================================
              LOGIN BUTTON
          ====================================== */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
  try {

    // STEP 1 - Enter Mobile
    if (loginMode === "mobile") {

  if (!mobile || mobile.length !== 10) {
    Alert.alert(
      "Invalid Mobile",
      "Please enter a valid 10-digit mobile number."
    );
    return;
  }

  // FORGOT PASSWORD
  if (forgotPassword) {
    console.log("🔐 FORGOT PASSWORD FLOW");
    console.log("📱 Mobile:", mobile);

    const response = await sendForgotPasswordOtp(mobile);

    console.log(
      "🔐 FORGOT PASSWORD RESPONSE:",
      response
    );

    if (!response.success) {
      Alert.alert(
        "Forgot Password",
        response.message || "Unable to send OTP."
      );
      return;
    }

    setOtp("");
setOtpError("");
setOtpSent(true);
setResendTimer(20);
setCanResend(false);
setLoginMode("otp");

    return;
  }

  // NORMAL LOGIN
  const response = await sendOtp(mobile);

  if (response.existingUser) {
    setLoginMode("password");
    return;
  }

  setOtpSent(true);
  setLoginMode("otp");

  return;
}

    // STEP 2 - Verify OTP
    if (loginMode === "otp") {
      if (forgotPassword) {
  const response = await verifyForgotPasswordOtp(
    mobile,
    otp
  );

  console.log(
    "🔐 VERIFY FORGOT PASSWORD OTP RESPONSE:",
    response
  );

  if (!response.success) {
    setOtpError(
      response.message || "Invalid OTP"
    );
    return;
  }

  // OTP is verified.
  // Now show the new password screen.
  setOtpError('');
  setNewPassword('');
  setConfirmPassword('');
  setLoginMode("resetPassword");

  return;
}
      const response = await verifyOtp(mobile, otp,   vendorId);

// Invalid OTP
if (!response.token) {
  setOtpError(response.message || "Please enter a valid OTP");
  return;
}

// Clear previous error
setOtpError("");

// Login successful
login(response.token, {
  ...response.user,
  requiresName: response.requiresName === true,
});

// Vendor Login
if (response.user.role === "VENDOR") {

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "VendorDashboard" as never,
      },
    ],
  });

  return;
}
// Reseller Login
if (response.user.role === "RESELLER") {

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "ResellerDashboard" as never,
      },
    ],
  });

  return;
}

// Customer Login
if (route.params?.fromCart) {

  navigation.navigate("Cart" as never);

} else if (route.params?.fromSubscription) {

  navigation.navigate("Subscription" as never);

} else {

  navigation.navigate("MainTabs" as never);

}

return;
    }

// STEP 3 - RESET PASSWORD
if (loginMode === "resetPassword") {

  if (!newPassword || !confirmPassword) {
    setOtpError("Please enter your new password.");
    return;
  }

  if (newPassword.length < 6) {
    setOtpError(
      "Password must be at least 6 characters."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    setOtpError(
      "Passwords do not match."
    );
    return;
  }

  const response = await resetPasswordWithOtp(
    mobile,
    otp,
    newPassword,
    confirmPassword
  );

  console.log(
    "🔐 RESET PASSWORD RESPONSE:",
    response
  );

  if (!response.success) {
    setOtpError(
      response.message || "Failed to reset password."
    );
    return;
  }

  setOtpError('');
  setPassword('');
  setNewPassword('');
  setConfirmPassword('');
  setOtp('');
  setOtpSent(false);
  setForgotPassword(false);

  Alert.alert(
    "Password Reset",
    "Your password has been reset successfully. Please login with your new password.",
    [
      {
        text: "OK",
        onPress: () => {
          setLoginMode("password");
        },
      },
    ]
  );

  return;
}  
   // STEP 3 - Login with Password
if (loginMode === "password") {

  const response = await loginWithPassword(
    mobile,
    password
  );

  // Login failed
  if (!response.token) {
    Alert.alert(
      "Login Failed",
      response.message || "Invalid password"
    );
    return;
  }

  // Login successful
 login(response.token, response.user);

// Vendor Login
if (response.user.role === "VENDOR") {

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "VendorDashboard" as never,
      },
    ],
  });

  return;
}
// Reseller Login
if (response.user.role === "RESELLER") {

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "ResellerDashboard" as never,
      },
    ],
  });

  return;
}

// Customer Login
if (route.params?.fromCart) {

  navigation.navigate("Cart" as never);

} else if (route.params?.fromSubscription) {

  navigation.navigate("Subscription" as never);

} else {

  navigation.navigate("MainTabs" as never);

}
}

  } catch (err: any) {

    console.log(err);

    Alert.alert(
      "Error",
      err?.response?.data?.message || "Something went wrong"
    );
  }
           
  }}
>
            <Text style={styles.loginButtonText}>
              {
                
                 loginMode === 'mobile'
  ? 'NEXT'
  : loginMode === 'otp'
  ? 'VERIFY OTP'
  : loginMode === 'resetPassword'
  ? 'RESET PASSWORD'
  : 'LOGIN'
              }
            </Text>
          </TouchableOpacity>

          {/* ======================================
              LOGIN AGAIN
              SAME AS OLD CODE
          ====================================== */}

          {loginMode === 'otp' &&
            otpError !== '' && (

              <TouchableOpacity
                onPress={() => {

  setMobile('');
  setOtp('');
  setPassword('');
  setOtpSent(false);
  setOtpError('');
  setForgotPassword(false);
  setResendTimer(20);
  setCanResend(false);
  setLoginMode('mobile');

}}
              >

                <View
                  style={styles.loginAgainButton}
                >

                  <Text
                    style={styles.loginAgainText}
                  >
                    Login
                  </Text>

                </View>

              </TouchableOpacity>

          )}

        </View>

      </ScrollView>

    </ImageBackground>
  );
};

export default LoginScreen;

