import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Navbar} from "./src/Components/Navbar/Navbar";
import {TodoInput} from "./src/Components/TodoInput/TodoInput";
import {TodoItem} from "./src/Components/TodoItem/TodoItem";


export default function App() {
    const [todos, setTodos] = useState([])

    const addTodo = (title) => {
        setTodos((prevTodos) => [...prevTodos, {id: Date.now().toString(), title}])
    }

    return (
        <View style={styles.wrapper}>
            <StatusBar style="auto"/>
            <Navbar title="Agro"/>
            <View style={styles.container}>
                <TodoInput onSubmit={addTodo}/>
                <FlatList 
                data={todos}
                renderItem={({item}) => (
                    <TodoItem todo={item.title}/>
                )}
                keyExtractor={item => item.id}/>
                {/* {todos.length !== 0 && todos.map(todo => <TodoItem key={todo.id} todo={todo.title}/>)} */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {flex:1,
        justifyContent: "space-between"
    },
    container: {
        flex:1,
        padding: 15,
    },
    body: {
        paddingHorizontal: 10,
        backgroundColor: "#555"
    },
    text: {
        color: "#fff"
    }
})
