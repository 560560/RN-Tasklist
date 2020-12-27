import React from "react"
import {View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {getTodos} from "../../redux/todos-reducer";
import {setScreenToShow} from "../../redux/screens-reducer";


export const Footer = ({showDoneTasks, setShowDoneTasks, getTodos, setScreenToShow, screenToShow}) => {

    const onPressProfileHandler = () => {
        if (screenToShow !== "profile") {
            setScreenToShow("profile")
        }
    }

    const onPressDoneTasksHandler = () => {
        if (screenToShow !== "doneTodos") {
            setScreenToShow("doneTodos")
        }
    }

    const onPressTasksHandler = () => {
        if (screenToShow !== "todos") {
            setScreenToShow("todos")
        } else {
            getTodos()
        }

    }
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => onPressTasksHandler()}>
                <FontAwesome5 name="clipboard-list" size={40} color={screenToShow === "todos" ? "#1334a9" : "#7d8ec8"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressDoneTasksHandler()}>
                <FontAwesome5 name="tasks" size={38} color={screenToShow === "doneTodos" ? "#1334a9" : "#7d8ec8"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressProfileHandler()}>
                <MaterialIcons name="account-circle" size={45} color={screenToShow === "profile" ? "#1334a9" : "#7d8ec8"}/>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#dddddd",
        height: 50,
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    text: {
        color: "#000",
        fontSize: 18
    },

})