import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../redux/todos-reducer';


export const TodoInput = () => {
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
        <Button title="Добавить" onPress={onPressHandler}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 12,

  },
  inputField: {
    width: '70%',
    borderBottomColor: '#1334a9',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    fontSize: 15,
  },

});
