import { isEqual } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { hexToRgbA } from '../../helpers/hexToRgba';
import { useSchemeColors } from '../../helpers/useSchemeColors';
import { addTodo } from '../../redux/reducers';
import { FlatButton } from '../FlatButton';

export const TodoInput = () => {
  const todoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);
  const isLoading = useSelector((state) => state.todos?.isLoading, isEqual);
  const { mainColor, secondTextColor } = useSchemeColors();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 15,
      paddingHorizontal: 12,
      height: 60,
      borderTopWidth: 1,
      borderTopColor: hexToRgbA(secondTextColor, 0.2),
    },
    inputField: {
      width: '68%',
      borderBottomColor: mainColor,
      borderStyle: 'solid',
      borderBottomWidth: 2,
      fontSize: 15,
      color: secondTextColor,
    },
    buttonView: {
      width: '30%',
    },
  });
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onPressHandler = useCallback(() => {
    if (value.trim()) {
      dispatch(addTodo(value));
      setValue('');
    } else {
      Alert.alert('Название задачи не может быть пустым');
    }
  }, [dispatch, value]);

  return (
    <>
      {!todoUnderEdit && (
        <View style={styles.container}>
          <TextInput
            autoCapitalize="sentences"
            autoCorrect
            style={styles.inputField}
            value={value}
            placeholder="Введите название задачи..."
            onChangeText={setValue}
          />
          <View style={styles.buttonView}>
            <FlatButton onPress={onPressHandler} text="Добавить" isLoading={isLoading} />
          </View>
        </View>
      )}
    </>
  );
};
