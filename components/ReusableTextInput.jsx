import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const ReusableTextInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ReusableTextInput;
