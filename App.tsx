import {
  AuthProvider,
} from './src/context/AuthContext';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {CartProvider} from './src/context/CartContext';

export default function App() {
  return (
  <AuthProvider>  
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  </AuthProvider>  
  );
}