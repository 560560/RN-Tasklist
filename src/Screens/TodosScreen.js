import React, { useEffect } from 'react';
import Todos from '../Components/Todos/Todos';
import { StyleSheet, View, Text } from 'react-native';
import { TodoInput } from '../Components/TodoInput/TodoInput';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

const TodosScreen = ({ renderScreen }) => {
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config?.mainTextColor, isEqual);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 60,
    },
    titleWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: 50,
      borderTopWidth: 1,
      borderTopColor: '#9f9f9f',
      backgroundColor: mainColor,
    },

    title: {
      textAlign: 'center',
      fontSize: 20,
      color: mainTextColor,
    },
  });

  return (
    <View style={styles.container}>
      <Todos renderScreen={renderScreen} />
      {renderScreen === 'todos' ? (
        <TodoInput />
      ) : (
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Выполненные задачи</Text>
        </View>
      )}
    </View>
  );
};

export default TodosScreen;
