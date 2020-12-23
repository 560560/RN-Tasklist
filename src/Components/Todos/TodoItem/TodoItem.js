import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, TextInput} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'



export const TodoItem = ({todo, _id, editMode, isDone, removeTodo, checkTodo, setEditMode, editTodo, todoUnderEdit, todosQuantity, index, isLoading}) => {


    const removeHandler = () => {

        Alert.alert(
            "Удаление задания?",
            "Вы точно хотите удалить задание?",
            [
                {
                    text: "Да",
                    onPress: () => {
                        removeTodo(_id)
                    }
                },

                {
                    text: "Нет",
                    style: "cancel"
                }
            ],
            {cancelable: false}
        )


    }

    const [value, setValue] = useState(todo)

    const applyChanges = () => {
        onEditHandler()
    }

    const cancelChanges = () => {
        Alert.alert(
            "Отменить изменения?",
            "Текст задачи останется прежний",
            [
                {
                    text: "Да",
                    onPress: () => {
                        setValue(todo)
                        setEditMode(_id, false)
                    }
                },

                {
                    text: "Нет",
                    style: "cancel"
                }
            ],
            {cancelable: false}
        )
    }

    const onEditHandler = () => {
        if (value.trim()) {
            editTodo(_id, value)
            setEditMode(_id, false)
        } else {
            Alert.alert("Название дела не может быть пустым")
        }

    }


    return (

            <View style={(index + 1) < todosQuantity ? {borderBottomWidth: 1, borderColor: "#c0ccf8"} : {}}>
                <TouchableWithoutFeedback onPress={() => !editMode && !isLoading && checkTodo(_id, !isDone)}
                                          onLongPress={() => !todoUnderEdit && setEditMode(_id, true)}>
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
                                multiline={true}


                            />

                            <TouchableOpacity onPress={() => applyChanges(_id)}>
                                <MaterialIcons name="done" style={styles.doneIcon}/>
                            </TouchableOpacity>
                        </View>

                        : <View style={[styles.wrapper]}>
                            <Text
                                style={StyleSheet.flatten([styles.todoItem, (isDone ? {textDecorationLine: "line-through"} : {textDecorationLine: "none"})])}>{todo}</Text>
                            <TouchableOpacity onPress={() => removeHandler(_id)}>
                                <MaterialIcons name="delete-sweep" style={styles.deleteIcon}/>
                            </TouchableOpacity>
                        </View>
                    }

                </TouchableWithoutFeedback>


            </View>

    )
}


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingLeft: 10,
        marginVertical: 7,


    },

    todoItem: {
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 17,
        maxWidth: "85%"


    },
    deleteIcon: {
        paddingRight: 10,
        color: "#f66767B3",
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
        width: "70%",
        borderBottomColor: "#1334a9",
        borderStyle: "solid",
        borderBottomWidth: 1,
        fontSize: 17
    }
})