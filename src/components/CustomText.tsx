import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export default function CustomText({ style, ...rest }: CustomTextProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: 'HankenGrotesk_400Regular' }, style]}
    />
  );
}
