import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface CustomButtonTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export default function CustomButtonText({ style, ...rest }: CustomButtonTextProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: 'HankenGrotesk_700Bold', fontSize: 18, color: '#000' }, style]}
    />
  );
}