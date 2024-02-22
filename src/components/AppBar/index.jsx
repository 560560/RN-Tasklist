import React, { useEffect, useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useSchemeColors } from '../../helpers/useSchemeColors';
import { getConnectionStatus } from '../../redux/reducers';
import { isDarkBackground } from '../ColorSettings/ColorPicker';
import { isEqual } from 'lodash';

export const AppBar = () => {
  const { mainColor, mainTextColor } = useSchemeColors();
  const connectionStatus = useSelector((state) => state.navbarPanel.connectionStatus, isEqual);

  const systemBarColor = useMemo(() => {
    const isDarkMainColor = isDarkBackground(mainColor);
    return isDarkMainColor ? 'light-content' : 'dark-content';
  }, [mainColor]);

  const styles = StyleSheet.create({
    navigationBar: {
      backgroundColor: connectionStatus ? mainColor : '#ff4848',
      height: 60,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {
      color: connectionStatus ? mainTextColor : 'white',
      fontWeight: connectionStatus ? '500' : '900',
      fontSize: 15,
      backgroundColor: connectionStatus ? mainColor : '#ff4848',
      paddingBottom: 10,
    },
  });

  const dispatch = useDispatch();
  const appName = useSelector((state) => state.navbarPanel.appName);
  useEffect(() => {
    dispatch(getConnectionStatus());
  }, [dispatch]);

  return (
    <View style={[styles.navigationBar]}>
      <StatusBar
        barStyle={systemBarColor} // Here is where you change the font-color
      />
      <Text style={styles.title}>{appName?.toUpperCase() ?? 'Установка связи с сервером'}</Text>
    </View>
  );
};
