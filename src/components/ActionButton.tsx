import React, {FC} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {primary, background} from '../config/colors';
import styled from 'styled-components/native';

export interface ActionButtonProps {
  height?: number;
  title: string;
  loading?: boolean;
  onPress: () => void;
  style?: object;
  color?: string;
  width?: string;
  testID: string;
  accessLabel?: string,
  inactive?: boolean
}

const ActionButton: FC<ActionButtonProps> = ({
  height = 45,
  title = '',
  loading = false,
  color = background.main,
  onPress = () => null,
  style = {},
  width = '80%',
  testID,
  accessLabel="",
  inactive = false
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessible={true}
      accessibilityLabel={accessLabel}
      style={{
        width,
        height,
        marginTop: 15,
        backgroundColor: inactive ? background.main : primary.main,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: primary.text,
        borderWidth: inactive ? 0.2 : 0,
        shadowColor: primary.light,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.41,

        elevation: 2,
        ...style,
      }}
      disabled={inactive}
      onPress={() => {
        if (!loading) onPress();
      }}>
      {loading ? (
        <ActivityIndicator size="small" animating color={color} />
      ) : (
        <Text style={{color: inactive ? primary.text : color}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;

const Text = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
