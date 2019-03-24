import React, { useState, useEffect } from 'react';
import Auth from '../utils';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const handleSubmit = e => {
    e.preventDefault();
    if (Boolean(email) && Boolean(password)) {
      const payload = { email, password };
      Auth.signIn(payload)
        .then(response => {
          const { token, error, message } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('isValid', true);
          setMessage(message);
          setError(error);
          if (!error) {
            setTimeout(() => {
              props.history.push('/user');
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setError('Please Enter Something');
    }
    clearInput();
  };
  const clearInput = () => {
    console.log('called');
    setEmail('');
    setPassword('');
  };
  return (
    <div className="contianer-fluid">
      <div className="row justify-content-center">
        <div className="col-4 offset-md-1">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h4>Login</h4>
              </div>
              {Boolean(error) ? <div style={{ color: 'red', textAlign: 'center' }}>{error}</div> : null}
              {Boolean(message) ? <div style={{ color: 'green', textAlign: 'center' }}>{message}</div> : null}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    className={Boolean(error) ? 'form-control error' : 'form-control'}
                    id="email"
                    onChange={e => {
                      setEmail(e.target.value);
                      setError(undefined);
                    }}
                    autoComplete="false"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    type="password"
                    className={Boolean(error) ? 'form-control error' : 'form-control'}
                    id="pwd"
                    onChange={e => {
                      setPassword(e.target.value);
                      setError(undefined);
                    }}
                    value={password}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
