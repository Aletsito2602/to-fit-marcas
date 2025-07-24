import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor="#A0A0A0"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 25,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
    fontFamily: 'System',
  },
});

export default CustomTextInput;