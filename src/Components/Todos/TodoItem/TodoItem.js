import React from "react"
import {StyleSheet, Text, View,} from 'react-native'

export const TodoItem = ({todo}) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.todoItem}>{todo}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 5,
        backgroundColor: "rgb(189,226,246)",
        paddingLeft: 10,
        marginVertical:7,
        borderRadius: 10

    },
    todoItem: {
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize:19

    }
})