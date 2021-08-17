import React, {FC} from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import {background, primary} from '../config/colors';

interface InputFieldProps {
  keyboardType?: any;
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  placeholderTextColor?: string;
  height?: number;
  width?: string; // in percentage
  label: string;
  labelWidth: number;
  testID: string,
  accessLabel?: string
}

const InputField: FC<InputFieldProps> = ({
  keyboardType = "default",
  onChangeText,
  value,
  placeholder = 'john doe',
  placeholderTextColor = primary.light,
  height = 56,
  width = '80%',
  label = 'Username',
  labelWidth = 58,
  testID,
  accessLabel= ""
}) => {
  return (
    <Container style={{height, width}}>
      <Text
        style={{
          marginLeft: 1,
          marginTop: -11,
          fontSize: 13,
          backgroundColor: background.main,
          width: labelWidth,
          color: primary.text,
        }}>
        {label}
      </Text>
      <TextInput
        style={{width: '100%', height: '100%', marginTop: -6, color: primary.text}}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        autoCompleteType="off"
        testID={testID}
        accessible={true}
        accessibilityLabel={accessLabel}
      />
    </Container>
  );
};

export default InputField;

const Container = styled.View`
  background: ${background.main};
  border: 1px solid ${primary.text};
  border-radius: 8px;
  margin-top: 22px;
  padding-left: 20px;
`;

const Text = styled.Text``;
