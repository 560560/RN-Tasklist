import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { TodoInput } from '../components/TodoInput';
import { UndoneTodos } from '../components/Todos';

export const UndoneTodosScreen = ({ renderScreen }) => (
  <View style={styles.container}>
    <UndoneTodos renderScreen={renderScreen} />
    <Shadow viewStyle={styles.shadowView}>
      <TodoInput />
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
