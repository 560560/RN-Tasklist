import { MaterialIcons } from '@expo/vector-icons';
import { isEqual } from 'lodash';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { hexToRgbA } from '../../helpers/hexToRgba';
import { useSchemeColors } from '../../helpers/useSchemeColors';
import { setDoneTodosFilter } from '../../redux/reducers';

export const TodoSearch = () => {
  const filterValue = useSelector((state) => state.todos?.doneTodosFilter, isEqual);
  const { mainColor, secondTextColor, backgroundColor } = useSchemeColors();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor,
      paddingTop: 10,
      paddingBottom: 15,
      paddingHorizontal: 12,
      height: 60,
      borderTopWidth: 1,
      borderTopColor: hexToRgbA(secondTextColor, 0.2),
    },
    inputField: {
      width: '86%',
      borderBottomColor: mainColor,
      borderStyle: 'solid',
      borderBottomWidth: 2,
      fontSize: 15,
      color: secondTextColor,
    },

    cancelIcon: {
      color: filterValue ? mainColor : hexToRgbA(mainColor, 0.4),
      fontSize: 30,
    },
  });
  const dispatch = useDispatch();

  const onChangeFilter = (value) => {
    dispatch(setDoneTodosFilter(value));
  };

  const onClearFilter = () => {
    dispatch(setDoneTodosFilter(''));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={filterValue}
        placeholder="Поиск по задачам..."
        onChangeText={onChangeFilter}
      />
      <TouchableOpacity onPress={onClearFilter} disabled={!filterValue}>
        <MaterialIcons name="replay" style={styles.cancelIcon} />
      </TouchableOpacity>
    </View>
  );
};
