import React from "react"
import {StyleSheet, Text, View} from 'react-native'


export const Navbar = ({appName}) => {

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