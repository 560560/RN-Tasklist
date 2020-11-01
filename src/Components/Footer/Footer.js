import React from "react"
import {View, StyleSheet, Text} from "react-native"

export const Footer = ({}) => {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>All rights reserved 2020
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        backgroundColor: "gray",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#000",
        fontSize: 18
    }
})