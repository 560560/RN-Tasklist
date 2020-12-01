import React, {useState} from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from "react-native";
import {TodoItem} from "./TodoItem/TodoItem";

const Todos = ({todos, isRefreshing, removeTodo, checkTodo, onRefresh}) => {

    return (
        <View style={styles.todosWrapper}>
            <FlatList
                refreshControl = {
                    <RefreshControl refreshing = {isRefreshing}  onRefresh={onRefresh}/>
                }
                data={todos}
                renderItem={({item}) => (
                    <TodoItem todo={item.title} id= {item.id} isDone = {item.isDone} removeTodo={removeTodo} checkTodo={checkTodo}/>
                )}
                keyExtractor={item => item.id}/>
        </View>
    );
}


let styles = StyleSheet.create({
    todosWrapper: {
        flex: 1,

    }
    }
)
export default Todos;