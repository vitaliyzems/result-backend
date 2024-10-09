import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { addAppointment } from '../../api';
import { Link } from 'react-router-dom';
import { InputMask } from '@react-input/mask';

const AppointmentFormSchema = yup.object().shape({
  fullName: yup.string().required('Заполните ФИО'),
  phone: yup
    .string()
    .required('Заполните номер телефона')
    .matches(
      /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
      'Неверно заполнен номер телефона. Заполните в формате "+7-(XXX)-XXX-XX-XX"'
    ),
  problem: yup
    .string()
    .required('Заполните описание проблемы')
    .min(10, 'Минимальная длина описания проблемы 10 символов'),
});

const AppointmentContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: '', phone: '', problem: '' },
    resolver: yupResolver(AppointmentFormSchema),
  });

  const onSubmit = async ({ fullName, phone, problem }) => {
    const date = new Date().toLocaleString();
    await addAppointment({ date, full_name: fullName, phone, problem });
    reset();
  };

  const formError =
    errors.fullName?.message ||
    errors.phone?.message ||
    errors.problem?.message;

  return (
    <div className={className}>
      <h2>Запись на прием</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">ФИО:</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register('fullName')}
            placeholder="Введите полное имя"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Номер телефона:</label>
          <InputMask
            type="text"
            id="phone"
            name="phone"
            placeholder="+7"
            {...register('phone')}
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="problem">Описание проблемы:</label>
          <textarea
            id="problem"
            name="problem"
            {...register('problem')}
            placeholder="Опишите вашу проблему"
          />
        </div>
        <div className="form-error">{formError}</div>
        <button type="submit">Записаться</button>
        <Link to="/appointments">Кабинет доктора</Link>
      </form>
    </div>
  );
};

export const Appointment = styled(AppointmentContainer)`
  width: 500px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
  }

  & .form-group {
    margin-bottom: 20px;

    &:nth-child(3) {
      margin-bottom: 5px;
    }
  }

  & .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
  }

  & .form-group input,
  & .form-group textarea {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: 'Arial', sans-serif;
    transition: border-color 0.3s ease;
  }

  & .form-group input:focus,
  & .form-group textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  & textarea {
    resize: vertical;
    min-height: 100px;
  }

  & .form-error {
    height: 20px;
    margin-bottom: 10px;
    font-size: 12px;
    color: red;
  }

  & button[type='submit'] {
    width: 100%;
    padding: 12px;
    background-color: #333;
    color: white;
    font-size: 18px;
    border: 1px solid #333;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  & button[type='submit']:hover {
    background-color: #fff;
    color: #000;
  }

  & a {
    color: #000;
    display: block;
    margin-top: 5px;
  }
`;
