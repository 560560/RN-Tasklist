import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthKey} from '../redux/auth-reducer';
import {getConnectionStatus} from '../redux/navbar-reducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.authApp.name);

  return (
      <View style={styles.container}>
        <View>

          <Text style={{color: '#000000'}}>
            Страница профиля
          </Text>

          <Text style={{color: '#000000'}}>
            Здравствуйте, {name ? name : 'незнакомец'}!
          </Text>

        </View>


        <View style={styles.logoutContainer}>
          <Button
            title="Выход"
            onPress={() => {
              dispatch(setAuthKey(null));
              dispatch(getConnectionStatus());
            }}/>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 50,
  },
  logoutContainer: {
    marginBottom: 20,
  } ,

});

export default ProfileScreen;