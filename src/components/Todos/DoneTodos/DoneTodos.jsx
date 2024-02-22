import 'moment/locale/ru';

import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDoneTodos, increaseOffset } from '../../../redux/reducers';
import { addingDates, onRefresh } from '../helpers';
import { TodoItem } from '../TodoItem';
import { getSelectedDoneTodos } from '../../../redux/selectors/todosSelectors';

export const DoneTodos = ({ renderScreen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoneTodos());
  }, [dispatch]);

  const isRefreshing = useSelector((state) => state.todos?.isRefreshing, isEqual) || false;
  const doneTodos = useSelector((state) => getSelectedDoneTodos(state), isEqual);

  const sortedDoneTodosWithDates = useMemo(
    () => (doneTodos ? addingDates(doneTodos) : doneTodos),
    [doneTodos]
  );

  const increaseOffsetHandler = useCallback(() => {
    dispatch(increaseOffset());
  }, [dispatch]);

  if (!doneTodos) {
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
