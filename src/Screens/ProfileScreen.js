import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{color: "#000000"}}>
                Страница профиля
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
    }

})

export default ProfileScreen;