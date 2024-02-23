import { FontAwesome } from '@expo/vector-icons';
import { isEqual } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

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

  const { mainColor } = useSchemeColors();

  const iconInactiveColor = useMemo(() => hexToRgbA(mainColor, 0.4), [mainColor]);

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
    <NavbarStyled>
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
    </NavbarStyled>
  );
};

const NavbarStyled = styled.View`
  flex: 1;
  flex-direction: row;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 65px;
  left: 0;
  right: 0;
  ${({ $backgroundColor }) => css`
    background-color: ${$backgroundColor};
  `};
`;
