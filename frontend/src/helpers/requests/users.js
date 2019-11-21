const getUserUrl = (id = '') => `http://localhost:1337/users/${id}`;

export const fetchUserData = async id => {
  return fetch(getUserUrl(id))
    .then(res => res.json());
};

export const postUserData = async user => {
  return fetch(getUserUrl(),
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
