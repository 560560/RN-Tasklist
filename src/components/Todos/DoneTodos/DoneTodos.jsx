import 'moment/locale/ru';

import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useSchemeColors } from '../../../helpers/useSchemeColors';
import { getDoneTodos, increaseOffset } from '../../../redux/reducers';
import { getSelectedDoneTodos } from '../../../redux/selectors/todosSelectors';
import { addingDates, onRefresh } from '../helpers';
import { TodoItem } from '../TodoItem';

export const DoneTodos = ({ renderScreen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoneTodos());
  }, [dispatch]);

  const isRefreshing = useSelector((state) => state.todos?.isRefreshing, isEqual) || false;
  const doneTodos = useSelector((state) => getSelectedDoneTodos(state), isEqual);
  const { mainColor } = useSchemeColors();
  const sortedDoneTodosWithDates = useMemo(
    () => (doneTodos ? addingDates(doneTodos) : doneTodos),
    [doneTodos]
  );

  const increaseOffsetHandler = useCallback(() => {
    dispatch(increaseOffset());
  }, [dispatch]);

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

  if (!doneTodos) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#1334a9" />
      </View>
    );
  }

  if (!sortedDoneTodosWithDates.length) {
    return (
      <View style={styles.emptyTodosWrapper}>
        <View style={styles.emptyStateTitleContainer}>
          <Text style={styles.title}>Нет выполненных задач</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.todosWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Выполненные задачи</Text>
      </View>
      <FlatList
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefresh(dispatch, renderScreen)}
          />
        }
        data={sortedDoneTodosWithDates}
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
        onEndReached={increaseOffsetHandler}
        onEndThreshold={1}
      />
    </View>
  );
};
