import React from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from "react-native";


import {TodoItem} from "./TodoItem/TodoItem";

const Todos = ({todos, doneTodos, isRefreshing, removeTodo, checkTodo, onRefresh, setEditMode, editTodo, todoUnderEdit, isLoading, renderScreen}) => {
    let todosQuantity = todos.length
    return (
        <View style={styles.todosWrapper}>

            <FlatList
                removeClippedSubviews={false}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>
                }
                data={renderScreen === "todos" ? todos : doneTodos}
                renderItem={({item, index}) => (

                    <TodoItem todo={item.title} _id={item._id} isDone={item.isDone} editMode={item.editMode} removeTodo={removeTodo} checkTodo={checkTodo}
                              setEditMode={setEditMode} editTodo={editTodo} todoUnderEdit={todoUnderEdit} todosQuantity={todosQuantity} index={index}
                              isLoading={isLoading}
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