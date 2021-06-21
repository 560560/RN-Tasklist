import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthKey } from '../redux/auth-reducer';
import { isEqual } from 'lodash';
import { getConnectionStatus } from '../redux/navbar-reducer';
import ColorSettings from '../Components/ColorSettings/ColorSettings';
import { AntDesign } from '@expo/vector-icons';
import { resetStyles } from '../helpers/resetStyles';
import FlatButton from '../Components/FlatButton';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  const name = useSelector((state) => state.authApp.name);
  const [showColorSettings, setShowColorSettings] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: secondTextColor, fontSize: 15, marginLeft: 10 }}>{name ? name : 'незнакомец'}!</Text>
            <TouchableOpacity
              onPress={() => setShowColorSettings(!showColorSettings)}
              onLongPress={() => {
                resetStyles(dispatch);
              }}
            >
              <AntDesign name="setting" size={34} color={mainColor} style={{ marginHorizontal: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
        {showColorSettings && <ColorSettings />}
      </View>
      <View style={styles.logoutContainer}>
        <FlatButton
          onPress={() => {
            dispatch(setAuthKey(null));
            dispatch(getConnectionStatus());
          }}
          text="Выход"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 80,
  },

  logoutContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
});

export default ProfileScreen;
