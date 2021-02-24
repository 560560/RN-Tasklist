import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {getDoneTodos, getSelectedTodos} from '../../../redux/todosSelectors';
import {checkTodo, editTodo, removeTodo, setEditMode} from '../../../redux/todos-reducer';

export const TodoItem = ({todo, _id, isDone, date, editMode, index, renderScreen}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(todo);
  const todoUnderEdit = useSelector(state => state.todoUnderEdit);
  const isLoading = useSelector(state => state.isLoading);

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
        {cancelable: false},
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
        {cancelable: false},
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

  return (
      <View >
        {date && <Text style={styles.separator}>{date}</Text>}
        <TouchableWithoutFeedback onPress={() => !editMode && !isLoading && checkTodoHandler(_id, !isDone)}
                                  onLongPress={() => !todoUnderEdit && setEditModeHandler(_id, true)}>
          {editMode
              ? <View style={styles.wrapper}>
                <TouchableOpacity onPress={cancelChanges}>
                  <MaterialIcons name="cancel" style={styles.cancelIcon}/>
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
                  <MaterialIcons name="done" style={styles.doneIcon}/>
                </TouchableOpacity>
              </View>

              : <View style={[styles.wrapper]}>
                <Text
                    style={StyleSheet.flatten([styles.todoItem, (isDone ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'})])}>{todo}</Text>
                <TouchableOpacity onPress={() => removeHandler(_id)}>
                  <MaterialIcons name="delete-sweep" style={styles.deleteIcon}/>
                </TouchableOpacity>
              </View>
          }
        </TouchableWithoutFeedback>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
    marginVertical: 7,
    color: '#969696',
    backgroundColor: '#efefef',
    borderRadius: 3
  },
  todoItem: {
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 17,
    maxWidth: '85%',
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
  },
  separator: {
    textAlign: 'center',
    fontSize: 15,
    color: '#4c4c4c',
    marginTop: 25,
    paddingVertical: 10,

  },
});