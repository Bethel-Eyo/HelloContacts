import React, {FC, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import ActionButton from '../../components/ActionButton';
import InputField from '../../components/InputField';
import ListView from '../../components/ListView';
import {PlusIcon} from '../../components/SvgImages';
import {background, primary} from '../../config/colors';
import {HomeLogic} from './HomeLogic';

interface HomeProps {
  navigation?: any;
}

const Home: FC<HomeProps> = ({navigation}) => {
  const {
    viewContact,
    contacts,
    addContact,
    getList,
    syncedState,
    sync,
  } = HomeLogic();

  useEffect(() => {
    if (syncedState) {
      getList();
    }
  }, [syncedState]);

  return (
    <Container testID="root">
      <HomeHeader>
        <Title>HelloContacts</Title>
        <Text>
          Smooth Contact Management system: Sync your phone contacts to enable
          you create, update and delete contacts.
        </Text>
      </HomeHeader>
      <ActionButton
        testID="sync-btn"
        title={syncedState ? 'Synced' : 'Sync with phone contacts'}
        onPress={sync}
        accessLabel="Sync button helps you sync phone contacts to HelloContacts app"
        inactive={syncedState}
      />
      <FlatList
        testID="myFlatlist"
        data={contacts}
        renderItem={({item, index}) => (
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={(item as any).name}
            onPress={() => viewContact(index, item, navigation)}>
            <ListView name={(item as any).name} uri={(item as any).picture} />
          </TouchableOpacity>
        )}
        keyExtractor={item => `${(item as any).id}`}
        style={{width: '100%', marginLeft: '10%'}}
        ListEmptyComponent={
          <Text style={{marginTop: 50, fontSize: 20, marginLeft: "5%" }}>
            No Data found, Sync with Phone Contacts
          </Text>
        }
      />
      <FabButton
        accessible={true}
        accessibilityLabel="Add new Contact"
        testID="fab-btn"
        onPress={() => addContact(contacts, navigation)}>
        <PlusIcon />
      </FabButton>
    </Container>
  );
};

export default Home;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 1;
  background: ${background.main};
`;

const HomeHeader = styled.View`
  height: 150px;
  width: 90%;
  background: ${background.light};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: 5px;
  align-items: center;
`;

const FabButton = styled.TouchableOpacity`
  height: 54px;
  width: 54px;
  border-radius: 27px;
  background: ${primary.main};
  position: absolute;
  bottom: 30px;
  right: 30px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${primary.text};
  text-align: center;
  width: 80%;
  margin-top: 5px;
`;

const Title = styled.Text`
  color: ${primary.text};
  font-weight: bold;
  font-size: 30px;
  margin-top: 7%;
`;
