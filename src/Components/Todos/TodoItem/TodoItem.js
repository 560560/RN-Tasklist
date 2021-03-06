import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, Alert, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { checkTodo, editTodo, removeTodo, setEditMode } from '../../../redux/todos-reducer';
import moment from 'moment';
import { isEqual } from 'lodash';
import { hexToRgbA } from '../../../helpers/hexToRgba';

export const TodoItem = ({ todo, _id, isDone, date, editMode }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(todo);
  const todoUnderEdit = useSelector((state) => state.todoUnderEdit);
  const isLoading = useSelector((state) => state.isLoading);
  const backgroundColor = useSelector((state) => state.config?.background, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 7,
      paddingLeft: 10,
      marginBottom: 14,
      color: '#969696',
      backgroundColor: backgroundColor,
      borderRadius: 7,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      borderWidth: 1,
      borderColor: hexToRgbA(secondTextColor, 0.3),
    },
    todoItem: {
      paddingVertical: 5,
      paddingLeft: 5,
      fontSize: 17,
      maxWidth: '85%',
      color: secondTextColor,
    },
    deleteIcon: {
      paddingRight: 10,
      color: '#f66767B3',
      fontSize: 30,
    },
    doneIcon: {
      paddingRight: 10,
      color: '#0fb004',
      fontSize: 30,
    },
    cancelIcon: {
      color: '#ff0000',
      fontSize: 30,
    },
    inputField: {
      width: '70%',
      borderBottomColor: '#1334a9',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      fontSize: 17,
      color: secondTextColor,
    },
    separator: {
      textAlign: 'center',
      fontSize: 15,
      color: secondTextColor,
      opacity: 0.5,
      marginTop: 25,
      paddingVertical: 10,
    },
  });

  const removeTodoHandler = (_id) => {
    dispatch(removeTodo(_id));
  };

  const checkTodoHandler = (_id, isDone) => {
    dispatch(checkTodo(_id, isDone));
  };

  const setEditModeHandler = (_id, value) => {
    dispatch(setEditMode(_id, value));
  };

  const editTodoHandler = (_id, newTitle) => {
    dispatch(editTodo(_id, newTitle));
  };

  const removeHandler = () => {
    Alert.alert(
      'Удаление задания?',
      'Вы точно хотите удалить задание?',
      [
        {
          text: 'Да',
          onPress: () => {
            removeTodoHandler(_id);
          },
        },
        {
          text: 'Нет',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const applyChanges = () => {
    onEditHandler();
  };

  const cancelChanges = () => {
    Alert.alert(
      'Отменить изменения?',
      'Текст задачи останется прежний',
      [
        {
          text: 'Да',
          onPress: () => {
            setValue(todo);
            setEditModeHandler(_id, false);
          },
        },
        {
          text: 'Нет',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const onEditHandler = () => {
    if (value.trim()) {
      editTodoHandler(_id, value);
      setEditModeHandler(_id, false);
    } else {
      Alert.alert('Название дела не может быть пустым');
    }
  };

  const currentDate = moment(Date.now()).format('DD MMMM YYYY');

  return (
    <View>
      {date && <Text style={styles.separator}>{date === currentDate ? 'Сегодня' : date}</Text>}
      <TouchableNativeFeedback
        onPress={() => !editMode && !isLoading && checkTodoHandler(_id, !isDone)}
        onLongPress={() => !todoUnderEdit && setEditModeHandler(_id, true)}
      >
        {editMode ? (
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={cancelChanges}>
              <MaterialIcons name="cancel" style={styles.cancelIcon} />
            </TouchableOpacity>

            <TextInput
              autoCapitalize="sentences"
              autoCorrect={true}
              value={value}
              style={styles.inputField}
              placeholder="Введите название задачи..."
              onChangeText={setValue}
              multiline={true}
            />

            <TouchableOpacity onPress={() => applyChanges(_id)}>
              <MaterialIcons name="done" style={styles.doneIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.wrapper]}>
            <Text
              style={StyleSheet.flatten([
                styles.todoItem,
                isDone ? { textDecorationLine: 'line-through' } : { textDecorationLine: 'none' },
              ])}
            >
              {todo}
            </Text>
            <TouchableOpacity onPress={() => removeHandler(_id)}>
              <MaterialIcons name="delete-sweep" style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
};
