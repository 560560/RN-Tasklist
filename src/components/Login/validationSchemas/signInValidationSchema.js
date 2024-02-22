import * as Yup from 'yup';

export const signInValidationSchema = Yup.object({
  email: Yup.string().email('Неверный формат электронной почты').required('Обязательное поле'),
  pass: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .trim(),
});
