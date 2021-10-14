import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';

let HolidayReserver = () => {
  let [userData, setData] = useState([]);
  const { userId } = useParams();
  const [value, onChange] = useState(new Date());
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  let getUserURL = 'http://localhost:8080/api/user/';

  let fetchEmployeeById = useCallback(async () => {
    let userData = await fetch(getUserURL + userId, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    setData(userData);
  }, [getUserURL, userId]);

  useEffect(() => {
    fetchEmployeeById().catch((err) => console.error(err));
  }, [fetchEmployeeById]);

  return (
    <div className='employee'>
      <h1>Holiday</h1>
      <h2>Reserve holiday for: {userData.name}</h2>
      <h2>From:</h2>
      {from ? (
        <div>
          <p>{from.toDateString()} </p>
          <h2>To:</h2>
        </div>
      ) : (
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={(value, event) => {
            setFrom(value);
          }}
        />
      )}
      {from ? (
        to ? (
          <div>
            <p>{to.toDateString()} </p>
            <button
              onClick={() => {
                setFrom(null);
                setTo(null);
              }}
            >
              Modify
            </button>
            <button
              onClick={() => {
                alert(
                  `You set a holiday for ${
                    userData.name
                  }\nFrom: ${from.toDateString()}, to: ${to.toDateString()}`
                );
              }}
            >
              Send reservation
            </button>
          </div>
        ) : (
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={(value, event) => {
              setTo(value);
            }}
          />
        )
      ) : null}
    </div>
  );
};

export default HolidayReserver;
