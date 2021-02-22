import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet, RefreshControl, Text} from 'react-native';
import {TodoItem} from './TodoItem/TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import {getDoneTodos, getSelectedTodos} from '../../redux/todosSelectors';
import {getTodos} from '../../redux/todos-reducer';

import {onRefresh} from './Helpers';
const Todos = ({renderScreen}) => {

  const dispatch = useDispatch();

  const isRefreshing = useSelector(state => state.todos.isRefreshing) || false;
  const todos = useSelector(state => getSelectedTodos(state));
  const doneTodos = useSelector(state => getDoneTodos(state));



  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, getTodos]);

  if (!todos || !doneTodos) {
    return <View><Text>Ошибка получения данных с сервера</Text></View>;
  }

  return (
      <View style={styles.todosWrapper}>
        <FlatList
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={() => onRefresh(dispatch)}/>
            }
            data={renderScreen === 'todos' ? todos : doneTodos}
            renderItem={({item, index}) => (

                <TodoItem todo={item.title} _id={item._id} isDone={item.isDone} editMode={item.editMode}
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
    },
);
export default Todos;