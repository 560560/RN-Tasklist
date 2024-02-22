import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { DoneTodos } from '../components/Todos';
import { TodoSearch } from '../components/TodoSearch';

export const DoneTodosScreen = ({ renderScreen }) => (
  <View style={styles.container}>
    <DoneTodos renderScreen={renderScreen} />
    <Shadow viewStyle={styles.shadowView}>
      <TodoSearch />
    </Shadow>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  shadowView: {
    width: '100%',
  },
});
