import React from 'react';
import { string, func, shape } from 'prop-types';
import { get } from 'lodash';
import Input from '../input/input';

import './userDetails.css';

const UserDetails = ({ firstName, lastName, handleChange, handleBlur, values }) => {
  const renderInput = (label, fieldName) => {
    return (
      <div>
        <Input
          label={label}
          name={fieldName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={get(values, fieldName, '')}
        />
      </div>
    );
  };

  return (
    <div className="userDetailsContainer">
      <h1>User details</h1>
      <div className="userDetails">
        {renderInput('First Name', 'firstName')}
        {renderInput('Last Name', 'lastName')}
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  values: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
};

export default UserDetails;
