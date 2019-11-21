import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Formik } from 'formik';
import Address from './components/address/address';
import UserDetails from './components/userDetails/userDetails';
import { fetchUserData, postUserData } from './helpers/requests/users';

import './app.css';


const App = ({ match: { params: { userId } } }) => {
  const [user, setUser] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchUserData(userId)
      .then(setUser)
      .catch(() => setFetchError('Fetching data failed'))
  }, [userId])

  if (fetchError) {
    return <div>something went wrong</div>;
  }

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className="app">
      <Formik
        initialValues={user}
        onSubmit={values => {
          postUserData(values)
            .catch(() => setFetchError('Data update failed'))
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

App.propTypes = {
  match: shape({
    params: shape({
      userId: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default App;
