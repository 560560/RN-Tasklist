import { Formik } from 'formik';
import { capitalize } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { infoAlert } from '../../common/allertsModal';
import { logIn, setAuthError, setSignUpStatus, signUpUser } from '../../redux/reducers';
import { EmailAddressField } from './components/EmailAddressField';
import { PasswordField } from './components/PasswordField';
import { SignUpConfirmPasswordField } from './components/SignUpConfirmPasswordField';
import { SignUpNameField } from './components/SignUpNameField';
import { signInValidationSchema } from './validationSchemas/signInValidationSchema';
import { signUpValidationSchema } from './validationSchemas/sIgnUpValidationSchema';

const initialValues = {
  name: '',
  email: '',
  pass: '',
  confirmPass: '',
  rememberMe: false,
};

export const Login = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.authApp.authError);
  const signUpStatus = useSelector((state) => state.authApp.signUpStatus);
  const [isSignUpMode, setSignUpMode] = useState(false);
  const pageTitle = isSignUpMode ? 'Регистрация' : 'Авторизация';
  const alternativePageTitle = isSignUpMode ? 'Авторизация' : 'Регистрация';
  const submitButtonTitle = isSignUpMode ? 'Зарегистрироваться' : 'Войти';

  const validationSchema = useMemo(
    () => (isSignUpMode ? signUpValidationSchema : signInValidationSchema),
    [isSignUpMode]
  );

  const clearAuthError = useCallback(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  const clearSignUpStatus = useCallback(() => {
    dispatch(setSignUpStatus(null));
  }, [dispatch]);

  useEffect(() => {
    if (signUpStatus?.success) {
      setSignUpMode(false);
    }
  }, [signUpStatus]);

  const getFormikData = useCallback(
    (formData, { resetForm }) => {
      const { pass, name: formDataName, email: formDataEmail } = formData;
      const name = capitalize(formDataName);
      const email = formDataEmail?.toLowerCase();
      if (isSignUpMode) {
        dispatch(signUpUser(name, email, pass, resetForm));
      } else {
        dispatch(logIn(email, pass, resetForm));
      }
    },
    [dispatch, isSignUpMode]
  );

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={getFormikData}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          setErrors,
          dirty,
        }) => {
          return (
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{pageTitle}</Text>
                <Text style={{ color: '#404040' }}>или</Text>
                <TouchableOpacity
                  style={styles.titleAlternative}
                  onPress={() => {
                    setErrors({});
                    setSignUpMode(!isSignUpMode);
                  }}
                >
                  <Text style={styles.titleAlternativeText}>{alternativePageTitle}</Text>
                </TouchableOpacity>
              </View>

              {isSignUpMode && (
                <SignUpNameField
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  touched={touched}
                  errors={errors}
                />
              )}

              <EmailAddressField
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
              />

              <PasswordField
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
              />

              {isSignUpMode && (
                <SignUpConfirmPasswordField
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  touched={touched}
                  errors={errors}
                />
              )}

              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit}
                  title={submitButtonTitle}
                  type="SUBMIT"
                  disabled={!dirty || !isValid}
                />
              </View>
            </View>
          );
        }}
      </Formik>
      {authError && infoAlert('Ошибка входа', authError, clearAuthError)}
      {signUpStatus && infoAlert('Статус регистрации:', signUpStatus?.message, clearSignUpStatus)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    flexDirection: 'column',
    marginBottom: 35,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    marginBottom: 7,
    color: '#404040',
  },
  titleAlternative: {
    marginTop: 7,
  },
  titleAlternativeText: {
    color: '#1334a9',
    fontSize: 16,
  },
  inputFieldBlockWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  inputFieldBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 15,
  },
  inputField: {
    width: '80%',
    borderBottomColor: '#404040',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    marginTop: 20,
  },
});
