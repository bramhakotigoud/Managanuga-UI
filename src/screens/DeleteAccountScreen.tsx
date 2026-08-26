import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {
  CircleChevronLeft,
  ChevronDown,
  Check,
} from 'lucide-react-native';

import {useAuth} from '../context/AuthContext';
import Config from '../config';
import styles from '../styles/DeleteAccountStyles';

export default function DeleteAccountScreen({navigation}: any) {
    const {user, logout} = useAuth();
  const [reason, setReason] = useState('');
  const [showReasons, setShowReasons] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const reasons = [
    'I no longer use Mana Ganuga',
    'I created another account',
    'Privacy concerns',
    'I am not satisfied with the service',
    'Other',
  ];

  const handleDeleteAccount = () => {
  if (!reason) {
    Alert.alert(
      'Reason Required',
      'Please select a reason for deleting your account.',
    );
    return;
  }

  if (!accepted) {
    Alert.alert(
      'Confirmation Required',
      'Please confirm that you understand the consequences of deleting your account.',
    );
    return;
  }

  Alert.alert(
    'Permanently Delete Account',
    'This action cannot be undone. Your account and associated data may be permanently removed. Are you sure you want to continue?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete Account',
        style: 'destructive',
        onPress: handleAccountDeletion,
      },
    ],
  );
};

 const handleAccountDeletion = async () => {
  try {
    if (!user?.id) {
      Alert.alert(
        'Error',
        'Unable to identify your account. Please login again.',
      );
      return;
    }

    const response = await fetch(
      `${Config.API_BASE_URL}/auth/delete-account`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || 'Failed to delete account',
      );
    }

    // Clear local login/session
    await logout();

    // Navigate to Login screen
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  } catch (error: any) {
    console.error('DELETE ACCOUNT ERROR:', error);

    Alert.alert(
      'Unable to Delete Account',
      error?.message ||
        'Something went wrong. Please try again.',
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <CircleChevronLeft
            size={25}
            color="#000"
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
        contentContainerStyle={styles.content}>

        {/* Reason */}
        <Text style={styles.question}>
          I want to delete my account because
        </Text>

        <TouchableOpacity
          style={styles.reasonSelector}
          onPress={() => setShowReasons(!showReasons)}>

          <Text
            style={[
              styles.reasonText,
              !reason && styles.placeholderText,
            ]}>
            {reason || 'Select a reason'}
          </Text>

          <ChevronDown
            size={21}
            color="#777"
            strokeWidth={2}
          />
        </TouchableOpacity>

        {showReasons && (
          <View style={styles.reasonList}>
            {reasons.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.reasonItem}
                onPress={() => {
                  setReason(item);
                  setShowReasons(false);
                }}>

                <Text style={styles.reasonItemText}>
                  {item}
                </Text>

              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Permanent deletion information */}
        <Text style={styles.sectionTitle}>
          Before you delete your account
        </Text>

        <Text style={styles.paragraph}>
          Deleting your Mana Ganuga account is permanent. Once
          your account is deleted, you will no longer be able to
          access this account.
        </Text>

        <Text style={styles.paragraph}>
          Your profile information, saved addresses, preferences,
          and other account-related data may be permanently
          removed.
        </Text>

        <Text style={styles.paragraph}>
          You may also lose access to your account history and
          other information associated with this account.
        </Text>

        <Text style={styles.paragraph}>
          Please make sure that you have completed any pending
          orders, payments, refunds, or other activities before
          deleting your account.
        </Text>

        {/* Important information */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            Important
          </Text>

          <Text style={styles.bullet}>
            • Account access will be permanently removed.
          </Text>

          <Text style={styles.bullet}>
            • Saved addresses and profile information may be lost.
          </Text>

          <Text style={styles.bullet}>
            • You may lose access to account-related information.
          </Text>

          <Text style={styles.bullet}>
            • Make sure there are no pending orders or payments.
          </Text>

          <Text style={styles.bullet}>
            • You can create a new account later using OTP
              verification.
          </Text>
        </View>

        {/* Confirmation checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.8}>

          <View
            style={[
              styles.checkbox,
              accepted && styles.checkboxChecked,
            ]}>

            {accepted && (
              <Check
                size={16}
                color="#fff"
                strokeWidth={3}
              />
            )}

          </View>

          <Text style={styles.checkboxText}>
            I understand that deleting my account is permanent
            and my account data may be lost.
          </Text>

        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          style={[
            styles.deleteButton,
            !accepted && styles.deleteButtonDisabled,
          ]}
          onPress={handleDeleteAccount}
          disabled={!accepted}>

          <Text
            style={[
              styles.deleteButtonText,
              !accepted && styles.deleteButtonTextDisabled,
            ]}>
            DELETE MY ACCOUNT
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}