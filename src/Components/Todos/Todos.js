import React, {useEffect, useMemo} from 'react';
import {FlatList, View, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import {TodoItem} from './TodoItem/TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import {getDoneTodos, getSelectedTodos} from '../../redux/todosSelectors';
import {getTodos} from '../../redux/todos-reducer';
import _ from 'lodash';
import {addingDates, onRefresh} from './Helpers';
import 'moment/locale/ru';

const Todos = ({renderScreen}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, getTodos]);


  const isRefreshing = useSelector(state => state.todos.isRefreshing) || false;
  const todos = useSelector(state => getSelectedTodos(state));
  const doneTodos = useSelector(state => getDoneTodos(state));

  const sortedTodos = todos
      ? _.sortBy(todos, todo => todo['created']).reverse()
      : [];

  const sortedDoneTodos = doneTodos
      ? _.sortBy(doneTodos, todo => todo['created']).reverse()
      : [];

  const sortedTodosWithDates = useMemo(() => {
    if (sortedTodos) {
      return addingDates(sortedTodos);
    }
  }, [sortedTodos, addingDates]);

  const sortedDoneTodosWithDates = useMemo(() => {
    if (sortedDoneTodos) {
      return addingDates(sortedDoneTodos);
    }
  }, [sortedDoneTodos, addingDates]);

  if (!todos || !doneTodos) {
    return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#1334a9"/>
        </View>
    );
  }

  return (
      <View style={styles.todosWrapper}>
        <FlatList
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={() => onRefresh(dispatch)}/>
            }
            data={renderScreen === 'todos' ? sortedTodosWithDates : sortedDoneTodosWithDates}
            renderItem={({item, index}) => (

                <TodoItem todo={item.title} _id={item._id} isDone={item.isDone} editMode={item.editMode}
                          date={item.date || null}
                          index={index} renderScreen={renderScreen}
                />
            )}
            keyExtractor={item => item._id}/>
      </View>
  );
};

let styles = StyleSheet.create({
      todosWrapper: {
        flex: 1,
        paddingBottom: 35,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    },
);
export default Todos;