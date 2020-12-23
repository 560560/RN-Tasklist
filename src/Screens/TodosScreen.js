import React from 'react';
import TodosInputContainer from "../Components/TodoInput/TodosInputCintainer";
import TodosContainer from "../Components/Todos/TodosContainer";
import {StyleSheet, View} from "react-native";


const TodosScreen = (props) => {
    return (
        <View style={styles.container}>
            <TodosInputContainer/>
            <TodosContainer/>
        </View>
    );
}


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 15,
    }

})

export default TodosScreen;