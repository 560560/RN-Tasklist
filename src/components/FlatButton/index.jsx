import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSchemeColors } from '../../helpers/useSchemeColors';

export const FlatButton = ({ text, onPress, isLoading }) => {
  const { mainColor, mainTextColor } = useSchemeColors();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginTop: -2,
      backgroundColor: mainColor,
      height: 36,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 2,
    },
    buttonText: {
      color: mainTextColor,
      fontSize: 14,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        {isLoading && <ActivityIndicator size="small" color={mainTextColor} />}
        {!isLoading && <Text style={styles.buttonText}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};
