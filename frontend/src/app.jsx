import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Address from './components/address/address';
import UserDetails from './components/userDetails/userDetails';

import './app.css';

const getUserUrl = (id = '') => `http://localhost:1337/users/${id}`;

const fetchUserData = async id => {
  return fetch(getUserUrl(id))
    .then(res => res.json());
};

const postUserData = async user => {
  fetch(getUserUrl(),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  )
    .then(res => res.json());
};

const USER_ID = 1;
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData(USER_ID)
      .then(setUser)
      .catch(console.log)
  }, [])

  if (!user) {
    return <div>'loading...'</div>;
  }

  return (
    <div className="app">
      <Formik
        initialValues={user}
        onSubmit={values => {
          postUserData(values)
            .then(console.log)
            .catch(console.log);
        }}
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
