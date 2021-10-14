import React from 'react';
import { Link } from 'react-router-dom';

const HolidayButton = (props) => {
  console.log('HolidayButton.jsx');
  console.log(props.userData);

  return (
    <>
      <button>
        <Link to={`/holiday/${props.userData.id}`}>HOLIDAY</Link>
      </button>
    </>
  );
};

export default HolidayButton;
