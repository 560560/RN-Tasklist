import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, TextInput} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'


export const TodoItem = ({todo, id, editMode, isDone, removeTodo, checkTodo, setEditMode, editTodo, todoUnderEdit}) => {

    const [value, setValue] = useState(todo)

    const applyChanges = (id, title) => {
        onEditHandler()


    }

    const cancelChanges = () =>
        Alert.alert(
            "Отменить изменения?",
            "Текст задачи останется прежний",
            [
                {
                    text: "Да",
                    onPress: () => {
                        setValue(todo)
                        setEditMode(id, false)
                    }
                },

                {
                    text: "Нет",
                    style: "cancel"
                }
            ],
            {cancelable: false}
        )

    const onEditHandler = () => {
        if (value.trim()) {
            editTodo(id, value)
            setEditMode(id, false)
        } else {
            Alert.alert("Название дела не может быть пустым")
        }

    }


    return (
        <TouchableWithoutFeedback onPress={() => !editMode && checkTodo(id)} onLongPress={() => !todoUnderEdit && setEditMode(id, true)}>
            {editMode
                ? <View style={styles.wrapper}>
                    <TouchableOpacity onPress={cancelChanges}>
                        <MaterialIcons name="cancel" style={styles.cancelIcon}/>
                    </TouchableOpacity>

                    <TextInput
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        value={value}
                        style={styles.inputField}
                        placeholder="Введите название задачи..."
                        onChangeText={setValue}

                    />

                    <TouchableOpacity onPress={() => applyChanges(id)}>
                        <MaterialIcons name="done" style={styles.doneIcon}/>
                    </TouchableOpacity>
                </View>

                : <View style={styles.wrapper}>
                    <Text style={StyleSheet.flatten([styles.todoItem, (isDone ? {textDecorationLine: "line-through"} : {textDecorationLine: "none"})])}>{todo}</Text>
                    <TouchableOpacity onPress={() => removeTodo(id)}>
                        <MaterialIcons name="delete-sweep" style={styles.deleteIcon}/>
                    </TouchableOpacity>
                </View>
            }

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
    },
    doneIcon: {
        paddingRight: 10,
        color: "#0fb004",
        fontSize: 30
    },
    cancelIcon: {
        color: "#ff0000",
        fontSize: 30
    },
    inputField: {
        width: "60%",
        borderBottomColor: "#1334a9",
        borderStyle: "solid",
        borderBottomWidth: 2
    }
})