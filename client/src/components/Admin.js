import React, { useEffect, useState, Fragment } from 'react';
import SuperUser from '../utils/admin';
import Loader from '../components/Loader';

const Admin = props => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isValid, setIsValid] = useState(localStorage.getItem('isValid'));
  const [message, setMessage] = useState('');
  const [adminInfo, setAdminInfo] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (!Boolean(isValid)) {
      setMessage('Unauthorize route redirecting..');
      setTimeout(() => {
        props.history.push('/login');
      }, 1000);
    } else {
      SuperUser.validate(token)
        .then(({ role, name, email }) => {
          if (role == 'admin') {
            setAdminInfo({ name, email, role });
            SuperUser.getUserList(token)
              .then(res => {
                setUserDetails(res);
                setisLoading(false);
              })
              .catch(err => {
                console.log(err);
                setisLoading(false);
              });
          } else {
            setMessage('Not A User with Admin Role');
            setisLoading(false);
            setTimeout(() => {
              props.history.push('/user');
            }, 1000);
          }
        })
        .catch(err => {
          setisLoading(false);
          setMessage('Something Went Wrong');
          props.history.push('/user');
        });
    }
  }, []);
  const handleDelete = id => {
    console.log(id);

    SuperUser.deleteUser(id, token).then(res => {
      const userList = userDetails.filter(u => {
        if (id != u._id) return true;
      });
      setUserDetails(userList);
    });
  };
  return (
    <div className="container">
      {message ? (
        <div className="row todo-container ">
          <h1 className="text-center">{message}</h1>
        </div>
      ) : (
        <Fragment>
          <h2 className="text-center">Admin Dashboard</h2>
          <div className="todo-container">
            {isLoading ? <Loader msg="Please wait While Fetching" /> : null}
            <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
              <div className="text-center">
                <h4>{adminInfo.name}</h4>
                <span> Email: {adminInfo.email}</span>
                <span> Role: {adminInfo.role}</span>
              </div>
              <hr />
              <div className="container-fluid">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created On</th>
                        <th> Tasks</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails.map((user, index) => {
                        const { name, email, todos, role, created_on, _id } = user;
                        return (
                          <tr key={_id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{role}</td>
                            <td>{created_on}</td>
                            <td>{todos.map(d => d.name).join(',')}</td>
                            <td>
                              {email == adminInfo.email ? null : (
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(_id)}>
                                  Delete User
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                        console.log(user);
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default Admin;
