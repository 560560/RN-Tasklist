import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthKey} from '../redux/auth-reducer';
import {getConnectionStatus} from '../redux/navbar-reducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.authApp.name)

  return (
      <View style={styles.container}>
        <Text style={{color: '#000000'}}>
           Страница профиля
        </Text>

        <Text style={{color: '#000000'}}>
           Здравствуйте, {name ? name : "незнакомец"}!
        </Text>
        <Button
            title="Выход"
            onPress={() => {
              dispatch(setAuthKey(null));
              dispatch(getConnectionStatus());
            }}/>
      </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
  },

});

export default ProfileScreen;