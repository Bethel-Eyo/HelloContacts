import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ContactDetail from '../src/screens/ContactDetail/ContactDetail';
import store from '../src/store';
import {Provider} from 'react-redux';
import '@testing-library/jest-native/extend-expect';
import { myContacts } from '../src/config/constants';
import { ActionType } from '../src/store/types';

let container: any = null;

const mockedContact = {
  id: '1',
  name: 'Tom Cruise',
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

describe('Contact Detail Screen', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps({});
    container = render(
      <Provider store={store}>
        <ContactDetail {...props} />
      </Provider>
    );
  });

  test('Should display contact name', () => {
    let name = container.getByTestId('contact-name');
    expect(name).toBeTruthy();
    expect(name).toHaveTextContent("Tom Cruise");
  });

  test('Should display contact phone number', () => {
    let phoneNumber = container.getByTestId('contact-number');
    expect(phoneNumber).toBeTruthy();
    expect(phoneNumber).toHaveTextContent("+43493023902");
  });

  test('Should display contact email', () => {
    let email = container.getByTestId('contact-email');
    expect(email).toBeTruthy();
    expect(email).toHaveTextContent("tom@gmail.com");
  });

  test('Should display button and when clicked should navigate to edit screen', () => {
    let editBtn = container.getByTestId('edit-btn');
    expect(editBtn).toBeTruthy();
    fireEvent.press(editBtn);
    // get contact object and index from navigation params
    let { contact, index } = props.navigation.state.params;
    // pass contact and index as params when navigating to edit screen
    expect(props.navigation.navigate).toHaveBeenCalledWith('EditContact', { contact,  index });
  });

  // Delete functionality is Mocked because test does not have access to native Permissions
  test('Should delete Contact Item', () => {
    let deleteBtn = container.getByTestId('delete-btn');
    expect(deleteBtn).toBeTruthy();

    // delete first item from list
    let { index } = props.navigation.state.params;
    myContacts.splice(index, 1);
    store.dispatch({
      type: ActionType.SET_CONTACTS,
      payload: myContacts
    });
    let state = store.getState().contact;
    // initial mocked length was 5
    expect(state.contacts.length).toBe(4);
  });
});
