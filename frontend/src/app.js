import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Address from './components/address/address';
import UserDetails from './components/userDetails/userDetails';

import './app.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const url = 'http://localhost:1337/users/1';
    fetch(url)
      .then(res => res.json())
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
