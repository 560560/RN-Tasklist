import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './inputFieldStyles';

export const PasswordField = React.memo(({ handleChange, handleBlur, values, errors, touched }) => (
  <View style={styles.inputFieldBlockWrapper}>
    <MaterialCommunityIcons name="key" size={35} color="#404040" />
    <View style={styles.inputFieldBlock}>
      <TextInput
        style={styles.inputField}
        onChangeText={handleChange('pass')}
        onBlur={handleBlur('pass')}
        value={values.pass}
        secureTextEntry
        placeholder="Введите пароль"
        autoComplete="password"
      />
      {errors.pass && touched.pass && (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.pass}</Text>
      )}
    </View>
  </View>
));
