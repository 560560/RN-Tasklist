import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './inputFieldStyles';

export const SignUpNameField = React.memo(
  ({ handleChange, handleBlur, values, touched, errors }) => (
    <View style={styles.inputFieldBlockWrapper}>
      <AntDesign name="idcard" size={35} color="#404040" />
      <View style={styles.inputFieldBlock}>
        <TextInput
          style={styles.inputField}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          placeholder="Введите название профиля"
        />
        {errors.name && touched.name && (
          <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
        )}
      </View>
    </View>
  )
);
