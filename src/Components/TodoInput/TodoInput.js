import React, {useState} from "react"
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native'


export const TodoInput = ({onSubmit}) => {
    const [value, setValue] = useState("")
    const onPressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue("")
        } else {
            Alert.alert("Название дела не может быть пустым")
        }

    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="sentences"
                autoCorrect={true}
                style={styles.inputField}
                value={value}
                placeholder="Введите название дела..."
                onChangeText={setValue}
                
            />
            <Button title="Добавить" onPress={onPressHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15,

    },
    inputField: {
        width: "70%",
        borderBottomColor: "#1334a9",
        borderStyle: "solid",
        borderBottomWidth: 2
    }

})
