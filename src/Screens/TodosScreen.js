import React from 'react';
import TodosInputContainer from "../Components/TodoInput/TodosInputCintainer";
import TodosContainer from "../Components/Todos/TodosContainer";
import {StyleSheet, View, Text} from "react-native";


const TodosScreen = ({renderScreen}) => {
    return (
        <View style={styles.container}>
            {renderScreen === "todos"
                ? <TodosInputContainer/>
                : <View style={styles.titleWrapper}>
                    <Text  style={styles.title}>Выполненные задачи</Text>
                </View>}
            <TodosContainer renderScreen={renderScreen}/>
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
        maxHeight: 50,
        borderBottomWidth: 3,
        borderBottomColor: "#1334a9",
        marginBottom: 10


    },

    title : {
        textAlign: "center",
        fontSize: 24
    }

})

export default TodosScreen;