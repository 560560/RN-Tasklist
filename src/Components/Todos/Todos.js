import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from "react-native";
import {TodoItem} from "./TodoItem/TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {getDoneTodos, getSelectedTodos} from "../../redux/todosSelectors";
import {getTodos, setRefreshing} from "../../redux/todos-reducer";
import {getConnectionStatus} from "../../redux/navbar-reducer";

const Todos = ({ renderScreen}) => {

    const dispatch = useDispatch()

    const isRefreshing = useSelector(state => state.todos.isRefreshing)
    const todos = useSelector(state => getSelectedTodos(state));
    const doneTodos = useSelector(state => getDoneTodos(state));

    const onRefresh = () => {
        dispatch (setRefreshing(true))
        dispatch(getConnectionStatus())
        dispatch (getTodos())
        setTimeout(() => {
            dispatch (setRefreshing(false))
        }, 2000)
    }

    useEffect(() => {
        dispatch (getTodos())
    }, [])

    return (
        <View style={styles.todosWrapper}>
            <FlatList
                removeClippedSubviews={false}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>
                }
                data={renderScreen === "todos" ? todos : doneTodos}
                renderItem={({item, index}) => (

                    <TodoItem todo={item.title} _id={item._id} isDone={item.isDone} editMode={item.editMode}
                              index={index} renderScreen={renderScreen}
                    />
                )}
                keyExtractor={item => item._id}/>
        </View>
    );
}

let styles = StyleSheet.create({
        todosWrapper: {
            flex: 1,
            paddingBottom: 35
        }
    }
)
export default Todos;