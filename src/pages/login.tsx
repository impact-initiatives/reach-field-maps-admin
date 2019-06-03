import React from 'react';

import SEO from '../components/seo';
import LoginForm from '../components/login-form';
import PageFooter from '../components/page-footer';

const LoginPage = () => (
  <section className="hero is-fullheight">
    <SEO title="Login" />
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </section>
);

export default LoginPage;
