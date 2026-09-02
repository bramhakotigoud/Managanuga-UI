import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import {
  updateUsername,
  changePassword,
} from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOrders} from '../services/orderService';
import {getUnreadCount} from '../services/notificationService';
import {getAddresses} from '../services/addressService';
import {
  View,
  Text,
  TouchableOpacity,
  Share,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
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
  Camera,
} from 'lucide-react-native';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  uploadProfileImage,
  getProfileImageUrl,
  deleteProfileImage,
} from '../services/userDocumentService';


export default function ProfileScreen({ navigation }: any) {
  const { isLoggedIn, user, logout, updateUser } = useAuth();
  const isFocused = useIsFocused();
   const [showNamePopup, setShowNamePopup] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
const [addressCount, setAddressCount] = useState(0);
const [showChangePassword, setShowChangePassword] = useState(false);

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

const [changingPassword, setChangingPassword] = useState(false);
const [profileImage, setProfileImage] = useState<string | null>(null);
const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

const loadProfileImage = async () => {
  if (!user?.id) {
    setProfileImage(null);
    return;
  }

  try {
   const imageUrl = getProfileImageUrl(user.id);

    const response = await fetch(imageUrl);

    if (response.ok) {
      // Cache-busting so the newly uploaded image appears immediately
      setProfileImage(
        `${imageUrl}?t=${Date.now()}`
      );
    } else {
      setProfileImage(null);
    }
  } catch (error) {
    console.log('PROFILE IMAGE LOAD ERROR:', error);
    setProfileImage(null);
  }
};

  useEffect(() => {
  if (isLoggedIn && user?.requiresName === true) {
    setShowNamePopup(true);
  }
}, [isLoggedIn, user]);

useEffect(() => {
  if (isFocused && isLoggedIn) {
    loadAddressCount();
    loadOrderCount();
    loadNotificationCount();
    loadProfileImage();
  }
}, [isFocused, isLoggedIn, user?.id]);

const loadAddressCount = async () => {
  if (!user?.id) {
    setAddressCount(0);
    return;
  }

  try {
    const response = await getAddresses(user.id);

    console.log('PROFILE ADDRESSES RESPONSE:', response);

    if (response?.success) {
      setAddressCount(
        Array.isArray(response.data)
          ? response.data.length
          : 0,
      );
    } else {
      setAddressCount(0);
    }
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
  user.login_id
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

const loadNotificationCount = async () => {
  if (!user?.id) {
    setNotificationCount(0);
    return;
  }

  try {
    const response = await getUnreadCount(user.id);

    setNotificationCount(
      response?.success ? response.count || 0 : 0,
    );
  } catch (error) {
    console.log('NOTIFICATION COUNT ERROR:', error);
    setNotificationCount(0);
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
  const handleProfileImagePress = () => {
  const options: any[] = [
    {
      text: 'Camera',
      onPress: () => openCamera(),
    },
    {
      text: 'Photo Library',
      onPress: () => openGallery(),
    },
  ];

  // Show delete ONLY if an existing profile image is present
  if (profileImage) {
    options.push({
      text: 'Delete Profile Image',
      style: 'destructive',
      onPress: () => handleDeleteProfileImage(),
    });
  }

  options.push({
    text: 'Cancel',
    style: 'cancel',
  });

  Alert.alert(
    'Profile Photo',
    'Choose an option',
    options,
  );
};
const handleDeleteProfileImage = () => {
  Alert.alert(
    'Delete Profile Image',
    'Are you sure you want to remove your profile image?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: confirmDeleteProfileImage,
      },
    ],
  );
};
const confirmDeleteProfileImage = async () => {
  if (!user?.id) {
    Alert.alert(
      'Error',
      'User information is missing.',
    );
    return;
  }

  try {
    setUploadingProfileImage(true);

    await deleteProfileImage(user.id);

    // Remove the image immediately from the UI
    setProfileImage(null);

   
    
  } catch (error: any) {
    console.error(
      'DELETE PROFILE IMAGE ERROR:',
      error,
    );

    Alert.alert(
      'Delete Failed',
      error?.message ||
        'Unable to delete your profile image.',
    );
  } finally {
    setUploadingProfileImage(false);
  }
};
const openCamera = async () => {
  try {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      console.log(
        'CAMERA ERROR:',
        result.errorCode,
        result.errorMessage,
      );

      Alert.alert(
        'Camera Error',
        result.errorMessage || 'Unable to open camera.',
      );

      return;
    }

    const asset = result.assets?.[0];

    if (!asset?.uri) {
      return;
    }

    await uploadSelectedProfileImage(
      asset.uri,
      asset.type || 'image/jpeg',
    );
  } catch (error) {
    console.error('CAMERA ERROR:', error);

    Alert.alert(
      'Error',
      'Unable to take profile photo.',
    );
  }
};
const openGallery = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      console.log(
        'GALLERY ERROR:',
        result.errorCode,
        result.errorMessage,
      );

      Alert.alert(
        'Photo Library Error',
        result.errorMessage || 'Unable to open photo library.',
      );

      return;
    }

    const asset = result.assets?.[0];

    if (!asset?.uri) {
      return;
    }

    await uploadSelectedProfileImage(
      asset.uri,
      asset.type || 'image/jpeg',
    );
  } catch (error) {
    console.error('GALLERY ERROR:', error);

    Alert.alert(
      'Error',
      'Unable to select profile photo.',
    );
  }
};
const uploadSelectedProfileImage = async (
  uri: string,
  mimeType: string,
) => {
  if (!user?.id) {
    Alert.alert(
      'Error',
      'User information is missing.',
    );
    return;
  }

  try {
    setUploadingProfileImage(true);

   await uploadProfileImage(
  user.id,
  uri,
  mimeType,
);

    // Refresh image from backend
    await loadProfileImage();
  } catch (error: any) {
    console.error(
      'PROFILE IMAGE UPLOAD ERROR:',
      error,
    );

    Alert.alert(
      'Upload Failed',
      error?.message ||
        'Unable to update your profile photo.',
    );
  } finally {
    setUploadingProfileImage(false);
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
        
       <View style={styles.avatarWrapper}>
  <View style={styles.avatar}>
    {profileImage ? (
      <Image
        source={{uri: profileImage}}
        style={styles.avatarImage}
        resizeMode="cover"
      />
    ) : (
      <Text style={styles.avatarText}>👤</Text>
    )}

    {uploadingProfileImage && (
      <View style={styles.avatarLoading}>
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      </View>
    )}
  </View>

  <TouchableOpacity
    style={styles.cameraButton}
    onPress={handleProfileImagePress}
    disabled={uploadingProfileImage}
    activeOpacity={0.8}
  >
    <Camera
      size={16}
      color="#ffffff"
      strokeWidth={2.5}
    />
  </TouchableOpacity>
</View>

        <Text style={styles.name}>{user?.username || 'User'}</Text>

        <Text style={styles.mobile}>
          {`+91 ${user?.mobile || user?.mobile_no || ''}`}
        </Text>
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{orderCount}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{notificationCount}</Text>
            <Text style={styles.statLabel}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AddressList')}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{addressCount}</Text>
            <Text style={styles.statLabel}>Addresses</Text>
          </TouchableOpacity>
        </View>
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
          onPress={() => setShowChangePassword(true)}>
          <Text style={styles.menuText}>Change Password</Text>
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

<TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('DeleteAccount')}>
  <Text style={styles.menuText}>
    Delete Account
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
   

