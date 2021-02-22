import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getConnectionStatus} from '../../redux/navbar-reducer';


const Navbar = () => {

  const dispatch = useDispatch();

  const appName = useSelector(state => state.navbarPanel.appName);

  useEffect(() => {
    dispatch(getConnectionStatus());
  }, [dispatch, ]);

  return (
      <View style={[styles.navigationBar]}>
        <Text style={styles.title}>{appName.toUpperCase()}</Text>
      </View>
  );
};
const styles = StyleSheet.create({
  navigationBar: {

    backgroundColor: '#1334a9',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    paddingBottom: 10,
  },
});

export default Navbar;