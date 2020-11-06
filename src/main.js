import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import TodosContainer from "./Components/Todos/TodosContainer";
import TodosInputContainer from "./Components/TodoInput/TodosInputCintainer";


const Main = () => {


    return (
        <View style={styles.wrapper}>
            <StatusBar style="light"/>
            <NavbarContainer/>
            <View style={styles.container}>
                <TodosInputContainer/>
                <TodosContainer/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        padding: 15,
    },
    body: {
        paddingHorizontal: 10,
        backgroundColor: "#555"
    },
    text: {
        color: "#fff"
    }
})

export default Main
