import { useState } from 'react';
import { Contact } from 'react-native-contacts';
import { useSelector, useDispatch } from "react-redux";
import { updateContact } from '../../store/action-creators';
import { RootState } from '../../store/reducers';

export const EditContactLogic = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const dispatch = useDispatch();

  const handleChange = (text: string, type: string) => {
    if(type == "name"){
      setName(text);
    } else if(type == "email"){
      setEmail(text);
    } else if(type == "phoneNumber"){
      setPhoneNumber(text);
    }
  }

  const onSave = (contact: Contact, navigation: any, index: number) => {
    let data = {
      id: "", name, email, phoneNumber, picture: ""
    }
    console.log(data);
    dispatch(updateContact(data, navigation, index));
  }

  const setContact = (navigation: any) => {
    const contact = navigation.state.params.contact;
    setName(contact.name);
    setEmail(contact.email);
    setPhoneNumber(contact.phoneNumber);
  }

  return { name, email, phoneNumber, handleChange, onSave, setContact }
}