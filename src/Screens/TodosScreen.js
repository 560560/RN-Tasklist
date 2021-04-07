import React from 'react';
import Todos from "../Components/Todos/Todos";
import {StyleSheet, View, Text} from "react-native";
import {TodoInput} from '../Components/TodoInput/TodoInput';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {setNewTodo} from '../redux/todos-reducer';


const TodosScreen = ({renderScreen}) => {
    const dispatch = useDispatch();
    const socket = io('http://agro-api.site:4000');
    const authKey = useSelector(state => state.authApp.authKey)
    socket.on('connect', () => {
        socket.emit('token', authKey)
    })

    socket.on('newTaskDistributor', (message) => {
        dispatch(setNewTodo(message));
    })

    return (
        <View style={styles.container}>
            <Todos renderScreen={renderScreen}/>
            {renderScreen === "todos"
                ? <TodoInput/>
                : <View style={styles.titleWrapper}>
                    <Text  style={styles.title}>Выполненные задачи</Text>
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        marginTop: 60
    },
    titleWrapper: {
        flex: 1,
        maxHeight: 40,
        borderTopWidth: 1,
        borderTopColor: '#d2d2d2',
        paddingTop: 20,
        marginBottom: 30,
    },

    title : {
        textAlign: "center",
        fontSize: 22
    }

})

export default TodosScreen;