import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {FirebaseAppProvider} from 'reactfire';

const firebaseConfig = {
  apiKey: 'AIzaSyC8RVHv3WGXgIbpugbkTYR7mQK8UaBGrkE',
  authDomain: 'browniepoints-93077.firebaseapp.com',
  databaseURL: 'https://browniepoints-93077.firebaseio.com',
  projectId: 'browniepoints-93077',
  storageBucket: 'browniepoints-93077.appspot.com',
  messagingSenderId: '156034520187',
  appId: '1:156034520187:web:ef38841c75d0d5e8c4fede',
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
