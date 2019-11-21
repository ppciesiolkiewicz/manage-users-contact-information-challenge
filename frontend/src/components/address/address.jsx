import React from 'react';
import { string, func, shape } from 'prop-types';
import { get } from 'lodash';
import Input from '../input/input';

import './address.css';


const Address = ({ sectionName, headline, handleChange, handleBlur, values }) => {
  const renderInput = (label, fieldName) => {
    const fullFieldName = `${sectionName}.${fieldName}`;

    return (
      <div>
        <Input
          label={label}
          name={fullFieldName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={get(values, fieldName, '')}
        />
      </div>
    );
  };

  return (
    <div className="address">
      <h1>{headline}</h1>
      {renderInput('Country', 'country')}
      {renderInput('Street Name', 'streetName')}
      {renderInput('Street number', 'streetNumber')}
      {renderInput('City', 'city')}
      {renderInput('Postal Code', 'postalCode')}
      {renderInput('Phone', 'phone')}
    </div>
  );
};

const AddressPropType = shape({
  country: string.isRequired,
  streetName: string.isRequired,
  streetNumber: string.isRequired,
  city: string.isRequired,
  postalCode: string.isRequired,
  phone: string.isRequired,
});

Address.propTypes = {
  sectionName: string.isRequired,
  headline: string.isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  values: AddressPropType.isRequired,
};

export default Address;
