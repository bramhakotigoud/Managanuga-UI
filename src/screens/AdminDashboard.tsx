import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ManaGanuga Admin Dashboard</Text>
      <Text>Welcome Admin</Text>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});