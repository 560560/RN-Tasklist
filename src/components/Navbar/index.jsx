import { FontAwesome } from '@expo/vector-icons';
import { isEqual } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppScreen } from '../../helpers/constants';
import { hexToRgbA } from '../../helpers/hexToRgba';
import { useSchemeColors } from '../../helpers/useSchemeColors';
import {
  clearTodoUnderEdit,
  getDoneTodos,
  getTodos,
  setEditMode,
  setScreenToShow,
} from '../../redux/reducers';

export const Navbar = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.screens.screenToShow, isEqual);
  const undoneTodoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);

  const { mainColor, backgroundColor } = useSchemeColors();

  const iconInactiveColor = useMemo(() => hexToRgbA(mainColor, 0.4), [mainColor]);

  const styles = StyleSheet.create({
    navTab: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor,
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'absolute',
      top: 65,
      left: 0,
      right: 0,
      paddingBottom: 5,
      borderBottomColor: '#d2d2d2',
      borderStyle: 'solid',
      borderBottomWidth: 1,
    },
    text: {
      color: '#000',
      fontSize: 18,
    },
  });

  const onPressProfileHandler = useCallback(() => {
    if (currentScreen !== AppScreen.PROFILE) {
      if (undoneTodoUnderEdit) {
        dispatch(setEditMode(undoneTodoUnderEdit, false));
        dispatch(clearTodoUnderEdit());
      }
      dispatch(setScreenToShow(AppScreen.PROFILE));
    }
  }, [currentScreen, dispatch, undoneTodoUnderEdit]);

  const onPressDoneTasksHandler = useCallback(() => {
    if (currentScreen !== AppScreen.DONE_TODOS) {
      if (undoneTodoUnderEdit) {
        dispatch(setEditMode(undoneTodoUnderEdit, false));
        dispatch(clearTodoUnderEdit());
      }
      dispatch(setScreenToShow(AppScreen.DONE_TODOS));
    } else {
      dispatch(getDoneTodos());
    }
  }, [dispatch, currentScreen, undoneTodoUnderEdit]);

  const onPressTasksHandler = useCallback(() => {
    if (currentScreen !== AppScreen.UNDONE_TODOS) {
      dispatch(setScreenToShow(AppScreen.UNDONE_TODOS));
    } else {
      dispatch(getTodos());
    }
  }, [dispatch, currentScreen]);

  return (
    <View style={styles.navTab}>
      <TouchableOpacity onPress={() => onPressTasksHandler()}>
        <FontAwesome
          name="square-o"
          size={45}
          color={currentScreen === AppScreen.UNDONE_TODOS ? mainColor : iconInactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressDoneTasksHandler()}>
        <FontAwesome
          name="check-square-o"
          size={45}
          color={currentScreen === AppScreen.DONE_TODOS ? mainColor : iconInactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressProfileHandler()}>
        <FontAwesome
          name="user-o"
          size={39}
          color={currentScreen === AppScreen.PROFILE ? mainColor : iconInactiveColor}
        />
      </TouchableOpacity>
    </View>
  );
};
