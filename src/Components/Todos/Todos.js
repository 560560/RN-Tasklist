import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { TodoItem } from './TodoItem/TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDoneTodos, getSelectedTodos } from '../../redux/todosSelectors';
import { autoGetTodos, getTodos } from '../../redux/todos-reducer';
import { addingDates, onRefresh } from './Helpers';
import 'moment/locale/ru';
import { isEqual } from 'lodash';

const Todos = ({ renderScreen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);
  const isRefreshing = useSelector((state) => state.todos?.isRefreshing) || false;
  const todos = useSelector((state) => getSelectedTodos(state), isEqual);
  const doneTodos = useSelector((state) => getDoneTodos(state), isEqual);

  useEffect(() => {
    if (!isRefreshing && !todoUnderEdit) {
      console.log(' = ');
      const intervalId = setInterval(() => {
        dispatch(autoGetTodos());
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, isRefreshing, todoUnderEdit]);

  const sortedTodosWithDates = useMemo(() => {
    if (todos) {
      return addingDates(todos);
    }
  }, [todos, addingDates]);

  const sortedDoneTodosWithDates = useMemo(() => {
    if (doneTodos) {
      return addingDates(doneTodos);
    }
  }, [doneTodos, addingDates]);

  if (!todos || !doneTodos) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#1334a9" />
      </View>
    );
  }

  return (
    <View style={styles.todosWrapper}>
      <FlatList
        removeClippedSubviews={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => onRefresh(dispatch)} />}
        data={renderScreen === 'todos' ? sortedTodosWithDates : sortedDoneTodosWithDates}
        renderItem={({ item, index }) => (
          <TodoItem
            todo={item.title}
            _id={item._id}
            isDone={item.isDone}
            editMode={item.editMode}
            date={item.date || null}
            index={index}
            renderScreen={renderScreen}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

let styles = StyleSheet.create({
  todosWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default Todos;
