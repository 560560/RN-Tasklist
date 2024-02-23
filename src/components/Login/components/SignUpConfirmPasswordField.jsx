import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './inputFieldStyles';

export const SignUpConfirmPasswordField = React.memo(
  ({ handleChange, handleBlur, values, errors, touched }) => (
    <View style={styles.inputFieldBlockWrapper}>
      {values.pass && values.pass === values.confirmPass ? (
        <MaterialCommunityIcons name="key" size={35} color="#404040" />
      ) : (
        <MaterialCommunityIcons name="key-outline" size={35} color="#404040" />
      )}
      <View style={styles.inputFieldBlock}>
        <TextInput
          style={styles.inputField}
          onChangeText={handleChange('confirmPass')}
          onBlur={handleBlur('confirmPass')}
          value={values.confirmPass}
          secureTextEntry
          placeholder="Повторите пароль"
          autoComplete="password"
        />
        {errors.confirmPass && touched.confirmPass && (
          <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPass}</Text>
        )}
      </View>
    </View>
  )
);
