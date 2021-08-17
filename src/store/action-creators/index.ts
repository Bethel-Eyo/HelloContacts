import {Dispatch} from 'redux';
import {getContactAction} from '../actions';
import {ActionType} from '../types';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  picture: string;
}

type ContactList = Array<Contact>;

interface newContact {
  name: string;
  email: string;
  phoneNumber: string;
}

export const getContacts = () => (dispatch: Dispatch<getContactAction>) => {
  if (Platform.OS == 'ios') {
    Contacts.getAll().then(contacts => {
      // contacts returned
      console.log(contacts[0]);
      // Alert.alert("Contact gotten successfully");
      setContacts(contacts, dispatch);
    });
  } else if (Platform.OS == 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept',
    })
      .then(Contacts.getAll)
      .then(contacts => {
        setContacts(contacts, dispatch)
      });
  }
};

// set contacts to declared contact type of ContactList
const setContacts = (contacts: Array<object>, dispatch: Dispatch<getContactAction>) => {
  let myArr: ContactList = [];
  contacts.forEach(element => {
    myArr.push({
      id: (element as any).recordID,
      name: (element as any).givenName + ' ' + (element as any).familyName,
      email: (element as any).emailAddresses[0]?.email,
      // email: "",
      phoneNumber: (element as any).phoneNumbers[0].number,
      picture: (element as any).thumbnailPath,
    });
  });
  dispatch({
    type: ActionType.SET_CONTACTS,
    payload: myArr,
  });
}

// Add new contact
export const addNewContact = (data: newContact, navigation: any) => (dispatch: Dispatch<any>) => {
  var newPerson = {
    emailAddresses: [{
      label: "work",
      email: data.email,
    }],
    phoneNumbers: [{
      label: 'mobile',
      number: data.phoneNumber,
    }],
    displayName: data.name
  }
  
  Contacts.openContactForm(newPerson).then(contact => {
    // contact has been saved
    dispatch(getContacts());
    // Alert.alert("Contact added successfully");
    navigation.goBack();
  })
}

// update existing contact
export const updateContact = (data: Contact, navigation: any, index: number) => (dispatch: Dispatch<any>) => {
  let nameParts = data.name.split(' ');
  Contacts.getAll().then(contacts => {
    // update the first record
    let someRecord = contacts[index]
    someRecord.emailAddresses[0] = {
      label: "work",
      email: data.email,
    };
    someRecord.phoneNumbers[0] = {
      label: 'mobile',
      number: data.phoneNumber,
    },
    someRecord.givenName = nameParts[0];
    someRecord.familyName = nameParts[1];
    Contacts.updateContact(someRecord).then(() => {
      // record updated
      dispatch(getContacts());
      Alert.alert("Contact updated successfully");
      navigation.navigate("Home");
    })
  })
}

// delete contact by id
export const deleteContactById = (index: number, navigation: any) => (dispatch: Dispatch<any>) => {
  Contacts.getAll().then(contacts => {
    // update the first record
    let someRecord = contacts[index]
    Contacts.deleteContact(someRecord).then(recordId => {
      // contact deleted
      Alert.alert("Contact deleted successfully");
      dispatch(getContacts());
      navigation.goBack();
    })
  })
  
}
