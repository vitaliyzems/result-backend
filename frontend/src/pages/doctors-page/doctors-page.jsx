import { useEffect, useState } from 'react';
import { getAppointments } from '../../api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DoctorsPageContainer = ({ className }) => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/auth');
    }
    getAppointments().then((loadedAppointments) =>
      setAppointments(loadedAppointments)
    );
  }, [navigate]);

  const signout = () => {
    sessionStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className={className}>
      <button onClick={() => signout()}>Выйти</button>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Описание проблемы</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.fullName}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.problem}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                Нет записей
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const DoctorsPage = styled(DoctorsPageContainer)`
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & button {
    margin-bottom: 5px;
  }

  & .appointment-table {
    width: 100%;
    border-collapse: collapse;
  }

  & .appointment-table th,
  & .appointment-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-family: 'Arial', sans-serif;
  }

  & .appointment-table th {
    background-color: #333;
    color: white;
    font-weight: bold;
  }

  & .appointment-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  & .appointment-table tbody tr:hover {
    background-color: #e9e9e9;
    cursor: pointer;
  }

  & .no-data {
    text-align: center;
    font-style: italic;
    color: #999;
  }

  & .appointment-table td {
    color: #333;
    font-size: 14px;
  }

  & .appointment-table th,
  & .appointment-table td {
    transition: background-color 0.3s ease;
  }
`;
