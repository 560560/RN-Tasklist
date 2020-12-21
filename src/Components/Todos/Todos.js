import React, {useState} from 'react';
import {FlatList, View, StyleSheet, RefreshControl, Alert} from "react-native";
import {TodoItem} from "./TodoItem/TodoItem";
import {TouchableWithoutFeedback} from "react-native-web";

const Todos = ({todos, isRefreshing, removeTodo, checkTodo, onRefresh, setEditMode, editTodo, todoUnderEdit}) => {


    return (
        <View style={styles.todosWrapper}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>
                }
                data={todos}
                renderItem={({item}) => (
                    <TodoItem todo={item.title} id={item.id} isDone={item.isDone} editMode={item.editMode} removeTodo={removeTodo} checkTodo={checkTodo}
                              setEditMode={setEditMode} editTodo={editTodo} todoUnderEdit={todoUnderEdit}
                    />
                )}
                keyExtractor={item => item.id}/>
        </View>

    );
}


let styles = StyleSheet.create({
        todosWrapper: {
            flex: 1

        }
    }
)
export default Todos;