import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectionStatus } from '../../redux/navbar-reducer';
import { isEqual } from 'lodash';

const AppBar = () => {
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config.mainTextColor, isEqual);

  const styles = StyleSheet.create({
    navigationBar: {
      backgroundColor: mainColor,
      height: 60,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {
      color: mainTextColor,
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
      <Text style={styles.title}>{appName.toUpperCase()}</Text>
    </View>
  );
};

export default AppBar;
