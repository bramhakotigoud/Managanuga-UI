import React, {createContext, useContext, useState} from 'react'
import { addCartItem } from "../services/cartService";
const CartContext = createContext<any>(null);

export const CartProvider = ({children}: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);

  const addToCart = async (product: any) => {
  try {
    const response = await addCartItem(product);

    console.log("Cart API:", response);

    if (response.success) {
      const existingItem = cartItems.find(
        item => item.id === product.id,
      );

      if (existingItem) {
        setCartItems(
          cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
    }
  } catch (err) {
    console.log(err);
  }
};


  const removeFromCart = (id: number) => {
    setCartItems(
      cartItems.filter(item => item.id !== id),
    );
  };

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    );
  };

  const saveForLater = (item: any) => {
    setSavedItems([...savedItems, item]);

    setCartItems(
      cartItems.filter(
        cartItem => cartItem.id !== item.id,
      ),
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        saveForLater,
        getCartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};