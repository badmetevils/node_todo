const baseUrl = process.env.API_URL;
const Auth = {
  signIn(payload) {
    return new Promise((resolve, reject) =>
      fetch(`${baseUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (res.status == 200 || res.status == 400 || res.status == 404) {
            resolve(res.json());
          } else {
            reject({ failed: `Failed with staus ${res.status}` });
          }
        })
        .catch(err =>
          reject({
            networkError: err.message,
          }),
        ),
    );
  },
  singUp(payload) {
    return fetch(`${baseUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json());
  },
  validateToken(token) {
    return new Promise((resolve, reject) =>
      fetch(`${baseUrl}/api/users/validate`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (res.status == 200) {
            resolve(res.json());
          } else {
            reject({ failed: `Failed with staus ${res.status}` });
          }
        })
        .catch(err =>
          reject({
            networkError: err.message,
          }),
        ),
    );
  },
};

export default Auth;
