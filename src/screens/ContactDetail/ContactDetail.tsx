import React, {FC} from 'react';
import styled from 'styled-components/native';
import {background, primary} from '../../config/colors';
import ActionButton from '../../components/ActionButton';
import {ContactDetailLogic} from './ContactDetailLogic';

export interface ContactDetailProps {
  navigation: any;
}

const ContactDetail: FC<ContactDetailProps> = ({navigation}) => {
  const contact = navigation.state.params.contact;
  const index = navigation.state.params.index;
  const {edit, remove} = ContactDetailLogic();
  return (
    <Container>
      <CardView>
        <DpView>
          {contact.picture == '' ? (
            <BigTxt>{contact.name.charAt(0)}</BigTxt>
          ) : (
            <Dp source={{uri: contact.picture}} />
          )}
        </DpView>
        <NameTxt
          accessible={true}
          accessibilityLabel={contact.name}
          testID="contact-name">
          {contact.name}
        </NameTxt>
        <PhoneTxt
          accessible={true}
          accessibilityLabel={contact.phoneNumber}
          testID="contact-number">
          {contact.phoneNumber}
        </PhoneTxt>
        <PhoneTxt
          accessible={true}
          accessibilityLabel={contact.email}
          testID="contact-email">
          {contact.email}
        </PhoneTxt>
      </CardView>
      <ActionButton
        testID="edit-btn"
        title="Edit Contact"
        onPress={() => edit(contact, navigation, index)}
        accessLabel="Edit contact"
      />
      <ActionButton
        testID="delete-btn"
        title="Delete Contact"
        onPress={() => remove(index, navigation, contact.name)}
        accessLabel="Delete contact"
      />
    </Container>
  );
};

export default ContactDetail;

// Views
const Container = styled.View`
  align-items: center;
  flex: 1;
  padding-top: 100px;
  background: ${background.main};
`;

const CardView = styled.View`
  height: 200px;
  width: 90%;
  background: ${background.light};
  border-radius: 30px;
  margin-top: 5px;
  align-items: center;
`;

const DpView = styled.View`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  background: ${primary.light};
  margin-top: -50px;
  justify-content: center;
  align-items: center;
`;

// Texts
const NameTxt = styled.Text`
  color: ${primary.text};
  font-weight: bold;
  font-size: 25px;
  margin-top: 10px;
`;

const BigTxt = styled.Text`
  color: ${primary.text};
  font-weight: bold;
  font-size: 45px;
`;

const PhoneTxt = styled.Text`
  color: ${primary.text};
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
`;

// Image
const Dp = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`;
