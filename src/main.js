import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TodosScreen from './Screens/TodosScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AppBar from './Components/AppBar/AppBar';
import Login from './Components/Login/Login';
import { getConnectionStatus } from './redux/navbar-reducer';
import { Navbar } from './Components/Navbar/Navbar';
import { isEqual } from 'lodash';
import { resetStyles } from './helpers/resetStyles';

const Main = () => {
  const dispatch = useDispatch();
  const screenToShow = useSelector((state) => state.screens.screenToShow);
  const appInitializeStatus = useSelector((state) => state.navbarPanel.appInitialized);

  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config?.mainTextColor, isEqual);
  const iconSecondColor = useSelector((state) => state.config?.iconSecondColor, isEqual);
  const backgroundColor = useSelector((state) => state.config?.background, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  useEffect(() => {
    if (!mainColor && !mainTextColor && !iconSecondColor && !backgroundColor && !secondTextColor) {
      resetStyles(dispatch);
    }
  }, [dispatch, mainColor, mainTextColor, iconSecondColor, backgroundColor, secondTextColor, resetStyles]);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      position: 'relative',
      backgroundColor: backgroundColor,
    },
    image: {
      flex: 1,
      resizeMode: 'repeat',
      justifyContent: 'center',
    },
  });

  useEffect(() => {
    dispatch(getConnectionStatus());
  }, [dispatch]);

  if (!appInitializeStatus) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={StyleSheet.flatten([styles.wrapper])}>
      <StatusBar style="light" />
      <AppBar />
      {screenToShow === 'login' ? (
        <Login />
      ) : screenToShow === 'todos' ? (
        <TodosScreen renderScreen={'todos'} />
      ) : screenToShow === 'doneTodos' ? (
        <TodosScreen renderScreen={'doneTodos'} />
      ) : (
        screenToShow === 'profile' && <ProfileScreen />
      )}
      {screenToShow !== 'login' && <Navbar />}
    </View>
  );
};

export default Main;
