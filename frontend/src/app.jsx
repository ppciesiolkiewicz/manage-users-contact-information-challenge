import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Address from './components/address/address';
import UserDetails from './components/userDetails/userDetails';
import { fetchUserData, postUserData } from './helpers/requests/users';

import './app.css';


const USER_ID = 1;
const App = () => {
  const [user, setUser] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchUserData(USER_ID)
      .then(setUser)
      .catch(() => setFetchError('Fetching data failed'))
  }, [])

  if (fetchError) {
    console.log("RETURNIGN ERROR")
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

export default App;
