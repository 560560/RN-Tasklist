import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { setScreenToShow } from '../../redux/screens-reducer';
import { getTodos } from '../../redux/todos-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

export const Navbar = () => {
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const iconSecondColor = useSelector((state) => state.config?.iconSecondColor, isEqual);
  const screenToShow = useSelector((state) => state.screens.screenToShow, isEqual);
  const backgroundColor = useSelector((state) => state.config?.background, isEqual);

  const styles = StyleSheet.create({
    navTab: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: backgroundColor,
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'absolute',
      top: 70,
      left: 0,
      right: 0,
      paddingBottom: 10,
      borderBottomColor: '#d2d2d2',
      borderStyle: 'solid',
      borderBottomWidth: 1,
    },
    text: {
      color: '#000',
      fontSize: 18,
    },
  });

  const onPressProfileHandler = () => {
    if (screenToShow !== 'profile') {
      dispatch(setScreenToShow('profile'));
    }
  };

  const onPressDoneTasksHandler = () => {
    if (screenToShow !== 'doneTodos') {
      dispatch(setScreenToShow('doneTodos'));
    }
  };

  const onPressTasksHandler = () => {
    if (screenToShow !== 'todos') {
      dispatch(setScreenToShow('todos'));
    } else {
      dispatch(getTodos());
    }
  };
  return (
    <View style={styles.navTab}>
      <TouchableOpacity onPress={() => onPressTasksHandler()}>
        <FontAwesome5 name="clipboard-list" size={40} color={screenToShow === 'todos' ? mainColor : iconSecondColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressDoneTasksHandler()}>
        <FontAwesome5 name="tasks" size={38} color={screenToShow === 'doneTodos' ? mainColor : iconSecondColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressProfileHandler()}>
        <MaterialIcons name="account-circle" size={45} color={screenToShow === 'profile' ? mainColor : iconSecondColor} />
      </TouchableOpacity>
    </View>
  );
};
