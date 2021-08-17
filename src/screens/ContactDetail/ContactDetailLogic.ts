import { useState } from 'react';
import {  Contact, deleteContactById } from '../../store/action-creators';
import { useSelector, useDispatch } from "react-redux";
import { Alert } from 'react-native';

export const ContactDetailLogic = () => {
  const dispatch = useDispatch();

  const edit = (contact: Contact, navigation: any, index: number) => {
    navigation.navigate("EditContact", { contact, index })
  }

  const remove = (index: number, navigation: any, name: string) => {
    Alert.alert(
      'Delete Contact',
      `Do you want to delete ${name}'s contact?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(deleteContactById(index, navigation))
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  return { edit, remove }
}