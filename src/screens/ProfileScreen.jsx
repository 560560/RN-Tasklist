import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ColorSettings } from '../components/ColorSettings';
import { FlatButton } from '../components/FlatButton';
import { resetStyles } from '../helpers/resetStyles';
import { useSchemeColors } from '../helpers/useSchemeColors';
import { getConnectionStatus, setAuthKey } from '../redux/reducers';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { mainColor, secondTextColor } = useSchemeColors();
  const name = useSelector((state) => state.authApp.name);
  const [showColorSettings, setShowColorSettings] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: secondTextColor, fontSize: 15, marginLeft: 10 }}>
              {name || 'незнакомец'}!
            </Text>
            <TouchableOpacity
              onPress={() => setShowColorSettings(!showColorSettings)}
              onLongPress={() => {
                resetStyles(dispatch);
              }}
            >
              <AntDesign
                name="setting"
                size={34}
                color={mainColor}
                style={{ marginHorizontal: 10 }}
              />
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
