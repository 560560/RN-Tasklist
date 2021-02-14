import {Alert} from "react-native-web";

export const errorAlert = () => {
    Alert.alert(
        "Ошибка запроса на сервер",
        "Возмоно нет связи с сетью Интернет",
        [
            {
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );
}