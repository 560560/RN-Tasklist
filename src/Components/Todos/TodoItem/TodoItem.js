import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'


export const TodoItem = ({todo, id, isDone, removeTodo, checkTodo}) => {

    return (
        <TouchableWithoutFeedback onLongPress={() => checkTodo(id)}>
            <View style={styles.wrapper}>

                <Text style={StyleSheet.flatten([styles.todoItem, (isDone ? {textDecorationLine: "line-through"} : {textDecorationLine: "none"})])}>{todo}</Text>


                <TouchableOpacity onPress={() => removeTodo(id)}>
                    <MaterialIcons name="delete-sweep" style={styles.deleteIcon}/>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "rgb(189,226,246)",
        paddingLeft: 10,
        marginVertical: 7,
        borderRadius: 10

    },

    todoItem: {
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 17,
        maxWidth: "85%"


    },
    deleteIcon: {
        paddingRight: 10,
        color: "#f66767",
        fontSize: 30
    }
})