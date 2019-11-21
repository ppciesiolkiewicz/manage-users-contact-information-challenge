import React from 'react';
import { Formik } from 'formik';
import Address from './components/address/address';
import UserDetails from './components/userDetails/userDetails';

import './app.css';

const initialValues = {
  shippingAddress: {
    country: '',
    streetName: '',
    streetNumber: '',
    city: '',
    postalCode: '',
    phone: '',
  },
  billingAddress: {
    country: '',
    streetName: '',
    streetNumber: '',
    city: '',
    postalCode: '',
    phone: '',
  },
}

function App() {
  return (
    <div className="app">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {}}
      >
        {({
          handleChange,
          handleBlur,
          values,
          values: { firstName, lastName, shippingAddress, billingAddress },
          handleSubmit,
        }) => (
          <form className="form" onSubmit={handleSubmit}>
            <UserDetails
              values={{ firstName, lastName }}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className="addressContainer">
              <Address
                headline="Shipping Address"
                sectionName="shippingAddress"
                values={shippingAddress}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <Address
                headline="Billing Address"
                sectionName="billingAddress"
                values={billingAddress}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>

            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
