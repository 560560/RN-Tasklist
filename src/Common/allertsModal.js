import {Alert} from "react-native";

export const infoAlert = (info1, info2) => {
    Alert.alert(
        `${info1}`,
        `${info2}`,
        [
            {
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );
}