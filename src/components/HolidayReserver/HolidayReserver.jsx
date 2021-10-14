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

  const getHolidayLength = () => {
    return Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
  };

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
    <div>
      <h1>Holiday</h1>
      <h2>Reserve holiday for: {userData.name}</h2>
      <h2>From:</h2>
      {from ? (
        <div>
          <p>{from.toDateString()} </p>
          <button onClick={() => setFrom(null)}>Modify starting date</button>
        </div>
      ) : (
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={(value, event) => {
            if (value <= new Date()) {
              alert('Date must be after today!');
            } else {
              setFrom(value);
            }
          }}
        />
      )}
      <h2>To:</h2>
      {from ? (
        to ? (
          <div>
            <p>{to.toDateString()} </p>

            <button onClick={() => setTo(null)}>Modify ending date</button>
            <h2>{getHolidayLength()} days</h2>
            <button
              onClick={() => {
                alert(
                  `You set a holiday for ${
                    userData.name
                  }\nFrom: ${from.toDateString()}, to: ${to.toDateString()}\n(${getHolidayLength()} days)`
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
              if (value <= from) {
                alert('Ending date must be after starting date!');
              } else {
                setTo(value);
              }
            }}
          />
        )
      ) : (
        <p>Set starting date first!</p>
      )}
    </div>
  );
};

export default HolidayReserver;
