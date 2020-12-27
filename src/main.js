import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import FooterContainer from "./Components/Footer/FooterContainer";
import {connect} from "react-redux";
import TodosScreen from "./Screens/TodosScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NavbarContainer from "./Components/Navbar/NavbarContainer";



const Main = ({screenToShow}) => {

    return (

        <View style={StyleSheet.flatten([styles.wrapper])}>

            <StatusBar style="light"/>
            <NavbarContainer/>
            {
                screenToShow === "todos"
                ? <TodosScreen renderScreen={"todos"}/>
                : screenToShow === "doneTodos"
                    ? <TodosScreen renderScreen={"doneTodos"}/>
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
