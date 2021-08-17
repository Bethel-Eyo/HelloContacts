import 'react-native';
import React from 'react';
import {render, fireEvent } from '@testing-library/react-native';
import store from '../src/store';
import {Provider} from 'react-redux';
import '@testing-library/jest-native/extend-expect';
import EditContact from '../src/screens/EditContact/EditContact';
import { myContacts } from '../src/config/constants';
import { ActionType } from '../src/store/types';

let container: any = null;

const mockedContact = {
  id: '1',
  name: 'Jaiye thomas',
  email: 'tom@gmail.com',
  phoneNumber: '+43493023902',
  picture: '',
};

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    state: {
      params: {
        contact: mockedContact,
        index: 0
      },
    },
  },
  ...props,
});

describe('Edit Contact Screen', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps({});
    container = render(
      <Provider store={store}>
        <EditContact {...props} />
      </Provider>
    );
  });

  test('Should automatically populate Name input field with contact name to be edited', () => {
    let name = container.getByTestId('edit-name');
    expect(name).toBeTruthy();
    expect(name.props.value).toEqual("Jaiye thomas");
  });

  test('Should automatically populate phone number input with contact number to be edited', () => {
    let number = container.getByTestId('edit-number');
    expect(number).toBeTruthy();
    expect(number.props.value).toEqual("+43493023902");
  });

  test('Should automatically populate email input with contact email to be edited', () => {
    let email = container.getByTestId('edit-email');
    expect(email).toBeTruthy();
    expect(email.props.value).toEqual("tom@gmail.com");
  });

  // Edit functionality is Mocked because test does not have access to native Permissions
  test('Should edit contact item', () => {
    let saveBtn = container.getByTestId('save-edit-btn');
    expect(saveBtn).toBeTruthy();

    // get input fields
    let name = container.getByTestId('edit-name');
    let email = container.getByTestId('edit-email');
    let number = container.getByTestId('edit-number');

    // get index from navigation params
    let { index } = props.navigation.state.params;
    let editedContact = myContacts[index];
    editedContact.name = name.props.value
    editedContact.email = email.props.value
    editedContact.phoneNumber = number.props.value
    myContacts[index] = editedContact;
    // console.log(myContacts);
    store.dispatch({
      type: ActionType.SET_CONTACTS,
      payload: myContacts
    });
    let state = store.getState().contact;
    // Initial name was "Tom Cruise"
    expect(state.contacts[index].name).toEqual("Jaiye thomas");
  });
})