import { createStackNavigator } from 'react-navigation-stack';
import EditContact from '../screens/EditContact/EditContact';
import Home from '../screens/Home/Home';
import { createAppContainer } from 'react-navigation'
import ContactDetail from '../screens/ContactDetail/ContactDetail';
import { background, primary } from '../config/colors';

const navigationOptions = {
  headerShown: false,
}

const AuthNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions,
  },
  EditContact: {
    screen: EditContact,
    navigationOptions: {
      title: 'Edit Contact',
      headerStyle: {
        backgroundColor: background.light,
      },
      headerTintColor: primary.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  ContactDetail: {
    screen: ContactDetail,
    navigationOptions: {
      title: 'Contact Details',
      headerStyle: {
        backgroundColor: background.light,
      },
      headerTintColor: primary.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

const AppContainer = createAppContainer(AuthNavigator);

export default AppContainer;