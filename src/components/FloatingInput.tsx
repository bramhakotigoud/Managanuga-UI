import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FloatingInputProps extends TextInputProps {
  label: string;
}

const FloatingInput = ({
  label,
  value,
  style,
  ...props
}: FloatingInputProps) => {
  const hasValue = Boolean(value && value.length > 0);

  return (
    <View style={styles.container}>
      {hasValue && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        value={value}
        placeholder={hasValue ? '' : label}
        placeholderTextColor="#777"
        style={[
          styles.input,
          hasValue && styles.inputWithLabel,
          style,
        ]}
      />
    </View>
  );
};

export default FloatingInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 12,
  },

  input: {
    backgroundColor: '#FFF',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#222',

    elevation: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  inputWithLabel: {
    paddingTop: 15,
    paddingBottom: 4,
  },

  label: {
    position: 'absolute',
    left: 15,
    top: 6,
    zIndex: 1,

    fontSize: 10,
    color: '#777',
    fontWeight: '500',
  },
});