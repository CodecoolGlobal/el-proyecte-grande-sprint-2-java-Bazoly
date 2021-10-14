import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

let HolidayReserver = () => {
  let [userData, setData] = useState([]);
  const { userId } = useParams();

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
    </div>
  );
};

export default HolidayReserver;
