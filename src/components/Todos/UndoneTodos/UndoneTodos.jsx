import 'moment/locale/ru';

import { isEqual } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useSchemeColors } from '../../../helpers/useSchemeColors';
import { autoGetTodos, getTodos } from '../../../redux/reducers';
import { getSelectedUndoneTodos } from '../../../redux/selectors/todosSelectors';
import { addingDates, onRefresh } from '../helpers';
import { TodoItem } from '../TodoItem';

export const UndoneTodos = ({ renderScreen }) => {
  const dispatch = useDispatch();
  const { mainColor } = useSchemeColors();

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

  const styles = StyleSheet.create({
    emptyTodosWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    emptyStateTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomColor: '#d2d2d2',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
      color: mainColor,
    },
  });

  if (!undoneTodos) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#1334a9" />
      </View>
    );
  }

  if (!sortedUndoneTodosWithDates.length) {
    return (
      <View style={styles.emptyTodosWrapper}>
        <View style={styles.emptyStateTitleContainer}>
          <Text style={styles.title}>Нет запланированных задач</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.todosWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Запланированные задачи</Text>
      </View>
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
