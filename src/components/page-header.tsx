import React, { useState } from 'react';
import { Link } from 'gatsby';
import Auth from '@aws-amplify/auth';

import client from '../utils/aws-appsync-client';
import awsConfig from '../config/aws/aws-exports';
import Logo from '../images/wash-icon.svg';

interface Props {
  tab: string;
}

interface State {
  menuOpen: boolean;
}

const onLogout = () =>
  Auth.signOut().then(() =>
    client
      .clearStore()
      .then(() => window.location.assign(awsConfig.route53.public)),
  );

const onClick = (state: State, setState: Function) =>
  setState({ menuOpen: !state.menuOpen });

const PageHeader = ({ tab }: Props) => {
  const [state, setState] = useState({ menuOpen: false });
  const isActive = state.menuOpen ? ' is-active' : '';
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/" aria-label="Home page">
          <Logo style={{ height: 28 }} />
        </Link>
        <button
          className={`button is-white navbar-burger burger${isActive}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => onClick(state, setState)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div className={`navbar-menu${isActive}`}>
        <div className="navbar-start">
          <Link
            className={`navbar-item is-tab${tab === '/' ? ' is-active' : ''}`}
            to="/"
            aria-label="Home page"
          >
            Home
          </Link>
          <Link
            className={`navbar-item is-tab${
              tab === '/upload' ? ' is-active' : ''
            }`}
            to="/upload"
            aria-label="Upload files"
          >
            Upload
          </Link>
          <Link
            className={`navbar-item is-tab${
              tab === '/admin' ? ' is-active' : ''
            }`}
            to="/admin"
            aria-label="Admin console"
          >
            Admin
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button is-primary is-rounded"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
