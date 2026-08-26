import React from 'react';
import styles from '../styles/AdminDashboard.styles';
import {View, Text} from 'react-native';

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ManaGanuga Admin Dashboard</Text>
      <Text>Welcome Admin</Text>
    </View>
  );
};

export default AdminDashboard;

