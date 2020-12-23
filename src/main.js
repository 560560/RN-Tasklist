import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import NavbarContainer from "./Components/Navbar/NavbarContainer";

import bckgTodos from "../assets/bckgTodos.jpg";
import FooterContainer from "./Components/Footer/FooterContainer";
import {connect} from "react-redux";
import {setScreenToShow} from "./redux/screens-reducer";
import TodosScreen from "./Screens/TodosScreen";
import ProfileScreen from "./Screens/ProfileScreen";


const Main = ({screenToShow}) => {

    return (

        <View style={StyleSheet.flatten([styles.wrapper])}>

            <StatusBar style="light"/>
            <NavbarContainer/>
            {
                screenToShow === "todos"
                ? <TodosScreen/>
                : screenToShow === "profile" && <ProfileScreen/>
            }



            <FooterContainer/>

        </View>

    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between",
        position: "relative",
        backgroundColor: "#f8f8f8",
    },
    image: {
        flex: 1,
        resizeMode: "repeat",
        justifyContent: "center"
    }

})

const mapStateToProps = (state) => ({
    screenToShow: state.screens.screenToShow
})

export default connect(mapStateToProps, {})(Main)
