import React, {FC, useEffect} from 'react';
import styled from 'styled-components/native';
import {EditContactLogic} from './EditContactLogic';
import {background, primary} from '../../config/colors';
import ActionButton from '../../components/ActionButton';
import InputField from '../../components/InputField';

export interface CreateContactProps {
  navigation: any;
}

const EditContact: FC<CreateContactProps> = ({navigation}) => {
  const {name, email, phoneNumber, handleChange, onSave, setContact} =
    EditContactLogic();
  const contact = navigation.state.params.contact;
  const index = navigation.state.params.index;

  useEffect(() => {
    setContact(navigation);
  }, []);

  return (
    <Container>
      <DpView>
          {contact.picture == '' ? (
            <BigTxt>{contact.name.charAt(0)}</BigTxt>
          ) : (
            <Dp source={{uri: contact.picture}} />
          )}
        </DpView>
      <InputField
        label="Name"
        value={name}
        labelWidth={40}
        onChangeText={text => handleChange(text, 'name')}
        testID="edit-name"
        accessLabel="Edit contact name"
      />
      <InputField
        label="Phone Number"
        value={phoneNumber}
        labelWidth={93}
        onChangeText={text => handleChange(text, 'phoneNumber')}
        testID="edit-number"
        accessLabel="Edit contact phone number"
      />
      <InputField
        label="Email"
        value={email}
        labelWidth={35}
        onChangeText={text => handleChange(text, 'email')}
        testID="edit-email"
        accessLabel="Edit contact email"
      />
      <ActionButton
        testID="save-edit-btn"
        title="Save"
        onPress={() => onSave(contact, navigation, index)}
        accessLabel="Save edited contact"
      />
    </Container>
  );
};

export default EditContact;

const Container = styled.View`
  align-items: center;
  flex: 1;
  background: ${background.main};
`;

const DpView = styled.View`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  background: ${primary.light};
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

// Image
const Dp = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`;

const BigTxt = styled.Text`
  color: ${primary.text};
  font-weight: bold;
  font-size: 45px;
`;
