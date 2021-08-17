import React, {FC} from 'react';
import styled from 'styled-components/native';
import {background, primary} from '../config/colors';

export interface ListViewProps {
  name: string;
  uri: string;
}

const ListView: FC<ListViewProps> = ({name, uri}) => {
  return (
    <Container testID="contact-item">
      <CircularView>
        {uri == '' ? (
          <Text style={{fontWeight: 'bold'}}>{name.charAt(0)}</Text>
        ) : (
          <Dp source={{uri}} />
        )}
      </CircularView>
      <Text>{name}</Text>
    </Container>
  );
};

export default ListView;

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  height: 52px;
  width: 90%;
  padding-left: 3%;
  background: ${background.light};
  border-radius: 5px;
  margin-top: 10px;
`;

const CircularView = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: ${primary.light};
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${primary.text};
  font-size: 18px;
  margin-left: 3%;
  font-weight: 500;
`;

const Dp = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 18px;
`;
