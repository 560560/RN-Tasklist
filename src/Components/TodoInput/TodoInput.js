import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/todos-reducer';
import { isEqual } from 'lodash';
import FlatButton from '../FlatButton';

export const TodoInput = () => {
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
      paddingBottom: 15,
      paddingHorizontal: 12,
    },
    inputField: {
      width: '69%',
      borderBottomColor: mainColor,
      borderStyle: 'solid',
      borderBottomWidth: 2,
      fontSize: 15,
      color: secondTextColor,
    },
  });
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onPressHandler = () => {
    if (value.trim()) {
      dispatch(addTodo(value));
      setValue('');
    } else {
      Alert.alert('Название дела не может быть пустым');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="sentences"
        autoCorrect={true}
        style={styles.inputField}
        value={value}
        placeholder="Введите название задачи..."
        onChangeText={setValue}
      />
      <FlatButton onPress={onPressHandler} text="Добавить" />
    </View>
  );
};
