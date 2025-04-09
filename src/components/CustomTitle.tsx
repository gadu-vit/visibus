import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface CustomTitleProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export default function CustomTitle({ style, ...rest }: CustomTitleProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: 'HankenGrotesk_700Bold', fontSize: 24, color: '#333' }, style]}
    />
  );
}