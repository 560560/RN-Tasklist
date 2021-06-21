import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

export default function FlatButton({ text, onPress }) {
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config?.mainTextColor, isEqual);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: mainColor,
    },
    buttonText: {
      color: mainTextColor,
      textTransform: 'uppercase',
      fontSize: 15,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
