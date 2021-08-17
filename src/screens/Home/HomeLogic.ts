import {useState} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addNewContact, Contact, getContacts} from '../../store/action-creators';
import {RootState} from '../../store/reducers';
import { ActionType } from '../../store/types';

export const HomeLogic = () => {
  const { contacts, syncedState } = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch();

  const viewContact = (
    index: number,
    contact: object | Contact,
    navigation: any,
  ) => {
    // go to detail screen
    console.log(contact);
    navigation.navigate('ContactDetail', {contact, index});
  };

  const addContact = (contacts: Array<object>, navigation: any) => {
    // The Inbuilt contact screen comes up which will populate this fields when the user
    // enters them. User can also add photo from the screen
    if (contacts.length == 0) {
      Alert.alert(
        'Sync with Phone Contacts',
        `Please sync with phone contacts to enable you read and write to your contacts`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch(getContacts());
              let data = {
                email: '',
                name: '',
                phoneNumber: '',
              };
              dispatch(addNewContact(data, navigation));
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      let data = {
        email: '',
        name: '',
        phoneNumber: '',
      };
      dispatch(addNewContact(data, navigation));
    }

    // navigation.navigate('CreateContact');
  };

  const getList = () => {
    dispatch(getContacts())
  };

  const sync = () => {
    Alert.alert(
      'Sync with Phone Contacts',
      `This will enable you utilize the full functionalities of this app.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch({
            type: ActionType.SYNC_CONTACTS,
            payload: true
          }),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  return {viewContact, contacts, addContact, getList, syncedState, sync};
};
