import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './inputFieldStyles';

export const EmailAddressField = React.memo(
  ({ handleChange, handleBlur, values, errors, touched }) => (
    <View style={styles.inputFieldBlockWrapper}>
      <Entypo name="email" size={35} color="#404040" />
      <View style={styles.inputFieldBlock}>
        <TextInput
          style={styles.inputField}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder="Введите e-mail"
          keyboardType="email-address"
        />
        {errors.email && touched.email && (
          <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
        )}
      </View>
    </View>
  )
);
