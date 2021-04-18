import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';


export const Footer = ({getTodos, setScreenToShow, screenToShow}) => {

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
        <View style={styles.navTab}>
            <TouchableOpacity onPress={() => onPressTasksHandler()}>
                <FontAwesome5 name="clipboard-list" size={40} color={screenToShow === "todos" ? "#1334a9" : "#a5a5a5"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressDoneTasksHandler()}>
                <FontAwesome5 name="tasks" size={38} color={screenToShow === "doneTodos" ? "#1334a9" : "#a5a5a5"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressProfileHandler()}>
                <MaterialIcons name="account-circle" size={45} color={screenToShow === "profile" ? "#1334a9" : "#a5a5a5"}/>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    navTab: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f8f8f8",
        height: 50,
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        paddingBottom: 10,
        borderBottomColor: '#d2d2d2',
        borderStyle: 'solid',
        borderBottomWidth: 1,
    },
    text: {
        color: "#000",
        fontSize: 18
    },

})