import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, setAuthError} from '../../redux/auth-reducer';
import {infoAlert} from '../../Common/allertsModal';

const Login = () => {

  const dispatch = useDispatch();
  const authError = useSelector(state => state.authApp.authError);

  const clearAuthError = () => {
    dispatch(setAuthError(null));
  };

  const [signUpMode, setSignUpMode] = useState(false);

  const validationSchema = Yup.object({
    name: signUpMode
        ? Yup.string().required('Обязательное поле')
        : Yup.string(),
    email: Yup.string().email('Неверный формат электронной почты').required('Обязательное поле'),
    pass: Yup.string().required('Обязательное поле').min(6, 'Пароль должен быть не менее 6 символов').trim(),
    confirmPass: signUpMode
        ? Yup.string().oneOf([Yup.ref('pass')], 'Пароли не совпадают')
            .required('Обязательное поле')
            .min(6, 'Пароль должен быть не менее 6 символов')
            .trim()
        : Yup.string(),
  });

  const initialValues = {
    name: '',
    email: '',
    pass: '',
    confirmPass: '',
    rememberMe: false,
  };

  const getFormikData = (formData) => {
    const email = formData?.email?.toLowerCase();
    const pass = formData.pass;
    if (signUpMode) {

    } else {
      dispatch(logIn(email, pass));
    }

  };

  return (
      <ScrollView>
        <Formik
            initialValues={initialValues}

            validationSchema={validationSchema}
            onSubmit={(formData, {resetForm}) => {
              getFormikData(formData);
              if (signUpMode){
                resetForm();
              }
            }}
        >
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              dirty,
            }) => {

            if (!signUpMode) {
              delete errors['name'];
              delete errors['confirmPass'];
            }

            return (
                <View style={styles.container}>
                  <View style={styles.title}>
                    {signUpMode
                        ? <Text style={styles.titleText}>Регистрация</Text>
                        : <Text style={styles.titleText}>Авторизация</Text>
                    }
                    <Text style={{color: '#404040'}}>или</Text>
                    <TouchableOpacity style={styles.titleAlternative}
                                      onPress={() => {
                                        //если при нажатии будет включен режим авторизации, то чистим ошибки режима
                                        // регистрации
                                        if (signUpMode) {
                                          delete errors['name'];
                                          delete errors['confirmPass'];
                                        }
                                        setSignUpMode(!signUpMode);
                                      }}>
                      {!signUpMode
                          ? <Text style={styles.titleAlternativeText}>Регистрация</Text>
                          : <Text style={styles.titleAlternativeText}>Авторизация</Text>
                      }
                    </TouchableOpacity>
                  </View>

                  {signUpMode ? <View style={styles.inputFieldBlockWrapper}>
                        <AntDesign name="idcard" size={35} color="#404040"/>
                        <View style={styles.inputFieldBlock}>
                          <TextInput
                              style={styles.inputField}
                              onChangeText={handleChange('name')}
                              onBlur={handleBlur('name')}
                              value={values.name}
                              placeholder="Введите Ваше имя"
                          />
                          {errors.name && touched.name &&
                          <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
                          }
                        </View>
                      </View>

                      : <></>
                  }

                  <View style={styles.inputFieldBlockWrapper}>
                    <Entypo name="email" size={35} color="#404040"/>
                    <View style={styles.inputFieldBlock}>
                      <TextInput
                          style={styles.inputField}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          placeholder="Введите e-mail"
                          keyboardType="email-address"

                      />
                      {errors.email && touched.email &&
                      <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
                      }
                    </View>

                  </View>
                  <View style={styles.inputFieldBlockWrapper}>
                    <MaterialCommunityIcons name="key" size={35} color="#404040"/>
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
                      {errors.pass && touched.pass &&
                      < Text style={{fontSize: 10, color: 'red'}}>{errors.pass}</Text>
                      }
                    </View>
                  </View>


                  {signUpMode ?
                      <View style={styles.inputFieldBlockWrapper}>
                        {values.pass && values.pass === values.confirmPass
                            ? <MaterialCommunityIcons name="key" size={35} color="#404040"/>
                            : <MaterialCommunityIcons name="key-outline" size={35} color="#404040"/>
                        }
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
                          {errors.confirmPass && touched.confirmPass &&
                          <Text style={{fontSize: 10, color: 'red'}}>{errors.confirmPass}</Text>
                          }
                        </View>
                      </View>
                      : <></>
                  }
                  <View style={styles.buttons}>
                    <Button
                        onPress={handleSubmit}
                        title={signUpMode ? 'Зарегистрироваться' : 'Войти'}
                        type='SUBMIT'
                        disabled={!dirty || !isValid}
                    />
                  </View>

                </View>
            );
          }}
        </Formik>
        {authError && infoAlert('Ошибка входа', authError, clearAuthError)}
      </ScrollView>
  );
};

export default Login;


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