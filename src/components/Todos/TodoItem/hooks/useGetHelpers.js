import { isEqual } from 'lodash';
import moment from 'moment';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  editTodo,
  removeTodo,
  setDeleteMode,
  setEditMode,
  toggleTodoStatus,
} from '../../../../redux/reducers';

export const useGetHelpers = (
  id,
  todo,
  todoNewTitle,
  date,
  setTodoNewTitle,
  editMode,
  renderScreen
) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos?.isLoading, isEqual);
  const todoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);

  const toggleTodoStatusHandler = useCallback(
    (todoId, done) => {
      if (todoUnderEdit || editMode || isLoading) {
        return;
      }
      dispatch(toggleTodoStatus(todoId, done, renderScreen));
    },
    [dispatch, editMode, isLoading, renderScreen, todoUnderEdit]
  );

  const setEditModeHandler = useCallback(
    (todoId, value) => {
      dispatch(setEditMode(todoId, value));
    },
    [dispatch]
  );

  const editTodoHandler = useCallback(
    (todoId, newTitle) => {
      dispatch(editTodo(todoId, newTitle));
    },
    [dispatch]
  );

  const removeHandler = useCallback(() => {
    dispatch(setDeleteMode(true));

    if (todoUnderEdit) {
      return;
    }

    Alert.alert(
      'Удаление задания?',
      'Вы точно хотите удалить задание?',
      [
        {
          text: 'Да',
          onPress: () => {
            dispatch(removeTodo(id, renderScreen));
          },
        },
        {
          text: 'Нет',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }, [id, dispatch, todoUnderEdit]);

  const applyChanges = useCallback(() => {
    if (todoNewTitle.trim()) {
      editTodoHandler(id, todoNewTitle);
      setEditModeHandler(id, false);
    } else {
      Alert.alert('Название задачи не может быть пустым');
    }
  }, [todoNewTitle, id, editTodoHandler, setEditModeHandler]);

  const cancelChanges = useCallback(() => {
    setTodoNewTitle(todo);
    setEditModeHandler(id, false);
  }, [setTodoNewTitle, setEditModeHandler, todo, id]);

  const onCancelChangesHandler = useCallback(() => {
    if (todo === todoNewTitle) {
      cancelChanges();
      return;
    }

    Alert.alert(
      'Отменить изменения?',
      'Текст задачи останется прежний',
      [
        {
          text: 'Да',
          onPress: cancelChanges,
        },
        {
          text: 'Нет',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }, [cancelChanges, todo, todoNewTitle]);

  const getDate = useCallback(() => {
    const currentDate = moment().format('DD MMMM YYYY');
    return date === currentDate ? 'Сегодня' : date;
  }, [date]);

  return {
    checkTodoHandler: toggleTodoStatusHandler,
    setEditModeHandler,
    removeHandler,
    applyChanges,
    onCancelChangesHandler,
    getDate,
  };
};
