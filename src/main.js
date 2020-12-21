import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import TodosContainer from "./Components/Todos/TodosContainer";
import TodosInputContainer from "./Components/TodoInput/TodosInputCintainer";
import {Footer} from "./Components/Footer/Footer";


const Main = () => {

    return (

            <View style={styles.wrapper}>
                <StatusBar style="light"/>
                <NavbarContainer/>
                <View style={styles.container}>
                    <TodosInputContainer/>
                    <TodosContainer/>
                </View>
                {/*<Footer/>*/}

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

})

export default Main
