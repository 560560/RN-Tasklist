import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar } from './components/AppBar';
import { Navbar } from './components/Navbar';
import { getScreenToShow } from './helpers/getScreenToShow';
import { resetStyles } from './helpers/resetStyles';
import { useSchemeColors } from './helpers/useSchemeColors';
import { getConnectionStatus } from './redux/reducers';

export const Main = () => {
  const { mainColor, mainTextColor, iconSecondColor, backgroundColor, secondTextColor } =
    useSchemeColors();

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      position: 'relative',
      backgroundColor,
    },
    image: {
      flex: 1,
      resizeMode: 'repeat',
      justifyContent: 'center',
    },
  });

  const dispatch = useDispatch();
  const screenToShow = useSelector((state) => state.screens.screenToShow);
  const appInitializeStatus = useSelector((state) => state.navbarPanel.appInitialized);
  const currentScreen = useMemo(() => getScreenToShow(screenToShow), [screenToShow]);

  useEffect(() => {
    if (!mainColor && !mainTextColor && !iconSecondColor && !backgroundColor && !secondTextColor) {
      resetStyles(dispatch);
    }
  }, [backgroundColor, dispatch, iconSecondColor, mainColor, mainTextColor, secondTextColor]);

  useEffect(() => {
    dispatch(getConnectionStatus());
  }, [dispatch]);

  if (!appInitializeStatus) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={StyleSheet.flatten([styles.wrapper])}>
      <StatusBar />
      <AppBar />
      {currentScreen}
      {screenToShow !== 'login' && <Navbar />}
    </View>
  );
};
