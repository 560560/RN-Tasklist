import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  email: Yup.string().email('Неверный формат электронной почты').required('Обязательное поле'),
  pass: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .trim(),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Пароли не совпадают')
    .required('Обязательное поле')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .trim(),
});
