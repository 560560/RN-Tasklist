import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import TodosContainer from "./Components/Todos/TodosContainer";
import TodosInputContainer from "./Components/TodoInput/TodosInputCintainer";


const Main = () => {


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
                <StatusBar style="light"/>
                <NavbarContainer/>
                <View style={styles.container}>
                    <TodosInputContainer/>
                    <TodosContainer/>
                </View>

            </View>
        </TouchableWithoutFeedback>
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

})

export default Main
