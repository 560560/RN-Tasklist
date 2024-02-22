import 'moment/locale/ru';

import { isEqual } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedUndoneTodos } from '../../../redux/selectors/todosSelectors';
import { autoGetTodos, getTodos } from '../../../redux/reducers';
import { addingDates, onRefresh } from '../helpers';

import { TodoItem } from '../TodoItem';

export const UndoneTodos = ({ renderScreen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);
  const deleteMode = useSelector((state) => state.todos?.deleteMode, isEqual);
  const isRefreshing = useSelector((state) => state.todos?.isRefreshing, isEqual) || false;
  const undoneTodos = useSelector((state) => getSelectedUndoneTodos(state), isEqual);

  useEffect(() => {
    if (!isRefreshing && !todoUnderEdit && !deleteMode) {
      const intervalId = setInterval(() => {
        dispatch(autoGetTodos());
      }, 10000);

      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [dispatch, isRefreshing, todoUnderEdit, deleteMode]);

  const sortedUndoneTodosWithDates = useMemo(
    () => (undoneTodos ? addingDates(undoneTodos) : undoneTodos),
    [undoneTodos]
  );

  if (!undoneTodos) {
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefresh(dispatch, renderScreen)}
          />
        }
        data={sortedUndoneTodosWithDates}
        renderItem={({ item, index }) => (
          <TodoItem
            key={item.id}
            todo={item.title}
            id={item.id}
            done={item.done}
            editMode={item.editMode}
            date={item.date || null}
            index={index}
            renderScreen={renderScreen}
          />
        )}
        keyExtractor={(item) => item.id}
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
