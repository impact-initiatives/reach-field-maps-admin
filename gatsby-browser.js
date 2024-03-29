import React from 'react';
import Auth from '@aws-amplify/auth';
import { navigate } from 'gatsby';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

import client from './src/utils/aws-appsync-client';
import './src/styles/styles.sass';

const ELEMENT_ID = 'gatsby-browser-service-worker-notification';

const addProgressBar = () => {
  if (!document.getElementById(ELEMENT_ID)) {
    const elem = document.createElement('progress');
    elem.id = ELEMENT_ID;
    elem.className = 'progress is-small is-primary is-fixed-top';
    document.body.prepend(elem);
  }
};

const removeProgressBar = () => document.getElementById(ELEMENT_ID).remove();

if (
  process.env.NODE_ENV === 'production' &&
  !navigator.serviceWorker.controller
) {
  addProgressBar();
}

export const onServiceWorkerActive = () => removeProgressBar();

export const onServiceWorkerUpdateFound = () => addProgressBar();

export const onServiceWorkerUpdateReady = () => window.location.reload();

export const onPreRouteUpdate = ({ location }) => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      if (location.pathname.startsWith('/login')) navigate('/');
    })
    .catch(() => {
      if (!location.pathname.startsWith('/login')) navigate('/login');
    });
};

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Rehydrated>{element}</Rehydrated>
  </ApolloProvider>
);
