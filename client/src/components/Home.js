import React from 'react';

const Home = props => (
  <div className="contianer-fluid">
    <div className="jumbotron text-center">
      <h1>A User Based Todo Application</h1>
      <p>Using Express Node and mongo DB with JWT!</p>
    </div>
    <div className="row">
      <div className="col-sm-4 ">
        <div className="card p-5 m-1">
          <h3>Manage User</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
      </div>
      <div className="col-sm-4 ">
        <div className="card p-5 m-1">
          <h3>Admin Panel </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
      </div>
      <div className="col-sm-4 ">
        <div className="card p-5 m-1">
          <h3>Manage TODO</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
      </div>
    </div>
  </div>
);
export default Home;
