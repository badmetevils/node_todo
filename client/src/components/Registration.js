import React, { useState, useEffect } from 'react';
import Auth from '../utils';
const Reginstration = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleSubmit = e => {
    e.preventDefault();
    if (Boolean(name) && Boolean(email) && Boolean(password)) {
      const payload = { name, email, password };
      Auth.singUp(payload)
        .then(response => {
          const { message, error } = response;
          setMessage(message);
          setError(error);
          if (!error) {
            setTimeout(() => {
              props.history.push('/login');
            }, 1000);
          }
        })
        .catch(err => console.log(err));
    } else {
      setError('Please Enter Valid Details');
    }
    clearInput();
  };
  const clearInput = () => {
    setName('');
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
                <h4>Registration</h4>
              </div>
              {Boolean(error) ? <div style={{ color: 'red', textAlign: 'center' }}>{error}</div> : null}
              {Boolean(message) ? <div style={{ color: 'green', textAlign: 'center' }}>{message}</div> : null}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Username:</label>
                  <input
                    type="text"
                    className={Boolean(error) ? 'form-control error' : 'form-control'}
                    id="name"
                    onChange={e => {
                      setName(e.target.value);
                      setError(undefined);
                    }}
                    value={name}
                  />
                </div>
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
                <div className="row no-gutter">
                  <br />
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-danger btn-block" onClick={clearInput}>
                      Reset
                    </button>
                  </div>
                </div>
              </form>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reginstration;
