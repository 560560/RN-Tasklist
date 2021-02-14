import React, {useEffect} from "react"
import {StyleSheet, Text, View} from 'react-native'
import {useDispatch} from "react-redux";
import {getConnectionStatus} from "../../redux/navbar-reducer";



export const Navbar = ({appName}) => {

    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(getConnectionStatus())
    }, [])

    return (
        <View style={[styles.navigationBar]}>
            <Text style={styles.title}>{appName.toUpperCase()}</Text>
        </View>
    )


}
const styles = StyleSheet.create({
    navigationBar: {

        backgroundColor: "#1334a9",
        height: 60,
        alignItems: "center",
        justifyContent: "flex-end",



    },
    title: {
        color: "#fff",
        paddingBottom: 10
    }
})