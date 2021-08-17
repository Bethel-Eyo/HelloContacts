import 'react-native';
import React from 'react';
import Home from '../src/screens/Home/Home';
import store from '../src/store';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import { myContacts } from '../src/config/constants';
import { ActionType } from '../src/store/types';
import ListView from '../src/components/ListView';

let container: any = null;

const mockedContactState = {
  contacts: myContacts
}

describe("<Home />", () => {


  beforeEach(async () => {
    store.dispatch({
      type: ActionType.SET_CONTACTS,
      payload: mockedContactState
    });

    container = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    await act(async () => {});
  })


  test('Home renders correctly', () => {
    expect(container.getByTestId('root')).toBeTruthy();
  });
  
  test('should show sync button', () => {
    expect(container.getByTestId('sync-btn')).toBeTruthy();
  });

  test('flatlist is populated with mocked data', () => {
    let flatlist = container.getByTestId('myFlatlist')
    expect(flatlist).toBeTruthy();
    expect(flatlist.props.data).toEqual(mockedContactState);
  });

  // Add functionality is Mocked because test does not have access to native Permissions
  test('should add new contact', () => {
    expect(container.getByTestId('fab-btn')).toBeTruthy();

    let newContact = {
      id: '6',
      name: 'Romelu Lukaku',
      email: 'romelu@gmail.com',
      phoneNumber: '+13493023902',
      picture: '',
    };

    myContacts.push(newContact);
    act(() => {
      store.dispatch({
        type: ActionType.SET_CONTACTS,
        payload: myContacts
      });
    })
    let state = store.getState().contact;
     // initial mocked length was 5
     expect(state.contacts.length).toBe(6);
  });
})



// TODO 2: search input should search mocked array
// TODO 4: on click on fab button, should take to create contact screen