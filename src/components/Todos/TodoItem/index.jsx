import { MaterialCommunityIcons } from '@expo/vector-icons';
import { isEqual } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { hexToRgbA } from '../../../helpers/hexToRgba';
import { useSchemeColors } from '../../../helpers/useSchemeColors';
import { useGetHelpers } from './hooks/useGetHelpers';
import { AppScreen } from '../../../helpers/constants';

export const TodoItem = React.memo(({ todo, id, done, date, editMode, renderScreen }) => {
  const [todoNewTitle, setTodoNewTitle] = useState(todo);
  const todoUnderEdit = useSelector((state) => state.todos?.todoUnderEdit, isEqual);
  const isLoading = useSelector((state) => state.todos?.isLoading, isEqual);

  const { backgroundColor, secondTextColor, mainColor } = useSchemeColors();

  const {
    checkTodoHandler,
    setEditModeHandler,
    removeHandler,
    applyChanges,
    onCancelChangesHandler,
    getDate,
  } = useGetHelpers(id, todo, todoNewTitle, date, setTodoNewTitle, editMode, renderScreen);

  const styles = StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      backgroundColor,
      borderColor: hexToRgbA(secondTextColor, 0.3),
      borderRadius: 7,
      borderWidth: 1,
      color: '#969696',
      elevation: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 14,
      marginHorizontal: 20,
      paddingLeft: 10,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
    },
    todoItem: {
      paddingVertical: 5,
      paddingLeft: 5,
      fontSize: 17,
      lineHeight: 20,
      color: secondTextColor,
    },
    deleteIcon: {
      paddingRight: 10,
      color: mainColor,
      fontSize: 30,
    },
    saveIcon: {
      paddingRight: 10,
      color: '#219313',
      fontSize: 30,
    },
    doneIcon: {
      paddingRight: 10,
      color: 'rgb(98,161,98)',
      fontSize: 30,
    },
    undoneIcon: {
      paddingRight: 10,
      color: '#969696',
      fontSize: 30,
    },
    cancelIcon: {
      color: '#e85e5e',
      fontSize: 30,
    },
    inputField: {
      width: '70%',
      borderBottomColor: '#1334a9',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      fontSize: 17,
      color: secondTextColor,
    },
    separator: {
      textAlign: 'center',
      fontSize: 15,
      color: secondTextColor,
      opacity: 0.5,
      marginTop: 25,
      paddingVertical: 10,
    },
    title: {
      maxWidth: '73%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  const onPress = useCallback(() => {
    checkTodoHandler(id, !done);
  }, [id, checkTodoHandler, done]);

  const onLongPressHandler = useCallback(() => {
    if (done) {
      return;
    }

    !todoUnderEdit && setEditModeHandler(id, true);
  }, [done, todoUnderEdit]);

  const editModeContent = useMemo(
    () => (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onCancelChangesHandler}>
          <MaterialCommunityIcons name="close-thick" style={styles.cancelIcon} />
        </TouchableOpacity>

        <TextInput
          autoCapitalize="sentences"
          autoCorrect
          value={todoNewTitle}
          style={styles.inputField}
          placeholder="Название задачи..."
          onChangeText={setTodoNewTitle}
          autoFocus
          multiline
        />

        <TouchableOpacity onPress={applyChanges}>
          <MaterialCommunityIcons name="check-bold" style={styles.saveIcon} />
        </TouchableOpacity>
      </View>
    ),
    [onCancelChangesHandler, styles, todoNewTitle]
  );

  return (
    <View>
      {date && <Text style={styles.separator}>{getDate()}</Text>}
      <TouchableNativeFeedback
        disabled={isLoading}
        onPress={onPress}
        onLongPress={onLongPressHandler}
      >
        {editMode ? (
          editModeContent
        ) : (
          <View style={[styles.wrapper]}>
            <View style={[styles.title]}>
              {done ? (
                <MaterialCommunityIcons name="checkbox-outline" style={styles.doneIcon} />
              ) : (
                <MaterialCommunityIcons name="checkbox-blank-outline" style={styles.undoneIcon} />
              )}
              <Text style={StyleSheet.flatten([styles.todoItem])}>{todo}</Text>
            </View>

            <TouchableOpacity onPress={removeHandler}>
              <MaterialCommunityIcons name="trash-can-outline" style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
});
