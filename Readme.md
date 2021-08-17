## Overview

This mobile app was built to help users manage their contacts. Once the app is launched, users can sync their phone contacts to the app, they can view their existing contacts, add new contacts, edit existing contacts and also delete them.

extras: Users can add a contact photo (either take a photo, or select from saved photos on the user's camera roll) to the contact.

## Technologies used
1. React Native: for building powerful apps for android and ios platforms
2. React Hooks: used with functional components.
3. Redux: for state management across the app.
4. jest and @testing-library/react-native: for unit tests.
5. Typescript: A superset of Javascript

## Design Pattern used
I used an architecture similar to MVP (model-view-presenter) architecture.
the model had to do with the data which was in the redux store, the view was the file that has all the jsx properties and the logic had all the functions/methods i.e.
src/screens/Home -> Home.tsx, src/screens/Home -> HomeLogic.ts
src/screens/EditContact -> EditContact.tsx, src/screens/EditContact -> EditContactLogic.ts

## Tests
All test files are found in the __tests__ folder in the root directory