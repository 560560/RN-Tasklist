import React from 'react';
import Todos from "../Components/Todos/Todos";
import {StyleSheet, View, Text} from "react-native";
import {TodoInput} from '../Components/TodoInput/TodoInput';


const TodosScreen = ({renderScreen}) => {
    return (
        <View style={styles.container}>
            {renderScreen === "todos"
                ? <TodoInput/>
                : <View style={styles.titleWrapper}>
                    <Text  style={styles.title}>Выполненные задачи</Text>
                </View>}
            <Todos renderScreen={renderScreen}/>
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 15,
    },
    titleWrapper: {
        flex: 1,
        maxHeight: 40,
        borderBottomWidth: 2,
        borderBottomColor: "#1334a9",
        marginBottom: 10
    },

    title : {
        textAlign: "center",
        fontSize: 22
    }

})

export default TodosScreen;