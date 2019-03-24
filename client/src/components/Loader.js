import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styles/loader.css';

const Loader = props => (
  <Fragment>
    <div className="loader">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="msg">{props.msg}</p>
    </div>
  </Fragment>
);
PropTypes.Loader = {
  msg: PropTypes.string,
};
export default Loader;
