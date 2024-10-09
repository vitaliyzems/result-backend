import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { login } from '../../api';
import { Link, Navigate } from 'react-router-dom';

const SignInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните Email')
    .email('Введите корректный Email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введите корректный Email'
    ),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(
      /^[\w#%]+$/,
      'Неверно заполнен пароль. Допускаются буквы, цифры и знаки "# и %"'
    )
    .min(6, 'Неверный пароль. Минимум 6 символов')
    .max(30, 'Неверный пароль. Максимум 30 символов'),
});

const SignInContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(SignInFormSchema),
  });

  const onSubmit = async ({ email, password }) => {
    const user = await login(email, password);

    sessionStorage.setItem('token', user.token);
    reset();
  };

  const formError = errors.email?.message || errors.password?.message;

  if (sessionStorage.getItem('token')) {
    return <Navigate to="/appointments" />;
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Авторизация</h2>
        <label htmlFor="email">Email: admin@admin.com</label>
        <input
          id="email"
          type="email"
          placeholder="Email..."
          {...register('email')}
        />
        <label htmlFor="password">Password: adminadmin</label>
        <input
          id="password"
          type="password"
          placeholder="Пароль..."
          {...register('password')}
        />
        <div className="form-bottom">
          {formError && <span>{formError}</span>}
          <button type="submit" disabled={formError}>
            Авторизоваться
          </button>
        </div>
        <Link to="/">Оставить заявку</Link>
      </form>
    </div>
  );
};

export const SignIn = styled(SignInContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0 10px -2px #333;
    padding: 20px 10px;
  }

  & h2 {
    text-align: center;
  }

  & input {
    width: 260px;
    height: 30px;
    margin-bottom: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 0 5px;
  }

  & .form-bottom {
    height: 50px;
    position: relative;
  }

  & span {
    font-size: 12px;
    color: red;
  }

  & button {
    width: 100%;
    height: 30px;
    background-color: #222222;
    color: #fff;
    border: none;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #000;
      border: 1px solid #222;
    }
  }

  & a {
    color: #000;
    margin-top: 5px;
  }
`;
