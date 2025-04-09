import React from 'react';
import { TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export default function CustomTextInput({ style, ...rest }: CustomTextInputProps) {
  return (
    <TextInput
      {...rest}
      style={[{ fontFamily: 'HankenGrotesk_400Regular' }, style]}
    />
  );
}